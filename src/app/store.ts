import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import soketReducer from "./socketSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: soketReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
