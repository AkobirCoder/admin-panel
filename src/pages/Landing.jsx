import React from "react";
import { Link } from "react-router-dom";

export default function Landing({ loggedIn }) {

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            AdminPanel
          </Link>
          <nav className="flex space-x-6 items-center">
            <Link to="/" className="hover:text-indigo-600">Bosh sahifa</Link>
            <Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
            <Link to="/login" className="hover:text-indigo-600">Login</Link>
            <Link to="/register" className="hover:text-indigo-600">Register</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white text-center px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Qulay va xavfsiz foydalanuvchi tizimi
        </h1>
        <p className="max-w-2xl text-lg mb-8 opacity-90">
          Ro‘yxatdan o‘ting yoki tizimga kiring va siz uchun mo‘ljallangan barcha xizmatlardan foydalaning.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium shadow hover:bg-gray-100 transition"
          >
            Boshlash
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-white rounded-lg font-medium hover:bg-white hover:text-indigo-600 transition"
          >
            Tizimga kirish
          </Link>
        </div>
        {loggedIn && (
          <p className="mt-6 font-semibold text-green-300">
            ✅ Siz tizimga kirdingiz
          </p>
        )}
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {[
            {
              title: "Xizmatlar",
              desc: "Bizning xizmatlarimizdan foydalanib samarali natijalarga erishing.",
              img: "https://picsum.photos/600/300?random=11",
            },
            {
              title: "Yangiliklar",
              desc: "So‘nggi yangiliklardan doimiy xabardor bo‘ling.",
              img: "https://picsum.photos/600/300?random=12",
            },
            {
              title: "Aloqa",
              desc: "Savollaringiz bo‘lsa, biz bilan bog‘lanishingiz mumkin.",
              img: "https://picsum.photos/600/300?random=13",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">{card.title}</h3>
                <p className="text-gray-600 mb-4">{card.desc}</p>
                <Link
                  to="/dashboard"
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Batafsil →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Bugun ro‘yxatdan o‘ting</h2>
        <p className="mb-6 opacity-90">
          Ro‘yxatdan o‘tib, tizimning barcha imkoniyatlaridan foydalaning.
        </p>
        <Link
          to="/register"
          className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow hover:bg-gray-100 transition"
        >
          Ro‘yxatdan o‘tish
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Barcha huquqlar himoyalangan.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
            <Link to="/login" className="hover:text-white">Login</Link>
            <Link to="/register" className="hover:text-white">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
