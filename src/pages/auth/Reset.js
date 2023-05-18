import React, { useState } from "react";
import Card from "../../components/card";
import { Link, useNavigate } from "react-router-dom";
import resetImg from "../../assets/forgot.png";
import styles from "./auth.module.scss";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();
  const resetPassword = (e) => {
    e.preventDefault();
    setisLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setisLoading(false);
        toast.success("Password email sent");
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setisLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}

      <section className={`container ${styles.auth}`}>
        {/* img */}
        <div className={styles.img}>
          <img src={resetImg} alt="login" width="400" />
        </div>

        {/* form  */}
        <Card>
          <div className={styles.form}>
            <h2>Reset Password</h2>

            <form>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                onClick={resetPassword}
                className="--btn --btn-primary --btn-block"
              >
                Reset Password
              </button>

              <div className={styles.links}>
                <p>
                  <Link to="/login">Login</Link>
                </p>
                <p>
                  <Link to="/register">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Reset;
