import { Router } from "express";
import { shortenUrl, redirectToUrl } from "./controllers/urlController.js";
const router = Router();
// Generate a short URL
router.post("/shorten", shortenUrl);
// Redirect to the long URL
router.get("/:shortId", redirectToUrl);
export default router;
