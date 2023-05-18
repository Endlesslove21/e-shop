import React from "react";
import styles from "./Admin.module.scss";
import NavBar from "../../components/admin/navBar";
import { Route, Routes } from "react-router-dom";
import Home from "../../components/admin/home";
import ViewProducts from "../../components/admin/viewProducts";
import AddProduct from "../../components/admin/addProduct";
import Orders from "../../components/admin/orders";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <NavBar />
      </div>

      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="order" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
