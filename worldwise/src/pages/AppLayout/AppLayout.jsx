//
//

import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Map from "../../components/Map/Map.jsx";
import styles from "./AppLayout.module.css";
import User from "../../components/UserInfo/User.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
