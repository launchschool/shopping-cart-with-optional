import { useEffect, useReducer } from "react";
import ToggleableAddProductForm from "./components/ToggleableAddProductForm";
import ShoppingCart from "./components/ShoppingCart";
import ProductListing from "./components/ProductListing";
import { NewProduct } from "./types";
import {
  getProducts,
  getCartItems,
  updateProduct,
  deleteProduct,
  checkout,
  addToCart,
} from "./services/products";
import {
  productReducer,
  fetchProductsAction,
  updateProductAction,
  deleteProductAction,
  updateProductQuantityAction,
  addProductAction,
} from "./reducers/productReducer";
import {
  cartReducer,
  fetchCartAction,
  addToCartAction,
  clearCartAction,
} from "./reducers/cartReducer";
import { addProduct } from "./services/products";

function App() {
  const [products, dispatchProducts] = useReducer(productReducer, []);
  const [cartItems, dispatchCart] = useReducer(cartReducer, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        dispatchProducts(fetchProductsAction(data));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchCartItems = async () => {
      try {
        const data = await getCartItems();
        dispatchCart(fetchCartAction(data));
      } catch (e) {
        console.error(e);
      }
    };

    fetchProducts();
    fetchCartItems();
  }, []);

  const handleUpdateProduct = async (
    updatedProduct: NewProduct,
    productId: string,
    callback?: () => void
  ) => {
    try {
      const data = await updateProduct(updatedProduct, productId);
      dispatchProducts(updateProductAction(data));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddProduct = async (
    newProduct: NewProduct,
    callback?: () => void
  ) => {
    try {
      const data = await addProduct(newProduct);
      dispatchProducts(addProductAction(data));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      dispatchProducts(deleteProductAction(productId));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout();
      dispatchCart(clearCartAction());
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddToCart = async (productId: string) => {
    const product = products.find((product) => product._id === productId);
    if (!product || product.quantity === 0) return;
    dispatchProducts(
      updateProductQuantityAction(productId, product.quantity - 1)
    );
    try {
      const { item } = await addToCart(productId);

      dispatchCart(addToCartAction(item));
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div id="app">
      <ShoppingCart cartItems={cartItems} onCheckout={handleCheckout} />
      <main>
        <ProductListing
          onAddToCart={handleAddToCart}
          products={products}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
        <ToggleableAddProductForm onAddProduct={handleAddProduct} />
      </main>
    </div>
  );
}

export default App;
