import { fetchTask } from "@/api/task-api";
import { selectAuth } from "@/app/authSlice";
import ListComment from "@/features/taskDetail/ListComment";
import HeaderTaskDetail from "@/features/taskDetail/HeaderTaskDetail";
import { useQuery } from "@tanstack/react-query";
import { HiCheckCircle, HiOutlineClock } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import TaskDetailInfor from "@/features/taskDetail/TaskDetailInfor";

const TaskDetailPage = () => {
  const currentUser = useSelector(selectAuth).user;
  const {
    state: { project },
  } = useLocation();
  const { taskKey, projectId } = useParams();
  const { data: task, refetch } = useQuery({
    queryKey: ["fetch_task", taskKey],
    queryFn: () => fetchTask(taskKey),
  });

  if (!currentUser) return;
  if (!task) return;
  return (
    <div className="flex h-screen flex-1 flex-col gap-4 overflow-hidden p-4">
      <HeaderTaskDetail
        user={currentUser}
        projectId={projectId}
        project={project}
        taskName={task.taskName}
      />
      <div className="grid flex-1 grid-cols-3 gap-4">
        <div className="col-start-1 col-end-3 flex divide-x-2">
          <div className="h-[calc(100vh-120px)] w-2/5 overflow-y-scroll">
            <ListComment projectId={project.id} task={task} refetch={refetch} />
          </div>
          <div className="w-3/5 space-y-2 pl-4 pt-4">
            {task.subtasks.length === 0 ? (
              <p className="text-center text-sm font-semibold text-primary">
                No any subtasks here
              </p>
            ) : (
              task.subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  className="flex items-center justify-between rounded-lg border-2 px-4 py-2"
                >
                  <p>{subtask.name}</p>
                  {subtask.status === "complete" ? (
                    <HiCheckCircle className="text-xl text-green-600" />
                  ) : (
                    <HiOutlineClock className="text-red-600" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="col-start-3 col-end-4">
          <TaskDetailInfor task={task} project={project} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
