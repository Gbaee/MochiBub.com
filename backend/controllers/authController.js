const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  const { nama, email, password, nomor_wa } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (nama,email,password,nomor_wa) VALUES (?,?,?,?)",
    [nama, email, hashedPassword, nomor_wa],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.status(201).json({
        message: "User berhasil register",
      });
    },
  );
};

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (results.length === 0) {
        return res.status(404).json({
          message: "User tidak ditemukan",
        });
      }

      const user = results[0];

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({
          message: "Password salah",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );

      res.json({
        message: "Login berhasil",
        token,

        user: {
          id: user.id,
          nama: user.nama,
          email: user.email,
          nomor_wa: user.nomor_wa,
          alamat: user.alamat,
          foto: user.foto,
          role: user.role,
        },
      });
    },
  );
};

// PROFILE
exports.profile = (req, res) => {
  res.json({
    message: "Data profile",
    user: req.user,
  });
};
