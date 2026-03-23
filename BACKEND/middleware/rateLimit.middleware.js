import rateLimit from "express-rate-limit";

// for guests — strict limit
export const guestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 requests per 15 minutes
  message: {
    message: "Too many requests, please sign up for more access",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// for logged in users — generous limit
export const userLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // max 50 requests per 15 minutes
  message: {
    message: "Too many requests, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});