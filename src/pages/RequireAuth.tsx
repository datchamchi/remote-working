import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuth } from "../features/auth/authSlice";

export default function RequireAuth() {
  const user = useSelector(selectAuth).user;
  console.log("Hello");
  console.log(user);
  if (user) {
    return <Outlet />;
  }

  window.location.pathname = "/login";
  return <Navigate to="/login" />;
}
