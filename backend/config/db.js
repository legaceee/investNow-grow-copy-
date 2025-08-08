// backend/config/db.js
import pkg from "pg";
const { Pool } = pkg;

// Create a new pool instance
const pool = new Pool({
  user: "admin", // your PostgreSQL username
  host: "localhost", // your DB host
  database: "mydatabase", // your DB name
  password: "admin123", // your PostgreSQL password
  port: 5432, // default PostgreSQL port
});

// Optional: check connection
pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ DB connection error:", err));

export default pool;
