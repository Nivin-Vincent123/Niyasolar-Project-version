import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface ContactFormData {
  name: string;
  phone: string;
  address: string;
  email: string;
}

const ContactForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = location.state || {};

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productId) {
      alert("No product selected. Please go back and select a product.");
      navigate("/products");
      return;
    }
    
    if (!validateForm()) {
      return;
    }

    // Create new order
    const newOrder = {
      id: `order_${uuidv4().substring(0, 8)}`,
      productId,
      contactInfo: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
      },
      approved: false,
      date: new Date().toISOString(),
      status: "Pending"
    };

    // Get existing orders or initialize empty array
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    
    // Add new order
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));
    
    // Redirect to order confirmation
    navigate("/order-confirmation");
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#0a0a1a] rounded-2xl shadow-[0_4px_12px_rgba(0,255,255,0.15)] overflow-hidden p-8">
          <h1 className="text-3xl font-bold text-[#00ffff] mb-6">Contact Information</h1>
          <p className="text-gray-300 mb-8">Please provide your contact details to complete your order.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#111125] border ${
                  errors.name ? "border-red-500" : "border-gray-700"
                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00ffff]`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#111125] border ${
                  errors.phone ? "border-red-500" : "border-gray-700"
                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00ffff]`}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-3 bg-[#111125] border ${
                  errors.address ? "border-red-500" : "border-gray-700"
                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00ffff]`}
                placeholder="Enter your address"
              />
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#111125] border ${
                  errors.email ? "border-red-500" : "border-gray-700"
                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00ffff]`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#00ffff] text-[#0a0a1a] font-medium rounded-lg hover:bg-[#00cccc] transition"
              >
                Submit Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
