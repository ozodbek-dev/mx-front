import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import I18NextChainedBackend from "i18next-chained-backend";
import {initReactI18next} from "react-i18next";
import krl from "./locales/krl/translations.json";
import ru from "./locales/ru/translations.json";
import uz from "./locales/uz/translations.json";

const resources = {
  uz: {
    translation: uz,
  },
  ru: {
    translation: ru,
  },
  krl: {
    translation: krl,
  },
};

i18n
  .use(I18NextChainedBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    resources,
    lng: localStorage.getItem("i18nextLng")
      ? localStorage.getItem("i18nextLng")
      : "uz",
    fallbackLng: "uz",
    interpolation: {
      escapeValue: false,
    },
    // backend: {
    //   backends: [I18NextLocalStorageBackend, I18NextHttpBackend],
    //   backendOptions: {
    //     loadPath: "./locales/{{lng}}/translations.json",
    //   },
    // },
    react: {
      useSuspense: false,
      wait: true,
    },
  });

export default i18n;
