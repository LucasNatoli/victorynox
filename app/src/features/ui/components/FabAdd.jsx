import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export function FabAdd({ onClick }) {
  const style = {
    margin: 0,
    top: 'auto',
    right: 25,
    bottom: 25,
    left: 'auto',
    position: 'fixed',
};

  return (
  
      <Fab style={style} color="primary" onClick={onClick}>
        <AddIcon />
      </Fab>
  );
}
