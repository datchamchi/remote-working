import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { HiOutlineBell } from "react-icons/hi2";

const Header = ({
  children,
  path,
}: {
  children: React.ReactElement;
  path: string;
}) => {
  return (
    <div className="flex justify-between">
      {children}
      <div className="flex items-center gap-5">
        <div>
          <HiOutlineBell className="text-lg" />
        </div>
        <div>
          <TooltipProvider>
            <Tooltip delayDuration={75}>
              <TooltipTrigger>
                <Avatar>
                  <AvatarImage src={path} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-500" side="bottom">
                <p>Manage your account</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Header;
