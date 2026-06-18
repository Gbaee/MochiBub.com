import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const CartContext =
  createContext();

export function CartProvider({
  children,
}) {
  const [cart, setCart] = useState(() => {
    const saved =
      localStorage.getItem("cart");

    return saved
      ? JSON.parse(saved)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // TAMBAH KE KERANJANG
  const addToCart = (
    product,
    quantity = 1
  ) => {
    const existing = cart.find(
      (item) => item.id === product.id
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty:
                  item.qty + quantity,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          qty: quantity,
        },
      ]);
    }
  };

  // HAPUS PRODUK
  const removeFromCart = (id) => {
    setCart(
      cart.filter(
        (item) => item.id !== id
      )
    );
  };

  // TAMBAH JUMLAH
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      )
    );
  };

  // KURANG JUMLAH
  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                item.qty > 1
                  ? item.qty - 1
                  : 1,
            }
          : item
      )
    );
  };

  // KOSONGKAN KERANJANG
  const clearCart = () => {
    setCart([]);
  };

  // TOTAL ITEM
  const totalItems = cart.reduce(
    (total, item) =>
      total + item.qty,
    0
  );

  // TOTAL HARGA
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      item.harga * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// CUSTOM HOOK
export const useCart = () => {
  return useContext(CartContext);
};