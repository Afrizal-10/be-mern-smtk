const mongoose = require("mongoose");

const jadwalSchema = new mongoose.Schema(
  {
    hari: {type: String, required: true},
    mata_kuliah: {type: String, required: true},
    dosen: {type: String, required: true},
    jam: {type: String, required: true},
  },
  {timestamps: true}
);

module.exports = mongoose.model("JadwalKuliah", jadwalSchema);
