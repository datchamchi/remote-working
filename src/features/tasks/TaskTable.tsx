import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@/types/task.type";
import { Link } from "react-router-dom";
import DialogDetailTask from "./DialogDetailTask";

const tasks: Task[] = [
  {
    id: "VN001",
    taskName: "Check database",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    createdAt: new Date(),
    estimate: new Date(),
    status: "ongoing",
    projectName: "Hello World  ",
  },
  {
    id: "VN002",
    taskName: "Check database",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    createdAt: new Date(),
    estimate: new Date(),
    status: "ongoing",
    projectName: "Hello World",
  },
];

const TaskTable = () => {
  return (
    <>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Task</TableHead>
            {/* <TableHead className="text-center">created At</TableHead> */}
            <TableHead className="text-start">Status</TableHead>
            <TableHead className="text-center">Estimate</TableHead>
            <TableHead>Project</TableHead>
            <TableHead></TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.id}</TableCell>
              <TableCell className="max-w-40">{task.taskName}</TableCell>
              {/* <TableCell className="text-center">
                {task.createdAt.toDateString()}
              </TableCell> */}
              <TableCell>
                <Select>
                  <SelectTrigger className="px-0">
                    <SelectValue placeholder="On going" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To do</SelectItem>
                    <SelectItem value="ongoing">On going</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-center">
                {task.estimate.toDateString()}
              </TableCell>

              <TableCell>{task.projectName}</TableCell>
              <TableCell className="flex space-x-4">
                <DialogDetailTask task={task}>
                  <Button variant={"link"} className="bg-red-100">
                    Detail
                  </Button>
                </DialogDetailTask>
                <Button variant={"link"} className="bg-green-100" asChild>
                  <Link to="/overview">View project</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default TaskTable;
