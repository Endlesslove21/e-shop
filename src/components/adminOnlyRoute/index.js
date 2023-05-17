import React from "react";
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";

const AdminOnlyRoute = () => {
  const userEmail = useSelector(selectEmail);

  return <div>AdminOnlyRoute</div>;
};

export default AdminOnlyRoute;
