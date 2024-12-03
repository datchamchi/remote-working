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
import { Project } from "@/types/project.type";
import { useSelector } from "react-redux";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { selectAuth } from "@/app/authSlice";
const DetailTask = ({
  children,
  task,
  project,
  refetch,
}: {
  children: ReactNode;
  task: Task;
  project: Project;
  refetch: () => void;
}) => {
  const [description, setDescription] = useState(task.description);
  const [taskState, setTaskState] = useState(task.state);
  const [time, setTime] = useState(format(task.estimate, "hh:mm"));
  const [day, setDay] = useState(format(task.estimate, "dd-MM-yyyy"));
  const [openChooseUser, setOpenChooseUser] = useState(false);
  const currentUser = useSelector(selectAuth).user;
  const checkTaskPermission =
    currentUser?.email === task.user.email ||
    currentUser?.email === project.leader;
  const [username, setUsername] = useState(task.user.name);
  const [userAssignId, setUserAssignId] = useState(task.user.id);
  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: () =>
      updateTask(task.id, {
        description,
        state: taskState,
        estimate: formatDate(day, time),
        assign: userAssignId,
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
            <DialogTitle className="mb-2">{task.taskName}</DialogTitle>
            <div className="flex items-center gap-2 font-semibold">
              <DialogDescription></DialogDescription>
              {task.project && (
                <>
                  <DialogDescription>
                    {task.project.projectName}
                  </DialogDescription>
                  <DialogDescription>
                    <HiChevronRight />
                  </DialogDescription>
                  <DialogDescription>{task.key}</DialogDescription>
                </>
              )}
            </div>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-start">
                Description
              </Label>
              <Input
                id="description"
                disabled={task.state === "overdue" || !checkTaskPermission}
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
                disabled={task.state === "overdue" || !checkTaskPermission}
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
                  disabled={task.state === "overdue" || !checkTaskPermission}
                  type="time"
                  className="rounded-lg border-2 border-slate-200 px-2 py-1"
                  defaultValue={time}
                  onChange={(e) => setTime(e.target.value)}
                />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={
                        task.state === "overdue" || !checkTaskPermission
                      }
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
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-start">
                Assignee
              </Label>
              <div>
                <Popover open={openChooseUser} onOpenChange={setOpenChooseUser}>
                  <PopoverTrigger
                    asChild
                    disabled={currentUser?.email !== project.leader}
                  >
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={"false"}
                      className="w-[280px] justify-between"
                    >
                      {username}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[280px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search User..."
                        className="h-9 w-full"
                      />
                      <CommandList>
                        <CommandEmpty>No User Found</CommandEmpty>
                        <CommandGroup>
                          {project.users.map((user) => (
                            <CommandItem
                              key={user.name}
                              value={user.name}
                              onSelect={(currentValue) => {
                                setUserAssignId(user.id);
                                setUsername(currentValue);
                                setOpenChooseUser(false);
                              }}
                            >
                              {user.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  username === user.name
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {task.state === "overdue" && (
              <div className="text-end font-semibold italic text-red-600">
                This Task is overdue
              </div>
            )}
          </div>
          <DialogFooter>
            {currentUser?.email === task.user.email && (
              <Button onClick={() => handleDeleteTask()}>
                {isDeleting ? <Spinner h={5} w={5} /> : "Delete"}
              </Button>
            )}
            {checkTaskPermission && (
              <Button
                variant={"destructive"}
                disabled={task.state === "overdue" || !checkTaskPermission}
                onClick={() => update()}
              >
                {isUpdating ? <Spinner h={5} w={5} /> : "Save changes"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetailTask;
