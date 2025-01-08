import { deleteTask } from "@/api/task-api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Spinner from "@/ui/Spinner";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DialogConfirmDeleteTask = ({
  children,
  projectId,
  taskId,
}: {
  children: ReactNode;
  projectId: number | undefined;
  taskId: string;
}) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["tasks/delete", taskId],
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Delete task successfully");
      if (projectId) navigate(`/your-projects/${projectId}`);
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete this task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          If you remove this task, all comments and subtask will be removed.
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={() => mutate(taskId)}>
            {isPending ? <Spinner w={5} h={5} /> : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogConfirmDeleteTask;
