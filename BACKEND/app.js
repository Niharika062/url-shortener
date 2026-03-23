import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import urlRoutes from "./routes/url.routes.js";
import { redirectUrl } from "./controllers/url.controller.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
}));

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);

// redirect route — must be last
app.get("/:shortCode", redirectUrl);

// test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

export default app;