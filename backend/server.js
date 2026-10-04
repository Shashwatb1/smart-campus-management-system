require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

// Middleware
// FRONTEND_URL should be your deployed frontend's URL (e.g. https://your-app.vercel.app).
// Falls back to allowing all origins if unset, so local development still works unchanged.
app.use(
  cors(
    process.env.FRONTEND_URL
      ? { origin: process.env.FRONTEND_URL }
      : undefined
  )
);
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/complaints", complaintRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Nivaran API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
