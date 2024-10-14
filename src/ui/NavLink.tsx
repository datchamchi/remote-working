import { Link } from "react-router-dom";

type NavLinkProps = {
  name: string;
  to: string;
  currentPath: string;
  icon: React.ReactElement;
};
const NavLink = ({ name, to, currentPath, icon }: NavLinkProps) => {
  const isCurrentPage = currentPath === to;

  return (
    <div
      className={`flex h-full items-center pl-2 text-black ${
        isCurrentPage ? "bg-slate-200 font-medium" : "opacity-75"
      }`}
    >
      <Link
        to={to}
        className="flex w-full items-center justify-center gap-4 rounded-md p-1 md:justify-start"
      >
        {icon}
        <span className="hidden md:inline-block">{name}</span>
      </Link>
    </div>
  );
};

export default NavLink;
