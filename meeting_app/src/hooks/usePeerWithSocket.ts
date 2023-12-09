import { message } from "antd";
import { useState } from "react";
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
  const [peerConfig, setPeerConfig] = useState<any>({
    peerId: undefined,
  });

  const token = localStorage.getItem("access_token");
  if (!token) {
    message.warning("Token 失效，请先登录");
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
  const peer = new Peer(undefined, {
    path: "/peerjs",
    host: window.location.hostname,
    port: 3000,
  });

  peer.on("open", (id: string | number) => {
    socket.emit("join-meeting-room", {
      roomId: 1,
      token,
      userConfig: {
        peerId: id,
        isVideo: false,
        isAudio: false,
        isShareScreen: false,
      },
    });

    setPeerConfig({
      peerId: id,
    });
  });

  peer.on("disconnected", () => {
    peer.reconnect();
  });

  peer.on("call", async (call: any) => {
    console.log("peer on call event:", call);
    call.answer(null);
    call.on("stream", (remoteStream: any) => {
      console.log("peer on stream event:", remoteStream);
    });
  });

  return {
    peerConfig,
    socket,
    peer,
  };
}
