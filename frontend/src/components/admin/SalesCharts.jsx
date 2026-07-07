import { Bar, Doughnut } from "react-chartjs-2";

function SalesCharts({ chartData, statusData, darkMode }) {
  const textColor = darkMode ? "#e5e0d8" : "#3d332c";
  const gridColor = darkMode ? "#3a322c" : "#ece0d1";

  const barOptions = {
    plugins: { legend: { labels: { color: textColor } } },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y: { ticks: { color: textColor }, grid: { color: gridColor } },
    },
  };

  const doughnutOptions = {
    plugins: { legend: { labels: { color: textColor } } },
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white dark:bg-charcoal-800 rounded-3xl shadow-[var(--shadow-soft)] p-6 transition-colors duration-300">
        <h2 className="font-display text-xl font-bold mb-4 text-charcoal-900 dark:text-cream-50">
          Grafik Omzet
        </h2>
        <Bar data={chartData} options={barOptions} />
      </div>

      <div className="bg-white dark:bg-charcoal-800 rounded-3xl shadow-[var(--shadow-soft)] p-6 transition-colors duration-300">
        <h2 className="font-display text-xl font-bold mb-4 text-charcoal-900 dark:text-cream-50">
          Status Pesanan
        </h2>
        <Doughnut data={statusData} options={doughnutOptions} />
      </div>
    </div>
  );
}

export default SalesCharts;