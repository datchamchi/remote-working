import { Outlet, useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuth,
  setAccessToken,
  setCurrentUser,
} from "../features/auth/authSlice";
import { useEffect } from "react";
import {
  connectToSocket,
  disconnectFromSocket,
  selectSocket,
} from "@/app/socketSlice";
import { AppDispatch } from "@/app/store";

const AppLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");
  const currentUser = useSelector(selectAuth).user;
  const navigate = useNavigate();
  const connectionStatus = useSelector(selectSocket).connectionStatus;
  useEffect(() => {
    if (!currentUser && user && accessToken) {
      // neu login thanh cong
      dispatch(setAccessToken(accessToken));
      dispatch(setCurrentUser(JSON.parse(user)));
      dispatch(connectToSocket(accessToken));
      // navigate("/overview");
    }
    return () => {
      if (connectionStatus === "connect") {
        dispatch(disconnectFromSocket());
      }
    };
  }, [accessToken, user, dispatch, navigate, currentUser, connectionStatus]);

  return (
    <div className="grid grid-cols-6">
      {/* <Navbar /> */}
      <div className="col-span-1">
        <Sidebar currentUser={currentUser} />
      </div>
      <div className="col-span-5 flex h-screen flex-1 px-8 pt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
