const multer = require("multer");
const fs = require("fs");

if (!fs.existsSync("uploads/payments")) {
  fs.mkdirSync("uploads/payments", {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/payments");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

module.exports = multer({
  storage,
});