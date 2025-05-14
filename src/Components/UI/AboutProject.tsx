import React from "react";

const AboutProject: React.FC = () => (
  <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md mt-10 border-2 border-[#fff9c4]">
    <h2 className="text-2xl font-bold mb-4 text-[#ffc107]">About This Project</h2>
    <p className="mb-4 text-gray-800">
      <strong>Disclaimer:</strong> This website is a Final Year BCA project created by Nivin Vincent, a student of Cochin Arts and Science College, Kakkanad, affiliated to Mahatma Gandhi University. It is for academic purposes only and is not a real e-commerce platform. No actual transactions or payments are processed.
    </p>
    <h3 className="text-lg font-semibold text-[#ffc107] mt-6 mb-2">Project Overview</h3>
    <p className="mb-4 text-gray-800">
      This project demonstrates a full-stack e-commerce web application for solar products. It is designed to streamline the process of buying, selling, and installing solar products, featuring dedicated modules for administrators, installers, and buyers.
    </p>
    <h3 className="text-lg font-semibold text-[#ffc107] mt-6 mb-2">Technologies Used</h3>
    <ul className="list-disc pl-6 mb-4 text-gray-800">
      <li>React (TypeScript, Vite)</li>
      <li>Tailwind CSS</li>
      <li>Node.js & Express (for backend, if present)</li>
      <li>Other supporting libraries for routing, state management, and UI</li>
    </ul>
    <h3 className="text-lg font-semibold text-[#ffc107] mt-6 mb-2">Academic Background</h3>
    <p className="mb-4 text-gray-800">
      <strong>Nivin Vincent</strong><br/>
      Final Year BCA Student<br/>
      Cochin Arts and Science College, Kakkanad<br/>
      Mahatma Gandhi University
    </p>
    <p className="mt-8 text-xs text-gray-500">
      This website is for demonstration purposes only and does not process real payments or orders.
    </p>
  </div>
);

export default AboutProject;
