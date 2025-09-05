const express = require("express");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

const router = express.Router();
const upload = multer({dest: "uploads/"});

const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "tasks",
    });

    fs.unlinkSync(req.file.path);

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    res.status(500).json({message: "Upload gagal", error: err});
  }
};

// Buat route POST upload image
router.post("/", upload.single("image"), uploadImage);

module.exports = router;
