import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-memories-app.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/posts", postRoutes);
const PORT = process.env.PORT || 5000;

const CONNECTION_URL = process.env.MONGO_URI;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
