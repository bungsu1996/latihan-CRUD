const graduateSchema = require('../models/graduate.models');

class graduateController {
  static async graduateData(req, res, next) {
    try {
      const result = await graduateSchema.find();
      res.status(200).json({ Message: "Data Kelulusan Di Tampilkan", data: result });
    } catch (error) {
        next(error);
    }
  };

  static async graduateCreate(req, res, next) {
    const { Kelulusan } = req.body;
    const { Nilai_Akhir } = req.body;
  
    try {
      const result = await graduateSchema.create(
        {
          Kelulusan: Kelulusan,
          Nilai_Akhir: Nilai_Akhir,
        }
      );
      res.status(200).json({ Message: "New Graduate Telah DiBuat", data: result});
    } catch (error) {
        next(error);
    }
  };

  static async graduateDelete(req, res, next) {
    const { id } = req.params;
  
    try {
      const result = await graduateSchema.findByIdAndDelete(id);
      res.status(200).json({ Message: "Data Graduate Sesuai ID Berhasil Di Hapus", data: result });
    } catch (error) {
        next(error);
    }
  };

};


module.exports = { graduateController };