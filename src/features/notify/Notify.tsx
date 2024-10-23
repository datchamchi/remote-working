import { fetchNoti } from "@/api/noti-api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { HiOutlineBell } from "react-icons/hi2";
import NotiRow from "./NotiRow";
import { Badge } from "@/components/ui/badge";

const Notify = () => {
  const [open, setOpen] = useState(false);
  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["get_noti"],
    queryFn: fetchNoti,
  });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="cursor-pointer">
        <div className="relative rounded-full bg-slate-300 p-2">
          <HiOutlineBell className="text-lg" />
          {isSuccess && data.length > 0 && (
            <Badge variant="destructive" className="absolute -right-4 -top-2">
              {data.reduce<number>((count, notify) => {
                return notify.state === "uncheck" || notify.state === "unseen"
                  ? count + 1
                  : count;
              }, 0)}
            </Badge>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="h-96 overflow-y-auto scroll-smooth">
        <div className="divide-y-2 text-sm">
          {isSuccess &&
            data.map((noti) => (
              <NotiRow noti={noti} key={noti.content} refetch={refetch} />
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notify;
