const Complaint = require("../models/Complaint");

// GET /api/complaints
// Admin sees all complaints; student/faculty see only their own
const getComplaints = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { raisedBy: req.user.id };
    const complaints = await Complaint.find(filter)
      .populate("raisedBy", "name role email")
      .sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch complaints", error: err.message });
  }
};

// POST /api/complaints  (student/faculty)
const createComplaint = async (req, res) => {
  try {
    const { category, description } = req.body;
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    const complaint = await Complaint.create({
      category,
      description,
      raisedBy: req.user.id,
    });

    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Failed to create complaint", error: err.message });
  }
};

// PATCH /api/complaints/:id/status  (admin only)
const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    res.status(200).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Failed to update complaint", error: err.message });
  }
};

// GET /api/complaints/stats  (admin only) — powers the dashboard counts
const getComplaintStats = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const inProgress = await Complaint.countDocuments({ status: "In Progress" });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });

    res.status(200).json({ total, pending, inProgress, resolved });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
};

module.exports = { getComplaints, createComplaint, updateComplaintStatus, getComplaintStats };
