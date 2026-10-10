const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { loginLimiter, registerLimiter } = require("../middleware/rateLimiter");
const { registerRules, loginRules, handleValidation } = require("../middleware/validators");

router.post("/register", registerLimiter, registerRules, handleValidation, registerUser);
router.post("/login", loginLimiter, loginRules, handleValidation, loginUser);

module.exports = router;