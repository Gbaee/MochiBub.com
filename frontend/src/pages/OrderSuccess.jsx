import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div
      className="
      min-h-[70vh]
      flex
      items-center
      justify-center
      p-5
      "
    >
      <div
        className="
        bg-white
        rounded-3xl
        shadow-xl
        p-10
        text-center
        max-w-lg
        "
      >
        <div className="text-7xl">
          🎉
        </div>

        <h1
          className="
          text-4xl
          font-bold
          mt-5
          "
        >
          Pesanan Berhasil
        </h1>

        <p
          className="
          text-gray-500
          mt-4
          "
        >
          Terima kasih telah
          memesan di Mochi Bub.
        </p>

        <Link
          to="/products"
          className="
          inline-block
          mt-8
          bg-pink-500
          text-white
          px-8
          py-4
          rounded-2xl
          "
        >
          Belanja Lagi
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;