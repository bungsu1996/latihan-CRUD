const studentCreate = require("../models/student.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

class studentController {
  static async studentData(req, res, next) {
    try {
      const result = await studentCreate.find().populate('graduate');
      if (result.length === 0) {
        throw { name: "NOT_FOUND_ALL_DATA" };
      } else {
        res.status(200).json({ Message: "Data Student Ditampilkan", data: result });
      }
    } catch (error) {
      next(error);
    }
  };

  static async studentNewCreate(req, res, next) {
    const name = req.body.name;
    const score = req.body.score;
    const kelas = req.body.kelas;
    const email = req.body.email;
    const password = req.body.password;
  
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
      const result = await studentCreate.create({
        name: name,
        score: score,
        kelas: kelas,
        email: email,
        password: hashedPassword,
      });
      res.status(201).json({ Message: "Data Student Berhasil Dibuat", data: result });
    } catch (error) {
      next(error);
    }
  };

  static async studentByID(req, res, next) {
    const { id } = req.params;
    try {
      const result = await studentCreate.findById(id);
      if (result === null) {
        throw { name: "NOT_FOUND_ID_STUDENT" };
      } else {
        res.status(200).json({ Message: "Data Student Sesuai Dengan ID", data: result });
      };
    } catch (error) {
      next(error);
    }
  };

  static async studentUpdate(req, res, next) {
    const { id } = req.params;
    const { name, score, kelas, password, graduate } = req.body;
    try {
      const result = await studentCreate.findByIdAndUpdate(id,
        { 
          name: name, score: score, kelas: kelas, password: password, graduate: graduate,
        }, { new: true }).populate('graduate');
      res.status(200).json({ Message: "Update Student Berhasil", data: result });
    } catch (error) {
      next(error);
    }
  };

  static async studentDelete(req, res, next) {
    const { id } = req.params;
    try {
      const result = await studentCreate.findByIdAndDelete(id);
      res.status(200).json({ Message: "Data Student ID Dibawah Ini Telah DiDelete", data: result });
    } catch (error) {
      next(error);
    }
  };

  static async patchStudentGraduate(req, res, next) {
    const { id } = req.params;
    const { idgraduate } = req.body;

    try {
      const result = await studentCreate.findByIdAndUpdate(id, 
        { $push: { graduate: idgraduate }},
        { new: true },
      );
      res.status(202).json({ Message: "ID Student Tertentu Di Update", data: result });
    } catch (error) {
        next(error);
    }
  };

  static async studentLogin(req, res, next) {
    const { email } = req.body;
    const { password } = req.body;

    try {
      const result = await studentCreate.findOne({ email: email });
      if (!result) {
        throw { name: "UNAUTHORIZED" };
      };
      const passwordIsValid = bcrypt.compareSync(password, result.password);
      if (!passwordIsValid) {
        throw { name: "UNAUTHORIZED" };
       };
       const token = jwt.sign({ id: result.id, score: result.score, kelas: result.kelas, email: result.email }, 
        "hamzahschool", { expiresIn: "1h" });
      res.status(200).json({ Message: "Login Student Telah Berhasil!", data: result, AccesToken: token });  
    } catch (error) {
      next(error);
    }
  };

};

module.exports = { studentController };


// ------------ Cara Pertama Menggunakan Function -----------
// const studentCreate = require("../models/student.model");

// const studentControllers = async (req, res, next) => {
//   try {
//     const result = await studentCreate.find();
//     if (result.length === 0) {
//       throw { name: "NOT_FOUND_ALL_DATA" };
//     } else {
//       res.status(200).json({ Message: "Data Student Ditampilkan", data: result });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { studentControllers };
