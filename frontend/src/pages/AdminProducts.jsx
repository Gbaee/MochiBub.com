import { useEffect, useState } from "react";
import axios from "axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    nama_produk: "",
    harga: "",
    stok: "",
    deskripsi: "",
    foto: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.nama_produk ||
      !form.harga ||
      !form.stok ||
      !form.deskripsi ||
      !form.foto
    ) {
      alert("Semua field wajib diisi");

      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/products/${editingId}`,
          form,
        );

        alert("Produk berhasil diupdate");
      } else {
        const formData = new FormData();

        formData.append("nama_produk", form.nama_produk);

        formData.append("harga", form.harga);

        formData.append("stok", form.stok);

        formData.append("deskripsi", form.deskripsi);

        if (selectedFile) {
          formData.append("foto", selectedFile);
        }

        await axios.post("http://localhost:5000/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Produk berhasil ditambahkan");
      }

      setForm({
        nama_produk: "",
        harga: "",
        stok: "",
        deskripsi: "",
        foto: "",
      });

      setEditingId(null);

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);

    setForm({
      nama_produk: product.nama_produk,
      harga: product.harga,
      stok: product.stok,
      deskripsi: product.deskripsi,
      foto: product.foto,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus produk?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-4xl font-bold mb-8">🍡 Manajemen Produk</h1>

      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nama Produk"
            value={form.nama_produk}
            onChange={(e) =>
              setForm({
                ...form,
                nama_produk: e.target.value,
              })
            }
            className="border p-3 rounded-xl"
          />

          <div>
            <input
              type="number"
              placeholder="Harga (contoh: 15000)"
              value={form.harga}
              onChange={(e) =>
                setForm({
                  ...form,
                  harga: e.target.value,
                })
              }
              className="border p-3 rounded-xl w-full"
            />

            {form.harga && (
              <p className="mt-2 text-pink-500 font-semibold">
                Preview: Rp {Number(form.harga).toLocaleString("id-ID")}
              </p>
            )}
          </div>

          <input
            type="number"
            placeholder="Stok"
            value={form.stok}
            onChange={(e) =>
              setForm({
                ...form,
                stok: e.target.value,
              })
            }
            className="border p-3 rounded-xl"
          />

          <div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  setSelectedFile(file);

                  if (file) {
                    setForm({
                      ...form,
                      foto: URL.createObjectURL(file),
                    });
                  }
                }}
                className="border p-3 rounded-xl w-full"
              />

              {form.foto && (
                <img
                  src={form.foto}
                  alt="Preview"
                  className="
      w-24
      h-24
      mt-3
      rounded-xl
      object-cover
      "
                />
              )}
            </div>

            {form.foto && (
              <img
                src={form.foto}
                alt="Preview"
                className="
      w-24
      h-24
      object-cover
      rounded-xl
      mt-3
      border
      "
              />
            )}
          </div>

          <textarea
            placeholder="Deskripsi Produk"
            value={form.deskripsi}
            onChange={(e) =>
              setForm({
                ...form,
                deskripsi: e.target.value,
              })
            }
            className="border p-3 rounded-xl md:col-span-2"
          />

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              className="
    flex-1
    bg-pink-500
    hover:bg-pink-600
    text-white
    py-3
    rounded-xl
    "
            >
              {editingId ? "Update Produk" : "Tambah Produk"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);

                  setForm({
                    nama_produk: "",
                    harga: "",
                    stok: "",
                    deskripsi: "",
                    foto: "",
                  });
                }}
                className="
      bg-gray-500
      hover:bg-gray-600
      text-white
      px-6
      rounded-xl
      "
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-pink-500 text-white">
              <th className="p-4">Foto</th>
              <th className="p-4">Produk</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Stok</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-4">
                  <img
                    src={product.foto}
                    alt={product.nama_produk}
                    className="
                    w-20
                    h-20
                    object-cover
                    rounded-xl
                    "
                  />
                </td>

                <td className="p-4">{product.nama_produk}</td>

                <td className="p-4">
                  Rp {Number(product.harga).toLocaleString("id-ID")}
                </td>

                <td className="p-4">{product.stok}</td>

                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="
                    bg-blue-500
                    text-white
                    px-4
                    py-2
                    rounded-xl
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="
                    bg-red-500
                    text-white
                    px-4
                    py-2
                    rounded-xl
                    "
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;
