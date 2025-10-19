import React, { createContext, useContext, useState } from "react";

export const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState("uz"); // 🔹 Standart til: o'zbek

  const translations = {
    uz: {
      home: "Bosh sahifa",
      dashboard: "Boshqaruv paneli",
      login: "Kirish",
      register: "Ro'yxatdan o'tish",
      heroTitle: "Bilim.ac platformasiga xush kelibsiz!",
      heroDesc: "Zamonaviy bilim olish va o‘qitish tizimi.",
      start: "Boshlash",
      rights: "Barcha huquqlar himoyalangan",
    },
    ru: {
      home: "Главная",
      dashboard: "Панель управления",
      login: "Войти",
      register: "Регистрация",
      heroTitle: "Добро пожаловать на платформу Bilim.ac!",
      heroDesc: "Современная система обучения и образования.",
      start: "Начать",
      rights: "Все права защищены",
    },
    en: {
      home: "Home",
      dashboard: "Dashboard",
      login: "Login",
      register: "Register",
      heroTitle: "Welcome to the Bilim.ac platform!",
      heroDesc: "A modern system for learning and teaching.",
      start: "Get Started",
      rights: "All rights reserved",
    },
  };

  const t = translations[lang] || translations.uz;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
