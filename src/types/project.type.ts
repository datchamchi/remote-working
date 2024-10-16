import { Task } from "./task.type";
import { User } from "./user.type";

export type Project = {
  id?: number;
  projectName: string;
  description: string;
  key: string;
  leader: string;
  createdAt: string;
  updatedAt: string;
  users: User[];
  tasks: Task[];
};
