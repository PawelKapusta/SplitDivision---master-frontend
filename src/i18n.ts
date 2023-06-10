import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

const chosenLanguage =
    typeof window !== "undefined"
        ? window.localStorage.getItem("language")
        : "en";

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        lng: chosenLanguage || "en",
        fallbackLng: "en",
        debug: true,
        supportedLngs: ["en", "pl", "de", "fr", "es"],
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
        interpolation: { escapeValue: true },
    });

export default i18n;
