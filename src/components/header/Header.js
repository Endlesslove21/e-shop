import { useContext, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import LogoutContext from "../../context/logout-context";
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
  const { isLogout, setIsLogout } = useContext(LogoutContext);

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
        setIsLogout(true);
        navigate("/");
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
              <NavLink className={activeLink} to="/login">
                Login
              </NavLink>
              <NavLink className={activeLink} to="/register">
                Register
              </NavLink>
              <NavLink className={activeLink} to="/order-history">
                My orders
              </NavLink>

              {!isLogout && (
                <NavLink onClick={logoutUser} to="/">
                  Logout
                </NavLink>
              )}
            </span>

            {/* cart */}
            {cart}
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
