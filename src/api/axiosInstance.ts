import axios, { AxiosError } from "axios";
import store from "../app/store";
import { setAccessToken, setCurrentUser } from "@/app/authSlice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL_BACKEND,
  withCredentials: true,
});
axiosInstance.interceptors.request.use((config) => {
  const {
    auth: { accessToken },
  } = store.getState();
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
// axiosInstance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   async function (error: AxiosError) {
//     // if (error.response?.status === 403) {
//     //   try {
//     //     const response = await axios.get(
//     //       `${import.meta.env.VITE_URL_BACKEND}/api/auth/refresh`,
//     //       {
//     //         withCredentials: true,
//     //       },
//     //     );

//     //     const { accessToken } = response.data;
//     //     localStorage.setItem("accessToken", accessToken);
//     //     const config = error.config;
//     //     if (accessToken && config) {
//     //       store.dispatch(setAccessToken(accessToken));
//     //       config.headers.Authorization = `Bearer ${accessToken}`;
//     //       return axiosInstance.request(config);
//     //     }
//     //     return Promise.reject(error);
//     //   } catch {
//     //     console.log("Error when get new access Token");
//     // localStorage.clear();
//     // store.dispatch(setAccessToken(null));
//     // store.dispatch(setCurrentUser(null));
//     // }
//     // }
//   },
// );
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error: AxiosError) {
    console.log(error);
    if (error.response?.status === 403) {
      localStorage.clear();
      store.dispatch(setAccessToken(null));
      store.dispatch(setCurrentUser(null));
      return;
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
