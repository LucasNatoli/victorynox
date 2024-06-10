import MuiSwitch from "@mui/material/Switch";
import { useState } from "react";

export default function Switch({on = true}) {
  const [checked, setChecked] = useState(on);

  function handleToggle() {
    setChecked(!checked);
  }

  return (
    <MuiSwitch
      edge="end"
      onChange={handleToggle}
      checked={checked}
      inputProps={{
        "aria-labelledby": "switch-dark-mode",
      }}
    />
  );
}
