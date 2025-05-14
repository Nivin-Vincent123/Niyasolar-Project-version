import React from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

const Payments: React.FC = () => {
  const navigate = useNavigate();
  const amount = 1299.99; // This would normally come from cart/props

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Payment
        </h1>

        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Scan QR Code to Pay
          </h2>

          <div className="text-center mb-6">
            <p className="text-gray-600">Amount to Pay:</p>
            <p className="text-3xl font-bold text-gray-900">₹{amount.toFixed(2)}</p>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <QRCodeSVG
                value={`upi://pay?pa=dummy123@dummybank&am=${amount}&cu=INR`}
                width={200}
                height={200}
              />
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-2">Or use UPI ID:</p>
              <p className="font-mono text-gray-800 bg-white px-4 py-2 rounded">
                dummy123@dummybank
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate("/cart")}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Back to Cart
          </button>
          <button
            onClick={() => navigate("/order-confirmation")}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
