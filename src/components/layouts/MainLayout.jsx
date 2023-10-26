import { Outlet } from "react-router-dom";
import TopBar from "../menus/TopBar";
import Header from "../other/Header";
import Footer from "../other/Footer";
import FooterInfo from "../other/FooterInfo";

export default function MainLayout() {
  return (
    <>
      <TopBar/>
      <Header/>
      <Outlet />
      
      <Footer/>
    </>
  )
}
