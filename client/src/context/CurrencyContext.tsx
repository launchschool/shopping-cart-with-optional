import { createContext, useState, ReactNode, useEffect } from "react";
import { fetchExchangeRates, ExchangeRates } from "../services/exchangeRates";

export type Currency = "USD" | "EUR";

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
  rates: ExchangeRates;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  toggleCurrency: () => {
    throw new Error("toggleCurrency is not implemented");
  },
  rates: { USD: 1, EUR: 0.85 },
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [rates, setRates] = useState<ExchangeRates>({ USD: 1, EUR: 0.85 });

  useEffect(() => {
    const loadRates = async () => {
      const data = await fetchExchangeRates();
      setRates(data);
    };

    loadRates();
  }, [currency]);

  const toggleCurrency = () => {
    setCurrency((curr) => (curr === "USD" ? "EUR" : "USD"));
  };
  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, rates }}>
      {children}
    </CurrencyContext.Provider>
  );
}
