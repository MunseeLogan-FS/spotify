// This is where the content controller is defined. It handles content-related routes.

export const myAccount = async (req, res) => {
  try {
    const token = req.spotifyToken;
    console.log(token);
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

export const myAlbums = async (req, res) => {
  try {
    const token = req.spotifyToken;
    console.log(token);
    const albums = await fetch("https://api.spotify.com/v1/me/albums", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(albums);
    if (!albums.ok) {
      throw new Error("Failed to fetch user albums");
    }
    const albumsData = await albums.json();
    res.json(albumsData);
  } catch (error) {
    console.error("Error fetching user albums:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const myArtists = async (req, res) => {
  try {
    const token = req.spotifyToken;
    const artists = await fetch(
      "https://api.spotify.com/v1/me/following?type=artist",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!artists.ok) {
      throw new Error("Failed to fetch user artists");
    }
    const artistsData = await artists.json();
    res.json(artistsData);
  } catch (error) {
    console.error("Error fetching user artists:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const myPlaylists = async (req, res) => {
  try {
    const token = req.spotifyToken;
    const playlists = await fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!playlists.ok) {
      throw new Error("Failed to fetch user playlists");
    }
    const playlistsData = await playlists.json();
    res.json(playlistsData);
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const myTracks = async (req, res) => {
  try {
    const token = req.spotifyToken;
    const tracks = await fetch("https://api.spotify.com/v1/me/tracks", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!tracks.ok) {
      throw new Error("Failed to fetch user tracks");
    }
    const tracksData = await tracks.json();
    res.json(tracksData);
  } catch (error) {
    console.error("Error fetching user tracks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
