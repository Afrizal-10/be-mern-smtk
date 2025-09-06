const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const {protect} = require("../middleware/authMiddleware");
const Task = require("../models/Task");

const router = express.Router();

router.route("/").get(protect, getTasks).post(protect, createTask);

router.put("/:id/complete", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({message: "Task tidak ditemukan"});
    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({message: "Tidak diizinkan"});
    }
    task.status = "selesai";
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
