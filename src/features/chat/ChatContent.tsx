import InforRoom from "./InforRoom";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useQuery } from "@tanstack/react-query";
import { fetchRoom } from "@/api/room-api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import { receiveSendImageSuccess, receiveSocket } from "@/app/socketSlice";
import { SocketEvent } from "@/constant";

import { Messages } from "@/types/message.type";
import { useParams } from "react-router-dom";
import { selectAuth } from "@/app/authSlice";

const ChatContent = () => {
  const { roomId: currentRoom } = useParams<"roomId">();
  const {
    data: room,
    // isFetching,
    refetch,
  } = useQuery({
    queryKey: ["fetch_room", currentRoom],
    queryFn: () => fetchRoom(currentRoom),
  });
  const currentUser = useSelector(selectAuth).user;
  const dispatch = useDispatch<AppDispatch>();
  const [messages, setMessages] = useState<Messages[]>([]);
  function handleAddMessage({
    content,
    type,
    id,
  }: {
    content: string;
    type: "text" | "img";
    id: number;
  }) {
    if (currentUser) {
      setMessages([...messages, { content, type, user: currentUser, id }]);
    }
  }
  useEffect(() => {
    if (room) setMessages(room.messages);
  }, [room]);
  useEffect(() => {
    dispatch(
      receiveSocket({ event: SocketEvent.NEW_MESSAGE, refetchData: refetch }),
    );
    dispatch(
      receiveSendImageSuccess({
        event: SocketEvent.NEW_FILE_MESSAGE,
        refetchData: refetch,
      }),
    );
  }, [dispatch, refetch]);

  if (room)
    return (
      <div className="flex h-full flex-col">
        <div>
          <InforRoom room={room} />
        </div>
        <div className="h-[500px]">
          <Message messages={messages} />
        </div>
        <div className="mb-2 mt-auto">
          <MessageInput
            currentRoom={Number(currentRoom)}
            handleAddMessage={handleAddMessage}
          />
        </div>
      </div>
    );
};

export default ChatContent;
