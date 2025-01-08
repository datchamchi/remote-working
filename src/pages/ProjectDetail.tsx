import { fetchProject } from "@/api/project-api";
import { fetchAllTasks } from "@/api/task-api";
import { selectAuth } from "@/app/authSlice";

import {
  HeaderProjectDetail,
  Information,
  ListTask,
} from "@/features/projectDetail";

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      if (!projectId) throw new Error("Project ID is required");
      const res = await fetchProject(projectId);
      return res;
    },
    enabled: !!projectId,
  });
  const {
    data: listTask,
    isSuccess: isTaskSuccess,
    refetch,
  } = useQuery({
    queryKey: ["get_task", projectId],
    queryFn: async () => {
      if (!projectId) throw new Error("Project ID is required");
      const res = await fetchAllTasks(projectId);
      return res;
    },
    enabled: !!projectId,
  });
  const currentUser = useSelector(selectAuth).user;

  if (!currentUser) return;

  return (
    <div className="flex flex-1 flex-col gap-4 px-4">
      {/* {isFetching ? (
        <Header path={currentUser.photo?.path}>
          <Skeleton className="h-8 w-1/4" />
        </Header>
      ) : ( */}
      <HeaderProjectDetail user={currentUser} name={data?.projectName} />
      {/* )} */}
      {/* {isFetching && <ProjectDetailSkeleton />} */}
      {isSuccess && isTaskSuccess && (
        <>
          <div className="mt-6 grid grid-cols-6 gap-4">
            <div className="col-span-4">
              <ListTask project={data} listTask={listTask} refetch={refetch} />
            </div>
            <div className="col-span-2">
              <Information
                project={data}
                listTask={listTask}
                currentUser={currentUser}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetail;
