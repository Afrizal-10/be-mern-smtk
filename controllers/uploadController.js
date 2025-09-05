const cloudinary = require("../utils/cloudinary");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage});

const uploadImage = async (req, res) => {
  try {
    const fileStr = req.file.buffer.toString("base64");
    const uploadedResponse = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${fileStr}`,
      {
        folder: "tasks",
      }
    );
    res.json({url: uploadedResponse.secure_url});
  } catch (err) {
    res.status(500).json({message: "Gagal upload gambar", error: err});
  }
};

module.exports = {upload, uploadImage};
