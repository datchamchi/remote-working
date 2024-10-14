import { useSelector } from "react-redux";

import { selectAuth } from "../features/auth/authSlice";
import { HeaderTask, TaskNavigate } from "../features/tasks";

const Tasks = () => {
  const currentUser = useSelector(selectAuth).user;

  if (!currentUser) return;
  return (
    <div className="flex flex-1 flex-col gap-4 pt-4">
      <HeaderTask user={currentUser} />
      <TaskNavigate />
    </div>
  );
};

export default Tasks;
