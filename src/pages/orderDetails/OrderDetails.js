import React, { useEffect, useState } from "react";
import styles from "./OrderDetails.module.scss";
import spinnerImg from "../../assets/spinner.jpg";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../customHooks/useFetchDocument";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { document } = useFetchDocument("orders", id);

  console.log(document);
  useEffect(() => {
    setOrder(document);
    console.log(document);
  }, [document]);

  console.log(order);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Order Details</h2>
        <div>
          <Link to="/order-history">Back to Order</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Order ID</b> {order.id}
            </p>
            <p>
              <b>Order Amount</b> {order.orderAmount}
            </p>
            <p>
              <b>Order Status</b> {order.orderStatus}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>{" "}
                          <img
                            src={imageURL}
                            alt={name}
                            style={{ width: "100px" }}
                          />
                        </p>
                      </td>
                      <td>{price}</td>
                      <td>{cartQuantity}</td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <Link to={`/review-product/${id}`}>
                          <button className="--btn --btn-primary">
                            Review Product
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
