import { useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import { FabAdd } from "../../ui/components/FabAdd";

import { useGetPortfolioQuery } from "../../api/restApiSlice";
import { useAppNotification } from "../../notifications/hooks/useAppNotification";
import knife from "../../../assets/knife.svg";

export function Portfolio() {
  const { data, isLoading, isError, isSuccess, error } = useGetPortfolioQuery();
  const [hideLow, setHideLow] = useState(true);
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
      <FormControlLabel
        control={
          <Switch
            name="hideLowBal"
            checked={hideLow}
            onChange={() => setHideLow(!hideLow)}
          />
        }
        label="Esconder balances < 1 USD"
      />

      {isSuccess && (
        <List sx={{ width: "100%" }}>
          {data.map((a) => {
            if (a.free >= 1 || hideLow===false) 
            return (
            <ListItem key={a.asset}>
              <ListItemText primary={a.asset} secondary={a.free} />
              <IconButton>
                <ReceiptIcon />
              </IconButton>
            </ListItem>
          )})}
        </List>
      )}
      <FabAdd />
    </>
  );
}
