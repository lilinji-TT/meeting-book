/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { usePeerWithSocket } from "../../hooks/usePeerWithSocket";
import "./live-room.css";
interface User {
  userId: string;
  nickname: string;
}

interface RoomState {
  isSharing: boolean;
  isAudioPlay: boolean;
}

export function LiveRoom() {
  const { socketRef, peer } = usePeerWithSocket();
  const [users, setUsers] = useState<User[]>([]);
  const currentStreamRef = useRef<any>(null);
  const [room, setRoom] = useState<RoomState>({
    isSharing: false,
    isAudioPlay: false,
  });

  // create an Empty media stream
  const createEmptyMediaStream = () => {
    return new MediaStream();
  };
  const call = async (isVideo = true, isAudio = true) => {
    if (room.isSharing || room.isAudioPlay) {
      stop();
      return;
    }
    // handle every peerId
    const toHandlePeerId = (user: User) => {
      return `${user.userId}-${user.nickname}`;
    };

    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: isVideo,
        audio: isAudio,
      });
      currentStreamRef.current = mediaStream;
      if (peer.instance) {
        // share media stream （video or audio） to all user in room
        for (let i = 0; i < users.length; i++) {
          const callId = toHandlePeerId(users[i]);
          peer.instance.call(callId, mediaStream);
        }

        // save the stauts of the current room
        setRoom({
          isSharing: isVideo,
          isAudioPlay: isAudio,
        });
      }
    } catch (err) {
      console.log("user has canceled share", err);
    }
  };

  // handle stop media stream both video and audio
  const stop = () => {
    if (currentStreamRef.current) {
      currentStreamRef.current.getTracks().forEach((track: any) => {
        track.stop();
      });
      currentStreamRef.current = null;
      setRoom({
        isSharing: false,
        isAudioPlay: false,
      });
    }
  };

  // get all users in room when component mounted
  useEffect(() => {
    socketRef.current.on("getAllUsersInRoom", (event: any) => {
      setUsers(event["data"] as User[]);
    });
  }, []);
  return (
    <div className="live-meeting-room-container">
      <div className="share-video-box">
        <video id="share-video"></video>
        <div className="operation-box">
          <button onClick={() => call(false, true)}>打开声音</button>
          <button onClick={() => call()}>共享屏幕</button>
          <button>查看聊天</button>
        </div>
      </div>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.userId}>
            <span>{user.nickname}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
