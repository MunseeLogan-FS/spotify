import { generateRandomString } from "../utils/utils.js";
import querystring from "querystring";
import User from "../models/users.js";

const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;

export const login = (req, res) => {
  const state = generateRandomString(16);
  const scope =
    "user-read-private user-read-email user-library-read user-follow-read";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
};

export const callback = async (req, res) => {
  // console.log("callback");
  const code = req.query.code || null;
  const state = req.query.state || null;

  // console.log("state:", state);

  if (state === null) {
    console.error("State mismatch");
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
    return;
  }

  try {
    // console.log("callback fetch");
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + process.env.CLIENT_SECRET).toString(
              "base64"
            ),
        },
        body: querystring.stringify({
          code: code,
          redirect_uri: redirect_uri,
          grant_type: "authorization_code",
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error(
        "HTTP error fetching token:",
        tokenResponse.status,
        errorText
      );
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "invalid_token",
          })
      );
      return;
    }

    const tokenData = await tokenResponse.json();
    // console.log(tokenResponse);

    if (tokenData.error) {
      console.error("Error fetching token:", tokenData.error);
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "invalid_token",
          })
      );
      return;
    }

    const access_token = tokenData.access_token;
    const refresh_token = tokenData.refresh_token;
    const expires_in = tokenData.expires_in;

    // Fetch user profile
    const profileResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + access_token },
    });

    if (!profileResponse.ok) {
      console.error("Error fetching user profile:", profileResponse.statusText);
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "profile_fetch_error",
          })
      );
      return;
    }

    const profileData = await profileResponse.json();

    // Save or update user in the database
    let user = await User.findOne({ spotifyId: profileData.id });
    if (!user) {
      user = new User({
        spotifyId: profileData.id,
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpiresAt: new Date(Date.now() + expires_in * 1000),
      });
    } else {
      user.accessToken = access_token;
      user.refreshToken = refresh_token;
      user.tokenExpiresAt = new Date(Date.now() + expires_in * 1000);
    }
    await user.save();

    res.cookie("sessionId", profileData.id.toString(), {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      domain: "127.0.0.1",
    });

    // Redirect to frontend with tokens (Currently not redirecting due to no frontend at the moment)
    res.redirect(process.env.FRONTEND_URI);
    // res.redirect("http://127.0.0.1:3001");
  } catch (error) {
    console.error("Error during Spotify callback:", error);
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "callback_error",
        })
    );
  }
};
