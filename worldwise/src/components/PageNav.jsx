//
//
//
//
//

import { NavLink } from "react-router-dom";
import styles from "../Styles/PageNav.module.css";
import btnStyles from "../Styles/Button.module.css";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <>
      <nav className={styles.nav}>
        <Logo />
        <ul>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={`${btnStyles.btn} ${btnStyles.primary} `}
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

// let's say we have a app navigation , do we need always to include it
// in all page components ?
