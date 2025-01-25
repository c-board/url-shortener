import dotenv from "dotenv";

import pg from "pg";
const { Pool } = pg;

dotenv.config();

export const pool = new Pool({
  host: process.env.HOST,
  port: Number(process.env.PORT),
  user: process.env.RAILWAY_USER,
  password: process.env.RAILWAY_PASSWORD,
  database: process.env.RAILWAY_DATABASE,
  max: 20,
  idleTimeoutMillis: 30000, // 60 seconds
  connectionTimeoutMillis: 5000, // 5 seconds
  ssl: false,
});

// Add error handler
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});
