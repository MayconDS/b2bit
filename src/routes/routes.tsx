import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Login from "../pages/login";
import Profile from "../pages/profile";
import RedirectRoute from "./RedirectRouter";

export default function Routering() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectRoute>
              <Login />
            </RedirectRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRouter>
              <Profile />
            </PrivateRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
