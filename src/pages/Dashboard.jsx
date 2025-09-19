import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      navigate("/login"); // foydalanuvchi yo'q bo'lsa qaytarib yuboradi
    } else {
      setUser(savedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // foydalanuvchini Landing page ga qaytaradi
  };


  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-indigo-600 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Chiqish
          </button>
        </div>
      </header>

      {/* Welcome section */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Xush kelibsiz, {user.login}!
        </h2>

        {/* Dashboard stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Foydalanuvchilar</h3>
            <p className="text-3xl font-bold mt-2 text-indigo-600">120</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Buyurtmalar</h3>
            <p className="text-3xl font-bold mt-2 text-green-600">85</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Daromad</h3>
            <p className="text-3xl font-bold mt-2 text-yellow-600">$12,340</p>
          </div>
        </div>
      </main>
    </div>
  );
}
