import {
  ChangeEvent,
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFetchData } from "../customhooks/FetchData";
import Pagination from "../reusables/Pagination";
import InputField from "../reusables/InputField";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa6";
import { motion } from "framer-motion";
import { toast } from "react-toastify";


//Lazy loading product list component
const ProductList = lazy(() => import("./ProductList"));



//fetching product list
const Shopping: React.FC = () => {
  const { products, categories, loading, error } = useFetchData();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(8);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>("");
  const [cartAnimation, setCartAnimation] = useState<boolean>(false);



  //Handle error
  useEffect(() => {
    if (error) {
      toast.error("An error occurred, please try again later");
    }
  }, [error]);



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
  const filterProducts = useMemo(() => {
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
  }, [
    products,
    searchTerm,
    selectedCategory,
    priceRange,
    minRating,
    sortOption,
  ]);



  //calculating pages
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filterProducts.length / productsPerPage);



  //add to cart animation
  const triggerCartAnimation = () => {
    setCartAnimation(true);
    setTimeout(() => {
      setCartAnimation(false);
    }, 1000);
  };



  return (
    <div>
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto md:mr-4">
            <InputField
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              aria-label="Search products"
            />

            <label htmlFor="category-select" className="block mb-2 pr-2">
              Filter by category:
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-2 border"
              aria-label="Filter by category"
            >
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto md:mr-4">
            <InputField
              id="price-min"
              type="number"
              value={String(priceRange[0])}
              onChange={(event) => handlePriceChange(event, "min")}
              label="Min Price:"
              htmlFor="price-min"
              aria-label="Minimum price"
            />
            <InputField
              id="price-max"
              type="number"
              value={String(priceRange[1])}
              onChange={(event) => handlePriceChange(event, "max")}
              label="Max Price:"
              htmlFor="price-max"
              aria-label="Maximum price"
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
              aria-label="Minimum rating"
            />
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto">
            <label htmlFor="sort-select" className="block pr-2">
              Sort by:
            </label>

            <select
              id="sort-select"
              value={sortOption}
              onChange={handleSortChange}
              className="p-2 border"
              aria-label="Sort products"
            >
              <option value="">None</option>
              <option value="price-low-high">Price: Low-to-High </option>
              <option value="price-high-low">Price: High-to-Low </option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>
        <div className="fixed bottom-4 right-4 z-10">
          <p className="font-bold text-blue-600" data-testid="cypress-title">Visit Cart:</p>
          <motion.div
            animate={{
              scale: cartAnimation ? 1.5 : 1,
              rotate: cartAnimation ? 360 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Link to="/cart" className="p-2 flex gap-2">
              <FaCartArrowDown size={20} />
            </Link>
          </motion.div>
        </div>
      </div>


      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Suspense fallback={<div>Loading....</div>}>
            <ProductList
              products={currentProducts}
              triggerCartAnimation={triggerCartAnimation}
            />
          </Suspense>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            aria-label="Product pagination"
          />
        </div>
      )}
    </div>
  );
};

export default Shopping;
