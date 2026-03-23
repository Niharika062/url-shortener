import express from "express";
import { shortenUrl, redirectUrl, getUserUrls } from "../controllers/url.controller.js";
import verifyToken from "../middleware/auth.middleware.js";
import { guestLimiter, userLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

// shorten URL — logged in users get higher limit
router.post("/shorten", verifyToken, userLimiter, shortenUrl);

// get user's URLs
router.get("/my-urls", verifyToken, getUserUrls);

export default router;