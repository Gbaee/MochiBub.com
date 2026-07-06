import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

function ReviewSkeleton() {
  return (
    <div className="animate-pulse space-y-3 border-b pb-5">
      <div className="h-4 bg-beige-200 rounded w-1/4" />
      <div className="h-3 bg-beige-200 rounded w-1/3" />
      <div className="h-3 bg-beige-200 rounded w-2/3" />
    </div>
  );
}

function ProductReviews({ productId }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!productId) return;
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setStatus("loading");
      const response = await axios.get(
        `http://localhost:5000/api/reviews/product/${productId}`,
      );
      setData(response.data);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mt-16">
      <h2 className="text-3xl font-bold mb-8 text-charcoal-900">Ulasan Pelanggan</h2>

      {status === "loading" && (
        <div className="space-y-6">
          <ReviewSkeleton />
          <ReviewSkeleton />
        </div>
      )}

      {status === "error" && (
        <p className="text-charcoal-700/60">Ulasan sedang tidak dapat dimuat.</p>
      )}

      {status === "success" && (
        <>
          <div className="mb-8 flex items-end gap-4">
            <h3 className="text-5xl font-bold text-rose-500">
              {data.total > 0 ? data.average.toFixed(1) : "-"}
            </h3>
            <div>
              <div className="flex gap-0.5 text-gold-500 text-xl">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.round(data.average) ? "opacity-100" : "opacity-25"}
                  />
                ))}
              </div>
              <p className="text-charcoal-700/50 text-sm mt-1">
                Berdasarkan {data.total} ulasan
              </p>
            </div>
          </div>

          {data.total === 0 ? (
            <p className="text-charcoal-700/60">
              Belum ada ulasan untuk produk ini. Jadilah yang pertama memberi ulasan!
            </p>
          ) : (
            <div className="space-y-6">
              {data.reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border-b pb-5"
                >
                  <h4 className="font-bold text-charcoal-900">{review.reviewer_name}</h4>
                  <div className="flex gap-0.5 text-gold-500 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.rating ? "opacity-100" : "opacity-25"}
                      />
                    ))}
                  </div>
                  {review.comment && (
                    <p className="text-charcoal-700/70 mt-2">{review.comment}</p>
                  )}
                  <p className="text-xs text-charcoal-700/40 mt-1">
                    {new Date(review.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductReviews;