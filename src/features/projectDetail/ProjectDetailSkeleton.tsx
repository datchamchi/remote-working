import { Skeleton } from "@/components/ui/skeleton";

const ProjectDetailSkeleton = () => {
  return (
    <>
      <div className="space-y-4">
        <Skeleton className="h-5 w-1/6" />
        <Skeleton className="h-8 w-1/2" />
      </div>
      <div className="mt-6 grid grid-cols-6 gap-6">
        <div className="col-span-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-8 w-1/5" />

              <Skeleton className="h-8 w-1/4" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-6 flex-1" />
            </div>
            <div className="space-y-8">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <div className="flex justify-between gap-4" key={index}>
                    <Skeleton className="h-4 min-w-20" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 min-w-20" />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </>
  );
};

export default ProjectDetailSkeleton;
