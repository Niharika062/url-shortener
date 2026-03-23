import { nanoid } from "nanoid";
import Url from "../models/url.model.js";
import redis from "../config/redis.js";

// SHORTEN URL
const shortenUrl = async (req, res) => {
  try {
    const { originalUrl, customAlias, expiresAt } = req.body;
    const userId = req.user?.userId || null;

    if (!originalUrl) {
      return res.status(400).json({ message: "Original URL is required" });
    }

    // check if custom alias already exists
    if (customAlias) {
      const existing = await Url.findOne({ customAlias });
      if (existing) {
        return res.status(400).json({ message: "Custom alias already taken" });
      }
    }

    const shortCode = customAlias || nanoid(6);

    const url = await Url.create({
      originalUrl,
      shortCode,
      customAlias: customAlias || null,
      expiresAt: expiresAt || null,
      createdBy: userId,
    });

    return res.status(201).json({
      message: "URL shortened successfully",
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      shortCode,
      originalUrl,
    });
  } catch (error) {
    console.log("SHORTEN ERROR:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// REDIRECT
const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    // check Redis cache first
    const cachedUrl = await redis.get(shortCode);
    if (cachedUrl) {
      console.log("Cache HIT ✅", shortCode);
      Url.findOneAndUpdate({ shortCode }, { $inc: { clickCount: 1 } }).exec();
      return res.redirect(cachedUrl);
    }

    console.log("Cache MISS ❌", shortCode);
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    // check expiry
    if (url.expiresAt && new Date() > url.expiresAt) {
      return res.status(410).json({ message: "URL has expired" });
    }

    // save in Redis for 24 hours
    await redis.set(shortCode, url.originalUrl, "EX", 86400);

    // increment click count asynchronously
    Url.findByIdAndUpdate(url._id, { $inc: { clickCount: 1 } }).exec();

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.log("REDIRECT ERROR:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// GET USER'S URLS
const getUserUrls = async (req, res) => {
  try {
    const userId = req.user.userId;

    const urls = await Url.find({ createdBy: userId }).sort({ createdAt: -1 });

    return res.status(200).json({ urls });
  } catch (error) {
    console.log("GET URLS ERROR:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export { shortenUrl, redirectUrl, getUserUrls };