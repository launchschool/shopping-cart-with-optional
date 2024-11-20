import { useContext } from "react";
import { CartItem as CartItemType } from "../types";
import { CurrencyContext } from "../context/CurrencyContext";
import { formatPrice } from "../helpers/helpers";

interface CartItemProps extends CartItemType {}

const CartItem = ({ title, quantity, price }: CartItemProps) => {
  const { currency } = useContext(CurrencyContext);
  console.log(currency);
  return (
    <tr data-testid={`cartItem-${title}`}>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>{formatPrice(price, currency)}</td>
    </tr>
  );
};

export default CartItem;
