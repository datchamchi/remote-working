import { SubTask } from "@/types/subTask.type";
import axiosInstance from "./axiosInstance";
import { ResponseError, ResponseSuccess } from "@/types/response.type";
import { AxiosError } from "axios";

export async function addSubTask(input: {
  taskKey: string;
  name: string;
}): Promise<SubTask> {
  try {
    const { name, taskKey } = input;
    const res = await axiosInstance.post(
      `/api/tasks/${taskKey}/subtasks`,
      { name },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    const response: ResponseSuccess = res.data;
    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      const response: ResponseError = err.response?.data;
      throw new Error(response.message.toString() || "An error occurred");
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
}

export async function updateSubTask(input: {
  taskKey: string;
  subTaskId: number;
  name: string;
  status: string;
}): Promise<SubTask> {
  try {
    console.log(input);
    const { subTaskId, name, status, taskKey } = input;
    const res = await axiosInstance.patch(
      `/api/tasks/${taskKey}/subtasks/${subTaskId}`,
      { name, status },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    const response: ResponseSuccess = res.data;
    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      const response: ResponseError = err.response?.data;
      throw new Error(response.message.toString() || "An error occurred");
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
}

export async function deleteSubTask(input: {
  taskKey: string;
  subTaskId: number;
}): Promise<SubTask> {
  try {
    const { subTaskId, taskKey } = input;
    const res = await axiosInstance.delete(
      `/api/tasks/${taskKey}/subtasks/${subTaskId}`,
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    const response: ResponseSuccess = res.data;
    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      const response: ResponseError = err.response?.data;
      throw new Error(response.message.toString() || "An error occurred");
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
}
