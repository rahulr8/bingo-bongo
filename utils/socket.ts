import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initSocket = () => {
  socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", {
    path: "/api/socket",
  });

  socket.on("connect", () => {
    console.log("Connected to socket");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket");
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initSocket first.");
  }
  return socket;
};
