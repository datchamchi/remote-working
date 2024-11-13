import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Actitvity,
  ActivitySkeleton,
  TotalTask,
  TotalTaskSkeleton,
} from "../overview";
import { ReactNode, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Task } from "@/types/task.type";

const ProjectAnalys = ({
  children,
  listTask,
}: {
  children: ReactNode;
  listTask: Task[];
}) => {
  const [taskAnalys, setTaskAnalys] = useState(listTask);
  const [time, setTime] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const task = taskAnalys;
  const taskDone = taskAnalys.filter((task) => task.state === "done");
  const taskTodo = taskAnalys.filter((task) => task.state === "todo");
  const taskOngoing = taskAnalys.filter((task) => task.state === "ongoing");
  useEffect(() => {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();

    setIsLoading(true);
    setTimeout(() => {
      switch (time) {
        case "all":
          setTaskAnalys(listTask);
          break;
        case "week": {
          const startOfWeek = new Date(); // Sao chép ngày hiện tại
          const endOfWeek = new Date(); // Sao chép ngày hiện tại
          const dayOfWeek = startOfWeek.getDay();

          startOfWeek.setHours(0, 0, 0, 0);
          startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek + 1);

          endOfWeek.setHours(0, 0, 0, 0);
          endOfWeek.setDate(endOfWeek.getDate() + (8 - dayOfWeek));

          setTaskAnalys((list) =>
            list.filter(
              (task) =>
                new Date(task.createdAt) >= startOfWeek &&
                new Date(task.createdAt) < endOfWeek,
            ),
          );
          break;
        }
        case "month":
          setTaskAnalys((list) =>
            list.filter(
              (task) =>
                new Date(task.createdAt).getMonth() == thisMonth &&
                new Date(task.createdAt).getFullYear() == thisYear,
            ),
          );
          break;
      }
      setIsLoading(false);
    }, 1000);
  }, [time, listTask]);
  return (
    <Dialog onOpenChange={() => setTime("all")}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[720px]">
        <DialogHeader>
          <DialogTitle className="px-4 text-primary">Overview</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-6 gap-4">
          {isLoading ? (
            <TotalTaskSkeleton />
          ) : (
            <TotalTask task={task} taskDone={taskDone} />
          )}

          {isLoading ? (
            <ActivitySkeleton />
          ) : (
            <div className="col-span-4 space-y-8 self-stretch rounded-lg bg-white px-4">
              <div className="flex items-center justify-between px-4">
                <p className="text-sm font-semibold text-red-500">Activity</p>

                <Select
                  defaultValue={time}
                  onValueChange={(value) => setTime(value)}
                >
                  <SelectTrigger className="w-[180px] border-2 border-slate-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select time</SelectLabel>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-36 w-full">
                <Actitvity
                  taskDone={taskDone}
                  taskTodo={taskTodo}
                  taskOngoing={taskOngoing}
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectAnalys;
