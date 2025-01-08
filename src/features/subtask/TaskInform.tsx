import { addNoti } from "@/api/noti-api";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Project } from "@/types/project.type";
import { Task } from "@/types/task.type";
import Spinner from "@/ui/Spinner";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";

const TaskInform = ({ task, project }: { task: Task; project: Project }) => {
  const { mutate: requestDone, isPending: isSendingRequest } = useMutation({
    mutationKey: ["task/request_done"],
    mutationFn: addNoti,
    onSuccess: () => {
      toast.success("Send request to your team leadeer");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return (
    <div className="w-full px-4">
      <Calendar
        mode="range"
        selected={{
          from: task.state === "overdue" ? task.estimate : new Date(),
          to: task.state === "overdue" ? new Date() : task.estimate,
        }}
        className="w-full rounded-md border"
      />
      <div className="grid gap-4 p-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-start">
            Description
          </Label>
          <Input
            id="description"
            disabled={true}
            defaultValue={task.description}
            className="col-span-3 disabled:opacity-100"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-start">
            Created At
          </Label>
          <Input
            type="text"
            disabled
            id="description"
            value={format(task.createdAt, "hh:mm - PPP")}
            className="col-span-3 disabled:opacity-100"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="col-span-1 text-start">
            Due Date
          </Label>
          <div className="col-span-3 flex items-center gap-2">
            <Input
              disabled
              className="w-full rounded-lg border-2 border-slate-200 px-2 py-1 disabled:opacity-100"
              value={format(task.estimate, "hh:mm - PPP")}
            />
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() =>
                  requestDone({
                    from: task.user.email,
                    to: project.leader,
                    type: "inform",
                    content: `${task.user.name} request update: ${task.taskName} in ${project.projectName}`,
                  })
                }
                disabled={task.state !== "todo"}
                variant={"destructive"}
                className="mt-4"
              >
                {isSendingRequest ? (
                  <Spinner w={5} h={5} />
                ) : task.state === "overdue" ? (
                  "Overdue"
                ) : task.state === "done" ? (
                  "Done"
                ) : (
                  "Request Done"
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>click to inform your team leader that task is complete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default TaskInform;
