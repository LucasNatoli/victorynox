import { useEffect, useState } from "react";
import { useGetPairsQuery } from "../../api/restApiSlice";
import { useBackdrop, useAppNotification } from "../../";

export const useSymbolSearch = () => {
  
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState([])

  const { isBackdropOpen } = useBackdrop();
  const { showSnackMsg } = useAppNotification();
  const { data, isLoading, isError, isSuccess, error } = useGetPairsQuery()

  useEffect(() => isBackdropOpen({ open: isLoading }), [isLoading]);

  useEffect(() => {
    isError &&
      showSnackMsg({
        message: error?.originalStatus === 404 ? "Not found" : "Server error",
        type: "error",
      });
  }, [isError]);

  useEffect(() => {
    if (isSuccess) setResults(data)
  }, [data])

  const show = _ => setOpen(true)
  const hide = _ => setOpen(false)

  function search(text) {
    setResults(data.filter(i=>i.includes(text.toUpperCase())))
  }
  return { data: results, hide, isLoading, isSuccess, open, search, show };
};