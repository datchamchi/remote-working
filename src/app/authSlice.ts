import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface AuthState {
  accessToken: string | null;
  user: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    photo: {
      path: string;
    } | null;
  } | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setCurrentUser: (
      state,
      action: {
        payload: {
          id: number;
          name: string;
          email: string;
          phone: string | undefined;
          photo: { path: string } | null;
        } | null;
      },
    ) => {
      if (!action.payload) {
        state.user = null;
        return;
      }
      const { id, name, photo, email, phone } = action.payload;
      const user = {
        id,
        name,
        email,
        phone,
        photo,
      };
      state.user = user;
    },
    logout: (state) => {
      localStorage.clear();
      state.accessToken = null;
      state.user = null;
    },
  },
});
export const { setAccessToken, setCurrentUser, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
