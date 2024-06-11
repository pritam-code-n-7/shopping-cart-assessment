import { productTypes } from "../reusables/productTypes";

export interface CartState {
  cart: productTypes[];
}

export type Action =
  | { type: "ADD_TO_CART"; product: productTypes }
  | { type: "REMOVE_FROM_CART"; productId: number };
