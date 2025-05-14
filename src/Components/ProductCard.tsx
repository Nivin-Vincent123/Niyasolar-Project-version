import React from "react";
import { Link } from "react-router-dom";
import { Product } from "./types/Product";

interface BookCardProps {
  Product: Product;
}

const ProductCard: React.FC<BookCardProps> = ({ Product }) => {
  // Use the product's image URL or fallback to default
  const getProductImage = (product: Product) => {
    // Return the product image if available, otherwise return empty string
    // The onError handler will handle the fallback
    return product.image || "";
  };
  
  // Default image as a base64 data URL (gray placeholder)
  const defaultImageUrl = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI2VlZWVlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTk5OTkiPlNvbGFyIFByb2R1Y3Q8L3RleHQ+PC9zdmc+";

  return (
    <div className="border border-[#ddd] rounded-lg p-4 shadow-md transition-transform duration-300 bg-white text-center cursor-pointer hover:scale-105">
      <Link to={`/products/${Product.id}`} className="no-underline text-inherit">
        <img
          src={getProductImage(Product)}
          alt={Product.name}
          className="w-full h-[250px] object-cover rounded-lg mb-3"
          onError={(e) => {
            console.warn('Product image failed to load, using fallback:', Product.image);
            (e.target as HTMLImageElement).src = defaultImageUrl;
          }}
          onLoad={() => {

          }}
        />
        <h3 className="text-lg font-semibold text-[#333] mb-1.5">
          {Product.name}
        </h3>
        <p className="text-sm text-[#666] mb-2">{Product.category}</p>
        <p className="text-base font-bold text-black">
          ₹{Product.price.toFixed(2)}
        </p>
        {Product.stock !== undefined && (
          <p className="text-sm text-gray-500 mt-1">
            {Product.stock > 0 ? `In Stock: ${Product.stock}` : "Out of Stock"}
          </p>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;
