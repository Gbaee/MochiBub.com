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
import { SectionTitle, Button } from "../components/ui";
import { getStatusColor, getProgress } from "../utils/orderStatus";

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

      const response = await axios.get(
        "http://localhost:5000/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders(response.data);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Gagal mengambil data pesanan. Cek koneksi ke server.",
      );
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-cream-50 dark:bg-charcoal-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin mx-auto" />
          <p className="mt-5 text-charcoal-700/60">Memuat pesanan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-cream-50 dark:bg-charcoal-900 min-h-screen py-16 md:py-24 overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(233,30,140,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-5 md:px-8 relative z-10">
        <SectionTitle
          eyebrow="Riwayat Transaksi"
          title="Pesanan Saya"
          subtitle="Pantau seluruh riwayat pesanan Mochi Bub dengan mudah."
        />

        {/* STATISTIK - pill ramping, tidak makan tempat vertikal */}
        {orders.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-12">
            <div className="flex items-center gap-3 bg-white dark:bg-charcoal-800 rounded-2xl pl-3 pr-5 py-3 shadow-[var(--shadow-soft)]">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                <FaClipboardList className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-charcoal-700/50 leading-tight">
                  Total Pesanan
                </p>
                <p className="font-display font-bold text-charcoal-900 leading-tight">
                  {orders.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white dark:bg-charcoal-800 rounded-2xl pl-3 pr-5 py-3 shadow-[var(--shadow-soft)]">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                <FaCheckCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-charcoal-700/50 leading-tight">
                  Selesai
                </p>
                <p className="font-display font-bold text-charcoal-900 leading-tight">
                  {
                    orders.filter(
                      (order) =>
                        order.status?.toLowerCase() === "completed" ||
                        order.status?.toLowerCase() === "selesai",
                    ).length
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white dark:bg-charcoal-800 rounded-2xl pl-3 pr-5 py-3 shadow-[var(--shadow-soft)]">
              <div className="w-10 h-10 rounded-xl bg-gold-50 flex items-center justify-center text-gold-600 shrink-0">
                <FaMoneyBillWave className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-charcoal-700/50 leading-tight">
                  Total Belanja
                </p>
                <p className="font-display font-bold text-charcoal-900 leading-tight">
                  Rp{" "}
                  {orders
                    .reduce(
                      (total, order) => total + Number(order.total_price),
                      0,
                    )
                    .toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* LIST PESANAN - kartu horizontal ala tiket, ramping */}
        {orders.length > 0 ? (
          <div className="space-y-5">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="bg-white dark:bg-charcoal-800 rounded-3xl shadow-[var(--shadow-soft)] hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Kiri: identitas order */}
                  <div className="md:w-48 shrink-0 bg-gradient-to-br from-rose-600 to-rose-400 text-white p-5 flex flex-row md:flex-col justify-between md:justify-center gap-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest opacity-70">
                        Order
                      </p>
                      <h3 className="font-display text-2xl font-bold">
                        #{order.id}
                      </h3>
                    </div>
                    <p className="text-xs opacity-80">
                      {new Date(order.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Tengah: status, harga, progress */}
                  <div className="flex-1 p-5 flex flex-col justify-center gap-3 border-b md:border-b-0 md:border-r border-beige-100">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                      <p className="font-display text-lg font-bold text-rose-500">
                        Rp {Number(order.total_price).toLocaleString("id-ID")}
                      </p>
                    </div>

                    <div className="w-full bg-beige-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgress(order.status)}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-2 rounded-full bg-gradient-to-r from-rose-500 to-gold-400"
                      />
                    </div>
                  </div>

                  {/* Kanan: aksi */}
                  <div className="p-5 flex flex-row md:flex-col gap-2 justify-center items-stretch">
                    <Button
                      onClick={() => handleOpenDetail(order.id)}
                      variant="primary"
                      size="sm"
                    >
                      <FaEye className="w-3.5 h-3.5" /> Detail
                    </Button>

                    {order.payment_method === "Transfer" &&
                      !order.payment_proof && (
                        <Button
                          to={`/upload-payment/${order.id}`}
                          variant="gold"
                          size="sm"
                        >
                          Upload Bukti
                        </Button>
                      )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-[var(--shadow-soft)] p-16 text-center">
            <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-6 text-rose-400">
              <FaBoxOpen className="w-9 h-9" />
            </div>
            <h2 className="font-display text-3xl font-bold text-charcoal-900 dark:text-cream-50">
              Belum Ada Pesanan
            </h2>
            <p className="text-charcoal-700/60 mt-4">
              Yuk pesan mochi favoritmu sekarang dan nikmati kelezatannya.
            </p>
            <div className="mt-8 flex justify-center">
              <Button to="/products" variant="primary" size="lg">
                Lihat Produk
              </Button>
            </div>
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
