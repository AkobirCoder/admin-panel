import React, { useState, useContext } from "react";
import { FaUsers, FaUserShield, FaCog, FaBars } from "react-icons/fa";
import Users from "./admin/Users";
import Roles from "./admin/Roles";
import Settings from "./admin/Settings";
import { ThemeContext } from "../components/ThemeContext";

export default function AdminPanel() {
  const [activePage, setActivePage] = useState("users");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme } = useContext(ThemeContext);

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
        className={`fixed left-0 top-0 h-full text-white flex flex-col shadow-xl z-20 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        } ${
          theme === "dark"
          ? "bg-gray-600"
          : "bg-indigo-700"
        }`}
      >
        {/* Header */}
        <div
          className={`px-5 py-4 flex items-center border-b border-indigo-400 ${
            isSidebarOpen ? "justify-between" : "justify-center"
          }`}
        >
          <span
            className={`font-medium text-lg whitespace-nowrap overflow-hidden transition-all duration-300 ${
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
              ${isSidebarOpen ? "justify-start" : "justify-center"}
              ${
                theme === "dark"
                ? activePage === "users"
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-600 text-gray-200"
                : activePage === "users"
                  ? "bg-gray-600 text-white"
                  : "hover:bg-gray-500 text-gray-900"
              }`}
          >
            <FaUsers />
            {isSidebarOpen && <span>Foydalanuvchilar</span>}
          </button>
          <button
            onClick={() => setActivePage("roles")}
            className={`flex items-center gap-3 px-3 py-2 w-full rounded-md transition 
              ${activePage === "roles" ? "bg-indigo-600" : "hover:bg-indigo-600"}
              ${isSidebarOpen ? "justify-start" : "justify-center"}`}
          >
            <FaUserShield />
            {isSidebarOpen && <span>Rollar</span>}
          </button>
          <button
            onClick={() => setActivePage("settings")}
            className={`flex items-center gap-3 px-3 py-2 w-full rounded-md transition 
              ${activePage === "settings" ? "bg-indigo-600" : "hover:bg-indigo-600"}
              ${isSidebarOpen ? "justify-start" : "justify-center"}`}
          >
            <FaCog />
            {isSidebarOpen && <span>Sozlamalar</span>}
          </button>
        </nav>
      </div>

      {/* Content */}
      <main
        className={`flex-1 px-10 py-7 min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } ${
          theme === "dark"
          ? "bg-gray-700"
          : "bg-gray-100"
        }`}
      >
        {renderContent()}
      </main>
    </div>
  );
}
