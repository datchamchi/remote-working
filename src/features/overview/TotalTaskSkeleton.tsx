import { Skeleton } from "@/components/ui/skeleton";

const TotalTaskSkeleton = () => {
  return (
    <div className="col-span-2 rounded-lg">
      <Skeleton className="h-40 w-full" />
    </div>
  );
};

export default TotalTaskSkeleton;
