import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

import soketReducer from "./socketSlice";
import roomCallingReducer from "./roomCallingSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: soketReducer,
    roomCalling: roomCallingReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
