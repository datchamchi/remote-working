import { fetchAllProject } from "@/api/project-api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { timeAgo } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProjectSkeleton from "./ProjectSkeleton";
import DialogAddProject from "./DialogAddProject";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ListProject() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const page = "1";
  const { data, isFetching, isSuccess, refetch } = useQuery({
    queryKey: ["get_projects", page],
    queryFn: async () => {
      const res = await fetchAllProject();
      return res;
    },
  });
  function handleOpen() {
    setOpenDialog(true);
  }
  function handleClose() {
    setOpenDialog(false);
  }
  if (isFetching) return <ProjectSkeleton />;
  return (
    <>
      <DialogAddProject
        refetch={refetch}
        open={openDialog}
        handleClose={handleClose}
      >
        <Button variant={"destructive"} onClick={handleOpen}>
          Add new
        </Button>
      </DialogAddProject>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-black">Name</TableHead>
            <TableHead className="text-black">Key</TableHead>
            <TableHead className="text-black">Leader</TableHead>
            <TableHead className="text-black">Created At</TableHead>
            <TableHead className="text-black">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isSuccess &&
            data.map((project) => (
              <TableRow key={project.key}>
                <TableCell
                  onClick={() => navigate(`/your-projects/${project.id}`)}
                  className="cursor-pointer font-medium text-primary hover:underline"
                >
                  {project.projectName}
                </TableCell>
                <TableCell>{project.key}</TableCell>
                <TableCell>{project.leader}</TableCell>
                <TableCell className="">
                  {timeAgo(new Date(project.createdAt), new Date())}
                </TableCell>
                <TableCell>{project.description}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {isSuccess && data.length == 0 && (
        <div className="text-center text-sm font-semibold text-primary">
          You are not in any project
        </div>
      )}
    </>
  );
}
