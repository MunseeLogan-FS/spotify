import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Spotify API Server!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
