const express = require("express");
const router = express.Router();

const contentController = require("../controllers/content_controller");

router.get("/", contentController.getAllContent);
// more routes may be added here
module.exports = router;
