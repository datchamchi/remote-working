import { fetchTask } from "@/api/task-api";
import { selectAuth } from "@/app/authSlice";
import HeaderSubTask from "@/features/subtask/HeaderSubTask";
import SubTaskDetail from "@/features/subtask/SubTaskDetail";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import photo from "../assets/images/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { formatDate } from "date-fns";

const SubTaskPage = () => {
  const currentUser = useSelector(selectAuth).user;
  const { taskKey } = useParams();

  const { data: task, refetch: refetchPage } = useQuery({
    queryKey: ["fetch_task", taskKey],
    queryFn: () => fetchTask(taskKey),
  });

  if (!currentUser) return;
  if (!task) return;
  return (
    <div className="relative flex flex-1 flex-col gap-4">
      <HeaderSubTask user={currentUser} taskKey={task.taskName} />
      <SidebarProvider className="!h-screen">
        <Sidebar className="z-10 ml-60">
          <SidebarContent className="space-y-2 bg-white px-2 pt-20">
            {task.comments.length === 0 ? (
              <p className="mt-60 text-center text-primary">
                No any comments here
              </p>
            ) : (
              task.comments.map((comment) => (
                <div className="rounded-lg border-2 px-4 py-2">
                  <article className="rounded-lg bg-white text-base dark:bg-gray-900">
                    <footer className="mb-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="mr-3 inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                          <img
                            className="mr-2 h-6 w-6 rounded-full"
                            src={comment.user.photo?.path || photo}
                            alt={comment.user.name}
                          />
                          {comment.user.id === currentUser?.id
                            ? "You"
                            : comment.user.name}
                        </p>
                        <p className="text-[12px] text-gray-600 dark:text-gray-400">
                          {formatDate(comment.createdAt, "dd/MM/yyyy")}
                        </p>
                      </div>
                    </footer>
                    <p className="text-sm">{comment.content}</p>
                  </article>
                </div>
              ))
            )}
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>

        <SubTaskDetail task={task} refetchPage={refetchPage} />
      </SidebarProvider>
    </div>
  );
};

export default SubTaskPage;
