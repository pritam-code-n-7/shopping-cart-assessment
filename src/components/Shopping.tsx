import { ChangeEvent, useState } from "react";
import ProductList from "./ProductList";
import { useFetchData } from "../customhooks/FetchData";
import Pagination from "../reusables/Pagination";
import InputField from "../reusables/InputField";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa6";

//fetching product list
const Shopping: React.FC = () => {
  const { products, categories, loading } = useFetchData();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(8);

  //target the value comes from selecting an option
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  //filter the products by selected category
  const filterProducts = () => {
    return products
      .filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) =>
        selectedCategory ? product.category === selectedCategory : true
      );
  };

  //calculating pages
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts().slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filterProducts().length / productsPerPage);

  return (
    <div>
      <div className="flex justify-between">
        <div className="p-2">
          <InputField
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
          />

          <label htmlFor="category-select" className="block mb-2">
            Filter by category:
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
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
        <Link to="/cart" className="p-2 flex gap-2">
          <p>Visit Cart</p>
          <FaCartArrowDown size={20} />
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ProductList products={currentProducts} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Shopping;
