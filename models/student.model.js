const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema (
  {
    name: { type: String, required: true, unique: true },
    score: { type: Number},
    kelas: { type: String},
    email: { type: String, require: true },
    password: { type: String, require: true },
    graduate: [{ type: Schema.Types.ObjectId, ref: 'graduate' }],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const studentCreate = mongoose.model('student', studentSchema);

module.exports = studentCreate;