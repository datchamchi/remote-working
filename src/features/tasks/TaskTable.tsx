import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Link, useSearchParams } from "react-router-dom";
import DialogDetailTask from "./DialogDetailTask";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTasksByUser, fetchTotalTaskPage } from "@/api/task-api";
import { format } from "date-fns";

const TaskTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const time = searchParams.get("time") || "";
  const type = searchParams.get("type") || "";

  const {
    data: tasks = [],
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["get_all_task", { page: currentPage, time, type }],
    queryFn: () => fetchAllTasksByUser(currentPage, time, type),
  });
  const { data: totalPage } = useQuery({
    queryKey: ["get_total_task_page", time, type],
    queryFn: () => fetchTotalTaskPage(time, type),
  });
  if (isFetching) return;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-primary">ID</TableHead>
            <TableHead className="font-semibold text-primary">Task</TableHead>
            <TableHead className="font-semibold text-primary">
              Description
            </TableHead>
            <TableHead className="text-center font-semibold text-primary">
              Status
            </TableHead>
            <TableHead className="text-center font-semibold text-primary">
              Estimate
            </TableHead>
            <TableHead className="font-semibold text-primary">
              Project
            </TableHead>
            <TableHead className="font-semibold text-primary">
              Created At
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isSuccess &&
            tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="min-w-14 font-medium">
                  {task.key}
                </TableCell>
                <TableCell className="max-w-40">{task.taskName}</TableCell>
                <TableCell className="max-w-80">{task.description}</TableCell>
                <TableCell>
                  <div
                    className={`rounded-lg px-2 py-1 text-center text-white ${task.state == "todo" ? "bg-primary" : task.state == "ongoing" ? "bg-orange-500" : task.state === "done" ? "bg-green-600" : task.state === "overdue" ? "bg-red-600" : ""}`}
                  >
                    {task.state}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {format(task.estimate, "hh:mm, dd/MM/yyyy")}
                </TableCell>

                <TableCell>{task.project.projectName}</TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <DialogDetailTask task={task} refetch={refetch}>
                      <Button variant={"link"} className="bg-red-100">
                        Detail
                      </Button>
                    </DialogDetailTask>
                    <Button variant={"link"} className="bg-green-100" asChild>
                      <Link to={`/your-projects/${task.project.id}`}>
                        View project
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Pagination className="mt-4">
        <PaginationContent className="cursor-pointer">
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  setSearchParams({
                    ...Object.fromEntries(searchParams),
                    page: String(currentPage - 1),
                  })
                }
              />
            </PaginationItem>
          )}
          {totalPage && Number(totalPage) > 0 ? (
            Array(Number(totalPage))
              .fill(0)
              .map((numPage, index) => (
                <PaginationItem key={numPage - index}>
                  <PaginationLink
                    onClick={() =>
                      setSearchParams({
                        ...Object.fromEntries(searchParams),
                        page: String(index + 1),
                      })
                    }
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))
          ) : (
            <div className="font-semibold text-red-500">No results match</div>
          )}

          {currentPage < Number(totalPage) && (
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setSearchParams({
                    ...Object.fromEntries(searchParams),
                    page: String(currentPage + 1),
                  })
                }
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default TaskTable;
