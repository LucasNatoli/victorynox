import { useSelector } from "react-redux";
import { useBackdrop } from "../hooks/useBackdrop";
import MuiBackdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export function Backdrop() {
  const backdrop = useSelector(state=>state.backdrop)
  return (
    <MuiBackdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={backdrop.open}
    >
      <CircularProgress color="inherit" />
    </MuiBackdrop>
  );
}
