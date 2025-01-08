import { Comment } from "@/types/comment.type";
import axiosInstance from "./axiosInstance";
import { ResponseError, ResponseSuccess } from "@/types/response.type";
import { AxiosError } from "axios";

export async function addComment(input: {
  projectId: string;
  taskId: string;
  content: string;
}) {
  const { content, projectId, taskId } = input;
  try {
    const res = await axiosInstance.post(
      `/api/projects/${projectId}/tasks/${taskId}/comments`,
      { content },
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

export async function getAllCommentOfTask(input: {
  projectId: string;
  taskId: string;
}): Promise<Comment[]> {
  const { projectId, taskId } = input;
  try {
    const res = await axiosInstance.get(
      `/api/projects/${projectId}/tasks/${taskId}/comments`,
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

export async function updateComment(input: {
  projectId: string;
  taskId: string;
  commentId: string;
  content: string;
}) {
  const { content, projectId, taskId, commentId } = input;
  try {
    const res = await axiosInstance.patch(
      `/api/projects/${projectId}/tasks/${taskId}/comments/${commentId}`,
      { content },
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

export async function deleteComment(input: {
  projectId: string;
  taskId: string;
  commentId: string;
}) {
  const { projectId, taskId, commentId } = input;
  try {
    const res = await axiosInstance.delete(
      `/api/projects/${projectId}/tasks/${taskId}/comments/${commentId}`,
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
