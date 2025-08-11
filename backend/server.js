// server.js
// server.js
import app from "./app.js";
import dotenv from "dotenv";
import prisma from "./config/prismaClient.js"; // Use centralized Prisma instance

//  Add this to serialize BigInt in all JSON responses
BigInt.prototype.toJSON = function () {
  return this.toString();
};

dotenv.config();

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    // Test DB connection
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL via Prisma");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
