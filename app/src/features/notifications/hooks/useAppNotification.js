import { useDispatch } from "react-redux";
import { AppNotificationActions } from "../state/AppNotificationsSlice";

export const useAppNotification = () => {
  const dispatch = useDispatch();

  const showSnackMsg = (notification) => {
    dispatch(AppNotificationActions.addNotification(notification));
  };

  const clearNotification = () => {
    dispatch(AppNotificationActions.clearNotification());
  };

  return { showSnackMsg, clearNotification };
};
