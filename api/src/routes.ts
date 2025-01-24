import { Router } from "express";
import { shortenUrl, redirectToUrl } from "./controllers/urlController";

const router = Router();

// Health check route
router.get("/", (req, res) => {
  res.json({ status: "ok" });
});

// Generate a short URL
router.post("/shorten", shortenUrl);

// Redirect to the long URL
router.get("/:shortId", redirectToUrl);

export default router;
