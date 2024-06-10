import { useEffect, useState } from "react";
import ProductList from "./ProductList";

//Declare a interface for types which correctly matched with the api
interface ProductTypes {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

//fetching product list
const Shopping: React.FC = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(8);


  //fetching products and categories under useeffect hook that execute once after component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories"),
        ]);

        setProducts(await productRes.json());
        setCategories(await categoryRes.json());
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);


  //target the value comes from selecting an option
  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setCurrentPage(1);
  };


  //filter the products by selected category
  const filterProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;


  //calculating pages
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filterProducts.length / productsPerPage);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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

      {currentProducts.length > 0 ? (
        <ProductList products={currentProducts} />
      ) : (
        <div>Loading...</div>
      )}


      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 border ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Shopping;
