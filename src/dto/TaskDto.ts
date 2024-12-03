import { formatDate } from "@/utils/utils";
import { string, z } from "zod";

export const TaskSchema = z
  .object({
    taskName: z.string().min(1, "Missing field: task name"),
    description: string().min(1, "Missing field: task description"),
    day: z.string({ required_error: "Missing field: day" }),
    time: z.string({ required_error: "Missing field: time" }),

    assign: z.number({ required_error: "Missing field : user id" }),
  })
  .refine(
    (value) => {
      return (
        formatDate(value.day, value.time).getTime() - Date.now() >=
        5 * 1000 * 60
      );
    },
    {
      message: "Date is invalid. Minimum greater than now 5 minutes",
      path: ["assign"],
    },
  );
export type TaskDto = z.infer<typeof TaskSchema>;
export type CreateTaskDto = {
  taskName: string;
  description: string;
  estimate: Date;
  assign: number;
  projectId: string;
};

export type UpdateTaskDto = {
  state?: "todo" | "ongoing" | "done" | "overdue";
  estimate?: Date;
  description?: string;
  assign?: number;
};
