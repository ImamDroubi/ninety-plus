import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { BellIcon, MessageIcon, TeacherIcon } from "../icons/icons";
import { Badge } from "@mui/material";
import Box from "@mui/material/Box";

export default function AccountAvatarMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationsCount, setNotificationsCount] = React.useState(2);
  const [messagesCount, setMessagesCount] = React.useState(3);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          gap: "10px",
        }}
      >
        {/* add other badges here */}
        <Badge
          color="primary"
          className="text-xl text-gray-700"
          badgeContent={notificationsCount}
        >
          <BellIcon />
        </Badge>
        <Badge
          color="primary"
          className="text-xl text-gray-700"
          badgeContent={messagesCount}
        >
          <MessageIcon />
        </Badge>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 40, height: 40 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            scale: "-1 1", // this flips the direction of the menu
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            ">*": {
              scale: "-1 1", // this flips the content of the mune back
            },
            "&::before": {
              // this is the pointer triangle
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 24,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* All menu items here  */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <TeacherIcon />
          </ListItemIcon>
          الملف الشخصي
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          الإعدادات
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          تسجيل الخروج
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
