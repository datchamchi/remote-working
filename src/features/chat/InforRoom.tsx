import { Room } from "@/types/room.type";
import React from "react";

import { HiInformationCircle, HiPhone, HiVideoCamera } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/app/store";
import { emitSocket } from "@/app/socketSlice";
import { SocketEvent } from "@/constant";
import { selectAuth } from "@/app/authSlice";

const InforRoom = ({ room }: { room: Room | undefined }) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectAuth).user;
  const dispatch = useDispatch<AppDispatch>();
  if (!room) return;
  const nameRoom = room.name
    ? room.name
    : room.users.length == 1
      ? room.users[0].name
      : `${room.users[0].name} and ${room.users.length - 1} others`;

  async function handleClickCalling() {
    if (!room) return;
    await dispatch(
      emitSocket({
        event: SocketEvent.INVITE_CALL,
        data: {
          content: `${currentUser?.name} start calling in ${room.name}`,
          roomId: room.id,
        },
      }),
    );
    navigate(`/your-teams/${room.id}/calling`);
  }
  return (
    <div className="grid grid-cols-3 items-center border-b-2 border-b-slate-300 px-4 py-2">
      <div className="col-start-2 col-end-3 flex flex-col items-center">
        <div className="font-semibold">{nameRoom}</div>
        {room.users.length > 1 && (
          <p className="text-sm">{room.users.length} members</p>
        )}
      </div>
      <div className="col-start-3 col-end-4 flex items-center gap-6 justify-self-center text-2xl text-primary">
        <div className="cursor-pointer rounded-full p-2 hover:bg-slate-300">
          <HiPhone />
        </div>
        <div
          className="cursor-pointer rounded-full p-2 hover:bg-slate-300"
          onClick={handleClickCalling}
        >
          <HiVideoCamera />
        </div>
        <div className="cursor-pointer rounded-full p-2 hover:bg-slate-300">
          <HiInformationCircle />
        </div>
      </div>
    </div>
  );
};

export default React.memo(InforRoom);
