import { fetchProject } from "@/api/project-api";
import { fetchAllTasks } from "@/api/task-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { selectAuth } from "@/features/auth/authSlice";
import {
  HeaderProjectDetail,
  Information,
  ListTask,
  ProjectDetailSkeleton,
} from "@/features/projectDetail";
import Header from "@/ui/Header";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, isLoading, isSuccess } = useQuery({
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
  const [changeDescription, setChangeDescription] = useState(false);
  if (!currentUser) return;

  return (
    <div className="flex flex-1 flex-col gap-4 pt-4">
      {isLoading ? (
        <Header path={currentUser.photo?.path}>
          <Skeleton className="h-8 w-1/4" />
        </Header>
      ) : (
        <HeaderProjectDetail user={currentUser} name={data?.projectName} />
      )}
      {isLoading && <ProjectDetailSkeleton />}
      {isSuccess && isTaskSuccess && (
        <>
          <div className="space-y-4">
            <Label className="font-semibold">Description</Label>
            <Input
              onFocus={() => setChangeDescription(true)}
              defaultValue={data.description}
              placeholder={"Change your description project"}
              className="w-1/2 border-none outline-none"
            />
            {changeDescription && (
              <div className="space-x-4">
                <Button className="bg-blue-600">Save</Button>
                <Button onClick={() => setChangeDescription(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
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
