import { User } from "../../types/user.type";
import Header from "../../ui/Header";

const HeaderProject = ({ user }: { user: User }) => {
  return (
    <div>
      <Header path={user.photo?.path}>
        <div>
          <p className="text-xl font-medium">Projects</p>
        </div>
      </Header>
    </div>
  );
};

export default HeaderProject;
