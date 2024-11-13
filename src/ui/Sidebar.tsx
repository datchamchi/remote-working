import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineArrowRightStartOnRectangle,
  HiOutlineBookOpen,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineCog6Tooth,
  HiOutlineUserGroup,
  HiOutlineUserPlus,
} from "react-icons/hi2";

import logo from "./../assets/images/logo.png";
import NavLink from "./NavLink";
import { User } from "../types/user.type";

const listLinkLogin = [
  {
    name: "Tasks",
    to: "/your-tasks?page=1&time=deadline&type=all",
    icon: <HiOutlineBookOpen />,
  },
  {
    name: "Projects",
    to: "/your-projects",
    icon: <HiOutlineUserGroup />,
  },
  {
    name: "Messages",
    to: "/your-teams",
    icon: <HiOutlineChatBubbleLeftEllipsis />,
  },
  {
    name: "Account",
    to: "/your-account",
    icon: <HiOutlineCog6Tooth />,
  },
];
const listLinkNotLogin = [
  {
    name: "Login",
    to: "/login",
    icon: <HiOutlineArrowRightStartOnRectangle />,
  },
  {
    name: "Sign-up",
    to: "/signup",
    icon: <HiOutlineUserPlus />,
  },
];
const Sidebar = ({ currentUser }: { currentUser: User | null }) => {
  const { pathname: currentPath } = useLocation();
  const listLink = currentUser ? listLinkLogin : listLinkNotLogin;

  useEffect(() => {
    const currentTitle = listLink.find((link) => link.to.includes(currentPath));
    if (currentTitle) document.title = currentTitle.name + " - Remote Work";
  }, [currentPath, listLink]);

  return (
    <div className="h-screen border-slate-200 px-2 py-4 text-sm shadow-md lg:text-base">
      <div className="flex items-center justify-center gap-5 bg-white py-4 md:justify-start">
        <Link to="/">
          <img src={logo} className="w-16" alt="Logo" />
        </Link>
        <span className="hidden font-semibold md:inline-block">
          Remote Work
        </span>
      </div>
      <div className="space-y-4 py-4">
        {listLink.map(({ name, to, icon }) => (
          <NavLink
            name={name}
            to={to}
            key={name}
            icon={icon}
            currentPath={currentPath}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
