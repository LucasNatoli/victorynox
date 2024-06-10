import { useSelector } from "react-redux";
import { useAppNotification } from "../hooks/useAppNotification";
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert'

export function AppNotification  ()  {
  const appNotification = useSelector((state) => state.appNotifications);
  const { clearNotification } = useAppNotification();

  const handleClose = (_, reason) =>
    reason !== "clickaway" && clearNotification();

  return (
    <Snackbar
      open={appNotification.open}
      autoHideDuration={appNotification.timeout}
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={appNotification.type}
      >
        {appNotification.message}
      </Alert>
    </Snackbar>
  );
};
