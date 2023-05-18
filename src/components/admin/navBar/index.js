import React from "react";
import styles from "./NavBar.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/slice/authSlice";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={32} color="#fff" />
        <h4>{userName}</h4>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to={"/admin/home"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/admin/all-products"}>View Products</NavLink>
          </li>
          <li>
            <NavLink to={"/admin/add-product/ADD"}>Add Product</NavLink>
          </li>
          <li>
            <NavLink to={"/admin/order"}>View Orders</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
