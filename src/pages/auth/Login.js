import React from "react";

import styles from "./auth.module.scss";

const Login = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <image src="../../assets/login.png" alt="Login" />
      </div>

      <div className={styles.form}>
        <h2>Login</h2>

        <form>
          <input type="text" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          <button className="--btn">Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
