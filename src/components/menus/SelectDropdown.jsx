import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectDropdown({
  title = "اختيار",
  list = [],
  stateChanger,
  defaultState = undefined
}) {
  const [item, setItem] = React.useState(defaultState);

  const handleChange = (event) => {
    setItem(event.target.value);
    if (stateChanger) stateChanger(event.target.value);
  };

  return (
    <FormControl sx={{ width: 150, backgroundColor: "white" }} size="small">
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
