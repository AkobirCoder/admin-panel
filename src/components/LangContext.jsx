import React, { createContext, useContext, useState, useEffect } from "react";

// Til ma'lumotlari (frontend tarjimalar)
const translations = {
  uz: {
    home: "Bosh sahifa",
    dashboard: "Boshqaruv paneli",
    login: "Kirish",
    register: "Ro'yxatdan o'tish",
    heroTitle: "Bilim.ac platformasiga xush kelibsiz!",
    heroDesc: "Zamonaviy bilim olish va o‘qitish tizimi.",
    start: "Boshlash",
    rights: "Barcha huquqlar himoyalangan.",
  },
  ru: {
    home: "Главная",
    dashboard: "Панель управления",
    login: "Вход",
    register: "Регистрация",
    heroTitle: "Добро пожаловать на платформу Bilim.ac!",
    heroDesc: "Современная система обучения и преподавания.",
    start: "Начать",
    rights: "Все права защищены.",
  },
  en: {
    home: "Home",
    dashboard: "Dashboard",
    login: "Login",
    register: "Register",
    heroTitle: "Welcome to Bilim.ac platform!",
    heroDesc: "A modern system for learning and teaching.",
    start: "Get Started",
    rights: "All rights reserved.",
  },
};

export const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState("uz");
  const [t, setT] = useState(translations.uz);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      setLang(savedLang);
      setT(translations[savedLang]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    setT(translations[lang]);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

// ✅ Custom hook — shuni import qilib ishlatasan (Landing.jsx da)
export const useLang = () => useContext(LangContext);
