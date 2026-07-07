import { HiOutlineSearch, HiOutlineEye } from "react-icons/hi";

function OrdersTable({ orders, search, setSearch, filterStatus, setFilterStatus, onViewDetail, onStatusChange }) {
  const filteredOrders = orders.filter((order) => {
    const matchName = order.customer_name?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" ? true : order.status === filterStatus;
    return matchName && matchStatus;
  });

  return (
    <div className="bg-white dark:bg-charcoal-800 rounded-3xl shadow-[var(--shadow-soft)] overflow-hidden transition-colors duration-300">
      <div className="flex flex-col md:flex-row gap-4 p-6 border-b border-beige-100 dark:border-white/5">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-700/40 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari nama pelanggan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-beige-200 dark:border-white/10 dark:bg-charcoal-900 dark:text-cream-50 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-2xl border border-beige-200 dark:border-white/10 dark:bg-charcoal-900 dark:text-cream-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
        >
          <option value="all">Semua Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-rose-50 dark:bg-charcoal-900 text-charcoal-700 dark:text-cream-100/70">
              <th className="p-4 text-left font-semibold">Detail</th>
              <th className="p-4 text-left font-semibold">ID</th>
              <th className="p-4 text-left font-semibold">Nama</th>
              <th className="p-4 text-left font-semibold">WhatsApp</th>
              <th className="p-4 text-left font-semibold">Bukti Bayar</th>
              <th className="p-4 text-left font-semibold">Total</th>
              <th className="p-4 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-beige-100 dark:border-white/5 hover:bg-rose-50/40 dark:hover:bg-white/5 transition-colors"
              >
                <td className="p-4">
                  <button
                    onClick={() => onViewDetail(order.id)}
                    className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <HiOutlineEye className="w-3.5 h-3.5" /> Detail
                  </button>
                </td>
                <td className="p-4 font-medium text-charcoal-900 dark:text-cream-50">#{order.id}</td>
                <td className="p-4 text-charcoal-900 dark:text-cream-50">{order.customer_name}</td>
                <td className="p-4 text-charcoal-700/70 dark:text-cream-100/60">{order.whatsapp}</td>
                <td className="p-4">
                  {order.payment_proof ? (
                    <span className="text-green-600 font-semibold text-xs">Sudah Upload</span>
                  ) : (
                    <span className="text-red-500 font-semibold text-xs">Belum Upload</span>
                  )}
                </td>
                <td className="p-4 font-semibold text-rose-500">
                  Rp {Number(order.total_price).toLocaleString("id-ID")}
                </td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => onStatusChange(order.id, e.target.value)}
                    className="border border-beige-200 dark:border-white/10 dark:bg-charcoal-900 dark:text-cream-50 rounded-xl p-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16 text-charcoal-700/50 dark:text-cream-100/40">
            Tidak ada pesanan yang cocok dengan pencarian.
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersTable;