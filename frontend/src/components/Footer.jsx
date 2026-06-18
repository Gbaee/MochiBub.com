import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Logo */}
          <div>

            <h2 className="text-3xl font-bold text-pink-400">
              🍡 Mochi Bub
            </h2>

            <p className="mt-4 text-gray-300 leading-relaxed">
              Mochi premium dengan rasa lembut,
              manis, dan bikin nagih.
            </p>

          </div>

          {/* Menu */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Menu
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                to="/"
                className="text-gray-300 hover:text-pink-400 transition"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="text-gray-300 hover:text-pink-400 transition"
              >
                Produk
              </Link>

              <Link
                to="/cart"
                className="text-gray-300 hover:text-pink-400 transition"
              >
                Keranjang
              </Link>

            </div>

          </div>

          {/* Kontak */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Hubungi Kami
            </h3>

            <div className="space-y-3 text-gray-300">

              <p>📱 WhatsApp: 0856-0082-9369</p>

              <p>📧 Email: mochibub@gmail.com</p>

              <p>📸 Instagram: @mochibub</p>

            </div>

          </div>

          {/* Jam Operasional */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Jam Operasional
            </h3>

            <div className="space-y-3 text-gray-300">

              <p>Senin - Jumat</p>

              <p>08.00 - 21.00 WIB</p>

              <p>Sabtu - Minggu</p>

              <p>09.00 - 22.00 WIB</p>

            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-gray-700">

        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-400">

          © 2026 Mochi Bub. All rights reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;