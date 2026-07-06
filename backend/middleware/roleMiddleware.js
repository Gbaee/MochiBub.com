// Middleware generik untuk membatasi akses berdasarkan role.
// Dipakai SETELAH authMiddleware, karena butuh req.user yang
// di-set oleh authMiddleware dari token JWT.
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Anda tidak memiliki akses untuk aksi ini",
      });
    }
    next();
  };
}

module.exports = authorizeRoles;