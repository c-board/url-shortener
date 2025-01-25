import { Router } from "express";
import { shortenUrl, redirectToUrl } from "./controllers/urlController";
import { shortenLimiter, redirectLimiter } from "./middleware/rateLimiter";

const router = Router();

// Health check route
router.get("/", (req, res) => {
  res.json({ status: "ok" });
});

// Generate a short URL
router.post("/shorten", shortenLimiter, shortenUrl);

// Redirect to the long URL
router.get("/:shortId", redirectLimiter, redirectToUrl);

export default router;
