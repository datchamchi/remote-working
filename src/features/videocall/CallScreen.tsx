import { emitSocket } from "@/app/socketSlice";
import { AppDispatch } from "@/app/store";
import { SocketEvent } from "@/constant";
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamTheme,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

const CallScreen = ({ callId }: { callId: string | undefined }) => {
  const call = useCall();

  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const dispatch = useDispatch<AppDispatch>();
  const callingState = useCallCallingState();
  const particpants = useParticipantCount();

  useEffect(() => {
    if (callingState === CallingState.LEFT && particpants === 1) {
      dispatch(
        emitSocket({ event: SocketEvent.END_CALL, data: { roomId: callId } }),
      );
    }
  }, [particpants, callId, dispatch, callingState]);
  const navigate = useNavigate();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }
  if (!call) return;
  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls onLeave={() => navigate(`/your-teams/${callId}`)} />
    </StreamTheme>
  );
};

export default CallScreen;
