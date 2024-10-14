import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ProjectSkeleton = () => {
  return (
    <Table>
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
        <TableRow>
          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ProjectSkeleton;
