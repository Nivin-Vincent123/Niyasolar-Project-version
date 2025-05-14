import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { Product } from "./types/Product";

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        // Map _id to id for consistency
        setProduct({ ...data, id: data._id });
        setError(null);
      })
      .catch(() => {
        setError("Product not found");
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error || !product)
    return (
      <div>
        <h2>404 - Product Not Found</h2>
        <button onClick={() => navigate("/products")}>Back to Products</button>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <img src={product.image} alt={product.name} className="w-full h-64 object-contain mb-4" />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-2">{product.brand}</p>
      <p className="mb-4">{product.description}</p>
      <p className="mb-2">Category: {product.category}</p>
      <p className="mb-2">Wattage: {product.wattage}</p>
      <p className="mb-2 font-semibold text-lg">Price: ${product.price}</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => {
          addToCart(product);
          window.dispatchEvent(new CustomEvent("cart-toast", { detail: { name: product.name } }));
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductPage;
