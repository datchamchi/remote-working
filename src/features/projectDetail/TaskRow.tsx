import { Task } from "@/types/task.type";

import defaultPhoto from "../../assets/images/default.jpg";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import DetailTask from "./DetailTask";
import { Project } from "@/types/project.type";

const TaskRow = ({
  task,
  refetch,
  project,
}: {
  task: Task;
  project: Project;
  refetch: () => void;
}) => {
  return (
    <DetailTask task={task} refetch={refetch} project={project}>
      <div className="flex cursor-pointer items-center px-4 py-2 font-medium hover:bg-slate-200">
        <div className="min-w-20 text-sm font-semibold">{task.key}</div>

        <div className="flex-1 hover:underline">{task.taskName}</div>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={task.user.photo?.path || defaultPhoto}
              alt="Avatar"
            />
          </Avatar>

          <div
            className={`h-6 w-20 rounded-sm p-0 text-center text-[12px] text-white ${task.state === "overdue" ? "bg-red-500" : "bg-primary"}`}
          >
            {task.state}
          </div>
        </div>
      </div>
    </DetailTask>
  );
};

export default TaskRow;
