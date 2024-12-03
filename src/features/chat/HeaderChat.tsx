import { User } from "../../types/user.type";
import Header from "../../ui/Header";

const HeaderChat = ({ user }: { user: User }) => {
  return (
    <Header path={user.photo?.path}>
      <div className="space-y-2">
        <p className="text-xl font-medium text-primary">Chat</p>
        <p className="text-sm tracking-widest">Connect with your team</p>
      </div>
    </Header>
  );
};

export default HeaderChat;
