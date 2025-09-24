import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ErrorModal from "../components/ErrorModal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:7000/api/auth/login", {
        login,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      } else {
        setError(res.data.message || "Login yoki parol xato!");
      }
    } catch (err) {
      console.error(err);

      if (err.response && err.response.data) {
        // server javob qaytargan bo‘lsa (masalan 401, 404)
        setError(err.response.data.message || "Login yoki parol xato!");
      } else if (err.request) {
        // so‘rov yuborildi lekin javob yo‘q (server o‘chgan bo‘lishi mumkin)
        setError("Serverga ulanishda xatolik! Iltimos, keyinroq urinib ko‘ring.");
      } else {
        // boshqa (kutilmagan) xatolar
        setError("Xatolik yuz berdi!");
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>
          Bilim.ac - Kirish
        </title>
      </Helmet>
      <div className="flex h-screen">
        {/* Chap tomon – Rasm */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <img
            src="/register-login.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* O'ng tomon – Login form shaffof fon bilan */}
        <div className="flex w-full md:w-1/2 items-center justify-center relative">
          {/* Orqa fon rasm */}
          <img
            src="/register-login.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Shaffof overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>

          {/* Form oyna */}
          <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl shadow-xl rounded-lg p-8">
            <h2 className="text-3xl font-medium text-center text-white mb-6">
              Tizimga kirish
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white">Login</label>
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

              {/* Parol */}
              <div className="relative">
                <label className="block text-sm font-medium text-white">Parol</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full px-3 py-2 rounded-lg shadow-sm 
                            bg-white/20 text-white placeholder-gray-300
                            focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                            outline-none transition sm:text-sm pr-10"
                  placeholder="Parol kiriting"
                />

                {/* Toggle button - password */}
                <span
                  className="absolute right-3 top-9 cursor-pointer text-gray-300 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600/80 hover:bg-indigo-700/90 text-white py-2 rounded-lg transition font-medium"
              >
                Kirish
              </button>
            </form>

            <p className="text-sm text-gray-200 text-center mt-4">
              Akkountingiz yo'qmi?{" | "}
              <Link
                to="/register"
                className="text-indigo-700 hover:underline font-medium"
              >
                Ro'yxatdan o'ting
              </Link>
              <div className="mt-4">
                <Link
                  to="/"
                  className="text-indigo-700 hover:underline font-medium"
                >
                  Bosh sahifaga qayting    
                </Link>
              </div>
            </p>
          </div>
        </div>

        {error && (
          <ErrorModal
            message={error}
            onClose={() => setError("")}
            onRetry={() => {
              setError("");
              setLogin("");
              setPassword("");
            }}
          />
        )}
      </div>
    </div>
  );
}
