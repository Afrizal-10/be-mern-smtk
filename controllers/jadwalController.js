const JadwalKuliah = require("../models/Jadwal");

// GET semua jadwal
const getJadwals = async (req, res) => {
  try {
    const jadwals = await JadwalKuliah.find();
    res.status(200).json(jadwals);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// GET jadwal by ID
const getJadwalById = async (req, res) => {
  try {
    const jadwal = await JadwalKuliah.findById(req.params.id);
    if (!jadwal)
      return res.status(404).json({message: "Jadwal tidak ditemukan"});
    res.status(200).json(jadwal);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// CREATE jadwal baru
const createJadwal = async (req, res) => {
  const {hari, mata_kuliah, dosen, jam} = req.body;
  try {
    const jadwal = new JadwalKuliah({hari, mata_kuliah, dosen, jam});
    await jadwal.save();
    res.status(201).json(jadwal);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// UPDATE jadwal
const updateJadwal = async (req, res) => {
  try {
    const jadwal = await JadwalKuliah.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );
    if (!jadwal)
      return res.status(404).json({message: "Jadwal tidak ditemukan"});
    res.status(200).json(jadwal);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// DELETE jadwal
const deleteJadwal = async (req, res) => {
  try {
    const jadwal = await JadwalKuliah.findByIdAndDelete(req.params.id);
    if (!jadwal)
      return res.status(404).json({message: "Jadwal tidak ditemukan"});
    res.status(200).json({message: "Jadwal berhasil dihapus"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  getJadwals,
  getJadwalById,
  createJadwal,
  updateJadwal,
  deleteJadwal,
};
