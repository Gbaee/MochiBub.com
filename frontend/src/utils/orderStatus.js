// Satu sumber kebenaran untuk warna & progress status pesanan.
// Dipakai bersama oleh MyOrders.jsx dan OrderDetailModal.jsx
// supaya tidak ada lagi 2 salinan logic yang bisa tidak sinkron.

export const STATUS_STEPS = ["Pending", "Diproses", "Dikirim", "Selesai"];

export function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "confirmed":
    case "diproses":
      return "bg-blue-100 text-blue-700";
    case "processing":
    case "dikirim":
      return "bg-purple-100 text-purple-700";
    case "completed":
    case "selesai":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export function getProgress(status) {
  switch (status?.toLowerCase()) {
    case "pending":
      return 25;
    case "confirmed":
    case "diproses":
      return 50;
    case "processing":
    case "dikirim":
      return 75;
    case "completed":
    case "selesai":
      return 100;
    default:
      return 0;
  }
}

// Index step aktif (0-3) untuk stepper visual di OrderDetailModal
export function getCurrentStepIndex(status) {
  return Math.max(0, Math.round(getProgress(status) / 25) - 1);
}