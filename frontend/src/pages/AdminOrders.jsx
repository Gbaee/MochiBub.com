import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  HiOutlineCube,
  HiOutlineExclamation,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineChartBar,
} from "react-icons/hi";

import AdminHeader from "../components/admin/AdminHeader";
import StatCard from "../components/admin/StatCard";
import SalesCharts from "../components/admin/SalesCharts";
import AiInsightBanner from "../components/admin/AiInsightBanner";
import OrdersTable from "../components/admin/OrdersTable";
import AdminOrderDetailModal from "../components/admin/AdminOrderDetailModal";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [productStats, setProductStats] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(response.data);

      const productResponse = await axios.get(
        "http://localhost:5000/api/products/stats/dashboard",
      );

      setProductStats(productResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const loadOrders = async () => {
      await fetchOrders();
    };

    loadOrders();

    const interval = setInterval(() => {
      loadOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleViewDetail = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/orders/${orderId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setSelectedOrder(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyPayment = async (orderId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/verify-payment`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("Pembayaran berhasil diverifikasi");

      setSelectedOrder((prev) => ({
        ...prev,
        payment_status: "Lunas",
        status: "Diproses",
      }));

      fetchOrders();
    } catch (error) {
      console.error(error);
      toast.error("Gagal verifikasi pembayaran");
    }
  };

  const totalRevenue = orders.reduce((total, order) => total + Number(order.total_price), 0);
  const pendingOrders = orders.filter((order) => order.status === "pending").length;
  const completedOrders = orders.filter((order) => order.status === "completed").length;
  const averageOrder = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  const today = new Date().toISOString().split("T")[0];
  const todayOrders = orders.filter(
    (order) => order.created_at && order.created_at.startsWith(today),
  );
  const todayRevenue = todayOrders.reduce((total, order) => total + Number(order.total_price), 0);

  const chartData = {
    labels: orders.map((order) => `#${order.id}`),
    datasets: [
      {
        label: "Omzet",
        data: orders.map((order) => Number(order.total_price)),
        backgroundColor: "rgba(233,30,140,0.7)",
        borderRadius: 8,
      },
    ],
  };

  const statusData = {
    labels: ["Pending", "Completed"],
    datasets: [
      {
        data: [pendingOrders, completedOrders],
        backgroundColor: ["#f5b942", "#22c55e"],
      },
    ],
  };

  const aiInsight =
    completedOrders > pendingOrders
      ? "Penjualan berjalan baik. Mayoritas pesanan telah selesai diproses."
      : "Masih banyak pesanan pending. Segera follow up pelanggan untuk meningkatkan konversi.";

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Laporan Penjualan Mochi Bub", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["ID", "Nama", "WhatsApp", "Total", "Status"]],
      body: orders.map((order) => [
        order.id,
        order.customer_name,
        order.whatsapp,
        `Rp ${Number(order.total_price).toLocaleString("id-ID")}`,
        order.status,
      ]),
    });

    doc.text(
      `Total Omzet: Rp ${totalRevenue.toLocaleString("id-ID")}`,
      14,
      doc.lastAutoTable.finalY + 15,
    );

    doc.save("Laporan_Penjualan_Mochi_Bub.pdf");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-cream-50 dark:bg-charcoal-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto p-5 md:p-8">
          <AdminHeader
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
            onExportPDF={exportPDF}
            onLogout={handleLogout}
            onKelolaProduk={() => (window.location.href = "/admin/products")}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard icon={HiOutlineCube} label="Total Produk" value={productStats.totalProducts} colorClass="text-purple-500" iconBg="bg-purple-50" />
            <StatCard icon={HiOutlineExclamation} label="Stok Menipis" value={productStats.lowStockProducts} colorClass="text-red-500" iconBg="bg-red-50" />
            <StatCard icon={HiOutlineCalendar} label="Pesanan Hari Ini" value={todayOrders.length} colorClass="text-blue-500" iconBg="bg-blue-50" />
            <StatCard icon={HiOutlineCurrencyDollar} label="Omzet Hari Ini" value={`Rp ${todayRevenue.toLocaleString("id-ID")}`} colorClass="text-green-500" iconBg="bg-green-50" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
            <StatCard icon={HiOutlineClipboardList} label="Total Pesanan" value={orders.length} colorClass="text-charcoal-900 dark:text-cream-50" iconBg="bg-beige-100" />
            <StatCard icon={HiOutlineCurrencyDollar} label="Total Omzet" value={`Rp ${totalRevenue.toLocaleString("id-ID")}`} colorClass="text-rose-500" iconBg="bg-rose-50" />
            <StatCard icon={HiOutlineClock} label="Pending" value={pendingOrders} colorClass="text-gold-600" iconBg="bg-cream-200" />
            <StatCard icon={HiOutlineCheckCircle} label="Completed" value={completedOrders} colorClass="text-green-500" iconBg="bg-green-50" />
            <StatCard icon={HiOutlineChartBar} label="Rata-rata Order" value={`Rp ${averageOrder.toLocaleString("id-ID")}`} colorClass="text-blue-500" iconBg="bg-blue-50" />
          </div>

          <SalesCharts chartData={chartData} statusData={statusData} darkMode={darkMode} />

          <AiInsightBanner insight={aiInsight} />

          <OrdersTable
            orders={orders}
            search={search}
            setSearch={setSearch}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            onViewDetail={handleViewDetail}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>

      <AdminOrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onVerifyPayment={handleVerifyPayment}
      />
    </div>
  );
}

export default AdminOrders;