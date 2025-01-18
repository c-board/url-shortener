import dotenv from "dotenv";
import pg from "pg";
import { nanoid } from "nanoid";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();
const { Pool } = pg;

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.RAILWAY_USER,
  password: process.env.RAILWAY_PASSWORD,
  database: process.env.RAILWAY_DATABASE,
  max: 20,
  idleTimeoutMillis: 30000, // 60 seconds
  connectionTimeoutMillis: 5000, // 5 seconds
  ssl: {
    rejectUnauthorized: false // Required for Railway's hosted database
  }
});
console.log("pool:", pool);

// Debugging middleware
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
  })
);

app.options("*", cors()); // Handle preflight

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Generate a short URL
app.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "Long URL is required" });
  }

  try {
    const shortId = nanoid(7); // Generate a unique short ID
    const query =
      "INSERT INTO urls (short_id, long_url) VALUES ($1, $2) RETURNING short_id";
    const values = [shortId, longUrl];

    const result = await pool.query(query, values);
    res.status(201).json({
      shortUrl: `${req.protocol}://${req.get("host")}/${
        result.rows[0].short_id
      }`
    });
  } catch (error) {
    console.error("Error in /shorten:", error.message, error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Redirect to the long URL
app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  try {
    const query = "SELECT long_url FROM urls WHERE short_id = $1";
    const values = [shortId];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.redirect(result.rows[0].long_url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
