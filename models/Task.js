const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    description: String,
    course: String,
    deadline: Date,
    status: {
      type: String,
      enum: ["belum selesai", "selesai", "pending"],
      default: "belum selesai",
    },
    photoUrl: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  },
  {timestamps: true}
);

module.exports = mongoose.model("Task", taskSchema);
