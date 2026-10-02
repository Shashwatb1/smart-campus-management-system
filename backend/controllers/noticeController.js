const Notice = require("../models/Notice");

// GET /api/notices  (any logged-in user)
const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().populate("postedBy", "name role").sort({ createdAt: -1 });
    res.status(200).json(notices);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notices", error: err.message });
  }
};

// POST /api/notices  (admin only)
const createNotice = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const notice = await Notice.create({
      title,
      content,
      postedBy: req.user.id,
    });

    res.status(201).json(notice);
  } catch (err) {
    res.status(500).json({ message: "Failed to create notice", error: err.message });
  }
};

// DELETE /api/notices/:id  (admin only)
const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    await notice.deleteOne();
    res.status(200).json({ message: "Notice deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete notice", error: err.message });
  }
};

module.exports = { getNotices, createNotice, deleteNotice };
