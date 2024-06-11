import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlueButton from "../reusables/BlueButton";

interface ProductTypes {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductTypes | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        setProduct(await response.json());
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-64 h-64 mb-4" />
      <p className="mb-4 text-balance">{product.description}</p>
      <p className="text-xl font-bold mb-4">${product.price}</p>
      <p className="mb-4">Category: {product.category}</p>
      <p className="text-xl font-bold mb-4">Product Rating: {product.rating.rate}</p>
      <BlueButton
        name="Back to shopping"
        onClick={() => navigate("/")}
        type="button"
      />
    </div>
  );
};

export default ProductDetails;
