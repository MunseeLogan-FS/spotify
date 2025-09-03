import { Router } from "express";
import spotifyAuth from "../middleware/middleware.js";
const router = Router();

import {
  myAccount,
  myAlbums,
  myArtists,
  myPlaylists,
  myTracks,
} from "../controllers/content_controller.js";

router.get("/me/:id", spotifyAuth, myAccount);
router.get("/my-albums/:id", spotifyAuth, myAlbums);
router.get("/my-artists/:id", spotifyAuth, myArtists);
router.get("/my-playlists/:id", spotifyAuth, myPlaylists);
router.get("/my-tracks/:id", spotifyAuth, myTracks);
// more routes may be added here
export default router;
