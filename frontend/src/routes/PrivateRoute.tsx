import React from "react";
import { Navigate } from "react-router-dom";

// Пример защищенного маршрута
interface PrivateRouteProps {
  isAuth: boolean;
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuth, children }) => {
  return isAuth ? children : <Navigate to="/" />;
};

export default PrivateRoute;