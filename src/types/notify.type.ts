export type Notify = {
  id: number;
  type: "inform" | "invite" | "message";
  from: string;
  to: string;
  content: string;
  createdAt: Date;
  project?: string;
  // user: User;
  state: "seen" | "unseen" | "check" | "uncheck";
};
