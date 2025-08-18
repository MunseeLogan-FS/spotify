import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;

const routes = require("./routes/routes");
const authRouter = require("./routes/auth");

app.use(express.json());

app.use("/api/v1/content", routes);
app.use("/api/v1/auth", authRouter);

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Spotify API Server!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
