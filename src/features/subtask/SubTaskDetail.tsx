import { Task } from "@/types/task.type";

import TaskInform from "./TaskInform";
import { Button } from "@/components/ui/button";

import SubTaskRow from "./SubTaskRow";
import { useMutation } from "@tanstack/react-query";
import { addSubTask } from "@/api/subtask-api";
import { useEffect, useRef, useState } from "react";
import Spinner from "@/ui/Spinner";

import { useSidebar } from "@/components/ui/sidebar";
import { LucidePanelLeftClose, LucidePanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const TaskDetail = ({
  task,
  refetchPage,
}: {
  task: Task;
  refetchPage: () => void;
}) => {
  const [subTaskName, setSubTaskName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { toggleSidebar, open } = useSidebar();
  const { mutate } = useMutation({
    mutationFn: addSubTask,
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      setIsLoading(false);
      setSubTaskName("");
      refetchPage();
    },
  });

  function handleSubmit() {
    mutate({ taskKey: task.key, name: subTaskName });
  }
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div className="grid flex-1 grid-cols-5">
      <div className={cn("col-span-3", !open && "col-span-3")}>
        <div className={`flex w-full`}>
          <div className="flex-1 space-y-4 pl-4">
            <div
              className={cn(
                "flex gap-2",
                !open ? "w-full justify-self-center" : "w-full",
              )}
            >
              <div
                onClick={toggleSidebar}
                className={cn(
                  "0 z-30 flex cursor-pointer items-center gap-2 rounded px-2 text-sm hover:bg-slate-200",
                )}
              >
                {open ? (
                  <>
                    <LucidePanelLeftClose className="w-4" />
                    <p>Close</p>
                  </>
                ) : (
                  <>
                    <LucidePanelLeftOpen className="w-4" />
                    <p>Comments</p>
                  </>
                )}
              </div>
              <input
                type="text"
                ref={inputRef}
                value={subTaskName}
                onChange={(e) => setSubTaskName(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />

              <Button
                className="w-28 bg-indigo-600 hover:bg-indigo-500"
                onClick={handleSubmit}
                disabled={!subTaskName}
              >
                {isLoading ? <Spinner w={5} h={5} /> : "Add Todo"}
              </Button>
            </div>
            <div className="space-y-4">
              {task.subtasks.length === 0 ? (
                <p className="text-center text-sm text-red-500">
                  No any todo here
                </p>
              ) : (
                task.subtasks.map((subTask) => (
                  <SubTaskRow
                    key={subTask.id}
                    subTask={subTask}
                    taskKey={task.key}
                    refetch={refetchPage}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={cn("col-span-2", !open && "col-span-2")}>
        <TaskInform task={task} project={task.project} />
      </div>
    </div>
  );
};

export default TaskDetail;
