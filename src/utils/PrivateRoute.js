import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../UserContext";

const PrivateRoute = ({ isPrivate }) => {
  const { userInfo } = useContext(UserContext);
  if (isPrivate) {
    return userInfo ? <Outlet /> : <Navigate to="/" />;
  } else {
    return !userInfo ? <Outlet /> : <Navigate to="/" />;
  }
};

export default PrivateRoute;
