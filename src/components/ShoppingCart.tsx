import React, { useEffect, useState } from "react";

//Declare interface for types which correctly matched with the api
interface ProductTypes {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}
//Product list 
const ProductConst: React.FC<{ product: ProductTypes }> = ({ product }) => {
  return (
    <div key={product.id} className="grid grid-cols-3 border p-4">
      <h2>{product.title}</h2>
      <p>${product.price}</p>
      <img src={product.image} alt={product.title} className="w-full h-auto" />
    </div>
  );
};

//fetching product list
function ShoppingCart() {
  
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  //useEffect hooks that run once after component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories"),
        ]);
        const products = await productRes.json();
        const categories = await categoryRes.json();

        setProducts(products);
        setCategories(categories);
      } 
      catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  //target the value comes from selecting an option
  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
  };

  //filter the products by selected category
  const filterProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  
  return (
    <div>
      <div className="p-2">
        <label htmlFor="category-select" className="block mb-2">
          Filter by category:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategory}
          className="p-2 border"
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filterProducts.length > 0 ? (
          filterProducts.map((product) => (
            <ProductConst product={product} key={product.id} />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
