import { useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import ReceiptIcon from "@mui/icons-material/Receipt";

import { FabAdd } from "../../ui/components/FabAdd";

import { useGetAssetsQuery } from "../../api/restApiSlice";
import { useAppNotification } from "../../notifications/hooks/useAppNotification";
import knife from "../../../assets/knife.svg";

export function Portfolio() {
  const { data, isLoading, isError, isSuccess, error } = useGetAssetsQuery();

  console.log(knife)
  const addAssetShow = (_) => {
    alert("hola");
  };
  const { showSnackMsg } = useAppNotification();

  //TODO: Agregar control 403 -> Login
  useEffect(() => {
    if (isError) {
      console.log(error);
      showSnackMsg({
        message: error?.originalStatus === 403 ? "Forbidden" : "Server error",
        type: "error",
      });
    }
  }, [isError]);

  return (
    <>
      <Typography variant="h4">Portfolio</Typography>
      {isSuccess && (
        <List sx={{ width: "100%" }}>
          {data.map((a) => (
            <ListItem key={a}>
              <ListItemText primary={a} />
              <IconButton>
                <ReceiptIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
      <FabAdd onClick={addAssetShow} />
    </>
  );
}
