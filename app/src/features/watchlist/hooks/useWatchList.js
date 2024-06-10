import { useEffect, useState } from "react";
import { useBackdrop, useAppNotification } from "../../";
import { useGetFavoritesQuery } from "../../api/restApiSlice";
import { useGetDayTickerQuery } from "../../api/binanceSlice";


export const useWatchList = () => {
  const { isBackdropOpen } = useBackdrop();
  const { showSnackMsg } = useAppNotification();
  const [favs, setFavs] = useState([])
  const [open, setOpen] = useState(false)

  const { data, isLoading, isError, isSuccess, error } = useGetFavoritesQuery()
  
  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  useEffect(() => {
    if (isSuccess) setFavs(data)
  }, [isSuccess])

  useEffect(() => {
    isBackdropOpen({ open: isLoading });
  }, [isLoading]);

  useEffect(() => {
    isError &&
      showSnackMsg({
        message: error?.originalStatus === 403 ? "Forbidden" : "Server error",
        type: "error",
      });
  }, [isError]);

  return {
    data, isSuccess, open, show, hide, //ticker 
  }

}