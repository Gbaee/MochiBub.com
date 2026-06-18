import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const [customerName, setCustomerName] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.nama || user?.name || "";
  });

  const [whatsapp, setWhatsapp] = useState(user?.nomor_wa || "");
  const [address, setAddress] = useState(user?.alamat || "");
  const [note, setNote] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);
  const [voucherMessage, setVoucherMessage] = useState("");

  useEffect(() => {
    if (!user) {
      toast.error("Silakan login terlebih dahulu");
      navigate("/login");
    }
  }, [user, navigate]);

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

  const finalTotal = totalPrice - discount;

  const handleCheckout = async () => {
    if (!customerName || !whatsapp || !address) {
      toast.error("Nama, WhatsApp dan Alamat wajib diisi");
      return;
    }

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
        },
      );

      const orderId = response.data.orderId;
      toast.success("Pesanan berhasil dibuat 🎉");

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
        "_blank",
      );

      clearCart();

      navigate("/order-success");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Gagal membuat pesanan");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      {/* HEADER */}
      <div className="text-center mb-10">
        <span
          className="
          bg-pink-100
          text-pink-600
          px-4
          py-2
          rounded-full
          text-sm
          font-semibold
          "
        >
          CHECKOUT
        </span>

        <h1
          className="
          text-5xl
          font-bold
          mt-4
          "
        >
          🧾 Selesaikan Pesananmu
        </h1>

        <p className="text-gray-500 mt-3">
          Tinggal satu langkah lagi menuju mochi favoritmu 🍡
        </p>
      </div>

      {/* STEP */}
      <div
        className="
        flex
        justify-center
        items-center
        gap-4
        mb-12
        "
      >
        <div className="bg-pink-500 text-white px-4 py-2 rounded-full">
          Keranjang
        </div>

        <div className="w-16 h-1 bg-pink-300"></div>

        <div className="bg-pink-500 text-white px-4 py-2 rounded-full">
          Checkout
        </div>

        <div className="w-16 h-1 bg-gray-300"></div>

        <div className="bg-gray-300 px-4 py-2 rounded-full">Selesai</div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* FORM */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">📍 Data Pengiriman</h2>

          <input
            type="text"
            placeholder="Nama Lengkap"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full border p-4 rounded-xl mb-4"
          />

          <input
            type="text"
            placeholder="Nomor WhatsApp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full border p-4 rounded-xl mb-4"
          />

          <textarea
            rows="4"
            placeholder="Alamat Lengkap"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-4 rounded-xl mb-4"
          />

          <textarea
            rows="3"
            placeholder="Catatan Pesanan (Opsional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border p-4 rounded-xl mb-4"
          />

          <h3 className="font-bold mb-3">💳 Metode Pembayaran</h3>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border p-4 rounded-xl"
          >
            <option value="COD">Bayar di Tempat (COD)</option>

            <option value="Transfer">Transfer Bank</option>
          </select>
        </div>

        {/* SUMMARY */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">🛒 Ringkasan Pesanan</h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="
              flex
              justify-between
              mb-4
              "
            >
              <span>
                {item.nama_produk}({item.qty}x)
              </span>

              <span>
                Rp {Number(item.harga * item.qty).toLocaleString("id-ID")}
              </span>
            </div>
          ))}

          {/* Voucher */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">🎁 Voucher Diskon</h3>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Masukkan voucher"
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
                className="
                flex-1
                border
                rounded-xl
                px-4
                "
              />

              <button
                onClick={applyVoucher}
                className="
                bg-pink-500
                text-white
                px-5
                rounded-xl
                "
              >
                Gunakan
              </button>
            </div>

            {voucherMessage && <p className="mt-2 text-sm">{voucherMessage}</p>}
          </div>

          <hr className="my-6" />

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>

              <span>Rp {Number(totalPrice).toLocaleString("id-ID")}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Diskon</span>

              <span>- Rp {Number(discount).toLocaleString("id-ID")}</span>
            </div>

            <div
              className="
              flex
              justify-between
              text-2xl
              font-bold
              "
            >
              <span>Total</span>

              <span className="text-pink-500">
                Rp {Number(finalTotal).toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="
            mt-8
            w-full
            bg-pink-500
            hover:bg-pink-600
            text-white
            py-4
            rounded-2xl
            font-bold
            transition
            "
          >
            🚀 Buat Pesanan Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
