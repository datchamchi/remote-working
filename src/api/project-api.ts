import { Project } from "@/types/project.type";
import axiosInstance from "./axiosInstance";
import { ResponseError, ResponseSuccess } from "@/types/response.type";
import { CreateProjectDto } from "@/dto/ProjectDto";
import { AxiosError } from "axios";
import { Task } from "@/types/task.type";
import { User } from "@/types/user.type";

export async function fetchAllProject(): Promise<Project[]> {
  const res = await axiosInstance(`/api/projects`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const response: ResponseSuccess = res.data;

  return response.data;
}
export async function fetchProject(projectId: string) {
  try {
    const res = await axiosInstance.get(`/api/projects/${projectId}`, {
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
export async function addProject(input: CreateProjectDto) {
  try {
    const res = await axiosInstance.post("/api/projects", input, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      const response: ResponseError = err.response?.data;
      throw new Error(response.message.toString() || "An error occurred");
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
}

export async function analysProject(dto: {
  productId: string;
  type: string;
}): Promise<Task[]> {
  const res = await axiosInstance(
    `/api/projects/${dto.productId}/analys?type=${dto.type}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );
  const response: ResponseSuccess = res.data;

  return response.data;
}

export function analysMembersInProject(users: User[], tasks: Task[]) {
  const result: {
    user: string;
    todo: number;
    done: number;
    overdue: number;
    total: number;
    percentage: number;
  }[] = [];
  users.forEach((user) => {
    result.push({
      user: user.name,
      total: 0,
      done: 0,
      overdue: 0,
      todo: 0,
      percentage: 0,
    });
  });

  tasks.forEach((task) => {
    const user = result.find((u) => u.user === task.user.name);

    if (user) {
      if (task.state === "todo") {
        user.todo += 1;
      } else if (task.state === "overdue") {
        user.overdue += 1;
      } else if (task.state === "done") {
        user.done += 1;
      }
      user.total += 1;
      user.percentage = Math.round((user.done / user.total) * 100);
    }
  });

  return result;
}
