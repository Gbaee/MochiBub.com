function ChangePassword() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="bg-white dark:bg-charcoal-800 rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-cream-50">
          🔐 Ubah Password
        </h1>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Password Lama"
            className="w-full border border-gray-300 dark:border-white/10 dark:bg-charcoal-900 dark:text-cream-50 dark:placeholder:text-cream-100/40 rounded-xl p-3"
          />

          <input
            type="password"
            placeholder="Password Baru"
            className="w-full border border-gray-300 dark:border-white/10 dark:bg-charcoal-900 dark:text-cream-50 dark:placeholder:text-cream-100/40 rounded-xl p-3"
          />

          <input
            type="password"
            placeholder="Konfirmasi Password Baru"
            className="w-full border border-gray-300 dark:border-white/10 dark:bg-charcoal-900 dark:text-cream-50 dark:placeholder:text-cream-100/40 rounded-xl p-3"
          />

          <button className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600">
            Simpan Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;