import { Skeleton } from "@/components/ui/skeleton";

const ActivitySkeleton = () => {
  return (
    <div className="col-span-4 space-y-4 self-stretch rounded-lg bg-white px-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
  );
};

export default ActivitySkeleton;
