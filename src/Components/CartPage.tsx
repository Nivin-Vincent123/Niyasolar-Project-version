import React from "react";
import { useCart } from "./CartContext";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)
    return (
      <div className="max-w-xl mx-auto p-8 bg-white rounded shadow mt-6">
        <h2 className="text-xl mb-4">Your cart is empty.</h2>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex items-center mb-4 border-b pb-2">
          <img src={item.image} alt={item.name} className="h-16 w-16 object-contain mr-4" />
          <div className="flex-1">
            <div className="font-semibold">{item.name}</div>
            <div>${item.price} x </div>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
              className="w-12 border rounded px-1 mx-2"
            />
            <span>= ${(item.price * item.quantity).toFixed(2)}</span>
          </div>
          <button
            className="ml-4 bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}
      <div className="text-right font-bold text-lg mt-4">Total: ${total.toFixed(2)}</div>
      <button
        className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        onClick={() => {
          alert("Checkout simulated! Thank you for your order.");
          clearCart();
        }}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartPage;
