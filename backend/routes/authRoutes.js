const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { loginLimiter, registerLimiter } = require("../middleware/rateLimiter");

router.post("/register", registerLimiter, registerUser);
router.post("/login", loginLimiter, loginUser);

module.exports = router;