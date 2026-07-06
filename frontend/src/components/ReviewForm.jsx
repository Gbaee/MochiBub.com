import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Button } from "./ui";

function ReviewForm({ orderId, productId, productName, onSubmitted }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Pilih rating bintang terlebih dahulu");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/reviews",
        { order_id: orderId, product_id: productId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("Ulasan berhasil dikirim, terima kasih!");
      onSubmitted({ rating, comment });
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal mengirim ulasan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-3 p-5 rounded-2xl bg-rose-50/60 border border-rose-100">
      <p className="text-sm font-semibold text-charcoal-800 mb-3">
        Beri ulasan untuk {productName}
      </p>

      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            whileTap={{ scale: 0.85 }}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(star)}
            aria-label={`${star} bintang`}
          >
            <FaStar
              className={`w-6 h-6 transition-colors ${
                star <= (hoverRating || rating) ? "text-gold-500" : "text-beige-300"
              }`}
            />
          </motion.button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Ceritakan pengalaman Anda dengan produk ini (opsional)"
        rows={3}
        className="w-full rounded-xl border border-beige-200 p-3 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
      />

      <Button
        variant="primary"
        size="sm"
        className="mt-3"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? "Mengirim..." : "Kirim Ulasan"}
      </Button>
    </div>
  );
}

export default ReviewForm;