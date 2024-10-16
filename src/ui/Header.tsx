import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import photo from "./../assets/images/default.jpg";
import React from "react";
import {
  HiOutlineArrowLeftStartOnRectangle,
  HiOutlineBell,
} from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = ({
  children,
  path,
}: {
  children: React.ReactElement;
  path: string | undefined;
}) => {
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.clear();
    dispatch(logout());
  }
  return (
    <div className="flex justify-between">
      {children}
      <div className="flex items-center gap-5">
        <Popover>
          <PopoverTrigger className="cursor-pointer">
            <HiOutlineBell className="text-lg" />
          </PopoverTrigger>
          <PopoverContent>Hello World</PopoverContent>
        </Popover>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={path ?? photo} alt="Avatar" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Setting</DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-2"
              >
                <HiOutlineArrowLeftStartOnRectangle />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
