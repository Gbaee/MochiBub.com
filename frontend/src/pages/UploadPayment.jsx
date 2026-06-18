import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function UploadPayment() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Pilih bukti pembayaran");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("payment", file);

      await axios.post(
        `http://localhost:5000/api/orders/${id}/upload-payment`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Bukti pembayaran berhasil dikirim 💳");

      navigate("/my-orders");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Gagal upload bukti pembayaran");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-3">💳 Pembayaran QRIS</h1>

        <p className="text-gray-500 mb-8">
          Scan QRIS berikut menggunakan GoPay, DANA, OVO, ShopeePay, Mobile
          Banking atau aplikasi lainnya.
        </p>

        {/* GANTI DENGAN QRIS ASLI */}
        <img
          src="/Qris-mochi.jpeg"
          alt="QRIS Mochi Bub"
          className="
          w-full
          max-w-md
          mx-auto
          rounded-2xl
          border
          "
        />

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-3">Upload Bukti Pembayaran</h2>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="
            w-full
            border
            p-4
            rounded-xl
            "
          />
        </div>

        <button
          onClick={handleUpload}
          className="
          w-full
          mt-8
          bg-pink-500
          hover:bg-pink-600
          text-white
          py-4
          rounded-2xl
          font-bold
          "
        >
          Kirim Bukti Pembayaran
        </button>
      </div>
    </div>
  );
}

export default UploadPayment;
