import { User } from "./user.type";

export type Messages = {
  id?: number;
  content?: string;
  type?: "text" | "img";
  createdAt?: Date;
  user: User;
};
