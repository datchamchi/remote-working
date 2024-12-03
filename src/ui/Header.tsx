import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeftStartOnRectangle } from "react-icons/hi2";

import Notify from "@/features/notify/Notify";
import photo from "./../assets/images/default.jpg";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { disconnectFromSocket } from "@/app/socketSlice";
import { AppDispatch } from "@/app/store";
import { logout, selectAuth } from "@/app/authSlice";

const Header = ({
  children,
  path,
}: {
  children: React.ReactElement;
  path: string | undefined;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectAuth).user;
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  function handleLogout() {
    localStorage.clear();
    dispatch(logout());
    dispatch(disconnectFromSocket());
    setTimeout(() => {
      navigate("/login");
    });
  }
  return (
    <div className="flex justify-between px-4 pt-8">
      {children}
      <div className="flex items-center gap-8">
        <Notify />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={path ?? photo} alt="Avatar" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{currentUser?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/your-account")}>
              Setting
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpenDialog(true)}
              className="flex cursor-pointer items-center gap-2"
            >
              <HiOutlineArrowLeftStartOnRectangle />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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

export default React.memo(Header);
