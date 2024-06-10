import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MuiAppBar from "@mui/material/AppBar";
import SvgIcon from "@mui/material/SvgIcon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";
import { defaultTheme } from "./defaultTheme";
import AppDrawer from "./AppDrawer";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme(defaultTheme);
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export function AppLayout(props) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar position="absolute" open={open} color="secondary">
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <SvgIcon>
              <svg viewBox="0 0 207 181">
                <path
                  id="Cuerpo"
                  fill="rgba(210,12,12,0.779)"
                  stroke="red"
                  stroke-width="1"
                  d="M 79.90,25.91
           C 79.90,18.00 92.04,5.95 103.62,5.95
             116.19,5.95 127.35,17.45 127.35,25.91
             127.35,25.91 127.35,155.60 127.35,155.60
             127.35,161.41 116.15,175.55 103.66,175.59
             92.31,175.55 79.90,164.09 79.90,155.60
             79.90,155.60 79.90,26.03 79.90,26.03M 124.85,17.29"
                />

                <path
                  id="Blade Izq"
                  fill="grey"
                  stroke="rgba(220,218,218,0.845)"
                  stroke-width="0.5"
                  d="M 77.15,63.39
           C 77.15,63.39 36.02,118.89 36.02,118.89
             29.17,129.66 21.11,136.89 6.75,137.44
             6.05,132.06 9.10,114.92 13.23,109.38
             13.23,109.38 77.15,25.91 77.15,25.91"
                />

                <path
                  id="lomo"
                  fill="none"
                  stroke="grey"
                  stroke-width="1.1"
                  d="M 130.90,104.47
           C 130.90,104.47 130.85,25.91 130.85,25.91
             130.65,15.23 116.80,5.95 110.98,5.95M 123.50,20.14"
                />

                <path
                  id="Blade derecha"
                  fill="grey"
                  stroke="rgba(220,218,218,0.845)"
                  stroke-width="0.5"
                  d="M 129.60,110.02
           C 129.60,110.02 166.72,57.88 166.72,57.88
             173.58,47.11 186.60,40.83 200.96,40.28
             197.96,45.86 194.84,61.14 193.90,67.68
             193.90,67.68 129.51,155.75 129.51,155.75"
                />
              </svg>
            </SvgIcon>
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, pl: 1 }}
            >
              Razor
            </Typography>
          </Toolbar>
        </AppBar>

        <AppDrawer open={open} toggleDrawer={toggleDrawer} />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container
            maxWidth={false}
            sx={{
              flexGrow: 1,
              height: "90vh",
              overflow: "auto",
              margin: 2,
            }}
          >
            {props.children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
