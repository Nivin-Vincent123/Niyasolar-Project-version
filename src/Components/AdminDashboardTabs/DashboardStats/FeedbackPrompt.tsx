import React from "react";

const FeedbackPrompt: React.FC = () => (
  <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl shadow px-6 py-4 flex items-center justify-between mt-8 mb-2">
    <div className="text-gray-700 font-medium">
      Have suggestions? Let us know what you'd like to see in the dashboard.
    </div>
    <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-all shadow-sm text-sm">
      Send Feedback
    </button>
  </div>
);

export default FeedbackPrompt;
