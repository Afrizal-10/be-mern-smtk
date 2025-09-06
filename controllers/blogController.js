const Blog = require("../models/Blog");

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({userId: req.user.id});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({_id: req.params.id, userId: req.user.id});
    if (!blog) return res.status(404).json({message: "Blog tidak ditemukan"});
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const createBlog = async (req, res) => {
  try {
    const {title, description, imageUrl} = req.body;
    const blog = new Blog({
      title,
      description,
      imageUrl,
      userId: req.user.id,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const updateBlog = async (req, res) => {
  try {
    const {title, description, imageUrl} = req.body;
    const blog = await Blog.findOneAndUpdate(
      {_id: req.params.id, userId: req.user.id},
      {title, description, imageUrl},
      {new: true}
    );
    if (!blog) return res.status(404).json({message: "Blog tidak ditemukan"});
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!blog) return res.status(404).json({message: "Blog tidak ditemukan"});
    res.status(200).json({message: "Blog berhasil dihapus"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
