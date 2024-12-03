import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  connectToSocket,
  disconnectFromSocket,
  selectSocket,
} from "@/app/socketSlice";
import { AppDispatch } from "@/app/store";
import { selectAuth, setAccessToken, setCurrentUser } from "@/app/authSlice";

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
    }
    return () => {
      if (connectionStatus === "connect") {
        dispatch(disconnectFromSocket());
      }
    };
  }, [accessToken, user, dispatch, navigate, currentUser, connectionStatus]);

  return (
    <div className="grid h-screen grid-cols-6">
      <div className="col-span-1 h-screen">
        <Sidebar currentUser={currentUser} />
      </div>
      <div className="col-span-5 flex h-screen flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
