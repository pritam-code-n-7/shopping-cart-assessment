import { Link } from "react-router-dom";

interface productTypes {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard: React.FC<{ product: productTypes }> = ({ product }) => {
  return (
    <div className="grid grid-cols-3 border p-4">
      <Link to={`/product/${product.id}`}>
        <h2 className="text-blue-600 text-pretty">{product.title}</h2>
      </Link>
      <p className="font-mono">${product.price}</p>
      <img src={product.image} alt={product.title} className="w-full h-auto" />
    </div>
  );
};

export default ProductCard;
