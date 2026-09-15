const express = require("express");
const Task = require("../models/Task");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", protect, async (req, res) => {
  try {
    const [totalUsers, totalTasks] = await Promise.all([
      User.countDocuments(),
      Task.countDocuments(),
    ]);

    res.json({ totalUsers, totalTasks });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/tasks", protect, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
