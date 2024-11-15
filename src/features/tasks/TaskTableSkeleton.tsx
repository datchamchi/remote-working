import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TaskTableSkeleton = () => {
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
          <TableRow>
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <TableCell key={index + 1}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
          </TableRow>
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-center">
        <Skeleton className="h-6 w-1/6" />
      </div>
    </>
  );
};

export default TaskTableSkeleton;
