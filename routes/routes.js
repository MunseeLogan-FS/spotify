import { Router } from "express";
const router = Router();

import { getAllContent } from "../controllers/content_controller";

router.get("/", getAllContent);
// more routes may be added here
export default router;
