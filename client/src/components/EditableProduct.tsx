import { NewProduct, Product } from "../types";
import EditProductForm from "./EditProductForm";
import ProductDetails from "./ProductDetails";
import useToggle from "../hooks/useToggle";

interface EditableProductProps {
  product: Product;
  onUpdateProduct: (
    updatedProduct: NewProduct,
    productId: string,
    onToggleEdit: () => void
  ) => void;
  onDeleteProduct: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

const EditableProduct = ({
  product,
  onUpdateProduct,
  onDeleteProduct,
  onAddToCart,
}: EditableProductProps) => {
  const [isEditing, toggle] = useToggle(false);

  return (
    <li className="product">
      <ProductDetails
        {...product}
        onToggleEdit={toggle}
        onDeleteProduct={onDeleteProduct}
        onAddToCart={onAddToCart}
      />
      {isEditing ? (
        <EditProductForm
          {...product}
          onToggleEdit={toggle}
          onUpdateProduct={onUpdateProduct}
        />
      ) : null}
    </li>
  );
};

export default EditableProduct;
