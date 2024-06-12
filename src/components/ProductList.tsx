import { Link } from "react-router-dom";
import { productTypes } from "../reusables/productTypes";
import BlueButton from "../reusables/BlueButton";
import { useCart } from "../contexts/UseCart";

interface ProductListProps {
  products: productTypes[];
  triggerCartAnimation: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  triggerCartAnimation,
}) => {
  const { dispatch } = useCart();

  const addToCart = (product: productTypes) => {
    dispatch({ type: "ADD_TO_CART", product });
    triggerCartAnimation();
  };

  return (
    <div className="grid grid-cols-8 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4">
          <Link to={`/product/${product.id}`}>
            <h2 className="text-blue-600 text-pretty">{product.title}</h2>
          </Link>
          <p className="font-mono">${product.price}</p>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-cover"
          />
          <div className="">
            <BlueButton
              name="Add to Cart"
              onClick={() => addToCart(product)}
              type="button"
              aria-label="Add to shopping cart button"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
