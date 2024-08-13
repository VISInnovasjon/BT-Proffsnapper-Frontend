import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type Language = "en" | "nor";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  languageSet: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("nor");
  const [languageSet, setLanguageSet] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchLanguageSet = async () => {
      const searchParam = new URLSearchParams({
        Language: language,
      });
      const url =
        import.meta.env.VITE_API_LANGUAGE_URL + `?` + searchParam.toString();
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      setLanguageSet(result);
    };
    fetchLanguageSet();
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, languageSet, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
