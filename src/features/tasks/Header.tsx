import { User } from "../../types/user.type";
import Header from "../../ui/Header";

const HeaderTask = ({ user }: { user: User }) => {
  return (
    <div>
      <Header path={user.photo?.path}>
        <div>
          <p className="text-xl font-medium text-primary">Explore Task</p>
        </div>
      </Header>
    </div>
  );
};

export default HeaderTask;
