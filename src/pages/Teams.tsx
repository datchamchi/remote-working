import { selectAuth } from "@/features/auth/authSlice";
import ChatContent from "@/features/chat/ChatContent";
import ChatSideBar from "@/features/chat/ChatSideBar";
import HeaderChat from "@/features/chat/HeaderChat";
import { useSelector } from "react-redux";

const Teams = () => {
  const currentUser = useSelector(selectAuth).user;

  if (!currentUser) return;
  return (
    <div className="flex flex-1 flex-col gap-4 pt-4">
      <HeaderChat user={currentUser} />
      <div className="grid flex-1 grid-cols-6 gap-4">
        <div className="col-span-2 bg-slate-200">
          <ChatSideBar />
        </div>
        <div className="col-span-4 bg-red-200">
          <ChatContent />
        </div>
      </div>
    </div>
  );
};

export default Teams;
