import NavLink from "./NavLink";
import logo from "./../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/auth/authSlice";

const Navbar = () => {
  const { pathname: currentPath } = useLocation();
  const currentUser = useSelector(selectAuth).user;
  useEffect(() => {
    const currentTitle = listLink.find((link) => link.to.includes(currentPath));
    if (currentTitle) document.title = currentTitle.name + " - Remote Work";
  }, [currentPath]);
  return (
    <div className="flex h-14 w-screen items-center justify-between border-b-2 border-slate-200 px-8">
      <div className="flex h-full gap-5">
        <Link to="/">
          <img src={logo} className="h-full" alt="Logo" />
        </Link>

        <ul className="flex items-center gap-5">
          {listLink.map(({ name, to }) => (
            <NavLink name={name} to={to} key={name} currentPath={currentPath} />
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-5">
        {currentUser ? (
          <>
            <input
              className="rounded-sm border-2 border-slate-400 pl-4"
              placeholder="Search "
            />

            <img
              src={currentUser.photo.path}
              className="h-10 w-10 rounded-full"
              alt="Avatar"
            />
          </>
        ) : (
          <>
            <button className="rounded-lg bg-slate-500 px-4 py-2 text-white hover:bg-slate-400">
              <Link to="/signup">Sign-up</Link>
            </button>
            <div>or</div>
            <button className="rounded-lg bg-slate-500 px-4 py-2 text-white hover:bg-slate-400">
              <Link to="/login">Login</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
