import { useContext } from "react";
import { formatPrice } from "../helpers/helpers";
import { Product } from "../types";
import { CurrencyContext } from "../context/CurrencyContext";

interface ProductDetailsProps extends Product {
  onToggleEdit: () => void;
  onDeleteProduct: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

const ProductDetails = ({
  _id,
  title,
  price,
  quantity,
  onToggleEdit,
  onDeleteProduct,
  onAddToCart,
}: ProductDetailsProps) => {
  const handleDelete = () => {
    onDeleteProduct(_id);
  };
  const { currency } = useContext(CurrencyContext);
  return (
    <div className="product-details">
      <h3>{title}</h3>
      <p className="price">{formatPrice(price, currency)}</p>
      <p className="quantity">{quantity} left in stock</p>
      <div className="actions product-actions">
        <button
          data-testid={`add-to-cart-${_id}`}
          className="add-to-cart"
          disabled={quantity === 0}
          onClick={() => onAddToCart(_id)}
        >
          Add to Cart
        </button>
        <button
          data-testid={`edit-${_id}`}
          className="edit"
          onClick={onToggleEdit}
        >
          Edit
        </button>
      </div>
      <button
        data-testid={`delete-${_id}`}
        className="delete-button"
        onClick={handleDelete}
      >
        <span>X</span>
      </button>
    </div>
  );
};

export default ProductDetails;
