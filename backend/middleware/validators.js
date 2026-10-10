const { body, param, validationResult } = require("express-validator");

// Runs after the rules below. If any rule failed, stop here and reply with the first error message.
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};

const ROLES = ["student", "faculty", "admin"];
const CATEGORIES = ["Hostel", "Academics", "Infrastructure", "Faculty", "Other"];
const STATUSES = ["Pending", "In Progress", "Resolved"];

const registerRules = [
  body("name")
    .isString().withMessage("Name is required").bail()
    .trim()
    .isLength({ min: 2, max: 60 }).withMessage("Name must be between 2 and 60 characters"),
  body("email")
    .isString().withMessage("Email is required").bail()
    .trim()
    .isEmail().withMessage("Please enter a valid email address")
    .isLength({ max: 100 }).withMessage("Email is too long"),
  // bcrypt only reads the first 72 bytes of a password, so we cap it there.
  body("password")
    .isString().withMessage("Password is required").bail()
    .isLength({ min: 6, max: 72 }).withMessage("Password must be between 6 and 72 characters"),
  body("role").optional().isIn(ROLES).withMessage("Invalid role"),
  body("adminCode").optional().isString().isLength({ max: 100 }).withMessage("Invalid admin code"),
];

// Login only checks the shape of the input, not password strength,
// so people who registered earlier can still log in.
const loginRules = [
  body("email")
    .isString().withMessage("Email is required").bail()
    .trim()
    .isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isString().withMessage("Password is required").bail()
    .notEmpty().withMessage("Password is required"),
];

const complaintRules = [
  body("category").optional().isIn(CATEGORIES).withMessage("Invalid category"),
  body("description")
    .isString().withMessage("Description is required").bail()
    .trim()
    .isLength({ min: 10, max: 1000 }).withMessage("Description must be between 10 and 1000 characters"),
];

const noticeRules = [
  body("title")
    .isString().withMessage("Title is required").bail()
    .trim()
    .isLength({ min: 3, max: 120 }).withMessage("Title must be between 3 and 120 characters"),
  body("content")
    .isString().withMessage("Content is required").bail()
    .trim()
    .isLength({ min: 5, max: 5000 }).withMessage("Content must be between 5 and 5000 characters"),
];

const statusRules = [body("status").isIn(STATUSES).withMessage("Invalid status value")];

// Rejects malformed ids (like /api/notices/abc) before they reach the database.
const idRule = [param("id").isMongoId().withMessage("Invalid ID")];

module.exports = {
  handleValidation,
  registerRules,
  loginRules,
  complaintRules,
  noticeRules,
  statusRules,
  idRule,
};