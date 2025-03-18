import styles from "./sidebar.module.css";
import Logo from "../Logo/Logo.jsx";
import Footer from "../SideBarFooter/Footer.jsx";
import { Outlet } from "react-router-dom";
import AppNav from "../AppNavbar/AppNav.jsx";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />
      {/* <p>👋 Add your first city by clicking on a city on the map</p> */}

      <Footer />
    </div>
  );
}

export default Sidebar;
