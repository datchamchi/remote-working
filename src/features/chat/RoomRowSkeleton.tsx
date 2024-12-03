import { Skeleton } from "@/components/ui/skeleton";

export const RoomRowSkeleton = () => {
  return (
    <div className="grid h-20 grid-cols-4 items-center gap-4 rounded-md p-2">
      <div className="col-span-1">
        <div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>
      <div className="col-span-3 flex flex-col space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
};
