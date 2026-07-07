import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import ProductReviews from "../components/ProductReviews";
import fallbackImage from "../assets/mochi-hero.jpg";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(productResponse.data);
        setSelectedImage(productResponse.data.foto);

        const productsResponse = await axios.get(
          "http://localhost:5000/api/products"
        );
        setProducts(productsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((f) => f.id === product.id));
  }, [product]);

  const increaseQty = () => {
    if (product && quantity < product.stok) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    alert(`${quantity} ${product.nama_produk} berhasil ditambahkan ke keranjang`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      const updated = favorites.filter((f) => f.id !== product.id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
      alert(`${product.nama_produk} dihapus dari favorit`);
    } else {
      favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
      alert(`${product.nama_produk} ditambahkan ke favorit ❤️`);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: product.nama_produk,
      text: `Lihat produk ini: ${product.nama_produk} — Rp ${Number(product.harga).toLocaleString("id-ID")}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancel share — abaikan
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link produk berhasil disalin ke clipboard 📋");
    }
  };

  if (!product) {
    return <div className="text-center py-20 text-gray-700 dark:text-cream-100">Loading...</div>;
  }

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      {/* DETAIL PRODUK */}
      <div className="bg-white dark:bg-charcoal-800 rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* Gambar */}
        <div className="p-6">
          <img
            src={selectedImage || fallbackImage}
            alt={product.nama_produk}
            className="w-full h-[500px] object-cover rounded-3xl transition hover:scale-105 duration-300"
          />
        </div>

        {/* Info Produk */}
        <div className="p-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-cream-50">
            {product.nama_produk}
          </h1>

          <h2 className="text-3xl font-bold text-pink-500 mt-5">
            Rp {Number(product.harga).toLocaleString("id-ID")}
          </h2>

          <div className="flex gap-3 mt-4">
            {product.stok > 0 ? (
              <span className="bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                Ready Stock
              </span>
            ) : (
              <span className="bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
                Stok Habis
              </span>
            )}
          </div>

          <p className="mt-6 text-gray-600 dark:text-cream-100/60 leading-relaxed">{product.deskripsi}</p>

          <div className="mt-6 bg-pink-50 dark:bg-white/5 p-4 rounded-xl text-gray-900 dark:text-cream-50">
            <span className="font-semibold">Stok tersedia :</span> {product.stok}
          </div>

          <div className="mt-5 bg-gray-50 dark:bg-white/5 rounded-2xl p-5 space-y-3 text-gray-700 dark:text-cream-100/70">
            <div>🚚 Estimasi tiba: <strong>1 - 2 Hari</strong></div>
            <div>✅ Produk dibuat fresh setiap hari</div>
            <div>🔒 Pembayaran aman & terpercaya</div>
            <div>🎁 Kemasan premium dan higienis</div>
          </div>

          {/* QUANTITY */}
          <div className="mt-6">
            <p className="font-semibold mb-3 text-gray-900 dark:text-cream-50">Jumlah Pesanan</p>

            <div className="flex items-center gap-2">
              <button
                onClick={decreaseQty}
                disabled={quantity <= 1}
                className="w-9 h-9 rounded-full border border-pink-300 dark:border-white/10 text-pink-500 font-bold text-lg hover:bg-pink-50 dark:hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center"
              >
                −
              </button>

              <span className="w-10 text-center text-lg font-bold text-gray-800 dark:text-cream-50">
                {quantity}
              </span>

              <button
                onClick={increaseQty}
                disabled={product && quantity >= product.stok}
                className="w-9 h-9 rounded-full bg-pink-500 text-white font-bold text-lg hover:bg-pink-600 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA BUTTONS */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 text-white px-4 py-3 rounded-2xl font-bold transition-all hover:scale-[1.02] shadow-md shadow-pink-200"
            >
              ⚡ Beli Sekarang
            </button>

            <button
              onClick={handleAddToCart}
              className="flex-1 border-2 border-pink-500 text-pink-500 dark:text-rose-300 px-4 py-3 rounded-2xl font-semibold hover:bg-pink-50 dark:hover:bg-white/10 transition"
            >
              🛒 Keranjang
            </button>
          </div>
        </div>
      </div>

      {/* TOMBOL FAVORIT & BAGIKAN */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleToggleFavorite}
          className={`flex-1 border-2 py-4 rounded-2xl font-semibold transition ${
            isFavorite
              ? "border-pink-500 bg-pink-500 text-white"
              : "border-pink-500 text-pink-500 dark:text-rose-300 hover:bg-pink-50 dark:hover:bg-white/10"
          }`}
        >
          {isFavorite ? "❤️ Tersimpan di Favorit" : "🤍 Favorit"}
        </button>

        <button
          onClick={handleShare}
          className="flex-1 border-2 border-gray-300 dark:border-white/10 text-gray-900 dark:text-cream-50 py-4 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-400 transition"
        >
          📤 Bagikan
        </button>
      </div>

      <ProductReviews productId={product.id} />

      {/* REKOMENDASI */}
      <div className="mt-24">
        <div className="text-center mb-12">
          <span className="bg-pink-100 dark:bg-white/10 text-pink-600 dark:text-rose-300 px-4 py-2 rounded-full text-sm font-semibold">
            REKOMENDASI UNTUKMU
          </span>

          <h2 className="text-4xl font-bold mt-4 text-gray-900 dark:text-cream-50">🍡 Mungkin Kamu Suka Ini</h2>

          <p className="text-gray-500 dark:text-cream-100/50 mt-3">
            Pilihan mochi favorit lainnya yang cocok untukmu.
          </p>
        </div>

        {relatedProducts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="cursor-pointer bg-white dark:bg-charcoal-800 rounded-3xl shadow-lg overflow-hidden hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={item.foto || fallbackImage}
                    alt={item.nama_produk}
                    className="h-56 w-full object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-pink-500 text-white text-xs px-3 py-1 rounded-full">
                    Rekomendasi
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-cream-50">{item.nama_produk}</h3>
                  <p className="text-pink-500 font-bold text-lg">
                    Rp {Number(item.harga).toLocaleString("id-ID")}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${item.id}`);
                    }}
                    className="mt-4 w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-600 transition"
                  >
                    Lihat Produk
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-10 text-center shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-cream-50">Belum ada rekomendasi produk</h3>
            <p className="text-gray-500 dark:text-cream-100/50 mt-2">Produk lainnya akan muncul di sini.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;