import { User } from "./user.type";

export type Comment = {
  id: number;
  content: string;
  createdAt: Date;
  user: User;
};
