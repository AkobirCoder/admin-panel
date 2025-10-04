import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import { FaTelegram, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Dashboard({ user, setUser }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/dashboard/profile");
    setSidebarOpen(false);
  };

  if (!user) return null;

  // Avatar manbai (agar profil rasmi bo'lmasa ui-avatars orqali)
  const avatarUrl =
    user.profileImage ||
    `https://ui-avatars.com/api/?name=${user.login}&background=4F46E5&color=fff&size=128&bold=true`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <Helmet>
        <title>Bilim.ac - Dashboard</title>
      </Helmet>

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center">
          <img src="/logo.png" className="w-14 me-4" alt="Logo" />
          <h1 className="text-2xl font-bold tracking-wide">Bilim.ac</h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:block text-sm opacity-90"><span className="font-semibold">{user.login}</span>
          </span>
          <img
            src={avatarUrl}
            alt="Profil"
            className="w-12 h-12 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
      </nav>

      {/* Sidebar overlay (fon) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b bg-blue-700 text-white">
          <h2 className="text-lg font-medium">Mening Profilim</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white hover:text-gray-200 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6 flex flex-col items-center">
          <img
            src={avatarUrl}
            alt="Profil rasmi"
            className="w-28 h-28 rounded-full mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800">
            {user.login}
          </h3>
          <p className="text-gray-500 text-sm">Email: {user.email}</p>
          {user.phone && (
            <p className="mt-2 text-gray-600 text-sm">
              Tel: {user.phone}
            </p>
          )}
          <div className="flex gap-6 mt-3">
            {user.telegram && (
              <a 
                className="flex flex-center text-blue-500 hover:scale-110 transition"
                href={user.telegram}
                target="_blank"
                rel="noreferrer"
              >
                <FaTelegram className="text-blue-500 text-xl" />
              </a>
            )}
            {user.instagram && (
              <a 
                className="text-blue-500 hover:scale-110 transition"
                href={user.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram className="text-pink-500 text-xl" />
              </a>
            )}
            {user.github && (
              <a 
                className="text-blue-500 hover:scale-110 transition"
                href={user.github}
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub className="text-gray-500 text-xl" />
              </a>
            )}
            {user.linkedin && (
              <a 
                className="text-blue-500 hover:scale-110 transition"
                href={user.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="text-blue-700 text-xl" />
              </a>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 w-full">
            <button
              onClick={goToProfile}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg hover:shadow-lg hover:scale-105 transition"
            >
              Profilim
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 rounded-lg hover:shadow-lg hover:scale-105 transition"
            >
              Chiqish
            </button>
          </div>
        </div>
      </div>

      {/* Kontent */}
      <main className="p-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h2>
        <div className="bg-white shadow-xl rounded-lg p-6">
          <p className="text-gray-700 text-lg">
            Salom,{" "}
            <span className="font-semibold text-indigo-600">
              {user.login}
            </span>
            ! Bu yerda siz o'z faoliyatingizni kuzatishingiz mumkin.
          </p>
        </div>
      </main>
    </div>
  );
}
