import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.total_price),
    0,
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "completed",
  ).length;

  const averageOrder =
    orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  const today = new Date().toISOString().split("T")[0];

  const todayOrders = orders.filter(
    (order) => order.created_at && order.created_at.startsWith(today),
  );

  const todayRevenue = todayOrders.reduce(
    (total, order) => total + Number(order.total_price),
    0,
  );

  const chartData = {
    labels: orders.map((order) => `#${order.id}`),

    datasets: [
      {
        label: "Omzet",
        data: orders.map((order) => Number(order.total_price)),
        backgroundColor: "rgba(236,72,153,0.7)",
      },
    ],
  };

  const statusData = {
    labels: ["Pending", "Completed"],

    datasets: [
      {
        data: [pendingOrders, completedOrders],

        backgroundColor: ["#facc15", "#22c55e"],
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
    <div
      className={
        darkMode
          ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
          : "min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 text-black"
      }
    >
      <div className="max-w-7xl mx-auto p-5">
        <div
          className={`
    ${darkMode ? "bg-gray-800" : "bg-white"}
    rounded-3xl
    shadow-lg
    p-6
    mb-8
    flex
    flex-col
    md:flex-row
    justify-between
    items-center
    gap-4
  `}
        >
          <div className="flex justify-between items-start w-full">
            <div>
              <h1 className="text-5xl font-bold">📊 Dashboard Admin</h1>

              <p
                className={
                  darkMode ? "text-gray-400 mt-2" : "text-gray-500 mt-2"
                }
              >
                Kelola pesanan dan pantau penjualan Mochi Bub
              </p>
            </div>

            <div className="flex gap-3">
              <button
                title="Dark Mode"
                onClick={() => setDarkMode(!darkMode)}
                className="
      w-12
      h-12
      rounded-xl
      bg-slate-700
      text-white
      hover:scale-105
      transition
      "
              >
                {darkMode ? "☀️" : "🌙"}
              </button>

              <button
                title="Export PDF"
                onClick={exportPDF}
                className="
      w-12
      h-12
      rounded-xl
      bg-pink-500
      text-white
      hover:scale-105
      transition
      "
              >
                📄
              </button>

              <button
                title="Logout"
                onClick={handleLogout}
                className="
      w-12
      h-12
      rounded-xl
      bg-red-500
      text-white
      hover:scale-105
      transition
      "
              >
                🚪
              </button>

              <button
                title="Kelola Produk"
                onClick={() => (window.location.href = "/admin/products")}
                className="
  bg-purple-500
  hover:bg-purple-600
  text-white
  px-5
  py-3
  rounded-xl
  font-semibold
  transition
  "
              >
                ⚙️
              </button>
            </div>
          </div>

          <div
            className={
              darkMode
                ? "bg-gray-800 rounded-3xl p-6 shadow-lg"
                : "bg-white rounded-3xl p-6 shadow-lg"
            }
          >
            <h3 className="text-gray-500">Total Produk</h3>

            <p className="text-3xl font-bold text-purple-500">
              {productStats.totalProducts}
            </p>
          </div>

          <div
            className={
              darkMode
                ? "bg-gray-800 rounded-3xl p-6 shadow-lg"
                : "bg-white rounded-3xl p-6 shadow-lg"
            }
          >
            <h3 className="text-gray-500">Stok Menipis</h3>

            <p className="text-3xl font-bold text-red-500">
              {productStats.lowStockProducts}
            </p>
          </div>

          <div
            className={
              darkMode
                ? "bg-gray-800 rounded-3xl p-6 shadow-lg"
                : "bg-white rounded-3xl p-6 shadow-lg"
            }
          >
            <h3 className="text-gray-500">Pesanan Hari Ini</h3>

            <p className="text-3xl font-bold text-blue-500">
              {todayOrders.length}
            </p>
          </div>

          <div
            className={
              darkMode
                ? "bg-gray-800 rounded-3xl p-6 shadow-lg"
                : "bg-white rounded-3xl p-6 shadow-lg"
            }
          >
            <h3 className="text-gray-500">Omzet Hari Ini</h3>

            <p className="text-2xl font-bold text-green-500">
              Rp {todayRevenue.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* Statistik */}

        <div
          className="
        grid
        md:grid-cols-5
        gap-5
        mb-8
        "
        >
          <div
            className={
              darkMode
                ? "bg-gray-800 rounded-3xl p-6 shadow-lg"
                : "bg-white rounded-3xl p-6 shadow-lg"
            }
          >
            <h3 className="text-gray-500">Total Pesanan</h3>

            <p className="text-3xl font-bold">{orders.length}</p>
          </div>

          <div
            className={
              darkMode
                ? "bg-gray-800 rounded-3xl p-6 shadow-lg"
                : "bg-white rounded-3xl p-6 shadow-lg"
            }
          >
            <h3 className="text-gray-500">Total Omzet</h3>

            <p className="text-3xl font-bold text-pink-500">
              Rp {totalRevenue.toLocaleString("id-ID")}
            </p>
          </div>

          <div
            className={
              darkMode
                ? "bg-gray-800 rounded-3xl p-6 shadow-lg"
                : "bg-white rounded-3xl p-6 shadow-lg"
            }
          >
            <h3 className="text-gray-500">Pending</h3>

            <p className="text-3xl font-bold text-yellow-500">
              {pendingOrders}
            </p>
          </div>

          <div
            className={
              darkMode
                ? "bg-gray-800 rounded-3xl p-6 shadow-lg"
                : "bg-white rounded-3xl p-6 shadow-lg"
            }
          >
            <h3 className="text-gray-500">Completed</h3>

            <p className="text-3xl font-bold text-green-500">
              {completedOrders}
            </p>
          </div>

          <div
            className={
              darkMode
                ? "bg-gray-800 rounded-3xl p-6 shadow-lg"
                : "bg-white rounded-3xl p-6 shadow-lg"
            }
          >
            <h3 className="text-gray-500">Rata-rata Order</h3>

            <p className="text-3xl font-bold text-blue-500">
              Rp {averageOrder.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        <div
          className="
  grid
  md:grid-cols-2
  gap-6
  mb-8
  "
        >
          <div
            className={
              darkMode
                ? "bg-gray-800 rounded-3xl shadow-lg p-6"
                : "bg-white rounded-3xl shadow-lg p-6"
            }
          >
            <h2
              className="
      text-xl
      font-bold
      mb-4
      "
            >
              📈 Grafik Omzet
            </h2>

            <Bar data={chartData} />
          </div>

          <div
            className={
              darkMode
                ? "bg-gray-800 rounded-3xl shadow-lg p-6"
                : "bg-white rounded-3xl shadow-lg p-6"
            }
          >
            <h2
              className="
      text-xl
      font-bold
      mb-4
      "
            >
              📊 Status Pesanan
            </h2>

            <Doughnut data={statusData} />
          </div>
        </div>

        <div
          className="
  bg-gradient-to-r
  from-pink-500
  to-purple-500
  text-white
  rounded-3xl
  p-6
  mb-8
  shadow-lg
  "
        >
          <h2
            className="
    text-2xl
    font-bold
    mb-2
    "
          >
            🤖 AI Admin Assistant
          </h2>

          <p>{aiInsight}</p>
        </div>

        {/* PRODUCT MANAGEMENT */}

        {/* Search + Filter */}

        <div
          className="
        flex
        flex-col
        md:flex-row
        gap-4
        mb-6
        "
        >
          <input
            type="text"
            placeholder="Cari nama pelanggan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
          border
          rounded-2xl
          p-3
          flex-1
          "
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="
          border
          rounded-2xl
          p-3
          "
          >
            <option value="all">Semua Status</option>

            <option value="pending">Pending</option>

            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Table */}

        <div
          className={
            darkMode
              ? "bg-gray-800 rounded-3xl shadow-lg overflow-hidden"
              : "bg-white rounded-3xl shadow-lg overflow-hidden"
          }
        >
          <table className="w-full">
            <thead>
              <tr className="bg-pink-500 text-white">
                <th className="p-4">Detail</th>
                <th className="p-4">ID</th>
                <th className="p-4">Nama</th>
                <th className="p-4">WhatsApp</th>
                <th className="p-4">Bukti Bayar</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                {/* <th className="p-4">Chat</th> */}
              </tr>
            </thead>

            <tbody>
              {orders
                .filter((order) => {
                  const matchName = order.customer_name
                    .toLowerCase()
                    .includes(search.toLowerCase());

                  const matchStatus =
                    filterStatus === "all"
                      ? true
                      : order.status === filterStatus;

                  return matchName && matchStatus;
                })
                .map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="p-4">
                      <button
                        onClick={async () => {
                          try {
                            const token = localStorage.getItem("token");
                            const response = await axios.get(
                              `http://localhost:5000/api/orders/${order.id}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              },
                            );

                            setSelectedOrder(response.data);
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                        className="
    bg-blue-500
    text-white
    px-4
    py-2
    rounded-xl
    "
                      >
                        Detail
                      </button>
                    </td>
                    <td className="p-4">{order.id}</td>

                    <td className="p-4">{order.customer_name}</td>

                    <td className="p-4">{order.whatsapp}</td>

                    <td className="p-4">
                      {order.payment_proof ? (
                        <span className="text-green-600 font-semibold">
                          Sudah Upload
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold">
                          Belum Upload
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      Rp {Number(order.total_price).toLocaleString("id-ID")}
                    </td>

                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={async (e) => {
                          try {
                            const token = localStorage.getItem("token");
                            await axios.put(
                              `http://localhost:5000/api/orders/${order.id}/status`,
                              {
                                status: e.target.value,
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              },
                            );

                            fetchOrders();
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                        className="
                      border
                      rounded-xl
                      p-2
                      "
                      >
                        <option value="pending">Pending</option>

                        <option value="completed">Completed</option>
                      </select>
                    </td>

                    {/* <td className="p-4">
                      <a
                        href={`https://wa.me/${order.whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="
                      bg-green-500
                      text-white
                      px-4
                      py-2
                      rounded-xl
                      "
                      >
                        Chat
                      </a>
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
          {selectedOrder && (
            <div
              className="
    fixed
    inset-0
    bg-black/50
    flex
    items-center
    justify-center
    z-50
    "
            >
              <div
                className="
      bg-white
      rounded-3xl
      p-8
      w-[600px]
      max-h-[90vh]
      overflow-y-auto
      "
              >
                <h2 className="text-3xl font-bold mb-5">
                  Order #{selectedOrder.id}
                </h2>

                <p>
                  <b>Nama:</b> {selectedOrder.customer_name}
                </p>

                <p>
                  <b>WhatsApp:</b> {selectedOrder.whatsapp}
                </p>

                <p>
                  <b>Alamat:</b> {selectedOrder.address}
                </p>

                <p>
                  <b>Pembayaran:</b> {selectedOrder.payment_method}
                </p>

                <p>
                  <b>Status Pembayaran:</b>{" "}
                  {selectedOrder.payment_status || "Belum Upload"}
                </p>

                {selectedOrder.payment_proof && (
                  <div className="mt-4">
                    <p className="font-bold mb-2">Bukti Pembayaran:</p>

                    <img
                      src={selectedOrder.payment_proof}
                      alt="Bukti Pembayaran"
                      className="
      w-full
      max-w-md
      rounded-xl
      border
      "
                    />
                  </div>
                )}

                {selectedOrder.payment_status === "Menunggu Verifikasi" && (
                  <button
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem("token");

                        await axios.put(
                          `http://localhost:5000/api/orders/${selectedOrder.id}/verify-payment`,
                          {},
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          },
                        );

                        alert("Pembayaran berhasil diverifikasi");

                        setSelectedOrder({
                          ...selectedOrder,
                          payment_status: "Lunas",
                          status: "Diproses",
                        });

                        fetchOrders();
                      } catch (error) {
                        console.error(error);
                        alert("Gagal verifikasi pembayaran");
                      }
                    }}
                    className="
      mt-4
      bg-green-500
      hover:bg-green-600
      text-white
      px-5
      py-3
      rounded-xl
      font-semibold
    "
                  >
                    ✅ Verifikasi Pembayaran
                  </button>
                )}

                <p>
                  <b>Catatan:</b> {selectedOrder.note}
                </p>

                <hr className="my-5" />

                <h3 className="font-bold text-xl mb-4">Item Pesanan</h3>

                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="
            flex
            justify-between
            mb-3
            "
                  >
                    <span>
                      {item.nama_produk} ({item.qty}x)
                    </span>

                    <span>
                      Rp {Number(item.price * item.qty).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}

                <hr className="my-5" />

                <h3 className="text-2xl font-bold">
                  Total: Rp{" "}
                  {Number(selectedOrder.total_price).toLocaleString("id-ID")}
                </h3>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="
        mt-6
        bg-red-500
        text-white
        px-6
        py-3
        rounded-xl
        "
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
