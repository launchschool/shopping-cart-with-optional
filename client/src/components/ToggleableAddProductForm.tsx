import AddProductForm from "./AddProductForm";
import { NewProduct } from "../types";
import useToggle from "../hooks/useToggle";

interface ToggleableAddProductFormProps {
  onAddProduct: (product: NewProduct, callback: () => void) => void;
}

const ToggleableAddProductForm = ({
  onAddProduct,
}: ToggleableAddProductFormProps) => {
  const [isVisible, toggle] = useToggle(false);

  return (
    <>
      {isVisible ? (
        <AddProductForm onToggleForm={toggle} onAddProduct={onAddProduct} />
      ) : (
        <p>
          <button className="add-product-button" onClick={toggle}>
            Add A Product
          </button>
        </p>
      )}
    </>
  );
};

export default ToggleableAddProductForm;
