import React from "react";
import { Outlet } from "react-router-dom";

export default function TeacherPageLayout() {
  return (
    <>
      <div>TeacherPage</div>
      <Outlet />
    </>
  );
}
