import { useContext } from "react";
import { CartItem } from "../types";
import CartItems from "./CartItems";
import { ThemeContext } from "../context/ThemeContext";

interface ShoppingCartProps {
  cartItems: CartItem[];
  onCheckout: () => void;
}

const ShoppingCart = ({ cartItems, onCheckout }: ShoppingCartProps) => {
  const themeContext = useContext(ThemeContext);
  const { theme, toggleTheme } = themeContext;
  return (
    <header>
      <div className="header-content">
        <h1>The Shop!</h1>
        <div className="header-controls">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <div className="cart">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
              <div className="cart">
                <p>Your cart is empty</p>
                <p>Total: $0</p>
              </div>
            ) : (
              <CartItems cartItems={cartItems} />
            )}
            <div className="checkout-button">
              <button
                className="checkout"
                disabled={cartItems.length === 0}
                onClick={onCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShoppingCart;
