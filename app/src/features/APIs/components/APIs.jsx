import { useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useAddApiMutation, useGetApisQuery } from "../../api/restApiSlice";
import { APIDialog } from "./APIDialog";
import { FabAdd } from "../../ui/components/FabAdd";

export function APIs() {
  const [open, setOpen] = useState(false);
  const { data: apis, isLoading, isError, isSuccess } = useGetApisQuery();
  const [addApi, { isApisLoading }] = useAddApiMutation();

  const newApiShow = () => setOpen(true);
  const newApiHide = () => setOpen(false);

  async function submitApi(api) {
    try {
      const payload = await addApi(api).unwrap();
      newApiHide();
      console.log(payload);
    } catch (error) {
      console.error(err);
    }
  }

  return (
    <>
      <Typography variant="h4">APIs</Typography>
      {isLoading && <h3>loading</h3>}
      {isError && <h3>error</h3>}
      {isSuccess && (
        <List sx={{ width: "100%" }}>
          {apis.map((w) => (
            <ListItem
              key={w.t}
              secondaryAction={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            >
              <ListItemText primary={w.n} />
              <Switch
                edge="end"
                //onChange={handleToggle('wifi')}
                checked={true}
              />
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}

      <FabAdd onClick={newApiShow} />

      <APIDialog
        open={open}
        handleClose={newApiHide}
        handleSubmit={submitApi}
      />
    </>
  );
}
