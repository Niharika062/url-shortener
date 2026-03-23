import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // 🔥 MUST BE FIRST
import "./config/redis.js";
import connectDB from "./db/index.js";
import app from "./app.js";

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`Server is running at port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB connection failed", error);
  });
