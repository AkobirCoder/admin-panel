import { createContext, useState } from "react";

export const LangContext = createContext();

const translations = {
  uz: {
    home: "Bosh sahifa",
    dashboard: "Dashboard",
    login: "Kirish",
    register: "Ro‘yxatdan o‘tish",
    heroTitle: "Qulay va xavfsiz foydalanuvchi tizimi",
    heroDesc: "Ro‘yxatdan o‘ting yoki tizimga kiring va siz uchun mo‘ljallangan barcha xizmatlardan foydalaning.",
    start: "Boshlash",
    joinNow: "Ro‘yxatdan o‘tish",
    rights: "Barcha huquqlar himoyalangan.",
  },
  en: {
    home: "Home",
    dashboard: "Dashboard",
    login: "Login",
    register: "Register",
    heroTitle: "A convenient and secure user system",
    heroDesc: "Register or log in to access all the services designed for you.",
    start: "Get Started",
    joinNow: "Join Now",
    rights: "All rights reserved.",
  },
};

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "uz");

  const toggleLang = () => {
    const newLang = lang === "uz" ? "en" : "uz";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
};
