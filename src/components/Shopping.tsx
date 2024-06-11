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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>("");

  //category change
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  //search term change
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  //price range change
  const handlePriceChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const value = Number(event.target.value);
    setPriceRange((prevrange) => {
      return type === "min" ? [value, prevrange[1]] : [prevrange[0], value];
    });
    setCurrentPage(1);
  };

  //minimum rating change
  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinRating(Number(event.target.value));
    setCurrentPage(1);
  };

  //sort option change
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
    setCurrentPage(1);
  };

  //filter and sort products
  const filterProducts = () => {
    let filteredProducts = products
      .filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) =>
        selectedCategory ? product.category === selectedCategory : true
      )
      .filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      )
      .filter((product) => product.rating.rate >= minRating);

    filteredProducts = filteredProducts.sort((a, b) => {
      if (sortOption === "price-low-high") {
        return a.price - b.price;
      } else if (sortOption === "price-high-low") {
        return b.price - a.price;
      } else if (sortOption === "popularity") {
        return b.rating.rate - a.rating.rate;
      }
      return 0;
    });
    return filteredProducts;
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
        <div className="p-2 flex gap-4">
          <div>
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
          <div>
            <InputField
              id="price-min"
              type="number"
              value={String(priceRange[0])}
              onChange={(event) => handlePriceChange(event, "min")}
              label="Min Price:"
              htmlFor="price-min"
            />
            <InputField
              id="price-max"
              type="number"
              value={String(priceRange[1])}
              onChange={(event) => handlePriceChange(event, "max")}
              label="Max Price:"
              htmlFor="price-max"
            />
            <InputField
              id="rating-select"
              type="number"
              value={String(minRating)}
              onChange={handleRatingChange}
              min="0"
              max="5"
              label="Min Rating:"
              htmlFor="rating-select"
            />
          </div>
          <div>
            <label htmlFor="sort-select" className="block mt-4">
              Sort by:
            </label>

            <select
              id="sort-select"
              value={sortOption}
              onChange={handleSortChange}
              className="p-2 border"
            >
              <option value="">None</option>
              <option value="price-low-high">Price: Low-to-High </option>
              <option value="price-high-low">Price: High-to-Low </option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>
        <div>
          <Link to="/cart" className="p-2 flex gap-2">
            <p>Visit Cart</p>
            <FaCartArrowDown size={20} />
          </Link>
        </div>
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
