import { message } from "antd";
import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import io from "socket.io-client";

declare const Peer: any;

const config = {
  url: "http://localhost:3000",
};

export class Socket {
  private socket: any;

  constructor(options = {}) {
    this.socket = io(config.url, options);
  }

  on(eventName: string, callback: Function) {
    this.socket.on(eventName, callback);
  }
  onConnected(callback: Function): void {
    this.on("connection", callback);
  }

  onDisConnected(callback: Function): void {
    this.on("disconnect", callback);
  }
  emit(eventName: string, data: any = null) {
    this.socket.emit(eventName, data);
  }

  reConnect() {
    this.socket.connect();
  }

  disConnected() {
    this.socket.disconnect();
  }
}

export function usePeerWithSocket() {
  const [peer, setPeer] = useState<any>({
    instance: null,
    config: {
      peerId: undefined,
    },
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const userId = searchParams.get("userId");
  const nickname = searchParams.get("nickname");
  const socketRef = useRef<any>(null);
  const getToken = () => {
    return localStorage.getItem("access_token");
  };
  function init() {
    const token = getToken();
    if (!token) {
      message.warning("Token 失效，请先登录");
      navigate("/login");
      return;
    }
    const socket_options = {
      extraHeaders: {
        token,
      },
      auth: {
        token,
      },
    };
    const socket = new Socket(socket_options);
    socketRef.current = socket;

    const peer = new Peer(`${userId}-${nickname}`, {
      path: "/peerjs",
      host: window.location.hostname,
      port: 3000,
    });
    peer.on("open", (id: string | number) => {
      setPeer({
        peer,
        config: {
          peerId: id,
        },
      });
      socket.emit("join-meeting-room", {
        roomId: roomId,
        token,
        userConfig: {
          peerId: id,
          isVideo: false,
          isAudio: false,
          isShareScreen: false,
        },
      });
    });

    peer.on("disconnected", () => {
      peer.reconnect();
    });

    peer.on("call", async (call: any) => {
      call.on("stream", (remoteStream: any) => {
        const video: HTMLVideoElement = document.getElementById(
          "share-video"
        ) as HTMLVideoElement;
        if (video) {
          video.srcObject = remoteStream;
          video.muted = false;
          video.play();
        }
      });
    });
  }

  return {
    peer,
    socketRef,
    init,
    getToken,
  };
}
