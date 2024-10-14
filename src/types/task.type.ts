export type Task = {
  id: string;
  taskName: string;
  createdAt: Date;
  status: "todo" | "ongoing" | "done";
  projectName: string;
  estimate: Date;
  description: string;
};
