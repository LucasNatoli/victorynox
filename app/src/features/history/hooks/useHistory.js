import { useEffect, useState } from "react";
import { useBackdrop, useAppNotification } from "../../";
import {
  useGetHistoryQuery,
  useImportKlinesMutation,
} from "../../api/restApiSlice";


export const useHistory = () => {

  const { isBackdropOpen } = useBackdrop();
  const { showSnackMsg } = useAppNotification();
  const { data, isLoading, isError, isSuccess, error } = useGetHistoryQuery();

  const [importKlines, { isImportLoading }] = useImportKlinesMutation();
  const [open, setOpen] = useState(false);

  const showImportDialog = () => setOpen(true);
  const hideImportDialog = () => setOpen(false);

  useEffect(() => {
    //TODO: Revisar por qué no cambiar de valor isImportLoading (siempre undefined y no se muestra el backdrop durante el import de archivos)
    const open = (isLoading) || (isImportLoading === true) //isImportLoading puede valer undefined
    isBackdropOpen({ open });
  }, [isLoading, isImportLoading]);

  useEffect(() => {
    isError &&
      showSnackMsg({
        message: error?.originalStatus === 404 ? "Not found" : "Server error",
        type: "error",
      });
  }, [isError]);

  async function handleImportSubmit(data) {
    try {
      const payload = await importKlines(data).unwrap();
      hideImportDialog();
      console.log(payload);
    } catch (error) {
      console.error(err);
    }
  }

  return { data, handleImportSubmit, hideImportDialog, isSuccess, open, showImportDialog };
};