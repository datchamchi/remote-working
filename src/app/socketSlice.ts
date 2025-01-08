/* eslint-disable @typescript-eslint/no-explicit-any */
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
    console.log("Disconnect socket: " + socketClient.getId());
    await socketClient.disconnect();
  },
);

export const emitSocket = createAsyncThunk(
  "socket/emitSocket",
  async (payload: { event: string; data: any }) => {
    console.log("Send socket");
    try {
      await socketClient.emit(payload.event, payload.data);
    } catch (err) {
      console.log(err);
    }
  },
);
export const receiveSocket = createAsyncThunk(
  "socket/receiveSocket",
  async (payload: { event: string; refetchData?: () => void }) => {
    try {
      const { event, refetchData } = payload;
      await socketClient.on(event, (data: DataType) => {
        const { content, title } = data;
        console.log("Receive");
        if (refetchData) {
          setTimeout(refetchData, 2500);
        }

        toast.info(title, {
          duration: 2000,
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
export const receiveSendImageSuccess = createAsyncThunk(
  "socket/sendImageSuccess",
  async (payload: { event: string; refetchData?: () => void }) => {
    const { event, refetchData } = payload;
    await socketClient.on(event, () => {
      if (refetchData) refetchData();
    });
  },
);
export const receiveCallSocket = createAsyncThunk(
  "socket/receiveCallSocket",
  async (payload: {
    event: string;
    navigate: (url: string) => void;
    refetchData?: () => void;
  }) => {
    try {
      const { event, navigate, refetchData } = payload;
      socketClient.on(event, (data) => {
        const { content, title } = data;
        if (refetchData) setTimeout(refetchData, 2500);
        toast.info(title, {
          duration: 4000,
          action: {
            label: "Join now",
            onClick: () => {
              // toast.dismiss(toastId);
              navigate(`/your-teams/${content}/calling`);
            },
          },
        });
      });
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
