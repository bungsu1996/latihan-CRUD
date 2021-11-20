const express = require("express");
const studentRouter = express();
const studentCreate = require("../models/student.model");
const { studentController } = require('../controllers/student.controllers');
const auth = require('../middlewares/authJwt');

studentRouter.post("/dataBaru", studentController.studentNewCreate);
studentRouter.post("/login", studentController.studentLogin);

studentRouter.use(auth.authentication);

studentRouter.get("/", studentController.studentData);

studentRouter.get("/:id", auth.spesificStudent, studentController.studentByID);
studentRouter.put("/:id", auth.spesificStudent, studentController.studentUpdate);
studentRouter.delete("/:id", auth.spesificStudent, studentController.studentDelete);
studentRouter.patch("/:id", auth.spesificStudent, studentController.patchStudentGraduate);



module.exports = studentRouter;
