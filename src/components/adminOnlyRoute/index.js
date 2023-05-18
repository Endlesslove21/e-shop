import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";
import { Link } from "react-router-dom";

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "hung121212@gmail.com") {
    return children;
  } else {
    return null;
  }
};
const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "hung121212@gmail.com") {
    return children;
  } else {
    return (
      <section style={{ height: "80vh" }}>
        <div className="container">
          <h2>Permission Denied.</h2>
          <p>This page can only be view by Admin user.</p>
          <br />
          <Link to="/">
            <button className="--btn">&larr; Back To Home</button>
          </Link>
        </div>
      </section>
    );
  }
};

export default AdminOnlyRoute;
