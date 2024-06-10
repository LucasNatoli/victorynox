import { SHA3 } from "sha3";
import { useNavigate } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useRegisterMutation } from "../../api/restApiSlice";
import { defaultTheme } from "../../layout/components/defaultTheme";
import { useAppNotification } from "../..";
import { useBackdrop } from "../../ui";
import { useEffect } from "react";

const theme = createTheme(defaultTheme);

export function Register() {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const { showSnackMsg } = useAppNotification();
  const { isBackdropOpen } = useBackdrop();

  useEffect(() => {
    isLoading && isBackdropOpen({ open: true });
  }, [isLoading]);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userId = data.get("userId");
    const password = data.get("password");
    const alg = new SHA3(512);
    alg.update(password);
    const hash = alg.digest("hex");

    try {
      const payload = await register({ userId, password: hash }).unwrap();
      navigate("/login");
    } catch (error) {
      if (error.status === 403)
        showSnackMsg({
          message: "Credenciales inválidas. Intentalo otra vez",
          type: "error",
        });
    } finally {
      isBackdropOpen({ open: false });
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userId"
            label="User Id"
            name="userId"
            autoComplete="userId"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarme
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
