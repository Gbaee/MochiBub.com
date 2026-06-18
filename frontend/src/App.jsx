import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";

import AdminRoute from "./components/AdminRoute";

import MyAccount from "./pages/MyAccount";
import MyOrders from "./pages/MyOrders";
import Favorites from "./pages/Favorites";

import ScrollAnimation from "./components/ScrollAnimation";
import LoadingScreen from "./components/LoadingScreen";
import PageTransition from "./components/PageTransition";

import UploadPayment from "./pages/UploadPayment";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#ffffff",
            color: "#333",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          },
          success: {
            iconTheme: {
              primary: "#ec4899",
              secondary: "#fff",
            },
          },
        }}
      />

      <ScrollAnimation />

      <MainLayout>
        <AnimatePresence mode="wait">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/products"
                element={<Products />}
              />

              <Route
                path="/product/:id"
                element={<ProductDetail />}
              />

              <Route
                path="/cart"
                element={<Cart />}
              />

              <Route
                path="/checkout"
                element={<Checkout />}
              />

              <Route
                path="/order-success"
                element={<OrderSuccess />}
              />

              <Route
                path="/login"
                element={<Login />}
              />

              <Route
                path="/register"
                element={<Register />}
              />

              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <AdminOrders />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <AdminProducts />
                  </AdminRoute>
                }
              />

              <Route
                path="/my-account"
                element={<MyAccount />}
              />

              <Route
                path="/my-orders"
                element={<MyOrders />}
              />

              <Route
                path="/upload-payment/:id"
                element={<UploadPayment />}
              />

              <Route
                path="/favorites"
                element={<Favorites />}
              />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;