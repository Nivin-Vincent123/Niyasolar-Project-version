import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmation: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a1a] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-[#0a0a1a] rounded-2xl shadow-[0_4px_12px_rgba(0,255,255,0.15)] overflow-hidden p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 text-green-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-[#00ffff] mb-4">Order Received!</h1>
        
        <p className="text-gray-300 mb-8">
          Thank you for your order. Our installer team will review your request and contact you shortly.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full px-6 py-3 bg-[#00ffff] text-[#0a0a1a] font-medium rounded-lg hover:bg-[#00cccc] transition"
          >
            Return to Home
          </Link>
          
          <Link
            to="/products"
            className="block w-full px-6 py-3 bg-transparent border border-[#00ffff] text-[#00ffff] font-medium rounded-lg hover:bg-[#111125] transition"
          >
            Browse More Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
