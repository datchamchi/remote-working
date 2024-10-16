import { ResponseError, ResponseSuccess } from "@/types/response.type";
import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";
import { Task } from "@/types/task.type";
import { CreateTaskDto } from "@/dto/TaskDto";

export async function fetchAllTasks(projectId: string): Promise<Task[]> {
  try {
    const res = await axiosInstance.get(`/api/projects/${projectId}/tasks`, {
      headers: { "Content-Type": "application/json" },
    });
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

export async function addTask(input: CreateTaskDto): Promise<Task[]> {
  try {
    const res = await axiosInstance.post(
      `/api/projects/${input.projectId}/tasks`,
      input,
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
