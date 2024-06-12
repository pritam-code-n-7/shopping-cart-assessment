import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/UseCart";
import BlueButton from "../reusables/BlueButton";

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", productId });
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div>
        <h1 className="text-center mb-4 font-bold text-lg">Your Cart</h1>
        {state.cart.length > 0 ? (
          state.cart.map((product) => (
            <div key={product.id} className="border p-4 mb-4 grid grid-cols-4">
              <Link to={`/product/${product.id}`}>
                <h2 className="text-blue-600 text-pretty">{product.title}</h2>
              </Link>
              <p className="font-mono">${product.price}</p>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-44 object-cover"
              />
              <BlueButton
                name="Remove from Cart"
                onClick={() => removeFromCart(product.id)}
                type="button"
                aria-label="Remove from the cart button"
              />
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <div className="flex justify-center">
        <BlueButton
          name="Back to Shopping"
          onClick={() => navigate("/")}
          type="button"
          aria-label="Back button"
        />
      </div>
    </div>
  );
};

export default Cart;
