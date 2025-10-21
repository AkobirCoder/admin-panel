import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationUz from "./locales/uz/translation.json";
import translationRu from "./locales/ru/translation.json";
import translationEn from "./locales/en/translation.json";

// Har bir til uchun tarjimalar
const resources = {
  uz: { translation: translationUz },
  ru: { translation: translationRu },
  en: { translation: translationEn },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "uz", // Boshlang'ich til
  fallbackLng: "en", // Agar so'z topilmasa, inglizcha chiqadi
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
