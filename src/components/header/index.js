import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import AdminOnlyRoute, { AdminOnlyLink } from "../adminOnlyRoute";
const logo = (
  <Link to="/">
    <h2>
      e<span>Shop</span>.
    </h2>
  </Link>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart
      <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : ``);

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const dispatch = useDispatch();

  // monitor sign currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //custom display name to display on header
        if (!!!user.displayName) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          console.log(uName);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully");

        navigate("/login");
      })
      .catch((error) => {
        alert("No account is loggined");
      });
  };

  return (
    <header>
      <div className={styles.header}>
        <div className={styles.logo}>{logo}</div>

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            onClick={hideMenu}
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}

              <AiOutlineClose size={28} onClick={hideMenu} />
            </li>

            <li>
              <Link to={"/admin/home"}>
                <AdminOnlyLink>
                  <button className="--btn --btn-primary">Admin</button>
                </AdminOnlyLink>
              </Link>
            </li>

            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/Contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>

          <div onClick={hideMenu} className={styles["header-right"]}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink className={activeLink} to="/login">
                  Login
                </NavLink>
              </ShowOnLogout>

              <ShowOnLogin>
                <a href="#home">
                  <span
                    style={{ display: "inline-block", alignSelf: "center" }}
                  >
                    <FaUser size={16} />
                  </span>
                  Hi, {displayName}
                </a>
              </ShowOnLogin>

              <ShowOnLogin>
                <NavLink
                  style={{ marginRight: "10px" }}
                  onClick={logoutUser}
                  to="/"
                >
                  Logout
                </NavLink>
              </ShowOnLogin>

              <ShowOnLogout>
                <NavLink className={activeLink} to="/register">
                  Register
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <NavLink className={activeLink} to="/order-history">
                  My orders
                </NavLink>
              </ShowOnLogin>
            </span>

            {/* cart */}
            <ShowOnLogin>{cart}</ShowOnLogin>
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
