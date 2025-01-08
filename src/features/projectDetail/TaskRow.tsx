import { Task } from "@/types/task.type";

import defaultPhoto from "../../assets/images/default.jpg";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { Project } from "@/types/project.type";
import { useSelector } from "react-redux";
import { selectAuth } from "@/app/authSlice";

const TaskRow = ({ task, project }: { task: Task; project: Project }) => {
  const currentUser = useSelector(selectAuth).user;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        if (currentUser?.email !== task.user.email) {
          navigate(`${task.key}`, {
            state: {
              project: project,
            },
          });
        } else navigate(`/your-tasks/${task.key}`);
      }}
    >
      <div className="flex cursor-pointer items-center px-4 py-2 font-medium hover:bg-slate-200">
        <div className="min-w-20 text-sm font-semibold">{task.key}</div>

        <div className="flex-1 hover:underline">{task.taskName}</div>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar>
                  <AvatarImage
                    src={task.user.photo?.path || defaultPhoto}
                    alt={task.user.name}
                  />
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>{task.user.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div
            className={`flex h-6 w-20 items-center justify-center rounded-sm p-0 text-[12px] text-white ${task.state === "done" ? "bg-green-500" : task.state === "overdue" ? "bg-red-500" : "bg-primary"}`}
          >
            {task.state}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskRow;
