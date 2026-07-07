function MyAddress() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="bg-white dark:bg-charcoal-800 rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-cream-50">
          📍 Alamat Saya
        </h1>

        <div className="bg-pink-50 dark:bg-white/5 rounded-2xl p-5">
          <p className="font-semibold text-gray-900 dark:text-cream-50">
            Belum ada alamat tersimpan
          </p>
          <p className="text-gray-500 dark:text-cream-100/50 mt-2">
            Tambahkan alamat untuk mempermudah proses checkout.
          </p>
        </div>

        <button className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600">
          + Tambah Alamat
        </button>
      </div>
    </div>
  );
}

export default MyAddress;