import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ErrorModal from "../components/ErrorModal";
import { FaCheckCircle, FaTimesCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "@dr.pogodin/react-helmet";
import { ThemeContext } from "../components/ThemeContext";

export default function Register() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("",);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  // Parol talablari
  const requirements = [
    { label: "1. Kamida 8 ta belgidan iborat bo'lsin", test: (pw) => pw.length >= 8 },
    { label: "2. Kamida bitta katta harf bo'lsin", test: (pw) => /[A-Z]/.test(pw) },
    { label: "3. Kamida bitta kichik harf bo'lsin", test: (pw) => /[a-z]/.test(pw) },
    { label: "4. Raqam va maxsus belgi bo'lsin", test: (pw) => /\d/.test(pw) && /[@$!%*?&]/.test(pw) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Agar barcha talablar bajarilmagan bo'lsa
    const allPassed = requirements.every((req) => req.test(password));
    if (!allPassed) {
      setError("Parol barcha talablarga javob bermaydi!");
      return;
    }

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
    <div>
      <Helmet>
        <title>
          Bilim.ac - Ro'yxatdan o'tish
        </title>
      </Helmet>
      <div className="flex h-screen">
        {/* Chap tomon – Rasm */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <img
            src="/register-login.jpg"
            alt="Register Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* O'ng tomon – Register form shaffof fon bilan */}
        <div className="flex w-full md:w-1/2 items-center justify-center relative">
          {/* Orqa fon */}
          <img
            src="/register-login.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>

          {/* Form */}
          <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl shadow-xl rounded-lg p-8">
            <h2 className="text-3xl font-medium text-center text-white mb-6">
              Ro'yxatdan o'tish
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Login */}
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

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white">Email</label>
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

                {/* Toggle - parol */}
                <span
                  className="absolute right-3 top-9 cursor-pointer text-gray-300 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>

                {/* Talablar ro'yxati */}
                <ul className="mt-2 space-y-1">
                  {requirements.map((req, index) => {
                    const passed = req.test(password);
                    const hasInput = password.length > 0;

                    return (
                      <li
                        key={index}
                        className={`flex items-center text-sm transition ${
                          !hasInput
                            ? "text-gray-300"
                            : passed
                            ? "text-green-400"
                            : "text-red-400 animate-shake"
                        }`}
                      >
                        {passed ? (
                          <FaCheckCircle className="mr-2" />
                        ) : hasInput ? (
                          <FaTimesCircle className="mr-2" />
                        ) : (
                          <span className="w-4 mr-2" />
                        )}
                        {req.label}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Parolni tasdiqlash */}
              <div className="relative">
                <label className="block text-sm font-medium text-white">Parolni tasdiqlang</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 w-full px-3 py-2 rounded-lg shadow-sm 
                            bg-white/20 text-white placeholder-gray-300
                            focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                            outline-none transition sm:text-sm pr-10"
                  placeholder="Parolni qaytadan kiriting"
                />

                {/* Toggle - parolni tasdiqlash */}
                <span
                  className="absolute right-3 top-9 cursor-pointer text-gray-300 hover:text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600/80 hover:bg-indigo-700/90 text-white py-2 rounded-lg transition font-medium"
              >
                Ro'yxatdan o'tish
              </button>
            </form>

            {/* Pastki linklar */}
            <p className="text-sm text-gray-200 text-center mt-4">
              Akkountingiz bormi?{" | "}
              <Link to="/login" className="text-indigo-700 hover:underline font-medium">
                Tizimga kiring
              </Link>
              <div className="mt-4">
                <Link to="/" className="text-indigo-700 hover:underline font-medium">
                  Bosh sahifaga qayting
                </Link>
              </div>
            </p>
          </div>
        </div>

        {/* Success Modal */}
        {successModal && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
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
    </div>
  );
}
