import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user || !user.is_admin) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}