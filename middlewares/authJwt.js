const jwt = require('jsonwebtoken');
const student = require('../models/student.model');

class authJwt {
  static authentication(req, res, next) {
    const { acces_token } = req.headers;
    if (!acces_token) {
      throw { name: "MISSING_TOKEN" };
    };
      const decoded = jwt.verify(acces_token, "hamzahschool", (err, decoded) => {
        if (err) {
          throw { name: "INVALID_TOKEN" };
        };
        req.studentData = decoded;
        next();
      });
  };

  static async spesificStudent(req, res, next) {
    const { id } = req.params;
    try {
      const result = await student.findById(req.studentData.id);
      if (result.id === id) {
        next();
      } else {
        throw { name: "UNAUTHORIZED_TOKEN" };
      }
    } catch (error) {
        next(error);
    }
  }
};

module.exports = authJwt;