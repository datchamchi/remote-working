import { Messages } from "./message.type";
import { User } from "./user.type";

export type Room = {
  id: number;
  name: string;
  isCalling: boolean;
  users: User[];
  messages: Messages[];
};
