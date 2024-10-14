import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AuthState {
  accessToken: string | null;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    photo: {
      path: string;
    };
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
          firstName: string;
          lastName: string;
          photo: { path: string };
        } | null;
      },
    ) => {
      if (!action.payload) {
        state.user = null;
        return;
      }
      const {
        id,
        firstName,
        lastName,
        photo: { path },
      } = action.payload;
      const user = {
        id,
        firstName,
        lastName,
        photo: {
          path,
        },
      };
      state.user = user;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});
export const { setAccessToken, setCurrentUser, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
