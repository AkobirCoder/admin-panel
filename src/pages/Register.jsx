import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ErrorModal from "../components/ErrorModal";

export default function Register() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Parollar mos emas!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:7000/api/auth/register", {
        login,
        email,
        password,
      });

      if (res.data.success) {
        setSuccessModal(true);
      } else {
        setError(res.data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      console.error(err);
      setError("Serverga ulanishda xatolik!");
    }
  };

  const closeModal = () => {
    setSuccessModal(false);
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Chap tomon – Rasm */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img
          src="/login.jpg"
          alt="Register Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* O'ng tomon – Register form shaffof fon bilan */}
      <div className="flex w-full md:w-1/2 items-center justify-center relative">
        {/* Orqa fon rasm */}
        <img
          src="/login.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Shaffof overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>

        {/* Form oyna */}
        <div className="relative w-full max-w-md bg-white/30 backdrop-blur-xl shadow-xl rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Ro'yxatdan o'tish
          </h2>

          {/* {error && (
            <p className="text-red-400 text-center text-sm mb-4">{error}</p>
          )} */}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white">
                Login
              </label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 rounded-lg shadow-sm 
                           bg-white/20 text-white placeholder-gray-300
                           focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                           outline-none transition sm:text-sm"
                placeholder="Login kiriting"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 rounded-lg shadow-sm 
                           bg-white/20 text-white placeholder-gray-300
                           focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                           outline-none transition sm:text-sm"
                placeholder="Email kiriting"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Parol
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 rounded-lg shadow-sm 
                           bg-white/20 text-white placeholder-gray-300
                           focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                           outline-none transition sm:text-sm"
                placeholder="Parol kiriting"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Parolni tasdiqlang
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 rounded-lg shadow-sm 
                           bg-white/20 text-white placeholder-gray-300
                           focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                           outline-none transition sm:text-sm"
                placeholder="Parolni qaytadan kiriting"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600/80 hover:bg-indigo-700/90 text-white py-2 rounded-lg transition font-medium"
            >
              Ro'yxatdan o'tish
            </button>
          </form>

          <p className="text-sm text-gray-200 text-center mt-4">
            Akkountingiz bormi?{" | "}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Tizimga kiring
            </Link>
            <div className="mt-4">
              <Link
                to="/"
                className="text-indigo-600 hover:underline font-medium"
              >
                Bosh sahifaga qayting
              </Link>
            </div>
          </p>
        </div>
      </div>

      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Ro'yxatdan muvaffaqiyatli o'tdingiz!
            </h3>
            <p className="text-sm text-gray-600 mb-5">Endi tizimga kiring.</p>
            <button
              onClick={closeModal}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {error && (
        <ErrorModal
          message={error}
          onClose={() => setError("")}
          onRetry={() => {
            setError("");
            setLogin("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          }}
        />
      )}
    </div>
  );
}
