import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv"; // Import dotenv

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

// 서버 시작 로직을 분리
if (process.env.NODE_ENV !== "test") {
  const port = 3001;
  mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/board")
    .then(() => {
      app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
      });
    });
}

export default app; // 테스트를 위해 app을 export
