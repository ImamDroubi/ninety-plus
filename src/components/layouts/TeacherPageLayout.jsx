import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../menus/Sidebar";
import Container90 from "../containers/Container90";
import { Avatar } from "@mui/material";
import AccountAvatarMenu from "../menus/AccountAvatarMenu";

export default function TeacherPageLayout() {
  return (
    <>
      <div className="flex">
        <div className="sidebar sticky right-[0] top-[0] hidden lg:block w-2/12 bg-gray-900 h-[100vh]">
          <Sidebar />
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
}
