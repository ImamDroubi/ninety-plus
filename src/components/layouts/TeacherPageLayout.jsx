
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../menus/Sidebar";
import AccountAvatarMenu from "../menus/AccountAvatarMenu";
import { teacherPageList } from "../data/teacherPageList";
import MenuDrawer from "../menus/MenuDrawer";
import HamburgerMenuOpenner from "../other/HamburgerMenuOpenner";
import { useAuth } from "../../contexts/AuthContext";
import { CircularProgress } from "@mui/material";
import { UserProfileProvider } from "../../contexts/UserProfileContext";
export default function TeacherPageLayout() {
  const { currentUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleOpenSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      if (currentUser.roles.indexOf("instructor") == -1) {
        navigate("/");
      }
    }
  }, [currentUser]);
  if (!currentUser) return <CircularProgress />;
  return (
    <>
      <div className="flex">
        <div className="sidebar sticky right-[0] top-[0] hidden lg:block w-2/12 bg-gray-900 h-[100vh]">
          <Sidebar list={teacherPageList} />
        </div>
        <div className="lg:hidden fixed z-10">
          <MenuDrawer
            listItems={teacherPageList}
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
          <UserProfileProvider>
            <Outlet />
          </UserProfileProvider>
        </div>
      </div>
    </>
  );
}
