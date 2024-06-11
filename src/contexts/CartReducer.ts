import { CartState, Action } from "./CartTypes";

export const initialState: CartState = {
  cart: [],
};

export const CartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.product] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.productId),
      };
    default:
      return state;
  }
};
