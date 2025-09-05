const Task = require("../models/Task");

const getTasks = async (req, res) => {
  const tasks = await Task.find({userId: req.user._id});
  res.json(tasks);
};

const createTask = async (req, res) => {
  const {title, description, course, deadline, photoUrl} = req.body;
  const task = await Task.create({
    title,
    description,
    course,
    deadline,
    photoUrl,
    userId: req.user._id,
    status: "pending",
  });
  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({message: "Task tidak ditemukan"});
  if (task.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({message: "Tidak diizinkan"});
  }
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({message: "Task tidak ditemukan"});
  if (task.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({message: "Tidak diizinkan"});
  }
  await task.deleteOne();
  res.json({message: "Task dihapus"});
};

module.exports = {getTasks, createTask, updateTask, deleteTask};
