import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaMoneyBillWave,
  FaStickyNote,
  FaCalendarAlt,
  FaReceipt,
} from "react-icons/fa";

function OrderDetailModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
      case "diproses":
        return "bg-blue-100 text-blue-700";

      case "dikirim":
      case "processing":
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

      case "dikirim":
      case "processing":
        return 75;

      case "completed":
      case "selesai":
        return 100;

      default:
        return 0;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="
          fixed inset-0 z-50
          bg-black/50 backdrop-blur-sm
          flex items-center justify-center
          p-4
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{
            scale: 0.9,
            opacity: 0,
            y: 30,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          exit={{
            scale: 0.9,
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            bg-white
            rounded-[35px]
            w-full
            max-w-4xl
            max-h-[90vh]
            overflow-y-auto
            shadow-2xl
          "
        >
          {/* HEADER */}
          <div
            className="
    bg-gradient-to-r
    from-pink-500
    to-rose-500
    text-white
    p-8
    relative
  "
          >
            <button
              type="button"
              onClick={onClose}
              className="
    absolute
    top-5
    right-5
    w-10
    h-10
    flex
    items-center
    justify-center
    rounded-full
    bg-white/20
    hover:bg-white/30
    transition-all
    duration-200
    cursor-pointer
    z-[9999]
  "
            >
              <FaTimes className="text-lg text-white" />
            </button>

            <p className="opacity-80">Detail Pesanan</p>

            <h2 className="text-4xl font-bold mt-2">#{order.id}</h2>

            <span
              className={`
                inline-block
                mt-4
                px-4
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

          <div className="p-8">
            {/* TIMELINE */}
            <div className="mb-10">
              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>Pesanan Dibuat</span>

                <span>{order.status}</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${getProgress(order.status)}%`,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="
                    h-3
                    rounded-full
                    bg-gradient-to-r
                    from-pink-500
                    to-rose-500
                  "
                />
              </div>
            </div>

            {/* INFORMASI */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-pink-50 rounded-3xl p-6">
                <h3 className="font-bold text-xl mb-5">Informasi Pemesan</h3>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <FaWhatsapp className="text-pink-500 mt-1" />

                    <div>
                      <p className="text-gray-500 text-sm">WhatsApp</p>

                      <p>{order.whatsapp}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <FaMapMarkerAlt className="text-pink-500 mt-1" />

                    <div>
                      <p className="text-gray-500 text-sm">Alamat</p>

                      <p>{order.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <FaStickyNote className="text-pink-500 mt-1" />

                    <div>
                      <p className="text-gray-500 text-sm">Catatan</p>

                      <p>{order.note || "-"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-3xl p-6">
                <h3 className="font-bold text-xl mb-5">Informasi Pembayaran</h3>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <FaMoneyBillWave className="text-purple-500 mt-1" />

                    <div>
                      <p className="text-gray-500 text-sm">Metode</p>

                      <p>{order.payment_method}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <FaCalendarAlt className="text-purple-500 mt-1" />

                    <div>
                      <p className="text-gray-500 text-sm">Tanggal</p>

                      <p>
                        {new Date(order.created_at).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <FaReceipt className="text-purple-500 mt-1" />

                    <div>
                      <p className="text-gray-500 text-sm">Total</p>

                      <p className="font-bold text-2xl text-pink-500">
                        Rp {Number(order.total_price).toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUK */}
            <div className="mt-10">
              <h3 className="font-bold text-2xl mb-6">Produk Dipesan</h3>

              <div className="space-y-5">
                {order.items?.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -4,
                    }}
                    className="
                      bg-white
                      border
                      rounded-3xl
                      p-5
                      flex
                      flex-col
                      md:flex-row
                      gap-5
                      shadow-md
                    "
                  >
                    <img
                      src={item.foto || "https://placehold.co/200x200"}
                      alt={item.nama_produk}
                      className="
                        w-28
                        h-28
                        rounded-2xl
                        object-cover
                      "
                    />

                    <div className="flex-1">
                      <h4 className="font-bold text-xl">{item.nama_produk}</h4>

                      <p className="text-gray-500 mt-2">Qty: {item.qty}</p>

                      <p className="text-pink-500 font-bold mt-3">
                        Rp {Number(item.price).toLocaleString("id-ID")}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-500">Subtotal</p>

                      <p className="font-bold text-xl">
                        Rp {(item.qty * item.price).toLocaleString("id-ID")}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default OrderDetailModal;
