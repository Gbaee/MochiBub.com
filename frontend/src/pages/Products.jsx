import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil keyword dari URL (?search=...) kalau ada, kalau tidak default kosong
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error mengambil produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Kalau user datang dari promo lain (URL berubah), search box ikut update
  useEffect(() => {
    const keywordFromUrl = searchParams.get("search");
    if (keywordFromUrl) {
      setSearch(keywordFromUrl);
    }
  }, [searchParams]);

  const filteredProducts = products.filter((product) =>
    product.nama_produk.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h2 className="text-4xl font-bold mb-8 text-center text-charcoal-900 dark:text-cream-50">
        Produk Kami
      </h2>

      {/* SEARCH BAR */}
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="🔍 Cari Mochi Favoritmu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-full border border-pink-300 dark:border-white/10 dark:bg-charcoal-800 dark:text-cream-50 dark:placeholder:text-cream-100/40 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
        />
      </div>

      {/* LOADING SKELETON */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-charcoal-800 rounded-3xl shadow-lg overflow-hidden animate-pulse"
            >
              <div className="h-56 bg-gray-200 dark:bg-charcoal-700"></div>
              <div className="p-5">
                <div className="h-6 bg-gray-200 dark:bg-charcoal-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-charcoal-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-charcoal-700 rounded mb-6"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 w-24 bg-gray-200 dark:bg-charcoal-700 rounded"></div>
                  <div className="h-10 w-28 bg-gray-200 dark:bg-charcoal-700 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-cream-100">
            😢 Produk tidak ditemukan
          </h3>
          <p className="text-gray-500 dark:text-cream-100/50 mt-3">
            Coba gunakan kata kunci lain.
          </p>
        </div>
      )}
    </div>
  );
}

export default Products;