import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { TeacherIcon } from "../icons/icons";
import Box from "@mui/material/Box";
import MessagesMenu from "./MessagesMenu";
import NotificationsMenu from "./NotificationsMenu";
import { useAuth } from "../../contexts/AuthContext";
import useLogout from "../../apiCalls/authCalls/useLogout";

export default function AccountAvatarMenu() {
  const { currentUser, setAccessToken, logout } = useAuth();
  const logoutController = useLogout();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {}, [currentUser]);
  if (currentUser == undefined) return null;

  const handleLogout = async () => {
    try {
      const res = await logoutController.mutateAsync();
      logout();
      handleClose();
    } catch (error) {}
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
        {/* Prvide a count for the notifications */}
        <NotificationsMenu />
        {/* provide a count for the messages  */}
        <MessagesMenu />

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              alt={currentUser.first_name}
              sx={{ width: 40, height: 40 }}
              src={currentUser.profile_image}
            />
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
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          تسجيل الخروج
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
