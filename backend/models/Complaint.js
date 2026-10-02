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
    raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
