const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Hostel", "Academics", "Infrastructure", "Faculty", "Other"],
      default: "Other",
    },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    // How urgent the complaint is, as a label the admin sees.
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Medium",
  },
  // Finer ordering inside the same label (0 to 100). Used only to sort complaints that share a priority.
  urgencyScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 50,
  },
  // One-line explanation of why this priority was chosen (filled by the AI later).
  priorityReason: {
    type: String,
    default: "",
  },
  // Who set the priority: the system default, the AI, or an admin override.
  prioritySource: {
    type: String,
    enum: ["default", "ai", "admin"],
    default: "default",
  },
    raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
