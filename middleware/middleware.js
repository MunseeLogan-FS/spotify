import axios from "axios";
import User from "../models/users.js"; // mongoose model

const spotifyAuth = async (req, res, next) => {
  console.log("test:", req.params);
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
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

export default spotifyAuth;
