import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-12 py-6 bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-indigo-600">🌐 MyPlatform</h1>
        <Link
          to="/login"
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Kirish
        </Link>
      </nav>

      {/* Content */}
      <main className="flex flex-1 flex-col justify-center items-center text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Platformaga xush kelibsiz</h2>
        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
          Bu sayt foydalanuvchilarga qulay boshqaruv paneli, xavfsiz login va kengaytirilgan
          funksiyalarni taqdim etadi. Zamonaviy texnologiyalar asosida yaratilgan.
        </p>
      </main>
    </div>
  );
}
