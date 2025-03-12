//
//
//
//
//

import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

export default function Navbar() {
  const { nav, navList, navItem, navLink, active } = styles;

  return (
    <>
      <nav className={nav}>
        <ul className={navList}>
          <li className={navItem}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navLink} ${isActive ? active : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li className={navItem}>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `${navLink} ${isActive ? active : ""}`
              }
            >
              Pricing
            </NavLink>
          </li>
          <li className={navItem}>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                `${navLink} ${isActive ? active : ""}`
              }
            >
              Product
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
