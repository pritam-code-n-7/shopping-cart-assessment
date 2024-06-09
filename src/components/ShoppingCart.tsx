import React, { useEffect, useState } from "react";

//Declare interface for types which correctly matched with the api
interface ProductTypes {
  id: number;
  title: string;
  price: number;
  image: string;
}
//Product list Parent
const ProductConst: React.FC<{ product: ProductTypes }> = ({ product }) => {
  return (
    <div key={product.id} className="grid grid-cols-3 border p-4">
      <h2>{product.title}</h2>
      <p>${product.price}</p>
      <img src={product.image} alt={product.title} className="w-full h-auto" />
    </div>
  );
};

//main function
function ShoppingCart() {

  //declare state for storing products
  const [products, setProducts] = useState<ProductTypes[]>([]);

  //useEffect hooks that run once after component mounts
  useEffect(() => {
    fetch("https://fakestoreapi.com/products") //used promise chain for managing asynchronous operation with fetch method
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

//mapped product list with conditional rendering
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductConst product={product} key={product.id} />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ShoppingCart;
