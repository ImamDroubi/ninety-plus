import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../menus/Sidebar";
import AccountAvatarMenu from "../menus/AccountAvatarMenu";
import MenuDrawer from "../menus/MenuDrawer";
import HamburgerMenuOpenner from "../other/HamburgerMenuOpenner";
import { adminPageList } from "../data/adminPageList";
import { CircularProgress } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
const AdminDashboard = () => {
  const { currentUser, fetchingUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleOpenSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      if (currentUser.roles.indexOf("admin") == -1) {
        navigate("/");
      }
    }
  }, [currentUser]);
  if (fetchingUser) return <CircularProgress />;
  return (
    <>
      <div className="flex">
        <div className="sidebar sticky right-[0] top-[0] hidden lg:block w-2/12 bg-gray-900 h-[100vh]">
          <Sidebar list={adminPageList} />
        </div>
        <div className="lg:hidden fixed z-10">
          <MenuDrawer
            listItems={adminPageList}
            side="right"
            onClickFunction={toggleOpenSidebar}
          >
            {!sidebarOpen && <HamburgerMenuOpenner />}
          </MenuDrawer>
        </div>
        <div className="content w-full bg-gray-50">
          <div className="top w-full bg-gray-white">
            <section className="flex w-full md:w-[90%] m-auto justify-between items-center py-1">
              <div className="title px-2 md:px-[0px]">
                <h2 className="font-bold text-xl">لوحة التحكم</h2>
              </div>
              <div className="user-info">
                <AccountAvatarMenu />
              </div>
            </section>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
