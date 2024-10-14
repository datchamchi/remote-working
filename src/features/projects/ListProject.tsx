import { fetchAllProject } from "@/api/project-api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { converDate } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProjectSkeleton from "./ProjectSkeleton";

export default function ListProject() {
  const navigate = useNavigate();
  const page = "1";
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["get_projects", page],
    queryFn: async () => {
      const res = await fetchAllProject(page);
      return res;
    },
  });
  if (isLoading) return <ProjectSkeleton />;
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-black">Name</TableHead>
          <TableHead className="text-black">Key</TableHead>
          <TableHead className="text-black">Leader</TableHead>
          <TableHead className="text-black">Created At</TableHead>
          <TableHead className="text-black">Progress</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isSuccess &&
          data.map((project) => (
            <TableRow key={project.key}>
              <TableCell
                onClick={() =>
                  navigate(
                    `/your-projects/${project.projectName.split(/\s+/).join("-")}`,
                  )
                }
                className="cursor-pointer font-medium text-primary hover:underline"
              >
                {project.projectName}
              </TableCell>
              <TableCell>{project.key}</TableCell>
              <TableCell>{project.leader}</TableCell>
              <TableCell className="">
                {converDate(project.createdAt)}
              </TableCell>
              <TableCell className="font-semibold text-red-600">
                80% Complete
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
