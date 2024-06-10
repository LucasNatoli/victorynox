import { useDispatch } from "react-redux";
import { BackdropActions } from "../state/BackdropSlice";

export const useBackdrop = () => {
  const dispatch = useDispatch();

  const isBackdropOpen = (open) => {
    dispatch(BackdropActions.isBackdropOpen(open));
  };

  return { isBackdropOpen };
};