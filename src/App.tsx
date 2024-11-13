import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./ui/AppLayout";
import {
  Login,
  PageNotFound,
  ProjectDetail,
  Projects,
  SignUp,
  Tasks,
  Teams,
} from "./pages";
import ErrorPage from "./pages/ErrorPage";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "./features/auth/authSlice";
import { Toaster as Toaster2 } from "./components/ui/sonner";
import { useEffect } from "react";
import { receiveSocket } from "./app/socketSlice";
import { SocketEvent } from "./constant";
import { AppDispatch } from "./app/store";

function App() {
  const queryClient = new QueryClient();
  const user = useSelector(selectAuth).user;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(receiveSocket({ event: SocketEvent.USER_NOT_FOUND }));
    dispatch(receiveSocket({ event: SocketEvent.NOTIFY_USER }));
    dispatch(receiveSocket({ event: SocketEvent.ERROR }));
    dispatch(receiveSocket({ event: SocketEvent.ACCPEPT_INVITE }));
    dispatch(receiveSocket({ event: SocketEvent.REFUSE_INVITE }));
  }, [dispatch]);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />} errorElement={<ErrorPage />}>
            <Route
              path="/"
              element={
                user !== null ? (
                  <Navigate to={"/your-tasks?page=1&time=deadline&type=all"} />
                ) : (
                  <Navigate to={"/login"} />
                )
              }
            />

            <Route path="/your-projects" element={<Projects />} />
            <Route
              path="/your-projects/:projectId"
              element={<ProjectDetail />}
            />
            <Route path="/your-tasks" element={<Tasks />} />
            <Route path="/your-teams" element={<Teams />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
        <Toaster position="top-center" reverseOrder={false} gutter={8} />
        <Toaster2 />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
