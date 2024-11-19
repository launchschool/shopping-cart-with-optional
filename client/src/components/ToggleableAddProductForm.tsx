import { Dispatch, useState } from "react";
import AddProductForm from "./AddProductForm";
import { ProductAction } from "../reducers/productReducer";

interface ToggleableAddProductFormProps {
  dispatchProducts: Dispatch<ProductAction>;
}

const ToggleableAddProductForm = ({
  dispatchProducts,
}: ToggleableAddProductFormProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleToggleForm = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      {isVisible ? (
        <AddProductForm
          onToggleForm={handleToggleForm}
          dispatchProducts={dispatchProducts}
        />
      ) : (
        <p>
          <button className="add-product-button" onClick={handleToggleForm}>
            Add A Product
          </button>
        </p>
      )}
    </>
  );
};

export default ToggleableAddProductForm;
