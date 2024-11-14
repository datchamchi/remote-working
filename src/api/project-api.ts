import { Project } from "@/types/project.type";
import axiosInstance from "./axiosInstance";
import { ResponseError, ResponseSuccess } from "@/types/response.type";
import { CreateProjectDto } from "@/dto/ProjectDto";
import { AxiosError } from "axios";

export async function fetchAllProject(): Promise<Project[]> {
  const res = await axiosInstance.get(`/api/projects`, {
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
