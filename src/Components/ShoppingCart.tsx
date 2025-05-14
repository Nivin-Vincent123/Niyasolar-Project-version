// Import necessary React hooks and components
import React, { useState, useEffect, useCallback } from "react";
// Import Product type definition
import { Product } from "./types/Product";
// Import custom Button component
import { Button } from "@/Components/UI/button";
// Import custom Input component

// Import React Router hook for navigation
import { useNavigate } from "react-router-dom";
// Import icons from lucide-react library
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart as ShoppingCartIcon,
} from "lucide-react";
// Commented out utility import for combining class names
// import { cn } from '@/lib/utils'; // Utility for combining class names

// Define CartItem interface with Product and quantity properties
interface CartItem {
  Product: Product;
  quantity: number;
}

// Utility function to add items to cart, exported for use in other components
export const addItemToCart = (Product: Product) => {
  // Debug: Log incoming product

  // Get existing cart from localStorage
  let savedCart = null;
  try {
    savedCart = localStorage.getItem("cartItems");

  } catch (e) {
    console.error('[addItemToCart] Error getting cart from localStorage:', e);
  }
  let cartItems: CartItem[] = [];
  try {
    cartItems = savedCart ? JSON.parse(savedCart) : [];
    // Filter out any legacy or malformed items
    cartItems = cartItems.filter(item => item && item.Product && item.Product.id);

  } catch (e) {
    console.error('[addItemToCart] Error parsing cartItems:', e);
    cartItems = [];
  }

  // Check if item already exists in cart
  const existingItem = cartItems.find(
    (item) => item.Product.id === Product.id
  );
  if (existingItem) {
    // If exists, increment quantity
    existingItem.quantity += 1;

  } else {
    // If new item, add to cart with quantity 1
    cartItems.push({ Product, quantity: 1 });

  }
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

  } catch (e) {
    console.error('[addItemToCart] Error setting cartItems in localStorage:', e);
  }
};

// Main ShoppingCart component
const ShoppingCart: React.FC = () => {
  // Initialize navigation hook
  const navigate = useNavigate();
  // Initialize cart items state with localStorage data
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Effect to sync cartItems from localStorage on mount and on storage event
  useEffect(() => {
    const syncCart = () => {
      const savedCart = localStorage.getItem("cartItems");
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    };
    window.addEventListener("storage", syncCart);
    syncCart(); // Also run on mount
    return () => window.removeEventListener("storage", syncCart);
  }, []);

  // Effect to save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Function to remove item from cart
  const removeFromCart = useCallback((ProductId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.Product.id !== ProductId)
    );
  }, []);

  // Function to increase item quantity
  const increaseQuantity = useCallback((ProductId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.Product.id === ProductId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  // Function to decrease item quantity
  const decreaseQuantity = useCallback((ProductId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.Product.id === ProductId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }, []);

  // Function to calculate total cart value
  const calculateTotal = useCallback(() => {
    return cartItems.reduce(
      (total, item) => {
        if (!item || !item.Product || typeof item.Product.price !== 'number' || typeof item.quantity !== 'number') {
          return total;
        }
        return total + item.Product.price * item.quantity;
      },
      0
    );
  }, [cartItems]);

  // Function to create an order and notify installer
  const createOrderAndNotifyInstaller = () => {
    // Get current user
    const currentUser = localStorage.getItem("currentUser");
    const user = currentUser ? JSON.parse(currentUser) : null;
    if (!user || !user.isLoggedIn || user.role !== "Buyer") return;

    // Prepare order object
    const newOrder = {
      id: Date.now().toString(),
      buyer: user.name,
      items: cartItems.map(item => ({
        name: item.Product.name,
        qty: item.quantity,
        price: item.Product.price
      })),
      status: "pending",
      createdAt: new Date().toISOString()
    };

    // Store order in localStorage (append to orders array)
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Set notification flag for installer
    localStorage.setItem("installerOrderNotification", "true");
  };

  // Function to handle checkout process
  const handleCheckout = () => {
    createOrderAndNotifyInstaller();
    localStorage.setItem("cartTotal", (calculateTotal() * 83).toFixed(2));
    navigate("/checkout");
  };

  // Render component UI
  return (
    // Main container with full height and gray background
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 md:p-8">
        {/* Cart header with icon */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <ShoppingCartIcon className="w-8 h-8 text-blue-500" />
          Shopping Cart
        </h1>

        {/* Conditional rendering based on cart empty state */}
        {cartItems.length === 0 ? (
          // Empty cart message
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
            <p className="text-gray-500 mt-2">
              <Button variant="link" asChild>
                <a href="/">Browse Products</a>
              </Button>
              to add items to your cart.
            </p>
          </div>
        ) : (
          // Cart items table
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                {/* Table header */}
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Remove</span>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Map through cart items */}
                  {cartItems.map((item, idx) => {
  if (!item || !item.Product) {
    console.warn("Invalid cart item at index", idx, item);
    return null;
  }
  return (
    <tr key={item.Product.id}>
      {/* Product details cell */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img
            src={item.Product.image}
            alt={item.Product.name}
            className="w-16 h-24 object-cover mr-4 rounded-md hidden md:block"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {item.Product.name}
            </h3>
            <p className="text-gray-500 text-sm hidden md:block">
              By {item.Product.category}
            </p>
          </div>
        </div>
      </td>
      {/* Price cell */}
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
        ₹{(item.Product.price * 83).toFixed(2)}
      </td>
      {/* Quantity cell */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => decreaseQuantity(item.Product.id)}
            className="rounded-l-md text-[#ffc107] hover:text-[#ffca28] focus:outline-none focus:ring-2 focus:ring-[#ffc107]"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="px-3 py-1 border-t border-b border-gray-200 bg-gray-50">
            {item.quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => increaseQuantity(item.Product.id)}
            className="rounded-r-md text-[#ffc107] hover:text-[#ffca28] focus:outline-none focus:ring-2 focus:ring-[#ffc107]"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </td>
      {/* Total price cell */}
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
        ₹{(item.Product.price * item.quantity * 83).toFixed(2)}
      </td>
      {/* Remove item button cell */}
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromCart(item.Product.id)}
          className="text-red-500 hover:text-red-700 text-[#ffc107] hover:text-[#ffca28] focus:outline-none focus:ring-2 focus:ring-[#ffc107]"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </td>
    </tr>
  );
})}
                </tbody>
              </table>
            </div>
            {/* Cart footer with total and checkout button */}
            <div className="mt-6 flex flex-col md:flex-row items-center justify-between">
              <div className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
                Total: ₹{(calculateTotal() * 83).toFixed(2)}
              </div>
              <Button
                variant="default"
                size="lg"
                onClick={handleCheckout}
                className="bg-[#ffc107] hover:bg-[#ffca28] text-[#1a1a1a] font-semibold py-2 px-6 rounded-full shadow-[0_0_10px_rgba(255,193,7,0.2)] hover:shadow-[0_0_16px_rgba(255,193,7,0.3)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ffc107]"
              >
                Proceed to Checkout
              </Button>
            </div>
            {/* Continue shopping link */}
            <div className="mt-4 text-center">
              <Button variant="link" asChild className="text-[#ffc107] hover:text-[#ffca28] font-semibold underline-offset-2 focus:outline-none focus:ring-2 focus:ring-[#ffc107]">
                <a href="/">Continue Shopping</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Export component
export default ShoppingCart;
