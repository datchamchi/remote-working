import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HiMiniPlusSmall } from "react-icons/hi2";
import TaskRow from "./TaskRow";
import { Task } from "@/types/task.type";
import DialogAddTask from "./DialogAddTask";
import { Project } from "@/types/project.type";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectAuth } from "@/app/authSlice";

const ListTask = ({
  project,
  listTask,
  refetch,
}: {
  project: Project;
  listTask: Task[];
  refetch: () => void;
}) => {
  const [progress, setProgress] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const currentUser = useSelector(selectAuth).user;
  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  useEffect(() => {
    const percentage = Math.floor(
      (listTask.filter((task) => task.state === "done").length /
        listTask.length) *
        100,
    );

    const timer = setTimeout(() => setProgress(percentage || 0), 500);
    return () => clearTimeout(timer);
  }, [listTask]);

  const { mutate } = useMutation({
    mutationFn: async (sorted: string) => {
      if (sorted === "asignee") {
        return listTask.sort((task1, task2) =>
          task1.user.name.localeCompare(task2.user.name),
        );
      } else if (sorted === "dueDate") {
        return listTask.sort(
          (task1, task2) =>
            new Date(task1.estimate).getTime() -
            new Date(task2.estimate).getTime(),
        );
      } else if (sorted === "status") {
        return listTask.sort((task1, task2) =>
          task1.state.localeCompare(task2.state),
        );
      }
      return listTask;
    },
  });
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span className="text-xl font-semibold text-primary">
          Project's Tasks
        </span>
        <div className="flex items-center gap-4">
          <Select onValueChange={(value) => mutate(value)}>
            <SelectTrigger className="w-[180px] rounded-sm border-2 border-slate-200">
              <SelectValue placeholder="Order by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="asignee">Assignee</SelectItem>
            </SelectContent>
          </Select>
          {currentUser?.email === project.leader && (
            <DialogAddTask
              project={project}
              refetch={refetch}
              openDialog={openDialog}
              closeDialog={handleCloseDialog}
            >
              <Button
                onClick={handleOpenDialog}
                variant={"ghost"}
                className="flex items-center gap-1 bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
              >
                <span>Add task</span>
                <HiMiniPlusSmall className="text-xl" />
              </Button>
            </DialogAddTask>
          )}
        </div>
      </div>
      {listTask.length !== 0 ? (
        <div className="flex items-center gap-4">
          <Progress
            value={progress}
            className="w-4/5 bg-slate-400"
            indicatorColor="bg-primary"
          />
          <div className="text-slate-600">{progress}% Done</div>
        </div>
      ) : (
        <div className="text-center">No Task in here</div>
      )}
      <div className="divide-y-2 divide-slate-200">
        {listTask.map((task) => (
          <TaskRow
            task={task}
            key={task.id}
            refetch={refetch}
            project={project}
          />
        ))}
      </div>
    </div>
  );
};

export default ListTask;
