import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

export function DataFetchDialog({ open, handleClose, handleSubmit }) {
  const [interval, setInterval] = useState("");
  const [granularity, setGranularity] = useState("");
  const [importTo, setImportTo] = useState(false);

  function formSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const interval = data.get("interval");
    const granularity = data.get("granularity");
    const symbol = data.get("symbol");
    const year = data.get("year");
    const month = data.get("month");
    const day = data.get("day");
    const year2 = data.get("year2");
    const month2 = data.get("month2");
    const day2 = data.get("day2");
    handleSubmit({
      interval,
      granularity,
      symbol,
      year,
      month,
      day,
      year2,
      month2,
      day2,
    });
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        component="form"
        onSubmit={formSubmit}
        maxWidth="md"
      >
        <DialogTitle>Fetch</DialogTitle>
        <DialogContent>
          <DialogContentText>Select from to.</DialogContentText>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={4}>
              <FormControl
                fullWidth
                required
                variant="outlined"
                sx={{ marginTop: 1 }}
              >
                <InputLabel id="interval-label">Intervalo</InputLabel>
                <Select
                  labelId="interval-label"
                  id="interval"
                  name="interval"
                  label="Intervalo"
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="monthly">Mensual</MenuItem>
                  <MenuItem value="daily">Diario</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl
                fullWidth
                required
                variant="outlined"
                sx={{ marginTop: 1 }}
              >
                <InputLabel id="granularity-label">Granularidad</InputLabel>
                <Select
                  labelId="granularity-label"
                  id="granularity"
                  name="granularity"
                  label="Ganularidad"
                  value={granularity}
                  onChange={(e) => setGranularity(e.target.value)}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="15m">15m</MenuItem>
                  <MenuItem value="30m">30m</MenuItem>
                  <MenuItem value="1h">1h</MenuItem>
                  <MenuItem value="4h">4h</MenuItem>
                  <MenuItem value="1D">1D</MenuItem>
                  <MenuItem value="1W">1W</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                autoFocus
                margin="dense"
                id="symbol"
                name="symbol"
                label="Symbol"
                type="text"
                fullWidth
                variant="outlined"
                required
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                autoFocus
                margin="dense"
                id="year"
                name="year"
                label="Año"
                type="number"
                fullWidth
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                autoFocus
                margin="dense"
                id="month"
                name="month"
                label="Mes"
                type="number"
                fullWidth
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                autoFocus
                margin="dense"
                id="day"
                name="day"
                label="Día"
                type="number"
                fullWidth
                variant="outlined"
                disabled={interval !== "daily"}
                required={interval === "daily"}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                label="Importar rango"
                control={<Checkbox onClick={(_) => setImportTo(!importTo)} />}
              />
              <Divider></Divider>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                autoFocus
                margin="dense"
                id="year2"
                name="year2"
                label="Año"
                type="number"
                fullWidth
                variant="outlined"
                disabled={!importTo}
                required={importTo}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                autoFocus
                margin="dense"
                id="month2"
                name="month2"
                label="Mes"
                type="number"
                fullWidth
                variant="outlined"
                disabled={!importTo}
                required={importTo}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                autoFocus
                margin="dense"
                id="day2"
                name="day2"
                label="Día"
                type="number"
                fullWidth
                variant="outlined"
                disabled={interval !== "daily" || !importTo}
                required={interval === "daily" && importTo}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit"> Guardar </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
