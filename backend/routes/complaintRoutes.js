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

router.get("/stats", protect, authorizeRoles("admin"), getComplaintStats);
router.get("/", protect, getComplaints);
router.post("/", protect, authorizeRoles("student", "faculty"), complaintLimiter, createComplaint);
router.patch("/:id/status", protect, authorizeRoles("admin"), updateComplaintStatus);

module.exports = router;
