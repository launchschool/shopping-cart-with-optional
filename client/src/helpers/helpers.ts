import { CartItem } from "../types";

export const calculateTotal = (cartItems: CartItem[]) => {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const formatPrice = (price: number, currency: "USD" | "EUR") => {
  const exchangeRate = 1;

  const amount = currency === "EUR" ? price * exchangeRate : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};
