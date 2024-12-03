import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import type { User } from "@stream-io/video-react-sdk";

import { useSelector } from "react-redux";
import photo from "../assets/images/default.jpg";
import CallScreen from "@/features/videocall/CallScreen";
import { useParams } from "react-router-dom";
import { selectAuth } from "@/app/authSlice";

const VideoCall = () => {
  const { user } = useSelector(selectAuth);
  const { callId } = useParams<"callId">();

  const userStream: User = {
    id: import.meta.env.VITE_STREAM_USERID,
    name: user?.name,
    image: user?.photo?.path || photo,
  };
  const client = new StreamVideoClient({
    apiKey: import.meta.env.VITE_STREAM_API,
    user: userStream,
    token: import.meta.env.VITE_STREAM_TOKEN,
  });
  if (!callId) return;
  const call = client.call("default", callId);
  call.join({ create: true });
  return (
    <div className="h-full w-full">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <CallScreen callId={callId} />
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

export default VideoCall;
