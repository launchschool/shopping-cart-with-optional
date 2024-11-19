import { Dispatch, useState } from "react";
import ProductForm from "./ProductForm";
import { addProduct } from "../services/products";
import { ProductAction } from "../reducers/productReducer";
import { addProductAction } from "../reducers/productReducer";

interface AddProductFormProps {
  onToggleForm: () => void;
  // onAddProduct: (product: NewProduct, onToggleForm: () => void) => void;
  dispatchProducts: Dispatch<ProductAction>;
}

const AddProductForm = ({
  onToggleForm,
  dispatchProducts,
}: AddProductFormProps) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("0");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newProduct = {
      title,
      price: +price,
      quantity: +quantity,
    };
    // onAddProduct(newProduct, onToggleForm);
    const data = await addProduct(newProduct);
    dispatchProducts(addProductAction(data));
    onToggleForm();
  };

  return (
    <div className="add-form">
      <ProductForm
        title={title}
        price={String(price)}
        quantity={String(quantity)}
        setTitle={setTitle}
        setPrice={setPrice}
        setQuantity={setQuantity}
        onSubmit={handleSubmit}
        onToggleForm={onToggleForm}
        buttonLabel="Add"
      />
    </div>
  );
};

export default AddProductForm;
