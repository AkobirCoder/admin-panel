import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import { FiSun, FiMoon, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Flag from "react-world-flags";
import { ThemeContext } from "../components/ThemeContext";
import { useLang } from "../components/LangContext";

export default function Landing() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { lang, setLang, t } = useLang();
  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef(null);

  // 🔹 Tashqariga bosilganda dropdown yopiladi
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLangChange = (newLang) => {
    setLang(newLang);
    setOpenDropdown(false);
  };

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-800"
      } min-h-screen`}
    >
      <Helmet>
        <title>Bilim.ac</title>
      </Helmet>

      {/* Navbar */}
      <header
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-md sticky top-0 z-50`}
      >
        <div className="px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl flex items-center font-bold text-indigo-600"
          >
            <img className="w-14 me-4" src="/logo.png" alt="Logo" />
            Bilim.ac
          </Link>

          <nav className="flex space-x-6 items-center">
            <Link to="/" className="hover:text-indigo-600">
              {t.home}
            </Link>
            <Link to="/dashboard" className="hover:text-indigo-600">
              {t.dashboard}
            </Link>
            <Link to="/login" className="hover:text-indigo-600">
              {t.login}
            </Link>
            <Link to="/register" className="hover:text-indigo-600">
              {t.register}
            </Link>

            <div className="relative flex items-center space-x-4" ref={dropdownRef}>
              {/* Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="flex items-center px-2 py-1 border rounded-lg"
                >
                  <Flag
                    code={
                      lang === "uz" ? "UZ" : lang === "ru" ? "RU" : "GB"
                    }
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  {openDropdown ? (
                    <FiChevronUp className="ml-1" />
                  ) : (
                    <FiChevronDown className="ml-1" />
                  )}
                </button>

                {openDropdown && (
                  <div
                    className={`absolute right-0 mt-2 w-36 rounded-lg shadow-lg border ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex flex-col p-2 space-y-1">
                      <button
                        onClick={() => handleLangChange("uz")}
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg"
                      >
                        <Flag
                          code="UZ"
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span>O'zbek</span>
                      </button>
                      <button
                        onClick={() => handleLangChange("ru")}
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg"
                      >
                        <Flag
                          code="RU"
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span>Русский</span>
                      </button>
                      <button
                        onClick={() => handleLangChange("en")}
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg"
                      >
                        <Flag
                          code="GB"
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span>English</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                title="Tungi/Kungi rejim"
              >
                {theme === "dark" ? (
                  <FiSun className="text-yellow-400" />
                ) : (
                  <FiMoon className="text-gray-700" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white text-center px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          {t.heroTitle}
        </h1>
        <p className="max-w-2xl text-lg mb-8 opacity-90">{t.heroDesc}</p>
        <div className="flex space-x-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium shadow hover:bg-gray-100 transition"
          >
            {t.start}
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-white rounded-lg font-medium hover:bg-white hover:text-indigo-600 transition"
          >
            {t.login}
          </Link>
        </div>
      </section>

      {/* Features */}
      <section
        className={`${
          theme === "dark" ? "bg-gray-800 text-black" : "text-black-300"
        } py-16 bg-gray-100`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {[
            {
              title: "Xizmatlar",
              desc: "Bizning xizmatlarimizdan foydalanib samarali natijalarga erishing.",
              img: "https://picsum.photos/600/300?random=11",
            },
            {
              title: "Yangiliklar",
              desc: "So'nggi yangiliklardan doimiy xabardor bo'ling.",
              img: "https://picsum.photos/600/300?random=12",
            },
            {
              title: "Aloqa",
              desc: "Savollaringiz bo'lsa, biz bilan bog'lanishingiz mumkin.",
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

      {/* CTA */}
      <section
        className={`${
          theme === "dark"
            ? "text-white"
            : "bg-gray-900 text-gray-300"
        } bg-indigo-600 py-16 text-center text-white`}
      >
        <h2 className="text-3xl font-bold mb-4">Bugun ro'yxatdan o'ting</h2>
        <p className="mb-6 opacity-90">
          Ro'yxatdan o'tib, tizimning barcha imkoniyatlaridan foydalaning.
        </p>
        <Link
          to="/register"
          className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow hover:bg-gray-100 transition"
        >
          Ro'yxatdan o'tish
        </Link>
      </section>

      {/* Footer */}
      <footer
        className={`${
          theme === "dark"
            ? "bg-gray-800 text-gray-400"
            : "bg-gray-900 text-gray-300"
        } py-8`}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} {t.rights}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/dashboard" className="hover:text-white">
              {t.dashboard}
            </Link>
            <Link to="/login" className="hover:text-white">
              {t.login}
            </Link>
            <Link to="/register" className="hover:text-white">
              {t.register}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
