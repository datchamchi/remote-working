import { selectAuth } from "@/app/authSlice";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Project } from "@/types/project.type";
import { Task } from "@/types/task.type";
import { timeAgo } from "@/utils/utils";
import { CalendarIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { format, formatDate, parse } from "date-fns";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import DialogConfirmDeleteTask from "./DialogConfirmDeleteTask";
import { useMutation } from "@tanstack/react-query";
import { updateTask } from "@/api/task-api";
import { UpdateTaskDto } from "@/dto/TaskDto";
import { toast } from "sonner";
import Spinner from "@/ui/Spinner";

const TaskDetailInfor = ({
  task,
  project,
}: {
  task: Task;
  project: Project;
}) => {
  const [description, setDescription] = useState(task.description);
  const [taskState, setTaskState] = useState(task.state);
  const [time, setTime] = useState(format(task.estimate, "HH:mm"));
  const [day, setDay] = useState(task.estimate);
  const [openChooseUser, setOpenChooseUser] = useState(false);
  const currentUser = useSelector(selectAuth).user;
  const isLeader = currentUser?.email === project.leader;

  const [username, setUsername] = useState(task.user.name);
  const [userAssignId, setUserAssignId] = useState(task.user.id);
  const checkTaskOverdue = task.state === "overdue";

  const { mutate, isPending } = useMutation({
    mutationKey: ["/task/update"],
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTaskDto }) =>
      updateTask(id, dto),
    onSuccess: () => {
      toast.success("Update Task Successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardDescription className={cn("text-lg font-semibold text-red-600")}>
          {task.state === "done"
            ? "Complete"
            : checkTaskOverdue
              ? "Task overdue"
              : `Estimate: ${timeAgo(
                  new Date(),
                  parse(
                    `${time} ${formatDate(day, "dd/MM/yyyy")}`,
                    "HH:mm dd/MM/yyyy",
                    new Date(),
                  ),
                )}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-start">
                Description
              </Label>
              <Input
                id="description"
                disabled={!isLeader}
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
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
                value={format(task.createdAt, "HH:mm - PPP")}
                className="col-span-3 disabled:opacity-100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-start">
                Proccess
              </Label>
              <Select
                disabled={!isLeader}
                onValueChange={(value: "todo" | "done") => setTaskState(value)}
              >
                <SelectTrigger className="col-span-3 rounded-lg border-2 border-slate-200 disabled:opacity-100">
                  <SelectValue placeholder={taskState} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">to do</SelectItem>
                  <SelectItem value="done">done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="col-span-1 text-start">
                Due Date
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  disabled={!isLeader}
                  type="time"
                  className="w-[40%] rounded-lg border-2 border-slate-200 px-2 py-1 disabled:opacity-100"
                  defaultValue={time}
                  onChange={(e) => setTime(e.target.value)}
                />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={!isLeader}
                      variant={"outline"}
                      className={cn(
                        "flex-1 justify-start text-left font-normal disabled:opacity-100",
                        !day && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />

                      {format(day, "dd-MM-yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={new Date(day)}
                      disabled={(date) => date < new Date()}
                      onSelect={(value: Date | undefined) => {
                        if (!value) return;
                        setDay(value);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="col-span-1 text-start">
                Assignee
              </Label>
              <div className="col-span-3">
                <p className="text-sm text-primary">{task.user.name}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isLeader && (
          <div className="space-x-2">
            <DialogConfirmDeleteTask projectId={project.id} taskId={task.id}>
              <Button variant="outline">Delete</Button>
            </DialogConfirmDeleteTask>
            <Button
              onClick={() =>
                mutate({
                  id: task.id,
                  dto: {
                    description,
                    state: taskState,
                    assign: userAssignId,
                    estimate: parse(
                      `${time} ${formatDate(day, "dd/MM/yyyy")}`,
                      "HH:mm dd/MM/yyyy",
                      new Date(),
                    ),
                  },
                })
              }
            >
              {isPending ? <Spinner w={5} h={5} /> : "Update"}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default TaskDetailInfor;
