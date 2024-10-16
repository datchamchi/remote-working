import { string, z } from "zod";

export const TaskSchema = z.object({
  taskName: z.string().min(1, "Missing field: task name"),
  description: string().min(1, "Missing field: task description"),
  estimate: z
    .date({ required_error: "Missing field: due date" })
    .refine((value) => value > new Date(), {
      message: "Date in invalid",
    }),
  assign: z.number({ required_error: "Missing field : user id" }),
});
export type TaskDto = z.infer<typeof TaskSchema>;
export type CreateTaskDto = TaskDto & {
  projectId: string;
};
