import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { motion } from "framer-motion";

import {
  FaMapMarkerAlt,
  FaUser,
  FaPhoneAlt,
  FaStickyNote,
  FaCreditCard,
  FaShoppingBag,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const [customerName, setCustomerName] = useState(user?.nama || user?.name || "");
  const [whatsapp, setWhatsapp] = useState(user?.nomor_wa || "");
  const [address, setAddress] = useState(user?.alamat || "");
  const [note, setNote] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);
  const [voucherMessage, setVoucherMessage] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error("Silakan login terlebih dahulu");
      navigate("/login");
    }
  }, [navigate]);

  const applyVoucher = () => {
    const code = voucher.toUpperCase();

    if (code === "WELCOME10") {
      setDiscount(totalPrice * 0.1);
      setVoucherMessage("✅ Voucher WELCOME10 berhasil digunakan");
      toast.success("Voucher WELCOME10 berhasil digunakan");
    } else if (code === "HEMAT20") {
      setDiscount(totalPrice * 0.2);
      setVoucherMessage("✅ Voucher HEMAT20 berhasil digunakan");
      toast.success("Voucher HEMAT20 berhasil digunakan");
    } else {
      setDiscount(0);
      setVoucherMessage("❌ Voucher tidak valid");
      toast.error("Voucher tidak valid");
    }
  };

  const steps = [
    { title: "Keranjang", active: true },
    { title: "Checkout", active: true },
    { title: "Selesai", active: false },
  ];

  const finalTotal = totalPrice - discount;

  const handleCheckout = async () => {
    if (!customerName || !whatsapp || !address) {
      toast.error("Nama, WhatsApp dan Alamat wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        {
          customer_name: customerName,
          whatsapp,
          address,
          note,
          payment_method: paymentMethod,
          total_price: finalTotal,
          items: cart,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orderId = response.data.orderId;

      const productList = cart
        .map((item) => `${item.nama_produk} (${item.qty}x)`)
        .join("%0A");

      const whatsappMessage =
        `Halo Mochi Bub 👋%0A%0A` +
        `Saya ingin melakukan pemesanan:%0A%0A` +
        `${productList}%0A%0A` +
        `Nama: ${customerName}%0A` +
        `No WA: ${whatsapp}%0A` +
        `Alamat: ${address}%0A` +
        `Catatan: ${note}%0A` +
        `Metode Pembayaran: ${paymentMethod}%0A%0A` +
        `Total: Rp ${finalTotal}%0A` +
        `Order ID: ${orderId}`;

      window.open(
        `https://wa.me/6285600829369?text=${whatsappMessage}`,
        "_blank"
      );

      toast.success("Pesanan berhasil dibuat 🎉");

      setTimeout(() => {
        clearCart();
        navigate("/order-success");
      }, 800);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal membuat pesanan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-charcoal-900 relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-pink-200/50 rounded-full blur-[170px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-200/40 rounded-full blur-[170px]" />
      <div className="absolute left-1/2 top-1/2 w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10 px-6 py-14">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-50 dark:bg-white/10 border border-pink-200 dark:border-white/10 text-pink-600 dark:text-rose-300 font-semibold">
            <FaShoppingBag />
            Checkout Premium
          </div>

          <h1 className="text-6xl font-black text-gray-900 dark:text-cream-50 mt-6 tracking-tight">
            Selesaikan Pesananmu
          </h1>

          <p className="mt-5 text-lg text-gray-500 dark:text-cream-100/50 max-w-2xl mx-auto leading-relaxed">
            Satu langkah lagi menuju Mochi Bub favoritmu.
            Pastikan seluruh informasi sudah benar sebelum membuat pesanan.
          </p>
        </motion.div>

        {/* STEP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center items-center mb-14"
        >
          <div className="bg-white/70 dark:bg-charcoal-800/70 backdrop-blur-xl border border-pink-100 dark:border-white/10 rounded-full shadow-xl px-8 py-5 flex items-center gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-5">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    step.active
                      ? "bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white"
                      : "bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-cream-100/40"
                  }`}
                >
                  {step.active ? <FaCheckCircle /> : index + 1}
                </div>

                <span className={`font-semibold ${step.active ? "text-gray-900 dark:text-cream-50" : "text-gray-400 dark:text-cream-100/40"}`}>
                  {step.title}
                </span>

                {index !== steps.length - 1 && (
                  <div className="w-16 h-[2px] bg-pink-200 dark:bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* ====================== FORM ====================== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative rounded-[36px] border border-pink-100 dark:border-white/10 bg-white/80 dark:bg-charcoal-800/80 backdrop-blur-2xl shadow-[0_30px_80px_rgba(236,72,153,.12)] overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500" />

            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-pink-500 to-fuchsia-500 text-white flex items-center justify-center text-2xl shadow-lg shadow-pink-300">
                  <FaTruck />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-cream-50">Data Pengiriman</h2>
                  <p className="text-gray-500 dark:text-cream-100/50 mt-1">Lengkapi data agar pesanan dapat diproses.</p>
                </div>
              </div>

              {/* Nama */}
              <div className="mb-5">
                <label className="font-semibold text-gray-700 dark:text-cream-100/80 mb-2 block">
                  <FaUser className="inline mr-2 text-pink-500" />
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-2xl bg-slate-50 dark:bg-charcoal-900 dark:text-cream-50 border border-slate-200 dark:border-white/10 px-5 py-4 focus:outline-none hover:border-pink-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 dark:focus:ring-white/10 transition"
                />
              </div>

              {/* WA */}
              <div className="mb-5">
                <label className="font-semibold text-gray-700 dark:text-cream-100/80 mb-2 block">
                  <FaPhoneAlt className="inline mr-2 text-pink-500" />
                  Nomor WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="08xxxxxxxxxx"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full rounded-2xl bg-slate-50 dark:bg-charcoal-900 dark:text-cream-50 border border-slate-200 dark:border-white/10 px-5 py-4 focus:outline-none hover:border-pink-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 dark:focus:ring-white/10 transition"
                />
              </div>

              {/* Alamat */}
              <div className="mb-5">
                <label className="font-semibold text-gray-700 dark:text-cream-100/80 mb-2 block">
                  <FaMapMarkerAlt className="inline mr-2 text-pink-500" />
                  Alamat Lengkap
                </label>
                <textarea
                  rows={5}
                  placeholder="Masukkan alamat lengkap"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-2xl bg-slate-50 dark:bg-charcoal-900 dark:text-cream-50 border border-slate-200 dark:border-white/10 px-5 py-4 resize-none focus:outline-none hover:border-pink-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 dark:focus:ring-white/10 transition"
                />
              </div>

              {/* Catatan */}
              <div className="mb-5">
                <label className="font-semibold text-gray-700 dark:text-cream-100/80 mb-2 block">
                  <FaStickyNote className="inline mr-2 text-pink-500" />
                  Catatan
                </label>
                <textarea
                  rows={4}
                  placeholder="Contoh: Jangan terlalu manis"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full rounded-2xl bg-slate-50 dark:bg-charcoal-900 dark:text-cream-50 border border-slate-200 dark:border-white/10 px-5 py-4 resize-none focus:outline-none hover:border-pink-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 dark:focus:ring-white/10 transition"
                />
              </div>

              {/* Payment */}
              <div>
                <label className="font-semibold text-gray-700 dark:text-cream-100/80 mb-2 block">
                  <FaCreditCard className="inline mr-2 text-pink-500" />
                  Metode Pembayaran
                </label>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("COD")}
                    className={`rounded-3xl border-2 p-5 transition-all duration-300 ${
                      paymentMethod === "COD"
                        ? "border-pink-500 bg-pink-50 dark:bg-white/10 shadow-lg shadow-pink-200 dark:shadow-none"
                        : "border-slate-200 dark:border-white/10 hover:border-pink-300"
                    }`}
                  >
                    <div className="text-3xl mb-2">🚚</div>
                    <h3 className="font-bold text-gray-900 dark:text-cream-50">COD</h3>
                    <p className="text-sm text-gray-500 dark:text-cream-100/50 mt-1">Bayar saat barang diterima</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("Transfer")}
                    className={`rounded-3xl border-2 p-5 transition-all duration-300 ${
                      paymentMethod === "Transfer"
                        ? "border-pink-500 bg-pink-50 dark:bg-white/10 shadow-lg shadow-pink-200 dark:shadow-none"
                        : "border-slate-200 dark:border-white/10 hover:border-pink-300"
                    }`}
                  >
                    <div className="text-3xl mb-2">🏦</div>
                    <h3 className="font-bold text-gray-900 dark:text-cream-50">Transfer</h3>
                    <p className="text-sm text-gray-500 dark:text-cream-100/50 mt-1">Transfer sebelum pengiriman</p>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ====================== SUMMARY ====================== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="sticky top-24 overflow-hidden rounded-[36px] border border-pink-100 dark:border-white/10 bg-white/80 dark:bg-charcoal-800/80 backdrop-blur-2xl shadow-[0_30px_80px_rgba(236,72,153,.12)]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500" />

            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-pink-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-300">
                  <FaShoppingBag />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-cream-50">Ringkasan Pesanan</h2>
                  <p className="text-gray-500 dark:text-cream-100/50">Periksa kembali pesananmu</p>
                </div>
              </div>

              {/* LIST PRODUK */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-2xl bg-slate-50 dark:bg-charcoal-900 border border-slate-200 dark:border-white/10 p-5 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-cream-50">{item.nama_produk}</h3>
                      <p className="text-sm text-gray-500 dark:text-cream-100/50 mt-1">
                        {item.qty} x Rp {Number(item.harga).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="font-bold text-pink-600">
                      Rp {Number(item.qty * item.harga).toLocaleString("id-ID")}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* ====================== VOUCHER ====================== */}
              <div className="mt-8">
                <div className="rounded-3xl bg-gradient-to-r from-pink-50 to-purple-50 dark:from-white/10 dark:to-white/5 border border-pink-100 dark:border-white/10 p-5">
                  <h3 className="font-bold mb-3 text-gray-900 dark:text-cream-50">🎁 Voucher Diskon</h3>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Masukkan voucher"
                      value={voucher}
                      onChange={(e) => setVoucher(e.target.value)}
                      className="flex-1 rounded-2xl bg-white dark:bg-charcoal-900 dark:text-cream-50 border border-pink-100 dark:border-white/10 px-5 py-4 focus:outline-none focus:ring-4 focus:ring-pink-100 dark:focus:ring-white/10"
                    />
                    <button
                      onClick={applyVoucher}
                      className="px-7 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-semibold hover:scale-105 transition"
                    >
                      Gunakan
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setVoucher("WELCOME10");
                        setTimeout(applyVoucher, 50);
                      }}
                      className="px-4 py-2 rounded-full bg-pink-100 dark:bg-white/10 text-pink-600 dark:text-rose-300 font-semibold hover:bg-pink-500 hover:text-white transition"
                    >
                      WELCOME10
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setVoucher("HEMAT20");
                        setTimeout(applyVoucher, 50);
                      }}
                      className="px-4 py-2 rounded-full bg-purple-100 dark:bg-white/10 text-purple-600 dark:text-purple-300 font-semibold hover:bg-purple-500 hover:text-white transition"
                    >
                      HEMAT20
                    </button>
                  </div>

                  {voucherMessage && (
                    <p className="mt-3 text-sm font-medium text-gray-900 dark:text-cream-50">{voucherMessage}</p>
                  )}
                </div>
              </div>

              <hr className="my-8 border-gray-200 dark:border-white/10" />

              <div className="space-y-5">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600 dark:text-cream-100/60">Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-cream-50">
                    Rp {Number(totalPrice).toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex justify-between text-lg text-green-600 dark:text-green-400">
                  <span>Diskon</span>
                  <span>- Rp {Number(discount).toLocaleString("id-ID")}</span>
                </div>

                <div className="border-t border-gray-200 dark:border-white/10 pt-5 flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 dark:text-cream-100/50">Total Pembayaran</p>
                    <h2 className="text-5xl font-black bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                      Rp {Number(finalTotal).toLocaleString("id-ID")}
                    </h2>
                  </div>
                  <div className="bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 font-semibold px-4 py-2 rounded-full text-sm">
                    Pembayaran Aman
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-3xl bg-pink-50 dark:bg-white/5 border border-pink-100 dark:border-white/10 p-5 space-y-2 text-sm text-gray-600 dark:text-cream-100/60">
                <div>🚚 Estimasi Pengiriman 1-2 Hari</div>
                <div>🛡️ Data pelanggan terenkripsi</div>
                <div>🍡 Produk dibuat fresh setiap hari</div>
              </div>

              <button
                disabled={loading}
                onClick={handleCheckout}
                className="relative overflow-hidden w-full rounded-3xl py-5 font-bold text-lg text-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 shadow-xl shadow-pink-300 hover:scale-[1.02] transition-all disabled:opacity-70"
              >
                {loading && (
                  <span className="absolute inset-0 bg-white/10 animate-pulse" />
                )}
                <span className="relative z-10">
                  {loading ? "Membuat Pesanan..." : "🚀 Buat Pesanan Sekarang"}
                </span>
              </button>

              {/* TRUST SECTION */}
              <div className="mt-8 space-y-5">

                {/* Security */}
                <div className="rounded-3xl border border-pink-100 dark:border-white/10 bg-gradient-to-r from-pink-50 via-white to-fuchsia-50 dark:from-white/5 dark:via-charcoal-900 dark:to-white/5 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-xl">
                      🔒
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-cream-50">Pembayaran Aman</h3>
                      <p className="text-gray-500 dark:text-cream-100/50 text-sm mt-1">
                        Seluruh data transaksi dienkripsi menggunakan SSL 256-bit.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefit */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "🍡", title: "Fresh", desc: "Dibuat setelah order masuk" },
                    { icon: "🚚", title: "Cepat", desc: "Pengiriman 1-2 Hari" },
                    { icon: "⭐", title: "Premium", desc: "Bahan berkualitas terbaik" },
                    { icon: "💬", title: "Support", desc: "Customer Service aktif" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-3xl bg-pink-50 dark:bg-white/5 border border-pink-100 dark:border-white/10 p-5 text-center"
                    >
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <h4 className="font-bold text-gray-900 dark:text-cream-50">{item.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-cream-100/50 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Customer Trust */}
                <div className="rounded-3xl border border-pink-100 dark:border-white/10 bg-white dark:bg-charcoal-900 p-6">
                  <h3 className="font-bold text-lg mb-5 text-gray-900 dark:text-cream-50">Dipercaya Pelanggan ❤️</h3>
                  <div className="grid grid-cols-3 gap-5 text-center">
                    {[
                      { value: "500+", label: "Order" },
                      { value: "4.9★", label: "Rating" },
                      { value: "100%", label: "Fresh" },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <h2 className="text-3xl font-black text-pink-500">{stat.value}</h2>
                        <p className="text-sm text-gray-500 dark:text-cream-100/50">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;