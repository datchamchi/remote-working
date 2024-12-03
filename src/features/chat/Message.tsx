import { Messages } from "@/types/message.type";
import photo from "../../assets/images/default.jpg";
import { useSelector } from "react-redux";

import { useEffect, useRef } from "react";
import { selectAuth } from "@/app/authSlice";
const Message = ({ messages }: { messages: Messages[] | undefined }) => {
  const currentUser = useSelector(selectAuth).user;
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (ref)
      ref.current?.scrollIntoView({
        behavior: "smooth",
      });
  }, []);

  if (!messages) return;
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-scroll px-4 py-2">
      {messages.map((message) => (
        <div key={message.id}>
          {message.user.email !== currentUser?.email ? (
            <div className="flex items-center gap-2">
              <img
                src={message.user.photo?.path || photo}
                className="h-10 w-10 self-start rounded-full"
              />
              <div className="space-y-2">
                <p className="text-[10px]">{message.user.name}</p>
                {message.type === "text" ? (
                  <p className="rounded-lg rounded-tl-none bg-slate-500 px-4 py-2 text-sm text-white">
                    {message.content}
                  </p>
                ) : (
                  <img src={message.content} className="max-h-64 max-w-80" />
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {message.type === "text" ? (
                <p className="max-w-96 self-end rounded-lg rounded-br-none bg-primary px-4 py-2 text-sm text-white">
                  {message.content}
                </p>
              ) : (
                <img
                  src={message.content}
                  className="max-h-64 max-w-80 self-end object-contain"
                />
              )}
            </div>
          )}
        </div>
      ))}
      <div ref={ref} className="h-4 w-full"></div>
    </div>
  );
};

export default Message;
