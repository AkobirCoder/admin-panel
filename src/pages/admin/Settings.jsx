import React, { useState } from "react";
import { Helmet } from "react-helmet";

export default function Settings() {
  const [siteName, setSiteName] = useState("Bilim.ac");
  const [language, setLanguage] = useState("uz");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <Helmet>
        <title>Admin Panel - Sozlamalar</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Sozlamalar</h1>

      <div className="space-y-4 bg-white p-6 rounded shadow">
        {/* Sayt nomi */}
        <div>
          <label className="block font-medium text-gray-700">Sayt nomi</label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="mt-1 border px-3 py-2 rounded w-full"
          />
        </div>

        {/* Til tanlash */}
        <div>
          <label className="block font-medium text-gray-700">Tizim tili</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1 border px-3 py-2 rounded w-full"
          >
            <option value="uz">O‘zbekcha</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Dark Mode */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span>Tungi rejim</span>
        </div>

        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">
          Saqlash
        </button>
      </div>
    </div>
  );
}
