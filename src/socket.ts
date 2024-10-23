import { Socket, io } from "socket.io-client";
import { DataType } from "./types/socket.type";

class SocketClient {
  socket: Socket | null;

  constructor() {
    this.socket = null;
  }
  getId() {
    return this.socket?.id ?? "";
  }
  connect(token: string) {
    this.socket = io(import.meta.env.VITE_URL_BACKEND, {
      transportOptions: {
        polling: {
          extraHeaders: { Authorization: token },
        },
      },
    });
    return new Promise<void>((resolve, reject) => {
      this.socket?.on("connection", () => {
        console.log("UserId: " + this.socket?.id);
        resolve();
      });
      this.socket?.on("connect_error", (error) => {
        reject(error);
      });
    });
  }

  disconnect() {
    return new Promise<void>(() => {
      this.socket?.disconnect();
    });
  }

  emit(event: string, data: DataType) {
    return new Promise<void>((resolve, reject) => {
      if (!this.socket) return reject(new Error("No socket connection."));
      try {
        this.socket.emit(event, data);
        resolve();
      } catch (err: unknown) {
        if (err instanceof Error) return reject(err);
        return reject(new Error("Unexpected server error"));
      }
    });
  }

  on(event: string, fun: (data: DataType) => void) {
    return new Promise<void>((resolve, reject) => {
      if (!this.socket) return reject(new Error("No socket connection."));
      this.socket.on(event, fun);

      resolve();
    });
  }
}

const socketClient = new SocketClient();
export default socketClient;
