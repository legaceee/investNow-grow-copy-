// startServer.js
import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { Server } from "socket.io";
import Redis from "ioredis";
import { subscriber } from "./utils/redisClient.js";

import app from "./app.js";
import prisma from "./config/prismaClient.js";
import updateStock from "./updateStocks.js";

const userSubscriptions = new Map();
//  Handle BigInt serialization for JSON
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    // Test DB connection
    await prisma.$connect();
    console.log(" Connected to PostgreSQL via Prisma");

    // Create HTTP server from Express app
    const server = createServer(app);

    // Attach Socket.IO to the server
    const io = new Server(server, {
      cors: { origin: "*" },
    });
    io.on("connection", (socket) => {
      console.log(`client connected: ${socket.id}`);

      socket.on("subscribe", (symbols) => {
        userSubscriptions.set(socket.id, new set(symbols));
        console.log(`${socket.id} subscribed to`, symbols);
      });
      socket.on("disconnect", () => {
        userSubscriptions.delete(socket.id);
        console.log(`client disconnected: ${socket.id}`);
      });
    });
    // Setup Redis
    await subscriber.subscribe("stock-prices");

    subscriber.on("message", (channel, message) => {
      if (channel === "stock-prices") {
        const updates = JSON.parse(message);

        //filter per client
        for (const [socketId, symbols] of userSubscriptions.entries()) {
          const socket = io.sockets.sockets.get(socketId);
          if (!socket) continue;

          const filtered = updates.filter((u) => symbols.has(u.symbol));
          if (filtered.length > 0) {
            socket.emit("price-update", filtered);
          }
        }
      }
    });
    // Start Express + Socket.IO server
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      updateStock(); // start updating prices automatically
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
