const JadwalKuliah = require("../models/Jadwal");

const getJadwals = async (req, res) => {
  try {
    const jadwals = await JadwalKuliah.find({userId: req.user.id});
    res.status(200).json(jadwals);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getJadwalById = async (req, res) => {
  try {
    const jadwal = await JadwalKuliah.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!jadwal)
      return res.status(404).json({message: "Jadwal tidak ditemukan"});
    res.status(200).json(jadwal);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const createJadwal = async (req, res) => {
  const {hari, mata_kuliah, dosen, jam} = req.body;
  try {
    const jadwal = new JadwalKuliah({
      hari,
      mata_kuliah,
      dosen,
      jam,
      userId: req.user.id,
    });
    await jadwal.save();
    res.status(201).json(jadwal);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const updateJadwal = async (req, res) => {
  try {
    const jadwal = await JadwalKuliah.findOneAndUpdate(
      {_id: req.params.id, userId: req.user.id},
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

const deleteJadwal = async (req, res) => {
  try {
    const jadwal = await JadwalKuliah.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
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
