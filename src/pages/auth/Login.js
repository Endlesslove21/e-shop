import React, { useContext, useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import LogoutContext from "../../context/logout-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("false");
  const { isLogout, setIsLogout } = useContext(LogoutContext);

  const navigate = useNavigate();

  console.log(isLoading);

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        setIsLoading(false);
        toast.success("Login successful...");
        navigate("/");
        setIsLogout(false);
      })
      .catch((error) => {
        setIsLoading(false);

        toast.error(error.message);
      });
  };

  // login wwith google account
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("Login successfully");
        navigate("/");
        setIsLogout(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="login" width="400" />
        </div>

        {/* form  */}
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>

            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="--btn --btn-primary --btn-block" type="submit">
                Login
              </button>

              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>

            <button
              onClick={signInWithGoogle}
              className="--btn --btn-danger --btn-block"
            >
              <FaGoogle color="#fff" /> Login With Google
            </button>

            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
