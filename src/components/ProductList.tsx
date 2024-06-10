import ProductCard from "./ProductCard";

interface productTypes {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const ProductList: React.FC<{ products: productTypes[] }> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
