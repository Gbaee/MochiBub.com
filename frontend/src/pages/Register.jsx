import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import logo from "../assets/mochi-logoo.png";

import {
  FaUser,
  FaEnvelope,
  FaWhatsapp,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    nomor_wa: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);

      toast.success("Akun berhasil dibuat 🎉");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Register gagal");
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-black
      relative
      overflow-hidden
      flex
      items-center
      justify-center
      px-5
    "
    >
      {/* GRID */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.05]
      "
        style={{
          backgroundImage:
            "linear-gradient(to right,#ffffff 1px,transparent 1px),linear-gradient(to bottom,#ffffff 1px,transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* BLUR EFFECT */}
      <div
        className="
        absolute
        top-0
        left-0
        w-[500px]
        h-[500px]
        bg-pink-500/20
        rounded-full
        blur-[180px]
      "
      />

      <div
        className="
        absolute
        bottom-0
        right-0
        w-[500px]
        h-[500px]
        bg-purple-500/20
        rounded-full
        blur-[180px]
      "
      />

      <div
        className="
        absolute
        left-1/2
        top-1/2
        w-[600px]
        h-[600px]
        bg-cyan-500/10
        rounded-full
        blur-[200px]
        -translate-x-1/2
        -translate-y-1/2
      "
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="
        relative
        z-10
        w-full
        max-w-6xl
        grid
        lg:grid-cols-2
        rounded-[40px]
        overflow-hidden
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
      "
      >
        {/* LEFT SIDE */}
        <div
          className="
          hidden
          lg:flex
          flex-col
          justify-center
          px-14
          py-16
          text-white
        "
        >
          <div
            className="
            inline-flex
            w-fit
            items-center
            px-4
            py-2
            rounded-full
            bg-white/5
            border
            border-white/10
            text-sm
            mb-8
          "
          >
            🚀 Join Mochi Bub Community
          </div>

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="
            w-28
            h-28
            rounded-[32px]
            bg-white/5
            border
            border-white/10
            backdrop-blur-xl
            flex
            items-center
            justify-center
            mb-8
          "
          >
            <img
              src={logo}
              alt="Mochi Bub"
              className="w-20 h-20 object-contain"
            />
          </motion.div>

          <h1
            className="
            text-7xl
            font-black
            tracking-tight
            leading-none
          "
          >
            Join
            <br />
            Mochi
            <br />
            Bub
          </h1>

          <p
            className="
            text-white/70
            text-xl
            mt-8
            max-w-lg
            leading-relaxed
          "
          >
            Buat akun sekarang dan nikmati pengalaman memesan mochi premium yang
            modern, cepat, dan nyaman.
          </p>

          <div className="mt-12 space-y-4">
            <div className="text-white/80">✓ Riwayat pesanan lengkap</div>

            <div className="text-white/80">✓ Tracking realtime</div>

            <div className="text-white/80">✓ Promo member eksklusif</div>

            <div className="text-white/80">✓ Checkout lebih cepat</div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
          relative
          bg-white
          px-8
          py-12
          lg:px-14
          lg:py-16
          shadow-[0_20px_100px_rgba(0,0,0,0.4)]
        "
        >
          <div
            className="
            absolute
            top-0
            left-0
            w-full
            h-1
            bg-gradient-to-r
            from-pink-500
            via-purple-500
            to-cyan-500
          "
          />

          <div className="mb-10">
            <h2
              className="
              text-5xl
              font-black
              text-gray-900
              tracking-tight
            "
            >
              Create Account
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Daftar untuk mulai memesan Mochi Bub.
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            autoComplete="off"
            className="space-y-5"
          >
            <div className="relative">
              <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

              <div className="relative">
                <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="nama_lengkap_register"
                  autoComplete="off"
                  placeholder="Nama Lengkap"
                  value={form.nama}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      nama: e.target.value,
                    })
                  }
                  required
                  className="
      w-full
      pl-14
      pr-4
      py-4
      rounded-2xl
      bg-slate-50
      border
      border-slate-200
      focus:outline-none
      focus:border-pink-500
      transition
    "
                />
              </div>
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

              <div className="relative">
                <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  name="register_email"
                  autoComplete="new-email"
                  placeholder="Alamat Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  required
                  className="
      w-full
      pl-14
      pr-4
      py-4
      rounded-2xl
      bg-slate-50
      border
      border-slate-200
      focus:outline-none
      focus:border-pink-500
      transition
    "
                />
              </div>
            </div>

            <div className="relative">
              <FaWhatsapp className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

              <div className="relative">
                <FaWhatsapp className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="register_whatsapp"
                  autoComplete="off"
                  placeholder="Nomor WhatsApp"
                  value={form.nomor_wa}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      nomor_wa: e.target.value,
                    })
                  }
                  required
                  className="
      w-full
      pl-14
      pr-4
      py-4
      rounded-2xl
      bg-slate-50
      border
      border-slate-200
      focus:outline-none
      focus:border-pink-500
      transition
    "
                />
              </div>
            </div>

            <div>
            <div className="relative">
              <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="register_password"
                  autoComplete="new-password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  required
                  className="
      w-full
      pl-14
      pr-4
      py-4
      rounded-2xl
      bg-slate-50
      border
      border-slate-200
      focus:outline-none
      focus:border-pink-500
      transition
    "
                />
              </div>
                <p className="text-xs text-gray-400 mt-2 ml-1">
                Minimal 8 karakter, kombinasi huruf dan angka
              </p>
            </div>

            <button
              type="submit"
              className="
              w-full
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-fuchsia-500
              via-pink-500
              to-violet-600
              text-white
              font-bold
              text-lg
              flex
              items-center
              justify-center
              gap-3
              shadow-lg
              shadow-pink-500/30
              hover:scale-[1.02]
              transition
            "
            >
              Buat Akun
              <FaArrowRight />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500">Sudah punya akun?</p>

            <Link
              to="/login"
              className="
              font-bold
              text-pink-500
              hover:text-pink-600
            "
            >
              Login Sekarang
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
