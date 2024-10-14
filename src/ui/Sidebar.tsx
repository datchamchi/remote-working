import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineArrowLeftStartOnRectangle,
  HiOutlineArrowRightStartOnRectangle,
  HiOutlineBookOpen,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineCog6Tooth,
  HiOutlineSquares2X2,
  HiOutlineUserGroup,
  HiOutlineUserPlus,
} from "react-icons/hi2";

import logo from "./../assets/images/logo.png";
import NavLink from "./NavLink";
import { User } from "../types/user.type";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
const listLinkLogin = [
  {
    name: "Overview",
    to: "/overview",
    icon: <HiOutlineSquares2X2 />,
  },
  {
    name: "Tasks",
    to: "/your-tasks",
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

  const dispatch = useDispatch();
  function handleLogout() {
    localStorage.clear();
    dispatch(logout());
  }
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
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-4 rounded-md p-1 md:justify-start"
        >
          <HiOutlineArrowLeftStartOnRectangle />
          <span className="hidden md:inline-block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
