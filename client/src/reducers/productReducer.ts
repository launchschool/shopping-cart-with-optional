import { Product } from "../types";

export type ProductAction =
  | { type: "FETCH_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: string }
  | {
      type: "UPDATE_PRODUCT_QUANTITY";
      payload: { productId: string; quantity: number };
    };

export const productReducer = (
  state: Product[],
  action: ProductAction
): Product[] => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return action.payload;

    case "ADD_PRODUCT":
      return [...state, action.payload];

    case "UPDATE_PRODUCT":
      return state.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );

    case "DELETE_PRODUCT":
      return state.filter((product) => product._id !== action.payload);

    case "UPDATE_PRODUCT_QUANTITY":
      return state.map((product) =>
        product._id === action.payload.productId
          ? { ...product, quantity: action.payload.quantity }
          : product
      );

    default:
      return state;
  }
};

export const fetchProductsAction = (products: Product[]): ProductAction => ({
  type: "FETCH_PRODUCTS",
  payload: products,
});

export const addProductAction = (product: Product): ProductAction => ({
  type: "ADD_PRODUCT",
  payload: product,
});

export const updateProductAction = (product: Product): ProductAction => ({
  type: "UPDATE_PRODUCT",
  payload: product,
});

export const deleteProductAction = (productId: string): ProductAction => ({
  type: "DELETE_PRODUCT",
  payload: productId,
});

export const updateProductQuantityAction = (
  productId: string,
  quantity: number
): ProductAction => ({
  type: "UPDATE_PRODUCT_QUANTITY",
  payload: { productId, quantity },
});
