import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { FaUsers, FaUserShield, FaCog, FaBars } from "react-icons/fa";

// Users sahifasi
function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (pageNumber = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/auth/users?page=${pageNumber}&limit=10`
      );

      // Backenddan qaytgan qiymatlar
      if (res.data.success) {
        setUsers(res.data.users || []);
        setTotalPages(res.data.totalPages || 1);
        setPage(res.data.currentPage || 1);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Xatolik:", err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers(1);

    const socket = io("http://localhost:7000");
    socket.on("newUser", () => {
      fetchUsers(1);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Foydalanuvchilar</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">#</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Login</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.length > 0 ? (
              users.map((user, i) => (
                <tr
                  key={user._id}
                  className={`${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition`}
                >
                  <td className="px-6 py-4 text-sm">{(page - 1) * 10 + i + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium">{user.login}</td>
                  <td className="px-6 py-4 text-sm">{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-6 text-center text-gray-500 italic">
                  Hozircha foydalanuvchi yo'q
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => fetchUsers(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 bg-indigo-600 text-white rounded disabled:bg-gray-400"
        >
          Oldingi
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => fetchUsers(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 bg-indigo-600 text-white rounded disabled:bg-gray-400"
        >
          Keyingi
        </button>
      </div>
    </div>
  );
}

// Rollar sahifasi
function Roles() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Rollar</h1>
      <p className="text-gray-600">
        Bu yerda rollarni boshqarish funksiyasi bo'ladi.
      </p>
    </div>
  );
}

// Sozlamalar sahifasi
function Settings() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Sozlamalar</h1>
      <p className="text-gray-600">Bu yerda tizim sozlamalari boshqariladi.</p>
    </div>
  );
}

// Asosiy Admin Panel
export default function AdminPanel() {
  const [activePage, setActivePage] = useState("users");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activePage) {
      case "users":
        return <Users />;
      case "roles":
        return <Roles />;
      case "settings":
        return <Settings />;
      default:
        return <p className="text-gray-500">Bo'limni tanlang</p>;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-indigo-700 text-white flex flex-col shadow-xl z-20 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Header */}
        <div
          className={`px-5 py-4 flex items-center border-b border-indigo-400 ${
            isSidebarOpen ? "justify-between" : "justify-center"
          }`}
        >
          <span
            className={`font-bold text-lg whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isSidebarOpen ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"
            }`}
          >
            Admin Panel
          </span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:text-gray-200"
          >
            <FaBars />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActivePage("users")}
            className={`flex items-center gap-3 px-3 py-2 w-full rounded-md transition 
            ${activePage === "users" ? "bg-indigo-600" : "hover:bg-indigo-600"} 
            ${isSidebarOpen ? "justify-start gap-3" : "justify-center gap-0"}`}
          >
            <FaUsers />
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isSidebarOpen
                  ? "opacity-100 max-w-[200px]"
                  : "opacity-0 max-w-0"
              }`}
            >
              Foydalanuvchilar
            </span>
          </button>
          <button
            onClick={() => setActivePage("roles")}
            className={`flex items-center gap-3 px-3 py-2 w-full rounded-md transition 
                ${activePage === "roles" ? "bg-indigo-600" : "hover:bg-indigo-600"}
                ${isSidebarOpen ? "justify-start gap-3" : "justify-center gap-0"}`}
          >
            <FaUserShield />
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isSidebarOpen
                  ? "opacity-100 max-w-[200px]"
                  : "opacity-0 max-w-0"
              }`}
            >
              Rollar
            </span>
          </button>
          <button
            onClick={() => setActivePage("settings")}
            className={`flex items-center gap-3 px-3 py-2 w-full rounded-md transition 
                ${activePage === "settings" ? "bg-indigo-600" : "hover:bg-indigo-600"}
                ${isSidebarOpen ? "justify-start gap-3" : "justify-center gap-0"}`}
          >
            <FaCog />
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isSidebarOpen
                  ? "opacity-100 max-w-[200px]"
                  : "opacity-0 max-w-0"
              }`}
            >
              Sozlamalar
            </span>
          </button>
        </nav>
      </div>

      {/* Content */}
      <main
        className={`flex-1 px-10 py-7 bg-gray-100 min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {renderContent()}
      </main>
    </div>
  );
}
