const express = require("express");
const router = express.Router();
const {
  getJadwals,
  getJadwalById,
  createJadwal,
  updateJadwal,
  deleteJadwal,
} = require("../controllers/jadwalController");
const {protect} = require("../middleware/authMiddleware");

router.get("/", protect, getJadwals);
router.get("/:id", protect, getJadwalById);
router.post("/", protect, createJadwal);
router.put("/:id", protect, updateJadwal);
router.delete("/:id", protect, deleteJadwal);

module.exports = router;
