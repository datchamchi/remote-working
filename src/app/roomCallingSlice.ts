import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: number[] = [];

const RoomCalling = createSlice({
  name: "roomcalling",
  initialState,
  reducers: {
    addRoomCalling: (state, action: { payload: number }) => {
      console.log(action.payload);
      if (state.includes(action.payload)) return;
      state = [...state, action.payload];
    },
    removeRoomCalling: (state, action: { payload: number }) => {
      state = state.filter((id) => id !== action.payload);
    },
  },
});
export default RoomCalling.reducer;
export const { addRoomCalling, removeRoomCalling } = RoomCalling.actions;
export const selectRoomCalling = (state: RootState) => state.roomCalling;
