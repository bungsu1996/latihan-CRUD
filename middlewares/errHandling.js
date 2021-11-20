module.exports = (err, req, res, next) => {
  let code = 0;
  let name = err.name;
  let message = "";

  switch (name) {
    case "INVALID_TOKEN":
      code = 401;
      message = "Akses Token Salah!";
      break;
    case "UNAUTHORIZED_TOKEN":
      code = 401;
      message = "Unauthorized!";
      break;
    case "UNAUTHORIZED":
      code = 401;
      message = "Email dan Password Tidak Benar!";
      break;
    case "NOT_FOUND_ALL_DATA":
      code = 404;
      message = "Seluruh Data Student Tidak Ditemukan!";
      break;
    case "NOT_FOUND_ID_STUDENT":
      code = 404;
      message = "ID Student Tidak Ditemukan!";
      break;
    case "MISSING_TOKEN":
      code = 401;
      message = "Akses Token Hilang";
      break;
    default:
      code = 500;
      message = "Internal Server Error";
      break;
  }

  res.status(code).json({ Succes : false, message: message });
};