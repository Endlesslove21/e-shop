import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import InfoBox from "../../infoBox/InfoBox";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_TOTAL_ORDER_AMOUNT,
  STORE_ORDERS,
  selectOrderHistory,
  selectTotalOrderAmount,
} from "../../../redux/slice/orderSlice";
import {
  STORE_PRODUCTS,
  selectedProducts,
} from "../../../redux/slice/productSlide";
import useFetchCollection from "../../../customHooks/useFetchCollection";

const earningIcon = <AiFillDollarCircle size={30} color="#b624ff " />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} />;

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectedProducts);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);
  const orders = useSelector(selectOrderHistory);

  const fbProducts = useFetchCollection("Products");
  const { data } = useFetchCollection("Products");

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: fbProducts.data,
      })
    );
    dispatch(STORE_ORDERS(data));
    dispatch(
      CALC_TOTAL_ORDER_AMOUNT({
        amount: data,
      })
    );
  }, [dispatch, data]);

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Earnings"}
          count={`$${totalOrderAmount}`}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Products"}
          count={`${products.length}`}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Orders"}
          count={`${orders.length}`}
          icon={ordersIcon}
        />
      </div>
    </div>
  );
};

export default Home;
