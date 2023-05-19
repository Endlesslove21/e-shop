import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import Slider from "../../components/slider";
import Product from "../../components/product";
const Home = () => {
  const url = window.location.href;

  const scrollToProduct = () => {
    if (url.includes("#products")) {
      window.scrollTo({
        top: 700,
        behavior: "smooth",
      });
      return;
    }
  };

  // useEffect(() => {
  //   scrollToProduct();
  // }, []);
  return (
    <div>
      {/* <Slider /> */}
      <Product />
    </div>
  );
};

export default Home;
