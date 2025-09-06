const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("../config/db");
const serverless = require("serverless-http");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json({limit: "10mb"}));

// Import routes
const authRoutes = require("../routes/authRoutes");
const taskRoutes = require("../routes/taskRoutes");
const uploadRoutes = require("../routes/uploadRoutes");
const blogRoutes = require("../routes/blogRoutes");
const jadwalRoutes = require("../routes/jadwalRoutes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/jadwal", jadwalRoutes);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running locally on port ${PORT}`)
  );
}

module.exports = app;
module.exports.handler = serverless(app);
