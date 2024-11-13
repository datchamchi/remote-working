import { emitSocket } from "@/app/socketSlice";
import { AppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import { SocketEvent } from "@/constant";
import { Notify } from "@/types/notify.type";
import { timeAgo } from "@/utils/utils";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../auth/authSlice";
import { useMutation } from "@tanstack/react-query";
import { updateInviteNotify } from "@/api/noti-api";

const NotiRow = ({ noti, refetch }: { noti: Notify; refetch: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectAuth).user;
  function handleAcceptInvite() {
    if (!currentUser) return;
    dispatch(
      emitSocket({
        event: SocketEvent.ACCPEPT_INVITE,
        data: {
          type: "inform",
          from: currentUser.email,
          content: `${currentUser.name} accept your invitation join project`,
          to: noti.from,
          project: noti.project,
        },
      }),
    );
    mutate({ notifyId: String(noti.id), type: "invite" });
  }
  function handleRefuseInvite() {
    if (!currentUser) return;
    dispatch(
      emitSocket({
        event: SocketEvent.REFUSE_INVITE,
        data: {
          type: "inform",
          from: currentUser.email,
          content: `${currentUser.name} refuse your invitation join project`,
          to: noti.from,
        },
      }),
    );
    mutate({ notifyId: String(noti.id), type: "invite" });
  }

  const { mutate } = useMutation({
    mutationFn: updateInviteNotify,
    onSuccess: () => {
      refetch();
    },
  });
  return (
    <div className="flex items-center gap-4 py-4">
      <div>
        <HiOutlineUserGroup className="text-2xl" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-wrap">{noti.content}</div>
        <div className="text-[12px]">{timeAgo(new Date(noti.createdAt))}</div>
        {noti.type === "invite" ? (
          noti.state === "uncheck" ? (
            <div className="flex gap-2 text-[12px]">
              <Button onClick={handleAcceptInvite}>Accept</Button>
              <Button onClick={handleRefuseInvite}>Decline</Button>
            </div>
          ) : (
            <span className="text-[12px] italic">You already reply</span>
          )
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default NotiRow;
