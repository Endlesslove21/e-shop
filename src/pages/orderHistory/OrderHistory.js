import React, { useEffect } from "react";
import styles from "./OrderHistory.module.scss";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_ORDERS, selectOrderHistory } from "../../redux/slice/orderSlice";
import { selectUserID } from "../../redux/slice/authSlice";
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);
  useEffect(() => {
    dispatch(STORE_ORDERS(data));

    return () => {};
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/orderDetails/${id}`);
  };

  const filterOrders = orders.filter((order) => order.userID === userID);

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>Your Order History</h2>
        <p>Open an order to leave a Product Review</p>
        <br></br>

        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {filterOrders.length === 0 ? (
              <p>No orders found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filterOrders.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;

                    return (
                      <tr key={id} onClick={() => handleClick(id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>
                          {"$"}
                          {orderAmount}
                        </td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Delivered"
                                ? `${styles.pending}`
                                : `${styles.delivered}`
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </section>
  );
};

export default OrderHistory;
