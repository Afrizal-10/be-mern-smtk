const express = require("express");
const router = express.Router();
const {
  getJadwals,
  getJadwalById,
  createJadwal,
  updateJadwal,
  deleteJadwal,
} = require("../controllers/jadwalController");

router.get("/", getJadwals);
router.get("/:id", getJadwalById);
router.post("/", createJadwal);
router.put("/:id", updateJadwal);
router.delete("/:id", deleteJadwal);

module.exports = router;
