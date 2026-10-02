const express = require("express");
const router = express.Router();
const { getNotices, createNotice, deleteNotice } = require("../controllers/noticeController");
const { protect, authorizeRoles } = require("../middleware/auth");

router.get("/", protect, getNotices);
router.post("/", protect, authorizeRoles("admin"), createNotice);
router.delete("/:id", protect, authorizeRoles("admin"), deleteNotice);

module.exports = router;
