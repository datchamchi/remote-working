import { useDispatch, useSelector } from "react-redux";

import { HeaderTask, TaskNavigate } from "../features/tasks";
import { useEffect } from "react";
import { connectToSocket } from "@/app/socketSlice";
import { AppDispatch } from "@/app/store";
import { selectAuth, setAccessToken, setCurrentUser } from "@/app/authSlice";

const Tasks = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("accessToken");
    const userData = params.get("user");
    if (!token || !userData) return;

    const user = JSON.parse(decodeURIComponent(userData));
    // Save to localStorage
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(connectToSocket(token));
    // Update Redux state
    dispatch(setCurrentUser(user));
    dispatch(setAccessToken(token));
  }, [dispatch]);

  const currentUser = useSelector(selectAuth).user;

  if (!currentUser) return;
  return (
    <div className="flex flex-1 flex-col gap-4">
      <HeaderTask user={currentUser} />
      <TaskNavigate />
    </div>
  );
};

export default Tasks;
