import { createContext, useState, ReactNode } from "react";

type Currency = "USD" | "EUR";

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
}

export const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  const toggleCurrency = () => {
    setCurrency((curr) => (curr === "USD" ? "EUR" : "USD"));
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}
