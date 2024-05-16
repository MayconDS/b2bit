import { Navigate } from "react-router-dom";
import { RouteProps } from "./types";

export default function PrivateRouter({ children }: RouteProps) {
  const userAuth = localStorage.getItem("tokens");
  return userAuth ? children : <Navigate to={"/login"} />;
}
