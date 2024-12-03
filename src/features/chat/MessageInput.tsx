import { emitSocket } from "@/app/socketSlice";
import { AppDispatch } from "@/app/store";
import { Input } from "@/components/ui/input";
import { SocketEvent } from "@/constant";
import { ResponseError } from "@/types/response.type";
import { AxiosError } from "axios";
import React, { useRef, useState } from "react";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const MessageInput = ({
  currentRoom,
  handleAddMessage,
}: {
  currentRoom: number | null;
  handleAddMessage: ({
    id,
    content,
    type,
  }: {
    id: number;
    content: string;
    type: "img" | "text";
  }) => void;
}) => {
  const [message, setMessage] = useState("");
  const inputFile = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  async function sendTextMessage() {
    try {
      if (!currentRoom) return;
      if (!message) return;
      await dispatch(
        emitSocket({
          event: SocketEvent.NEW_MESSAGE,
          data: { roomId: currentRoom, type: "text", content: message },
        }),
      );
      handleAddMessage({ type: "text", content: message, id: Math.random() });
      setMessage("");
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err.response?.data as ResponseError;
        toast.error(message);
      }
      setMessage("");
    }
  }
  function openChooseFile() {
    if (inputFile.current != null) inputFile.current.click();
  }
  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;
    if (files && files.length) {
      const file = files[0];
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return toast.error("Only accept png/jpeg");
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          emitSocket({
            event: SocketEvent.NEW_FILE_MESSAGE,
            data: { roomId: currentRoom, type: "img", content: reader.result },
          }),
        );
      };

      reader.readAsDataURL(files[0]);
    }
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendTextMessage();
    }
  };
  return (
    <div className="flex items-center gap-4 px-2">
      <div className="relative w-full">
        <input
          style={{ display: "none" }}
          accept=".png,.jpeg"
          ref={inputFile}
          onChange={handleFileUpload}
          type="file"
        />
        <HiPhoto
          onClick={openChooseFile}
          className="absolute bottom-1/4 left-4 cursor-pointer text-xl"
        />
        <Input
          value={message}
          onKeyDown={handleKeyDown}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message"
          className="boder-2 border-slate-600 px-12 py-2"
        />
        {message && (
          <HiPaperAirplane
            className="absolute bottom-1/3 right-4 cursor-pointer text-primary"
            onClick={sendTextMessage}
          />
        )}
      </div>
    </div>
  );
};

export default MessageInput;
