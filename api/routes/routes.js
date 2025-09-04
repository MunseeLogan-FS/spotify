import { Router } from "express";
import { spotifyAuth, requireAuth } from "../middleware/middleware.js";
const router = Router();

import {
  myAccount,
  myAlbums,
  myArtists,
  myPlaylists,
  myTracks,
} from "../controllers/content_controller.js";

router.get("/me/", requireAuth, spotifyAuth, myAccount);
router.get("/my-albums/", requireAuth, spotifyAuth, myAlbums);
router.get("/my-artists/", requireAuth, spotifyAuth, myArtists);
router.get("/my-playlists/", requireAuth, spotifyAuth, myPlaylists);
router.get("/my-tracks/", requireAuth, spotifyAuth, myTracks);
// more routes may be added here
export default router;
