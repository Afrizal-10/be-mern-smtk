const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({message: "User tidak ditemukan"});
    const tasks = await Task.find({userId: req.user._id});
    res.json(tasks);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const createTask = async (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({message: "User tidak ditemukan"});

    const {title, description, course, deadline, photoUrl} = req.body;

    if (!title) return res.status(400).json({message: "Title wajib diisi"});

    // validasi deadline
    let deadlineDate = null;
    if (deadline) {
      const d = new Date(deadline);
      if (isNaN(d))
        return res.status(400).json({message: "Format deadline salah"});
      deadlineDate = d;
    }

    const task = await Task.create({
      title,
      description: description || "",
      course: course || "",
      deadline: deadlineDate,
      photoUrl: photoUrl || "",
      userId: req.user._id,
      status: "pending", // tetap default pending
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Error createTask:", err);
    res.status(500).json({message: "Gagal membuat task", error: err.message});
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({message: "Task tidak ditemukan"});
    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({message: "Tidak diizinkan"});
    }

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({message: "Task tidak ditemukan"});
    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({message: "Tidak diizinkan"});
    }
    await task.deleteOne();
    res.json({message: "Task dihapus"});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

module.exports = {getTasks, createTask, updateTask, deleteTask};
