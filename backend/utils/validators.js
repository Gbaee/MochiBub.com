// Validasi format email dasar
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password minimal 8 karakter, harus ada huruf dan angka
function isStrongPassword(password) {
  if (typeof password !== "string" || password.length < 8) return false;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasLetter && hasNumber;
}

// Nomor WhatsApp: hanya angka, 9-15 digit
function isValidPhoneNumber(phone) {
  const phoneRegex = /^[0-9]{9,15}$/;
  return phoneRegex.test(phone);
}

module.exports = { isValidEmail, isStrongPassword, isValidPhoneNumber };