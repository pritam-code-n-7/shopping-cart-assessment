import { useEffect, useState } from "react";
import { productTypes } from "../reusables/productTypes";

export const useFetchData = () => {
  const [products, setProducts] = useState<productTypes[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories"),
        ]);

        if (!productRes.ok || !categoryRes.ok) {
          throw new Error("failed to fetch data");
        }

        setProducts(await productRes.json());
        setCategories(await categoryRes.json());
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { products, categories, loading, error };
};
