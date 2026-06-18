import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductSearch() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products"
        );

        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    search.trim() === ""
      ? []
      : products.filter((product) =>
          product.nama_produk
            .toLowerCase()
            .includes(search.toLowerCase())
        );

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Cari mochi favoritmu..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
        w-full
        border
        border-gray-200
        rounded-2xl
        px-5
        py-3
        outline-none
        focus:border-pink-500
        "
      />

      {filteredProducts.length > 0 && (
        <div
          className="
          absolute
          top-full
          left-0
          right-0
          bg-white
          rounded-2xl
          shadow-xl
          mt-2
          z-50
          overflow-hidden
          "
        >
          {filteredProducts
            .slice(0, 5)
            .map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={() =>
                  setSearch("")
                }
              >
                <div
                  className="
                  flex
                  items-center
                  gap-3
                  p-3
                  hover:bg-pink-50
                  transition
                  "
                >
                  <img
                    src={
                      product.foto ||
                      "https://placehold.co/100"
                    }
                    alt={product.nama_produk}
                    className="
                    w-12
                    h-12
                    object-cover
                    rounded-xl
                    "
                  />

                  <div>
                    <p className="font-semibold">
                      {product.nama_produk}
                    </p>

                    <p
                      className="
                      text-pink-500
                      text-sm
                      "
                    >
                      Rp{" "}
                      {Number(
                        product.harga
                      ).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

export default ProductSearch;