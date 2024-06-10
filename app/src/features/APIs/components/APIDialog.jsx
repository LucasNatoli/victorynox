import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export function APIDialog({ open, handleClose, handleSubmit }) {

  const formSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const n = data.get("n");
    const k = data.get("k");
    const s = data.get("s");
    handleSubmit({ n, k, s });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        component="form"
        onSubmit={formSubmit}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aca se desarolla la explicacion de como crear un par de claves en
            Binance. Debe indicar tambien aspectos de seguridad.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="n"
            name="n"
            label="Descripción"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="k"
            name="k"
            label="API-Key"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="s"
            name="s"
            label="API-Secret"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit"> Guardar </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
