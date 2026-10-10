const express = require("express");
const router = express.Router();
const {
  getComplaints,
  createComplaint,
  updateComplaintStatus,
  getComplaintStats,
} = require("../controllers/complaintController");
const { protect, authorizeRoles } = require("../middleware/auth");
const { complaintLimiter } = require("../middleware/rateLimiter");
const { complaintRules, statusRules, idRule, handleValidation } = require("../middleware/validators");

router.get("/stats", protect, authorizeRoles("admin"), getComplaintStats);
router.get("/", protect, getComplaints);
router.post(
  "/",
  protect,
  authorizeRoles("student", "faculty"),
  complaintRules,
  handleValidation,
  complaintLimiter,
  createComplaint
);
router.patch(
  "/:id/status",
  protect,
  authorizeRoles("admin"),
  idRule,
  statusRules,
  handleValidation,
  updateComplaintStatus
);

module.exports = router;