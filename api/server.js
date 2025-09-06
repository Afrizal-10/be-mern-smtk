const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("../config/db");
const serverless = require("serverless-http");

dotenv.config();
connectDB();

const app = express();

app.use(express.json({limit: "10mb"}));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", require("../routes/authRoutes"));
app.use("/api/tasks", require("../routes/taskRoutes"));
app.use("/api/upload", require("../routes/uploadRoutes"));
app.use("/api/blogs", require("../routes/blogRoutes"));
app.use("/api/jadwal", require("../routes/jadwalRoutes"));

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Local on port ${PORT}`));
}

app.get("/", (req, res) => {
  res.json({message: "✅ Backend SMTK API is running..."});
});

module.exports = serverless(app);
