import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Task } from "@/types/task.type";
import { ReactNode, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { HiChevronRight } from "react-icons/hi2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { deleteTask, updateTask } from "@/api/task-api";
import Spinner from "@/ui/Spinner";
import { formatDate } from "@/utils/utils";
import { toast } from "sonner";
const DialogDetailTask = ({
  children,
  task,
  refetch,
}: {
  children: ReactNode;
  task: Task;
  refetch: () => void;
}) => {
  const [description, setDescription] = useState(task.description);
  const [taskState, setTaskState] = useState<"todo" | "ongoing" | "done">(
    task.state,
  );
  const [time, setTime] = useState(format(task.estimate, "hh:mm"));
  const [day, setDay] = useState(format(task.estimate, "dd-MM-yyyy"));

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: () =>
      updateTask(task.id, {
        description,
        state: taskState,
        estimate: formatDate(day, time),
      }),
    onSuccess: () => {
      refetch();
      toast("Update task successfully", {
        description: format(new Date().toISOString(), "HH:mm PPP"),
      });
    },
  });
  const { mutate: handleDeleteTask, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteTask(task.id),
    onSuccess: () => {
      refetch();
      toast("Delete task successfully", {
        description: format(new Date().toISOString(), "HH:mm PPP"),
      });
    },
  });
  function handleOpen() {
    setDescription(task.description);
    setTaskState(task.state);
    setTime(format(task.estimate, "hh:mm"));
    setDay(format(task.estimate, "dd-MM-yyyy"));
  }
  return (
    <div>
      <Dialog onOpenChange={handleOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>{task.taskName}</DialogTitle>
            <div className="flex items-center gap-2 font-semibold">
              <DialogDescription>{task.project.projectName}</DialogDescription>
              <DialogDescription>
                <HiChevronRight />
              </DialogDescription>
              <DialogDescription>{task.key}</DialogDescription>
            </div>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-start">
                Description
              </Label>
              <Input
                id="description"
                disabled={task.state === "overdue"}
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
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
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-start">
                Proccess
              </Label>
              <Select
                disabled={task.state === "overdue"}
                onValueChange={(value: "todo" | "done" | "ongoing") =>
                  setTaskState(value)
                }
              >
                <SelectTrigger className="col-span-3 rounded-lg border-2 border-slate-200">
                  <SelectValue placeholder={taskState} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">to do</SelectItem>
                  <SelectItem value="ongoing">ongoing</SelectItem>
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
                  disabled={task.state === "overdue"}
                  type="time"
                  className="rounded-lg border-2 border-slate-200 px-2 py-1"
                  defaultValue={time}
                  onChange={(e) => setTime(e.target.value)}
                />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={task.state === "overdue"}
                      variant={"outline"}
                      className={cn(
                        "flex-1 justify-start text-left font-normal",
                        !day && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />

                      {day}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={task.estimate}
                      onSelect={(value) => {
                        if (!value) return;
                        setDay(format(value, "dd-MM-yyyy"));
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => handleDeleteTask()}>
              {isDeleting ? <Spinner h={5} w={5} /> : "Delete"}
            </Button>
            <Button
              variant={"destructive"}
              disabled={task.state === "overdue"}
              onClick={() => update()}
            >
              {isUpdating ? <Spinner h={5} w={5} /> : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogDetailTask;
