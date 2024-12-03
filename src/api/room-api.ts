import { Room } from "@/types/room.type";
import axiosInstance from "./axiosInstance";
import { ResponseError, ResponseSuccess } from "@/types/response.type";
import { AxiosError } from "axios";
import { toast } from "sonner";

export async function fetchAllRooms(): Promise<Room[]> {
  const res = await axiosInstance.get(`/api/rooms`, {
    headers: { "Content-Type": "application/json" },
  });
  const response: ResponseSuccess = res.data;
  return response.data;
}

export async function fetchRoom(currentRoom: string | undefined) {
  if (!currentRoom) return;
  try {
    const res = await axiosInstance.get(`/api/rooms/${currentRoom}`, {
      headers: { "Content-Type": "application/json" },
    });
    const response: ResponseSuccess = res.data;
    return response.data as Room;
  } catch (err) {
    if (err instanceof AxiosError) {
      const { message } = err.response?.data as ResponseError;
      toast.error(message);
    }
  }
}
