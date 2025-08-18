const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth_controller");

module.exports = router;

router.post("/login", authController.login);
// more routes may be added here

module.exports = router;
