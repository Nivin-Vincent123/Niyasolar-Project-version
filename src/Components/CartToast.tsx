import React, { useEffect, useState } from "react";

const CartToast: React.FC = () => {
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState("");

  useEffect(() => {
    const handler = (e: any) => {
      setProductName(e.detail.name);
      setShow(true);
      setTimeout(() => setShow(false), 2000);
    };
    window.addEventListener("cart-toast", handler);
    return () => window.removeEventListener("cart-toast", handler);
  }, []);

  if (!show) return null;
  // Accessibility: aria-live, role, focus styles
  return (
    <>
      <div className="fixed bottom-6 right-6 bg-[#ffc107] text-[#1a1a1a] px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-slide-in-out font-semibold border-2 border-[#ffca28] focus:outline-none focus:ring-2 focus:ring-[#ffca28]" role="status" aria-live="polite">
        Added 
        <svg className="w-6 h-6 text-[#ffca28] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span>{productName} added to cart!</span>
      </div>
      <style>{`
        @keyframes slide-in-out {
          0% { opacity: 0; transform: translateY(40px) scale(0.95); }
          10% { opacity: 1; transform: translateY(0) scale(1); }
          90% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(40px) scale(0.95); }
        }
        .animate-slide-in-out {
          animation: slide-in-out 2s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </>
  );
};

export default CartToast;
