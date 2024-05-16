import { Navigate } from "react-router-dom";
import { RouteProps } from "./types";

export default function RedirectRoute({ children }: RouteProps) {
  const isAuthenticated = localStorage.getItem("tokens");
  return isAuthenticated ? <Navigate to="/profile" /> : children;
}
