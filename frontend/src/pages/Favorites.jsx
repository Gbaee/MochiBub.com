import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favoriteIds);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id),
  );

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-cream-50">
        ❤️ Produk Favorit
      </h1>

      {favoriteProducts.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-cream-50">
            Belum ada favorit
          </h2>
          <p className="text-gray-500 dark:text-cream-100/50 mt-3">
            Tambahkan produk ke favorit terlebih dahulu.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;