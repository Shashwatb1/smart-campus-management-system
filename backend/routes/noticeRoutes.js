const express = require("express");
const router = express.Router();
const { getNotices, createNotice, deleteNotice } = require("../controllers/noticeController");
const { protect, authorizeRoles } = require("../middleware/auth");
const { noticeRules, idRule, handleValidation } = require("../middleware/validators");

router.get("/", protect, getNotices);
router.post("/", protect, authorizeRoles("admin"), noticeRules, handleValidation, createNotice);
router.delete("/:id", protect, authorizeRoles("admin"), idRule, handleValidation, deleteNotice);

module.exports = router;