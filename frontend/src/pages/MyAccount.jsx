import { Link } from "react-router-dom";

function MyAccount() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      {/* HEADER PREMIUM */}
      <div className="bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300 rounded-3xl p-8 shadow-xl text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={`https://ui-avatars.com/api/?name=${user.nama || "User"}&background=ffffff&color=ec4899&size=200`}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />

          <div className="flex-1">
            <h1 className="text-4xl font-bold">Halo, {user.nama || "Pelanggan"}</h1>
            <p className="mt-2 opacity-90">{user.email || "user@email.com"}</p>
            <div className="inline-block mt-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold">
              ⭐ Gold Member
            </div>
          </div>
        </div>
      </div>

      {/* STATISTIK */}
      <div className="grid md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white dark:bg-charcoal-800 rounded-3xl shadow-lg p-6 text-center hover:shadow-xl transition">
          <div className="text-4xl">📦</div>
          <h3 className="text-gray-500 dark:text-cream-100/50 mt-3">Total Pesanan</h3>
          <p className="text-3xl font-bold text-pink-500 mt-2">12</p>
        </div>

        <div className="bg-white dark:bg-charcoal-800 rounded-3xl shadow-lg p-6 text-center hover:shadow-xl transition">
          <div className="text-4xl">❤️</div>
          <h3 className="text-gray-500 dark:text-cream-100/50 mt-3">Favorit</h3>
          <p className="text-3xl font-bold text-pink-500 mt-2">{favorites.length}</p>
        </div>

        <div className="bg-white dark:bg-charcoal-800 rounded-3xl shadow-lg p-6 text-center hover:shadow-xl transition">
          <div className="text-4xl">🛒</div>
          <h3 className="text-gray-500 dark:text-cream-100/50 mt-3">Keranjang</h3>
          <p className="text-3xl font-bold text-pink-500 mt-2">Aktif</p>
        </div>

        <div className="bg-white dark:bg-charcoal-800 rounded-3xl shadow-lg p-6 text-center hover:shadow-xl transition">
          <div className="text-4xl">⭐</div>
          <h3 className="text-gray-500 dark:text-cream-100/50 mt-3">Status</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">Gold</p>
        </div>
      </div>

      {/* MENU CEPAT */}
      <div className="grid md:grid-cols-4 gap-6 mt-8">
        <Link
          to="/my-orders"
          className="bg-white dark:bg-charcoal-800 p-6 rounded-3xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition"
        >
          <div className="text-4xl mb-3">📦</div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-cream-50">Pesanan Saya</h3>
          <p className="text-gray-500 dark:text-cream-100/50 mt-2 text-sm">Lihat status pesanan.</p>
        </Link>

        <Link
          to="/favorites"
          className="bg-white dark:bg-charcoal-800 p-6 rounded-3xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition"
        >
          <div className="text-4xl mb-3">❤️</div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-cream-50">Favorit Saya</h3>
          <p className="text-gray-500 dark:text-cream-100/50 mt-2 text-sm">Produk favoritmu.</p>
        </Link>

        <Link
          to="/cart"
          className="bg-white dark:bg-charcoal-800 p-6 rounded-3xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition"
        >
          <div className="text-4xl mb-3">🛒</div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-cream-50">Keranjang</h3>
          <p className="text-gray-500 dark:text-cream-100/50 mt-2 text-sm">Lanjutkan checkout.</p>
        </Link>

        <div className="bg-white dark:bg-charcoal-800 p-6 rounded-3xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition">
          <div className="text-4xl mb-3">⚙️</div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-cream-50">Pengaturan</h3>
          <p className="text-gray-500 dark:text-cream-100/50 mt-2 text-sm">Kelola akunmu.</p>
        </div>
      </div>

      {/* INFORMASI AKUN */}
      <div className="bg-white dark:bg-charcoal-800 rounded-3xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-cream-50">Informasi Akun</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 dark:text-cream-100/50">Nama Lengkap</p>
            <p className="font-semibold text-lg text-gray-900 dark:text-cream-50">{user.nama || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-cream-100/50">Email</p>
            <p className="font-semibold text-lg text-gray-900 dark:text-cream-50">{user.email || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-cream-100/50">Role</p>
            <p className="font-semibold text-lg capitalize text-gray-900 dark:text-cream-50">
              {user.role || "customer"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-cream-100/50">Status Akun</p>
            <p className="font-semibold text-green-600 dark:text-green-400 text-lg">Aktif</p>
          </div>
        </div>
      </div>

      {/* LOGOUT CARD */}
      <div className="mt-8 bg-red-500 text-white rounded-3xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold">🚪 Logout</h3>
        <p className="mt-2 opacity-90">Keluar dari akun dan kembali ke halaman utama.</p>
        <button
          onClick={handleLogout}
          className="mt-5 bg-white text-red-500 px-6 py-3 rounded-2xl font-bold hover:scale-105 transition"
        >
          Logout Sekarang
        </button>
      </div>
    </div>
  );
}

export default MyAccount;