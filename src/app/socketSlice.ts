import socketClient from "@/socket";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { DataType } from "@/types/socket.type";
import { toast } from "sonner";

interface ISocket {
  connectionStatus: "connect" | "disconnect";
  information: {
    title: string;
    content: string;
  } | null;
}
const initialState: ISocket = {
  connectionStatus: "disconnect",
  information: null,
};

export const connectToSocket = createAsyncThunk(
  "connectToSocket",
  async function (token: string) {
    return await socketClient.connect(token);
  },
);

export const disconnectFromSocket = createAsyncThunk(
  "disconnectFromSocket",
  async function () {
    return await socketClient.disconnect();
  },
);

export const emitSocket = createAsyncThunk(
  "socket/emitSocket",
  async (payload: { event: string; data: DataType }) => {
    try {
      console.log(payload.event, payload.data);
      await socketClient.emit(payload.event, payload.data);
    } catch (err) {
      console.log(err);
    }
  },
);
export const receiveSocket = createAsyncThunk(
  "socket/receiveSocket",
  async (payload: { event: string }) => {
    try {
      const { event } = payload;
      await socketClient.on(event, (data: DataType) => {
        const { content, title } = data;
        toast.info(title, {
          description: content,
        });
        // if (type) dispatch({ type: `socket/${type}`, payload: data });
      });
      // return response;
    } catch (err) {
      console.log(err);
    }
  },
);
const SocketState = createSlice({
  name: "socket",
  initialState,
  reducers: {},
});

export default SocketState.reducer;
export const selectSocket = (state: RootState) => state.socket;
