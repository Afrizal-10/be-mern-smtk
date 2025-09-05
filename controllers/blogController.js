const Blog = require("../models/Blog");
const cloudinary = require("../utils/cloudinary");

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const {title, description} = req.body;

    if (!title || !description) {
      return res.status(400).json({message: "Title & description wajib"});
    }

    let imageUrl = "";
    if (req.file) {
      // Upload file ke Cloudinary
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {folder: "blogs"},
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    } else {
      return res.status(400).json({message: "File gambar wajib di-upload!"});
    }

    const blog = await Blog.create({title, description, imageUrl});
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: error.message});
  }
};

// GET ALL BLOGS
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({createdAt: -1});
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: error.message});
  }
};

// GET BLOG BY ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({message: "Blog not found"});
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: error.message});
  }
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
  try {
    const {title, description} = req.body;
    let imageUrl = "";

    if (req.file) {
      // Upload gambar baru
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {folder: "blogs"},
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    } else if (req.body.imageUrl) {
      // Gunakan gambar lama jika tidak diubah
      imageUrl = req.body.imageUrl;
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {title, description, imageUrl},
      {new: true}
    );

    if (!blog) return res.status(404).json({message: "Blog not found"});
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: error.message});
  }
};

// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({message: "Blog not found"});
    res.json({message: "Blog deleted successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: error.message});
  }
};
