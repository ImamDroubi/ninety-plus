import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectDropdown({
  title = "اختيار",
  list = [],
  stateChanger,
  width = 150,
}) {
  const [item, setItem] = React.useState("");
  const handleChange = (event) => {
    setItem(event.target.value);
    if (stateChanger) stateChanger(event.target.value);
  };
  if (!list) return;
  return (
    <FormControl sx={{ width: width, backgroundColor: "white" }} size="small">
      <InputLabel id="demo-select-small-label">{title}</InputLabel>
      <Select
        sx={{ borderRadius: "0px" }}
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={item}
        label="item"
        onChange={handleChange}
      >
        {list.map((menuItem, key) => {
          return (
            <MenuItem key={key} value={menuItem}>
              {menuItem.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
