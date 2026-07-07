function StatCard({ icon: Icon, label, value, colorClass = "text-rose-500", iconBg = "bg-rose-50" }) {
  return (
    <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-6 shadow-[var(--shadow-soft)] transition-colors duration-300">
      <div className="flex items-center gap-3 mb-3">
        {Icon && (
          <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center ${colorClass}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
        <h3 className="text-sm text-charcoal-700/60 dark:text-cream-100/50">{label}</h3>
      </div>
      <p className={`text-3xl font-display font-bold ${colorClass}`}>{value}</p>
    </div>
  );
}

export default StatCard;