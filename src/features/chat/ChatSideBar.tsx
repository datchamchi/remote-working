import { Input } from "@/components/ui/input";
import { HiPlus } from "react-icons/hi";
import DialogSearchUser from "./DialogSearchUser";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRooms } from "@/api/room-api";

const ChatSideBar = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["fetch_all_room"],
    queryFn: fetchAllRooms,
  });
  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search"
          className="border-2 border-slate-600 focus-visible:border-none focus-visible:outline-none"
        />
        <DialogSearchUser>
          <div className="cursor-pointer rounded-lg bg-slate-600 p-2">
            <HiPlus className="text-white" />
          </div>
        </DialogSearchUser>
      </div>
      <div>
        {isSuccess &&
          data.map((room) => (
            <div key={room.id}>
              {room.users.map((user) => (
                <p>{user.name}</p>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatSideBar;
