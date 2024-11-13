import { Project } from "./project.type";
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
};
