import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!(res.socket as any).server.io) {
    console.log("New Socket.io server...");
    const httpServer: NetServer = (res.socket as any).server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socket",
    });
    (res.socket as any).server.io = io;

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("joinRoom", (code: string) => {
        socket.join(code);
        console.log(`Client joined room: ${code}`);
      });

      socket.on("leaveRoom", (code: string) => {
        socket.leave(code);
        console.log(`Client left room: ${code}`);
      });

      socket.on("updateGrid", ({ code, grid }) => {
        io.to(code).emit("gridUpdate", grid);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }
  res.end();
};

export default SocketHandler;
