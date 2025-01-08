import { ResponseError, ResponseSuccess } from "@/types/response.type";
import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";
import { Task } from "@/types/task.type";
import { CreateTaskDto, UpdateTaskDto } from "@/dto/TaskDto";

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

export async function fetchTask(taskKey: string | undefined): Promise<Task> {
  try {
    const res = await axiosInstance.get(`/api/tasks/${taskKey}`, {
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

export async function fetchAllTasksByUser(
  page: number,
  time: string,
  type: string,
): Promise<Task[]> {
  try {
    const res = await axiosInstance.get(
      `/api/tasks?page=${page}&time=${time}&type=${type}`,
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

export async function fetchTotalTaskPage(
  time: string,
  type: string,
): Promise<number> {
  try {
    const res = await axiosInstance.get(
      `/api/tasks/pages?time=${time}&type=${type}`,
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

export async function updateTask(taskId: string, dto: UpdateTaskDto) {
  const { estimate, state } = dto;
  if (state === "overdue") throw new Error("Task is in overdue status");
  if (estimate && estimate < new Date()) {
    throw new Error("Invalid time");
  }
  try {
    const res = await axiosInstance.patch(`/api/tasks/${taskId}`, dto, {
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

export async function deleteTask(taskId: string) {
  try {
    const res = await axiosInstance.delete(`/api/tasks/${taskId}`, {
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
