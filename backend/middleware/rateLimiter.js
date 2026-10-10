const rateLimit = require("express-rate-limit");

// Slows down password guessing. Only FAILED logins count toward the limit,
// so a real user who logs in successfully is never blocked.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many failed login attempts. Please try again in 15 minutes." },
});

// Limits how many accounts one IP address can create per hour.
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many accounts created from this network. Please try again later." },
});

// Limits complaint submissions per logged-in user (not per IP), so users on
// the same campus Wi-Fi don't block each other. Must run AFTER `protect`.
const complaintLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  keyGenerator: (req) => req.user.id,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "You have submitted too many complaints. Please try again later." },
});

module.exports = { loginLimiter, registerLimiter, complaintLimiter };