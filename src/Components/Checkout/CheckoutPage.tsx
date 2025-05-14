import React, { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { Button } from "@/Components/UI/button";

interface CartItem {
  Product: Product;
  quantity: number;
}

const CheckoutPage: React.FC = () => {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // Checkout form state
  const [form, setForm] = useState({
    fullName: "",
    contactNumber: "",
    street: "",
    city: "",
    zipCode: "",
    country: "",
    email: ""
  });
  const [formError] = useState<string | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  // Validate input fields


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const total = cartItems.reduce(
    (sum, item) => sum + item.Product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-2xl mt-10 border-2 border-[#fff9c4]">
      <div className="mb-4 bg-[#fffbe6] text-[#8d5600] border border-[#ffc107]/40 px-4 py-2 rounded text-center font-semibold text-sm">
        Disclaimer: This website is a Final Year BCA project created by Nivin Vincent, a student of Cochin Arts and Science College, Kakkanad. It is for academic demonstration only. Order placement and payment are disabled.
      </div>
      <h2 className="text-2xl font-bold mb-4 text-[#ffc107] drop-shadow-[0_0_8px_rgba(255,193,7,0.25)]">Checkout</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-[#ffc107]">Order Summary</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.Product.id} className="flex justify-between mb-2">
              <span>{item.Product.name} x {item.quantity}</span>
              <span>₹{item.Product.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="font-bold text-lg mt-4 text-[#ffca28]">Total: ₹{total}</div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-[#ffc107] font-sans">Shipping & Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-[#ffc107]/50 rounded bg-white/5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffc107] font-sans"
            required
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={form.contactNumber}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-[#ffc107]/50 rounded bg-white/5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffc107] font-sans"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={form.street}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-[#ffc107]/50 rounded bg-white/5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffc107] font-sans"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-[#ffc107]/50 rounded bg-white/5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffc107] font-sans"
            required
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={form.zipCode}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-[#ffc107]/50 rounded bg-white/5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffc107] font-sans"
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-[#ffc107]/50 rounded bg-white/5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffc107] font-sans"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email Address (optional)"
          value={form.email}
          onChange={handleInputChange}
          className="w-full mt-4 p-3 border-2 border-[#ffc107]/50 rounded bg-white/5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffc107] font-sans"
        />
        {formError && (
          <div className="mt-2 text-red-500 text-sm font-semibold">{formError}</div>
        )}
      </div>
      <Button className="w-full bg-gray-300 text-gray-500 font-bold py-3 rounded-full cursor-not-allowed" disabled>
        Order Disabled (Demo Only)
      </Button>
    </div>
  );
};

export default CheckoutPage;
