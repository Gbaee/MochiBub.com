const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isValidEmail, isStrongPassword, isValidPhoneNumber } = require("../utils/validators");

// Hash dummy — BUKAN password siapa pun, cuma dipakai untuk
// menyamakan waktu respons saat email tidak ditemukan (anti timing-attack)
const DUMMY_HASH = "$2a$10$CwTycUXWue0Thq9StjUM0uJ8gG8pkYSy5H4uKvB8Jk1yTLNr.9lPa";

// ===========================
// REGISTER
// ===========================
exports.register = async (req, res) => {
  try {
    const { nama, email, password, nomor_wa } = req.body;

    if (!nama || !email || !password || !nomor_wa) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Format email tidak valid" });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message: "Password minimal 8 karakter dan harus mengandung huruf serta angka",
      });
    }

    if (!isValidPhoneNumber(nomor_wa)) {
      return res.status(400).json({
        message: "Nomor WhatsApp tidak valid (hanya angka, 9-15 digit)",
      });
    }

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

        if (results.length > 0) {
          return res.status(400).json({ message: "Email sudah terdaftar" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO users (nama,email,password,nomor_wa) VALUES (?,?,?,?)",
          [nama, email, hashedPassword, nomor_wa],
          (err) => {
            if (err) {
              return res.status(500).json({ message: err.message });
            }

            res.status(201).json({ message: "User berhasil register" });
          },
        );
      },
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===========================
// LOGIN
// ===========================
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password wajib diisi" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const user = results[0];

      // Tetap jalankan bcrypt.compare walau user tidak ditemukan,
      // supaya waktu respons konsisten (anti timing-attack)
      const hashToCompare = user ? user.password : DUMMY_HASH;
      const validPassword = await bcrypt.compare(password, hashToCompare);

      if (!user || !validPassword) {
        return res.status(401).json({ message: "Email atau password salah" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      return res.status(200).json({
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

// ===========================
// PROFILE
// ===========================
exports.profile = (req, res) => {
  res.status(200).json({
    message: "Data profile",
    user: req.user,
  });
};