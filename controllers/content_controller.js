// This is where the content controller is defined. It handles content-related routes.

export const myAccount = async (req, res) => {
  try {
    const token = req.spotifyToken;
    const user = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!user.ok) {
      throw new Error("Failed to fetch user data");
    }
    const userData = await user.json();
    res.json(userData);
  } catch (error) {
    console.error("Error fetching user account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
