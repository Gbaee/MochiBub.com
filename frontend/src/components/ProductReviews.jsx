function ProductReviews() {
  const reviews = [
    {
      id: 1,
      nama: "Andi",
      rating: 5,
      komentar:
        "Mochinya lembut banget dan isiannya banyak.",
    },
    {
      id: 2,
      nama: "Siti",
      rating: 4,
      komentar:
        "Rasanya enak, packing rapi.",
    },
    {
      id: 3,
      nama: "Budi",
      rating: 5,
      komentar:
        "Langganan beli disini karena kualitasnya bagus.",
    },
  ];

  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-lg
      p-8
      mt-16
      "
    >
      <h2
        className="
        text-3xl
        font-bold
        mb-8
        "
      >
        ⭐ Ulasan Pelanggan
      </h2>

      <div className="mb-8">
        <h3
          className="
          text-5xl
          font-bold
          text-pink-500
          "
        >
          4.8
        </h3>

        <p className="text-yellow-500 text-2xl">
          ⭐⭐⭐⭐⭐
        </p>

        <p className="text-gray-500 mt-2">
          Berdasarkan 23 ulasan
        </p>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="
            border-b
            pb-5
            "
          >
            <h4 className="font-bold text-lg">
              {review.nama}
            </h4>

            <p className="text-yellow-500">
              {"⭐".repeat(review.rating)}
            </p>

            <p className="text-gray-600 mt-2">
              {review.komentar}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductReviews;