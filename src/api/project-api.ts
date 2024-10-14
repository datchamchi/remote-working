import { Project } from "@/types/project.type";
import axiosInstance from "./axiosInstance";
import { GetAllProjectSuccess } from "@/types/response.type";

export async function fetchAllProject(page: string): Promise<Project[]> {
  const res = await axiosInstance.get(`/api/projects?page=${page}`, {
    headers: { "Content-Type": "application/json" },
  });
  const response: GetAllProjectSuccess = res.data;
  return response.data;
}
