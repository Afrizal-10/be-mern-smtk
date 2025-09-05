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

const storage = multer.memoryStorage();
const upload = multer({storage});

// POST /api/blogs → multer middleware dipasang di route
router.post("/", upload.single("imageUrl"), createBlog);
router.put("/:id", upload.single("imageUrl"), updateBlog);

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.delete("/:id", deleteBlog);

module.exports = router;
