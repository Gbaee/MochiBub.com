import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import {
  FaClipboardList,
  FaCheckCircle,
  FaMoneyBillWave,
  FaBoxOpen,
  FaEye,
} from "react-icons/fa";

import OrderDetailModal from "../components/OrderDetailModal";
import { Link } from "react-router-dom";
function MyOrders() {
  const [orders, setOrders] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      console.log("TOKEN =", token);

      const response = await axios.get(
        "http://localhost:5000/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      console.log("ORDERS =", response.data);

      setOrders(response.data);
    } catch (error) {
      console.error(error);

      console.log("STATUS:", error.response?.status);

      console.log("DATA:", error.response?.data);

      toast.error("Gagal mengambil data pesanan");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetail = async (orderId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSelectedOrder(response.data);

      setIsModalOpen(true);
    } catch (error) {
      console.error(error);

      toast.error("Gagal mengambil detail pesanan");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
      case "diproses":
        return "bg-blue-100 text-blue-700";

      case "processing":
      case "dikirim":
        return "bg-purple-100 text-purple-700";

      case "completed":
      case "selesai":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getProgress = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return 25;

      case "confirmed":
      case "diproses":
        return 50;

      case "processing":
      case "dikirim":
        return 75;

      case "completed":
      case "selesai":
        return 100;

      default:
        return 0;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div
            className="
              w-16
              h-16
              border-4
              border-pink-200
              border-t-pink-500
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="mt-5 text-gray-500">Memuat pesanan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-pink-50 to-white min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-5">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800">
            📦 Pesanan Saya
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Pantau seluruh riwayat pesanan Mochi Bub dengan mudah.
          </p>
        </div>

        {/* STATISTIK */}
        {orders.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <p className="text-gray-500">Total Pesanan</p>

              <h2 className="text-4xl font-bold text-pink-500 mt-2">
                {orders.length}
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">
              <p className="text-gray-500">Pesanan Selesai</p>

              <h2 className="text-4xl font-bold text-green-500 mt-2">
                {
                  orders.filter(
                    (order) =>
                      order.status?.toLowerCase() === "completed" ||
                      order.status?.toLowerCase() === "selesai",
                  ).length
                }
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">
              <p className="text-gray-500">Total Belanja</p>

              <h2 className="text-3xl font-bold text-purple-500 mt-2">
                Rp{" "}
                {orders
                  .reduce(
                    (total, order) => total + Number(order.total_price),
                    0,
                  )
                  .toLocaleString("id-ID")}
              </h2>
            </div>
          </div>
        )}

        {/* LIST PESANAN */}
        {orders.length > 0 ? (
          <div className="space-y-8">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="
          bg-white
          rounded-[30px]
          shadow-lg
          hover:shadow-2xl
          transition-all
          duration-300
          hover:-translate-y-1
          overflow-hidden
        "
              >
                {/* Header Card */}
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <p className="text-sm opacity-90">Order ID</p>

                      <h2 className="text-3xl font-bold">#{order.id}</h2>
                    </div>

                    <span
                      className={`
                px-5
                py-2
                rounded-full
                font-semibold
                bg-white
                ${getStatusColor(order.status)}
              `}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-500">Tanggal Pemesanan</p>

                      <h3 className="font-semibold text-lg mt-1">
                        {new Date(order.created_at).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-500">Total Pembayaran</p>

                      <h3 className="text-3xl font-bold text-pink-500 mt-1">
                        Rp {Number(order.total_price).toLocaleString("id-ID")}
                      </h3>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-8">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>Pesanan Dibuat</span>

                      <span>{order.status}</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: `${getProgress(order.status)}%`,
                        }}
                        transition={{
                          duration: 1,
                        }}
                        className="
                  bg-gradient-to-r
                  from-pink-500
                  to-rose-500
                  h-3
                  rounded-full
                "
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 border-t pt-5">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <p className="text-gray-500 text-sm">
                        ❤️ Terima kasih telah mempercayai Mochi Bub. Kami akan
                        selalu memberikan pelayanan terbaik untuk setiap pesanan
                        Anda.
                      </p>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleOpenDetail(order.id)}
                          className="
        flex
        items-center
        gap-2
        bg-pink-500
        hover:bg-pink-600
        text-white
        px-6
        py-3
        rounded-2xl
        font-semibold
        transition
        "
                        >
                          <FaEye />
                          Lihat Detail
                        </button>

                        {order.payment_method === "Transfer" &&
                          !order.payment_proof && (
                            <Link
                              to={`/upload-payment/${order.id}`}
                              className="
            flex
            items-center
            gap-2
            bg-green-500
            hover:bg-green-600
            text-white
            px-6
            py-3
            rounded-2xl
            font-semibold
            transition
            "
                            >
                              Upload Bukti
                            </Link>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div
            className="
              bg-white
              rounded-[30px]
              shadow-xl
              p-16
              text-center
            "
          >
            <div className="text-8xl mb-6">📭</div>

            <h2 className="text-3xl font-bold text-gray-800">
              Belum Ada Pesanan
            </h2>

            <p className="text-gray-500 mt-4">
              Yuk pesan mochi favoritmu sekarang dan nikmati kelezatannya.
            </p>

            <a
              href="/products"
              className="
                inline-block
                mt-8
                bg-pink-500
                hover:bg-pink-600
                text-white
                px-8
                py-4
                rounded-full
                font-semibold
                transition
                hover:scale-105
              "
            >
              🍡 Lihat Produk
            </a>
          </div>
        )}
        <OrderDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          order={selectedOrder}
        />
      </div>
    </div>
  );
}
export default MyOrders;
