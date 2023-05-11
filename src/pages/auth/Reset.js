import React, { useState } from "react";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import resetImg from "../../assets/forgot.png";
import styles from "./auth.module.scss";

const Reset = () => {
  const [email, setEmail] = useState("");

  return (
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

            <button className="--btn --btn-primary --btn-block">
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
  );
};

export default Reset;
