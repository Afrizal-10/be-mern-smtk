const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const multer = require("multer");
const {protect} = require("../middleware/authMiddleware");

const storage = multer.memoryStorage();
const upload = multer({storage});

// Semua route yang membutuhkan user login pakai middleware protect
router.get("/", protect, getBlogs);
router.get("/:id", protect, getBlogById);
router.post("/", protect, upload.single("imageUrl"), createBlog); // protect dulu, baru upload
router.put("/:id", protect, upload.single("imageUrl"), updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
