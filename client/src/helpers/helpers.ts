import { ExchangeRates } from "../services/exchangeRates";
import { Currency } from "../context/CurrencyContext";
import { CartItem } from "../types";

export const calculateTotal = (cartItems: CartItem[]) => {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const formatPrice = (
  price: number,
  currency: Currency,
  rates: ExchangeRates
) => {
  const exchangeRate = rates ? rates[currency] : 1;

  const amount = currency === "EUR" ? price * exchangeRate : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};
