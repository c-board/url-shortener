require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const { nanoid } = require("nanoid");

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Railway's hosted database
  }
});

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
    res
      .status(201)
      .json({ shortUrl: `${req.headers.host}/${result.rows[0].short_id}` });
  } catch (error) {
    console.error(error);
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

    const longUrl = result.rows[0].long_url;
    res.redirect(longUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
