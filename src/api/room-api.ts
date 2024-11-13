import { Room } from "@/types/room.type";
import axiosInstance from "./axiosInstance";
import { ResponseSuccess } from "@/types/response.type";

export async function fetchAllRooms(): Promise<Room[]> {
  const res = await axiosInstance.get(`/api/rooms`, {
    headers: { "Content-Type": "application/json" },
  });
  const response: ResponseSuccess = res.data;
  return response.data;
}
