import { RequestHandler } from "express";
import { pool } from "../db";
import { v4 as uuidv4 } from "uuid";
import { isURL } from "validator";

pool.on("error", (err: any) => {
  console.error("Unexpected error on idle client", err);
});

export const shortenUrl: RequestHandler = async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    res.status(400).json({ error: "Long URL is required" });
    return;
  }

  if (!isURL(longUrl, { require_protocol: true })) {
    res.status(400).json({ error: "Invalid URL format" });
    return;
  }

  try {
    const shortId = uuidv4().slice(0, 7);

    const query =
      "INSERT INTO urls (short_id, long_url) VALUES ($1, $2) RETURNING short_id";
    const values = [shortId, longUrl];

    const result = await pool.query(query, values);
    res.status(201).json({
      shortUrl: `${req.protocol}://${req.get("host")}/${
        result.rows[0].short_id
      }`,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in /shorten:", error.message, error.stack);
    } else {
      console.error("Error in /shorten:", error);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const redirectToUrl: RequestHandler = async (req, res) => {
  const { shortId } = req.params;

  try {
    const query = "SELECT long_url FROM urls WHERE short_id = $1";
    const values = [shortId];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "URL not found" });
      return;
    }

    res.redirect(result.rows[0].long_url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
