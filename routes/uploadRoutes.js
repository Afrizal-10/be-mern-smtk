const express = require("express");
const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tasks",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({storage});

router.post("/", upload.single("image"), (req, res) => {
  try {
    res.json({
      url: req.file.path,
      public_id: req.file.filename,
    });
  } catch (err) {
    res.status(500).json({message: "Upload gagal", error: err.message});
  }
});

module.exports = router;
