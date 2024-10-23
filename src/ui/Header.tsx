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
import React, { useState } from "react";
import { HiOutlineArrowLeftStartOnRectangle } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";

import Notify from "@/features/notify/Notify";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const Header = ({
  children,
  path,
}: {
  children: React.ReactElement;
  path: string | undefined;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  function handleLogout() {
    localStorage.clear();
    dispatch(logout());
    setTimeout(() => {
      navigate("/login");
    });
  }
  return (
    <div className="flex justify-between">
      {children}
      <div className="flex items-center gap-8">
        <Notify />

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
                onClick={() => setOpenDialog(true)}
                className="flex cursor-pointer items-center gap-2"
              >
                <HiOutlineArrowLeftStartOnRectangle />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <AlertDialog open={openDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Once you log out. Please login again
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant={"outline"} onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleLogout}> Continue</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Header;
