import { z } from "zod";

export const formSchema = z.object({
  projectName: z.string().min(1, {
    message: "Please provide name project",
  }),
  key: z.string(),
  description: z.string().min(1, {
    message: "Please provide description project",
  }),
});
export type CreateProjectDto = z.infer<typeof formSchema>;
