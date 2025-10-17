import React, { createContext, useState } from "react";
import OpenAI from "openai";

// === Kontekst yaratamiz ===
export const LangContext = createContext();

// === OpenAI mijozini sozlash ===
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // .env ichidan oladi
  dangerouslyAllowBrowser: true, // frontendda ishlashi uchun
});

// === Statik so'zlar uchun fallback ===
const staticTranslations = {
  uz: {
    home: "Bosh sahifa",
    dashboard: "Dashboard",
    login: "Kirish",
    register: "Ro'yxatdan o'tish",
    heroTitle: "Qulay va xavfsiz foydalanuvchi tizimi",
    heroDesc:
      "Ro'yxatdan o'ting yoki tizimga kiring va siz uchun mo'ljallangan barcha xizmatlardan foydalaning.",
    start: "Boshlash",
    joinNow: "Ro'yxatdan o'tish",
    rights: "Barcha huquqlar himoyalangan.",
  },
  en: {
    home: "Home",
    dashboard: "Dashboard",
    login: "Login",
    register: "Register",
    heroTitle: "A convenient and secure user system",
    heroDesc:
      "Register or log in to access all the services designed for you.",
    start: "Get Started",
    joinNow: "Join Now",
    rights: "All rights reserved.",
  },
};

// === LangProvider ===
export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "uz");
  const [translations, setTranslations] = useState(staticTranslations);

  // === Tillarni almashtirish ===
  const toggleLang = async () => {
    const newLang = lang === "uz" ? "en" : "uz";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  // === OpenAI orqali dinamik tarjima ===
  const translateText = async (text) => {
    try {
      const targetLang = lang === "uz" ? "English" : "Uzbek";
      const response = await openai.responses.create({
        model: "gpt-5-mini",
        input: `Translate this text to ${targetLang}: ${text}`,
      });

      const translated = response.output[0].content[0].text;
      return translated.trim();
    } catch (error) {
      console.error("Tarjima xatosi:", error);
      return text; // Xato bo'lsa asl matnni qaytaradi
    }
  };

  // === Provider qiymatlari ===
  return (
    <LangContext.Provider value={{ lang, toggleLang, t: translations[lang], translateText }}>
      {children}
    </LangContext.Provider>
  );
};
