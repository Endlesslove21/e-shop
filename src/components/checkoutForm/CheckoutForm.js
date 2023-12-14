import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.scss";
import Card from "../card";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import spinnerImg from "../../assets/spinner.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectUserID } from "../../redux/slice/authSlice";
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlide";
import { selectShippingAddress } from "../../redux/slice/checkoutSlice";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART());
      toast.success("Order Saved");
      navigate("/checkout-success");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/checkout-success",
        },
        redirect: "if_required",
      })
      .then((result) => {
        //ok result payment intent bad -err
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent.status === "succeeded") {
          setIsLoading(false);
          toast.success("Payment successful");
          saveOrder();
        }
      });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <Card cardClass={styles.card}>
            <CheckoutSummary />
          </Card>
          <Card cardClass={`${styles.card} ${styles.pay}`}>
            <h3>Stripe Checkout</h3>
            <PaymentElement
              id={styles["payment-element"]}
              options={paymentElementOptions}
            />
            <button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              className={styles.button}
            >
              <span id="button-text">
                {isLoading ? (
                  <img
                    src={spinnerImg}
                    alt="loading..."
                    style={{ width: "20px" }}
                  />
                ) : (
                  "Pay now"
                )}
              </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id={styles["payment-message"]}>{message}</div>}
          </Card>
        </form>
      </div>
    </section>
  );
};
export default CheckoutForm;
