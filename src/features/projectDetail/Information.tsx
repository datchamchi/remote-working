import { Input } from "@/components/ui/input";
import { Project } from "@/types/project.type";
import { converDate } from "@/utils/utils";
import { CalendarIcon } from "@radix-ui/react-icons";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import photo from "./../../assets/images/default.jpg";
import { User } from "@/types/user.type";
import { Button } from "@/components/ui/button";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { emitSocket } from "@/app/socketSlice";
import { SocketEvent } from "@/constant";
import { AppDispatch } from "@/app/store";

const Information = ({
  project,
  currentUser,
}: {
  project: Project;
  currentUser: User;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openInputInvite, setOpenInputInvite] = useState(false);
  const [emailInvite, setEmailInvite] = useState("");
  const listMember = project.users.filter(
    (user) => user.email !== currentUser.email,
  );

  function handleSendInvite() {
    dispatch(
      emitSocket({
        event: SocketEvent.INVITE_OTHER,
        data: {
          type: "invite",
          content: `${currentUser.name} invite you join project ${project.projectName}`,
          from: currentUser.email,
          to: emailInvite,
          project: project.key,
        },
      }),
    );
  }
  return (
    <div className="border-2 border-slate-600 px-4 py-4">
      <Accordion type="multiple" defaultValue={["member", "created", "more"]}>
        <AccordionItem value="member">
          <AccordionTrigger>Others</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center -space-x-4">
              {listMember.map((user, index) => (
                <TooltipProvider key={user.id}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar>
                        <AvatarImage
                          className={`z-${(index + 1) * 10}`}
                          src={user.photo?.path ?? photo}
                          alt={user.name}
                        />
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>{user.name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
            <div className="mb-4 mt-4">
              {/* {listMember.length === 0 && "No member"} */}
              {listMember.length <= 2
                ? listMember.map((user) => `${user.name}`).join(" and ")
                : `${listMember[0].name} and ${listMember.length - 1} others people`}
            </div>
            {project.leader === currentUser.email && (
              <div className="space-y-4">
                <Button onClick={() => setOpenInputInvite((cur) => !cur)}>
                  Invite Others
                </Button>
                {openInputInvite && (
                  <div className="relative mx-2">
                    <Input
                      placeholder="Enter email"
                      value={emailInvite}
                      onChange={(e) => setEmailInvite(e.target.value)}
                    />
                    {emailInvite && (
                      <HiOutlinePaperAirplane
                        className="absolute bottom-1/3 right-4 cursor-pointer"
                        onClick={handleSendInvite}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="leader">
          <AccordionTrigger>Leader</AccordionTrigger>
          <AccordionContent>
            <div className="relative text-primary">
              {project.leader !== currentUser.email
                ? project.leader
                : "You are leader"}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="created">
          <AccordionTrigger>Created At</AccordionTrigger>
          <AccordionContent>
            <div className="relative text-slate-900">
              <Input
                disabled={true}
                value={converDate(project.createdAt)}
                className="border-none px-6 font-semibold outline-none"
              />
              <CalendarIcon className="absolute bottom-2 left-0 mr-2 h-4 w-4" />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="more">
          <AccordionTrigger>More</AccordionTrigger>
          <AccordionContent>
            <div className="relative text-slate-900">
              <Button variant={"ghost"} className="border-2 border-slate-800">
                Delete Project
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Information;
