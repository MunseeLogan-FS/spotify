import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  spotifyId: { type: String, required: true, unique: true },
  accessToken: String,
  refreshToken: String,
  tokenExpiresAt: Date,
});

export default mongoose.model("User", userSchema);
