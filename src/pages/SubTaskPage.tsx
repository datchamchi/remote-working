import { fetchTask } from "@/api/task-api";
import { selectAuth } from "@/app/authSlice";
import HeaderSubTask from "@/features/subtask/HeaderSubTask";
import TaskDetail from "@/features/subtask/TaskDetail";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SubTaskPage = () => {
  const currentUser = useSelector(selectAuth).user;
  const { taskKey } = useParams();

  const { data: task } = useQuery({
    queryKey: ["fetch_task", taskKey],
    queryFn: () => fetchTask(taskKey),
  });
  if (!currentUser) return;
  if (!task) return;
  return (
    <div className="flex flex-1 flex-col gap-4">
      <HeaderSubTask user={currentUser} taskKey={taskKey} />
      <TaskDetail task={task} />
    </div>
  );
};

export default SubTaskPage;
