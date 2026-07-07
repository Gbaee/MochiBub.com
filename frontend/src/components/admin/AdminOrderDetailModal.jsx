import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineX, HiOutlineCheckCircle } from "react-icons/hi";
import { FaWhatsapp, FaMapMarkerAlt, FaMoneyBillWave, FaStickyNote } from "react-icons/fa";

function AdminOrderDetailModal({ order, onClose, onVerifyPayment }) {
  if (!order) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-charcoal-900/50 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-charcoal-800 rounded-[28px] w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-rose-600 to-rose-400 text-white shrink-0">
            <h2 className="font-display text-2xl font-bold">Order #{order.id}</h2>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <HiOutlineX className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 flex-1 space-y-4 text-sm">
            <div className="flex gap-3">
              <FaWhatsapp className="text-rose-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-charcoal-700/45 dark:text-cream-100/40">WhatsApp</p>
                <p className="text-charcoal-900 dark:text-cream-50">{order.whatsapp}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <FaMapMarkerAlt className="text-rose-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-charcoal-700/45 dark:text-cream-100/40">Alamat</p>
                <p className="text-charcoal-900 dark:text-cream-50">{order.address}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <FaMoneyBillWave className="text-gold-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-charcoal-700/45 dark:text-cream-100/40">Pembayaran</p>
                <p className="text-charcoal-900 dark:text-cream-50">
                  {order.payment_method} — {order.payment_status || "Belum Upload"}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <FaStickyNote className="text-rose-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-charcoal-700/45 dark:text-cream-100/40">Catatan</p>
                <p className="text-charcoal-900 dark:text-cream-50">{order.note || "-"}</p>
              </div>
            </div>

            {order.payment_proof && (
              <div>
                <p className="text-xs text-charcoal-700/45 dark:text-cream-100/40 mb-2">
                  Bukti Pembayaran
                </p>
                <img
                  src={order.payment_proof}
                  alt="Bukti Pembayaran"
                  className="w-full max-w-sm rounded-2xl border border-beige-200"
                />
              </div>
            )}

            {order.payment_status === "Menunggu Verifikasi" && (
              <button
                onClick={() => onVerifyPayment(order.id)}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl font-semibold text-sm transition-colors"
              >
                <HiOutlineCheckCircle className="w-4 h-4" /> Verifikasi Pembayaran
              </button>
            )}

            <div className="pt-4 border-t border-beige-100 dark:border-white/10">
              <h3 className="font-display font-semibold text-charcoal-900 dark:text-cream-50 mb-3">
                Item Pesanan
              </h3>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-charcoal-700 dark:text-cream-100/70">
                    <span>{item.nama_produk} ({item.qty}x)</span>
                    <span className="font-medium">
                      Rp {Number(item.price * item.qty).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-beige-100 dark:border-white/10 flex justify-between items-center">
              <span className="font-display font-bold text-lg text-charcoal-900 dark:text-cream-50">Total</span>
              <span className="font-display font-bold text-xl text-rose-500">
                Rp {Number(order.total_price).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AdminOrderDetailModal;