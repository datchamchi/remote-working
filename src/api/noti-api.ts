import { ResponseError, ResponseSuccess } from "@/types/response.type";
import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";
import { Notify } from "@/types/notify.type";

export async function fetchNoti(): Promise<Notify[]> {
  try {
    const res = await axiosInstance.get(`/api/notify`, {
      headers: { "Content-Type": "application/json" },
    });
    const response: ResponseSuccess = res.data;
    return response.data;
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof AxiosError) {
      const response: ResponseError = err.response?.data;
      throw new Error(response.message.toString() || "An error occurred");
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
}
export async function updateInviteNotify(input: {
  notifyId: string;
  type: string;
}) {
  const { notifyId, type } = input;
  try {
    const res = await axiosInstance.patch(
      `/api/notify/${notifyId}`,
      {
        type,
      },
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    const response: ResponseSuccess = res.data;
    return response.data;
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof AxiosError) {
      const response: ResponseError = err.response?.data;
      throw new Error(response.message.toString() || "An error occurred");
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
}
export async function updateAllInformNotify() {
  try {
    const res = await axiosInstance.patch(
      `/api/notify/readall`,
      {},
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    const response: ResponseSuccess = res.data;
    console.log(response);
    return response.data;
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof AxiosError) {
      const response: ResponseError = err.response?.data;
      throw new Error(response.message.toString() || "An error occurred");
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
}
