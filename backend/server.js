// startServer.js
import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { Server } from "socket.io";
import Redis from "ioredis";

import app from "./app.js";
import prisma from "./config/prismaClient.js";
import updateStock from "./updateStocks.js";

// ✅ Handle BigInt serialization for JSON
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    // Test DB connection
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL via Prisma");

    // Create HTTP server from Express app
    const server = createServer(app);

    // Attach Socket.IO to the server
    const io = new Server(server, {
      cors: { origin: "*" },
    });

    // Setup Redis
    const redis = new Redis();
    redis.subscribe("stock-prices");

    redis.on("message", (channel, message) => {
      if (channel === "stock-prices") {
        const data = JSON.parse(message);
        io.emit("price-update", data); // broadcast to all connected clients
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
