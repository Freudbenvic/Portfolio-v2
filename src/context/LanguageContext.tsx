import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Language } from "../i18n/translations";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: typeof translations["fr"];
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === "undefined") return "fr";
    const stored = window.localStorage.getItem("lang");
    return stored === "en" ? "en" : "fr";
  });

  useEffect(() => {
    window.localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "fr" ? "en" : "fr"));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
