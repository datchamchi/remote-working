import { fetchNoti, updateAllInformNotify } from "@/api/noti-api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { HiOutlineBell } from "react-icons/hi2";
import NotiRow from "./NotiRow";
import { Badge } from "@/components/ui/badge";
import axiosInstance from "@/api/axiosInstance";
import { toast } from "sonner";

const Notify = () => {
  const [open, setOpen] = useState(false);
  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["get_noti"],
    queryFn: fetchNoti,
  });

  useEffect(() => {
    if (open) {
      axiosInstance
        .patch(
          `/api/notify/readall`,
          {},
          {
            headers: { "Content-Type": "application/json" },
          },
        )
        .then(() => {
          refetch();
        })
        .catch(() => {
          toast.error("Unexpected error occur");
        });
    }
  }, [open]);
  const notifyUnCheck = data
    ? data.reduce<number>((total, currentNotify) => {
        return currentNotify.state === "uncheck" ||
          currentNotify.state === "unseen"
          ? total + 1
          : total;
      }, 0)
    : 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="cursor-pointer">
        <div className="relative rounded-full bg-slate-300 p-2">
          <HiOutlineBell className="text-lg" />
          {isSuccess && notifyUnCheck > 0 && (
            <Badge variant="destructive" className="absolute -right-4 -top-2">
              {notifyUnCheck}
            </Badge>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-h-96 overflow-y-auto scroll-smooth">
        <div className="divide-y-2 text-sm">
          {isSuccess &&
            data.map((noti) => (
              <NotiRow noti={noti} key={noti.id} refetch={refetch} />
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notify;
