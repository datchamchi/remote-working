import { Skeleton } from "@/components/ui/skeleton";

const ChatSkeleton = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="grid grid-cols-3 items-center border-b-2 border-b-slate-300 px-4 py-2">
        <div className="col-start-2 col-end-3 flex flex-col items-center gap-2">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
      <div className="flex flex-col gap-4 px-4 py-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-6 w-48" />
          </div>
        </div>
        <div className="self-end">
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="self-end">
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-6 w-40" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-6 w-64" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
