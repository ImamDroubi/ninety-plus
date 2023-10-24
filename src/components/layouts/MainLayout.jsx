import { Outlet } from "react-router-dom";
import TopBar from "../menus/TopBar";
import Header from "../other/Header";

export default function MainLayout() {
  return (
    <>
      <TopBar/>
      <Header/>
      <Outlet />
    </>
  )
}
