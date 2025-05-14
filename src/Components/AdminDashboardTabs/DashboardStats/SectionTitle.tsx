import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <div className="flex items-center gap-3 mt-6 mb-3">
    <span className="text-lg font-bold text-gray-700">{children}</span>
    <span className="flex-1 border-t border-gray-200" />
  </div>
);

export default SectionTitle;
