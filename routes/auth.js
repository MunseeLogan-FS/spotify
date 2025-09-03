import { Router } from "express";
const router = Router();

import { login, callback } from "../controllers/auth_controller.js";
import spotifyAuth from "../middleware/middleware.js";

router.get("/login", login);
router.get("/callback", callback);
// more routes may be added here

export default router;
