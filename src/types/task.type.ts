import { Project } from "./project.type";
import { User } from "./user.type";

export type Task = {
  id: string;
  taskName: string;
  createdAt: Date;
  key: string;
  state: "todo" | "ongoing" | "done";
  estimate: Date;
  description: string;
  project: Project;
  user: User;
};
