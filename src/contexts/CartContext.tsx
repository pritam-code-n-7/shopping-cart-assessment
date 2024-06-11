import { ReactNode, createContext, useReducer, Dispatch } from "react";
import { CartState, Action } from "./CartTypes";
import { CartReducer, initialState } from "./CartReducer";

export const CartContext = createContext<{
  state: CartState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
