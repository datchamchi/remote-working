import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRooms } from "@/api/room-api";
import RoomRow from "./RoomRow";
import { RoomRowSkeleton } from "./RoomRowSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import { receiveCallSocket, receiveSocket } from "@/app/socketSlice";
import { AppDispatch } from "@/app/store";
import { SocketEvent } from "@/constant";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const ChatSideBar = ({
  handleOpenRoom,
  roomIsCalling,
}: {
  handleOpenRoom: (id: number) => void;
  roomIsCalling: number[];
}) => {
  const { roomId: currentRoom } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data, isSuccess, refetch, isLoading } = useQuery({
    queryKey: ["fetch_all_room"],
    queryFn: () => fetchAllRooms(),
  });

  useEffect(() => {
    dispatch(
      receiveSocket({ event: SocketEvent.END_CALL, refetchData: refetch }),
    );
  }, [dispatch, refetch]);
  useEffect(() => {
    dispatch(
      receiveCallSocket({
        event: SocketEvent.INVITE_CALL,
        navigate,
        refetchData: refetch,
      }),
    );
  }, [dispatch, navigate, refetch]);
  return (
    <div className="h-full p-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search"
          className="border-2 border-slate-600 focus-visible:border-none focus-visible:outline-none"
        />
        {/* <DialogSearchUser refetch={refetch}>
          <div className="cursor-pointer rounded-lg bg-slate-600 p-2">
            <HiPlus className="text-white" />
          </div>
        </DialogSearchUser> */}
      </div>
      <div className="flex-1 space-y-2 py-4">
        <ul className="flex text-sm">
          <li className="cursor-pointer space-y-2 p-2">
            <span className="font-semibold">Projects</span>

            <div className="h-1 w-full self-end bg-primary"></div>
          </li>
        </ul>
        {isLoading &&
          Array(2)
            .fill(0)
            .map((_, index) => <RoomRowSkeleton key={index} />)}
        {isSuccess &&
          data.map((room) => (
            <div
              key={room.id}
              onClick={() => handleOpenRoom(room.id)}
              className={`${currentRoom && currentRoom == "" + room.id ? "bg-slate-300" : ""} rounded-md`}
            >
              <RoomRow
                room={room}
                key={room.id}
                roomIsCalling={roomIsCalling}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatSideBar;
