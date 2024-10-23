import Header from "../../ui/Header";
import { User } from "../../types/user.type";

const HeaderOverview = ({ user }: { user: User }) => {
  return (
    <div>
      <Header path={user.photo?.path}>
        <div>
          <p className="text-xl font-medium text-primary">
            Welcome, {user.name}
          </p>
          <p className="text-sm tracking-widest">
            Let's finish your task today!
          </p>
        </div>
      </Header>
    </div>
  );
};

export default HeaderOverview;
