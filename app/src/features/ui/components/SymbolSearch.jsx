import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import TextField from "@mui/material/TextField";

import { useSymbolSearch } from "../hooks/useSymbolSearch";

export function SymbolSearch({ open, hide, selected }) {
  const { data, isSuccess, search } = useSymbolSearch();
  const symbolChange = (e) => search(e.target.value);
  const styles = {
    sx: {
      minHeight: "80%",
      maxHeight: "80%",
    },
  };

  return (
    <Dialog
      open={open}
      onClose={hide}
      fullWidth
      maxWidth={"xs"}
      PaperProps={styles}
    >
      <DialogTitle>Buscar Simbolo</DialogTitle>
      <DialogContent>
        <TextField fullWidth onChange={symbolChange} />
        <List>
          {isSuccess &&
            data.map((s) => (
              <ListItemButton onClick={_ => selected(s)}>
                <ListItemAvatar>
                  <Avatar
                    alt={s}
                    src={`https://coinicons-api.vercel.app/api/icon/${s.asset.toLowerCase()}`}
                  />
                </ListItemAvatar>
                <ListItemText primary={s.symbol} />
              </ListItemButton>
            ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
