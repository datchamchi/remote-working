import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { HiArrowNarrowUp } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { addComment, deleteComment, updateComment } from "@/api/comment-api";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/ui/Spinner";
import { Task } from "@/types/task.type";

import CommentCard from "./CommentCard";

const FormSchema = z.object({
  content: z.string({ required_error: "Please leave your comment" }),
});

export default function ListComment(props: {
  task: Task;
  projectId: string;
  refetch: () => void;
}) {
  const { projectId, task, refetch } = props;

  const [openAdd, setOpenAdd] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function toggleTextArea() {
    setOpenAdd((open) => !open);
  }

  const { isPending, mutate } = useMutation({
    mutationKey: ["/comments/add"],
    mutationFn: addComment,
    onSuccess: () => {
      toast.success("Create Comment Succesffuly");
      form.reset({ content: "" });
      refetch();
    },
    onError: () => {
      toast.error("Error: Create Comment Fail");
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate({ projectId, taskId: String(task.id), content: data.content });
  }
  const { mutate: deleteCommentByID } = useMutation({
    mutationKey: ["/comments/delete"],
    mutationFn: async (commentId: string) =>
      await deleteComment({ projectId, taskId: String(task.id), commentId }),
    onSuccess: () => {
      toast.success("Delete Comment Success");
      refetch();
    },
  });

  const { mutate: updateCommentByID } = useMutation({
    mutationKey: ["/comments/update"],
    mutationFn: async (dto: { commentId: string; content: string }) => {
      const { commentId, content } = dto;
      await updateComment({
        projectId,
        taskId: String(task.id),
        commentId,
        content,
      });
    },
    onSuccess: () => {
      toast.success("Update Comment Success");
      refetch();
    },
  });
  return (
    <>
      <Form {...form}>
        <form className="space-y-6 px-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-4 flex gap-2">
                  <span>Discussion</span>
                  <HiArrowNarrowUp
                    className={cn(
                      "cursor-pointer duration-100 ease-linear",
                      openAdd ? "rotate-180" : "rotate-0",
                    )}
                    onClick={toggleTextArea}
                  />
                </FormLabel>

                <div
                  className={cn(
                    "space-y-2 duration-200",
                    openAdd ? "max-h-60 opacity-100" : "h-0 opacity-0",
                  )}
                >
                  {openAdd && (
                    <>
                      <FormControl>
                        <Textarea
                          placeholder="Leave your comment"
                          defaultValue={field.value}
                          className={"resize-none"}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Everyone in your team can see this comment
                      </FormDescription>
                      <FormMessage />
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="!mb-4"
                      >
                        {isPending ? <Spinner h={5} w={5} /> : "Submit"}
                      </Button>
                    </>
                  )}
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="space-y-4 px-2">
        {task.comments.length === 0 ? (
          <div className="mt-40 text-center text-sm text-primary">
            No any comments here
          </div>
        ) : (
          task.comments.map((comment) => (
            <CommentCard
              comment={comment}
              key={comment.id}
              updateComment={updateCommentByID}
              deleteComment={deleteCommentByID}
            />
          ))
        )}
      </div>
    </>
  );
}
