import axios from "axios";
import User from "../models/users.js";

export const requireAuth = async (req, res, next) => {
  console.log("checking authentication");
  // console.log("sessionId:", req.cookies);
  try {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      console.log("No session cookie, redirecting to login");
      // return res.redirect("/api/v1/auth/login");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findOne({ spotifyId: sessionId });
    if (!user) {
      console.log("Invalid session cookie, redirecting to login");
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Attach user to request for later middleware/handlers

    req.user = user;

    next();
  } catch (err) {
    console.error("Auth check error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const spotifyAuth = async (req, res, next) => {
  console.log("checking Spotify token");
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "User not found" });
    // console.log(Date.now() < user.tokenExpiresAt.getTime());

    // if access token still valid
    if (Date.now() < user.tokenExpiresAt.getTime()) {
      console.log("token is good");
      req.spotifyToken = user.accessToken;
      return next();
    }

    // refresh token
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: user.refreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
            ).toString("base64"),
        },
      }
    );

    const { access_token, expires_in } = response.data;

    // update DB
    user.accessToken = access_token;
    user.tokenExpiresAt = new Date(Date.now() + expires_in * 1000);

    await user.save();

    req.spotifyToken = access_token;
    next();
  } catch (err) {
    console.error("Spotify auth error:", err.message);
    res.status(401).json({ error: "Failed to refresh Spotify token" });
  }
};
