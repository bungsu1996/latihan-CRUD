const mongoose = require('mongoose');
const { Schema } = mongoose;

const graduateSchema = new Schema (
  {
    Kelulusan: { type: String, require: true },
    Nilai_Akhir: { type: Number, min: 0, max: 100 },
  },
  {
    versionKey: false,
  },
);

const graduate = mongoose.model('graduate', graduateSchema);

module.exports = graduate;