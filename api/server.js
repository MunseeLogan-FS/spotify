import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "https://myspotapp.netlify.app",
    credentials: true,
  })
);

app.use(cookieParser());
const PORT = process.env.PORT || 3001;

import routes from "./routes/routes.js";
import authRouter from "./routes/auth.js";

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "spotify",
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(express.json());

// app.use("/api/v1/content", routes);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/content", routes);

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Spotify API Server!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.BACKEND_URI}`);
});
