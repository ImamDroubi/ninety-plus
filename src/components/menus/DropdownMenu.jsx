import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function DropdownMenu({ list, children, small = false }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (callback) => {
    setAnchorEl(null);
    if (callback) callback();
  };

  return (
    <div>
      <div
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {children}
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {list?.map((item, ind) => {
          return (
            <MenuItem
              sx={small ? { fontSize: "14px" } : null}
              key={ind}
              onClick={() => handleClose(item.callback)}
            >
              {item.text}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
