import { Room } from "@/types/room.type";
import photo from "./../../assets/images/default.jpg";
import { HiUserGroup } from "react-icons/hi2";
import { ImPhoneHangUp } from "react-icons/im";
const RoomRow = ({ room }: { room: Room; roomIsCalling: number[] }) => {
  const users = room.users;
  const nameRoom = room.name
    ? room.name
    : users.length == 1
      ? users[0].name
      : `${users[0].name} and ${users.length - 1} others`;
  return (
    <div className="grid h-20 cursor-pointer grid-cols-4 items-center gap-4 rounded-md p-2 hover:bg-slate-300">
      <div className="col-span-1">
        {room.name ? (
          <HiUserGroup className="w-full rounded-full text-2xl" />
        ) : users.length === 1 ? (
          <img
            src={users[0].photo?.path || photo}
            className="w-full rounded-full"
          />
        ) : (
          <div className="flex flex-col">
            <img
              src={users[0].photo?.path || photo}
              className="w-2/3 self-end rounded-full"
            />
            <img
              src={users[1].photo?.path || photo}
              className="w-2/3 -translate-y-1/2 transform rounded-full"
            />
          </div>
        )}
      </div>
      <div className="col-span-3 flex flex-col space-y-2">
        <div className="text-sm font-semibold">{nameRoom}</div>
        {room.isCalling && (
          <div className="flex w-24 items-center gap-2 text-[12px]">
            <div className="rounded-full bg-red-600 p-1">
              <ImPhoneHangUp className="text-white" />
            </div>
            <span className="font-semibold text-red-500">Calling</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomRow;
