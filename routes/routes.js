import { Router } from "express";
import spotifyAuth from "../middleware/middleware.js";
const router = Router();

import { myAccount } from "../controllers/content_controller.js";

router.get("/me/:id", spotifyAuth, myAccount);
// more routes may be added here
export default router;
