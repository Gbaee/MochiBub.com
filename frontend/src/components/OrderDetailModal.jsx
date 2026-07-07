import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaMoneyBillWave,
  FaStickyNote,
  FaCalendarAlt,
  FaStar,
} from "react-icons/fa";
import ReviewForm from "./ReviewForm";
import fallbackImage from "../assets/mochi-hero.jpg";
import { getStatusColor, getProgress, getCurrentStepIndex, STATUS_STEPS } from "../utils/orderStatus";

const COMPLETED_STATUSES = ["completed", "selesai"];

function OrderDetailModal({ isOpen, onClose, order }) {
  const [openReviewFor, setOpenReviewFor] = useState(null);
  const [localReviews, setLocalReviews] = useState({});

  if (!isOpen || !order) return null;

  const isCompleted = COMPLETED_STATUSES.includes(order.status?.toLowerCase());
  const currentStep = getCurrentStepIndex(order.status);

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
          transition={{ duration: 0.25 }}
          className="bg-white dark:bg-charcoal-800 rounded-[28px] w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        >
          {/* HEADER - ramping, tidak lagi blok besar */}
          <div className="flex items-center justify-between gap-4 px-6 py-5 bg-gradient-to-r from-rose-600 to-rose-400 text-white shrink-0">
            <div>
              <p className="text-xs opacity-80">Detail Pesanan</p>
              <h2 className="font-display text-2xl font-bold">#{order.id}</h2>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-full text-xs font-semibold bg-white ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Tutup"
              >
                <FaTimes className="text-white" />
              </button>
            </div>
          </div>

          {/* BODY - satu-satunya bagian yang di-scroll, modal luar tidak pernah membengkak */}
          <div className="overflow-y-auto p-6 md:p-8 flex-1">
            {/* STEPPER */}
            <div className="flex items-center mb-8 max-w-lg mx-auto">
              {STATUS_STEPS.map((label, i) => (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                        i <= currentStep
                          ? "bg-rose-500 border-rose-500 text-white"
                          : "bg-white border-beige-300 text-charcoal-700/30"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={`text-[10px] whitespace-nowrap ${
                        i <= currentStep ? "text-rose-600 font-semibold" : "text-charcoal-700/40"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 mb-4 rounded-full ${
                        i < currentStep ? "bg-rose-500" : "bg-beige-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* INFO - grid ringkas, tanpa blok warna tebal */}
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-5 mb-8 pb-8 border-b border-beige-100">
              <div className="space-y-4">
                <h3 className="font-display font-semibold text-charcoal-900 text-sm uppercase tracking-wide">
                  Informasi Pemesan
                </h3>

                <div className="flex gap-3 text-sm">
                  <FaWhatsapp className="text-rose-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-charcoal-700/45 text-xs">WhatsApp</p>
                    <p className="text-charcoal-900 dark:text-cream-50">{order.whatsapp}</p>
                  </div>
                </div>

                <div className="flex gap-3 text-sm">
                  <FaMapMarkerAlt className="text-rose-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-charcoal-700/45 text-xs">Alamat</p>
                    <p className="text-charcoal-900">{order.address}</p>
                  </div>
                </div>

                <div className="flex gap-3 text-sm">
                  <FaStickyNote className="text-rose-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-charcoal-700/45 text-xs">Catatan</p>
                    <p className="text-charcoal-900">{order.note || "-"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display font-semibold text-charcoal-900 text-sm uppercase tracking-wide">
                  Informasi Pembayaran
                </h3>

                <div className="flex gap-3 text-sm">
                  <FaMoneyBillWave className="text-gold-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-charcoal-700/45 text-xs">Metode</p>
                    <p className="text-charcoal-900">{order.payment_method}</p>
                  </div>
                </div>

                <div className="flex gap-3 text-sm">
                  <FaCalendarAlt className="text-gold-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-charcoal-700/45 text-xs">Tanggal</p>
                    <p className="text-charcoal-900">
                      {new Date(order.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 text-sm items-center">
                  <div className="w-4" />
                  <div>
                    <p className="text-charcoal-700/45 text-xs">Total</p>
                    <p className="font-display font-bold text-xl text-rose-500">
                      Rp {Number(order.total_price).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUK - baris kompak, bukan card besar */}
            <h3 className="font-display font-semibold text-charcoal-900 text-sm uppercase tracking-wide mb-4">
              Produk Dipesan
            </h3>

            <div className="space-y-3">
              {order.items?.map((item, index) => {
                const submittedLocally = localReviews[item.product_id];
                const alreadyReviewed = item.review_id || submittedLocally;

                return (
                  <div
                    key={index}
                    className="border border-beige-100 rounded-2xl p-4 hover:border-rose-200 transition-colors"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.foto || fallbackImage}
                        alt={item.nama_produk}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-charcoal-900 text-sm truncate">
                          {item.nama_produk}
                        </h4>
                        <p className="text-xs text-charcoal-700/50 mt-0.5">
                          Qty {item.qty} × Rp {Number(item.price).toLocaleString("id-ID")}
                        </p>
                      </div>
                      <p className="font-bold text-rose-500 text-sm shrink-0">
                        Rp {(item.qty * item.price).toLocaleString("id-ID")}
                      </p>
                    </div>

                    {isCompleted && (
                      <div className="mt-3 pl-[72px]">
                        {alreadyReviewed ? (
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex gap-0.5 text-gold-500 text-xs">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={
                                    i < (submittedLocally?.rating || item.review_rating)
                                      ? "opacity-100"
                                      : "opacity-25"
                                  }
                                />
                              ))}
                            </div>
                            {(submittedLocally?.comment || item.review_comment) && (
                              <span className="text-xs text-charcoal-700/60 italic">
                                "{submittedLocally?.comment || item.review_comment}"
                              </span>
                            )}
                          </div>
                        ) : openReviewFor === item.product_id ? (
                          <ReviewForm
                            orderId={order.id}
                            productId={item.product_id}
                            productName={item.nama_produk}
                            onSubmitted={(data) => {
                              setLocalReviews((prev) => ({
                                ...prev,
                                [item.product_id]: data,
                              }));
                              setOpenReviewFor(null);
                            }}
                          />
                        ) : (
                          <button
                            onClick={() => setOpenReviewFor(item.product_id)}
                            className="text-xs font-semibold text-rose-500 hover:text-rose-600 underline underline-offset-2"
                          >
                            Beri Ulasan
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default OrderDetailModal;