import { selectAuth } from "@/app/authSlice";
import { selectRoomCalling } from "@/app/roomCallingSlice";
import ChatSideBar from "@/features/chat/ChatSideBar";
import HeaderChat from "@/features/chat/HeaderChat";

import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Teams = () => {
  const currentUser = useSelector(selectAuth).user;
  const roomIsCalling = useSelector(selectRoomCalling);

  const navigate = useNavigate();
  function handleOpenRoom(id: number) {
    navigate(`${id}`);
  }

  if (!currentUser) return;
  return (
    <div className="flex h-full w-full flex-col gap-4 px-4">
      <HeaderChat user={currentUser} />

      <div className="grid h-[88%] grid-cols-7 gap-4">
        <div className="col-span-2 overflow-y-scroll bg-slate-200">
          <ChatSideBar
            handleOpenRoom={handleOpenRoom}
            roomIsCalling={roomIsCalling}
          />
        </div>
        <div className="col-span-5 h-full w-full bg-slate-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Teams;
