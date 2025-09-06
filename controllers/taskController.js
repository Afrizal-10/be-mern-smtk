const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({userId: req.user.id});
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: err.message});
  }
};

const createTask = async (req, res) => {
  try {
    const {title, description, course, deadline, photoUrl} = req.body;

    if (!title) return res.status(400).json({message: "Title wajib diisi"});

    let deadlineDate = null;
    if (deadline) {
      const d = new Date(deadline);
      if (isNaN(d))
        return res.status(400).json({message: "Format deadline salah"});
      deadlineDate = d;
    }

    const task = new Task({
      title,
      description: description || "",
      course: course || "",
      deadline: deadlineDate,
      photoUrl: photoUrl || "",
      userId: req.user.id,
      status: "pending",
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error("Error createTask:", err);
    res.status(500).json({message: "Gagal membuat task", error: err.message});
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({_id: req.params.id, userId: req.user.id});
    if (!task) return res.status(404).json({message: "Task tidak ditemukan"});

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: err.message});
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({_id: req.params.id, userId: req.user.id});
    if (!task) return res.status(404).json({message: "Task tidak ditemukan"});

    await task.deleteOne();
    res.status(200).json({message: "Task dihapus"});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: err.message});
  }
};

const completeTask = async (req, res) => {
  try {
    const task = await Task.findOne({_id: req.params.id, userId: req.user.id});
    if (!task) return res.status(404).json({message: "Task tidak ditemukan"});

    task.status = "selesai";
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: err.message});
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
};
