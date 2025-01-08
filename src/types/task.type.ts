import { Comment } from "./comment.type";
import { Project } from "./project.type";
import { SubTask } from "./subTask.type";
import { User } from "./user.type";

export type Task = {
  id: string;
  taskName: string;
  createdAt: string;
  key: string;
  state: "todo" | "ongoing" | "done" | "overdue";
  estimate: Date;
  description: string;
  project: Project;
  user: User;
  subtasks: SubTask[];
  comments: Comment[];
};
