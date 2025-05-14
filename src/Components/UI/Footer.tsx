import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a1a] border-t border-[#ffc107]/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-[#ffc107] font-bold text-lg mb-4 font-sans">Niya Solar</h3>
            <p className="text-gray-400 font-sans">This solar web application is the final year project of Nivin Vincent, a student of Cochin Arts and Science College (CASC). Designed to streamline the process of buying, selling, and installing solar products, the platform features dedicated modules for administrators, installers, and buyers. It allows admins to manage products, track stock levels, and oversee orders; installers to view and handle assigned installations; and buyers to browse products, add them to the cart, and place orders seamlessly. The project demonstrates a full-stack implementation with a focus on usability, efficiency, and real-world application.</p>
          </div>
          <div>
            <h3 className="text-[#ffc107] font-bold text-lg mb-4 font-sans">Quick Links</h3>
            <ul className="space-y-2 font-sans">
              <li><Link to="/products" className="text-gray-400 hover:text-[#ffc107] transition duration-300">Browse Solar Products</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-[#ffc107] transition duration-300">About Us</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-[#ffc107] transition duration-300">Contact Us</Link></li>

            </ul>
          </div>
          <div>
            <h3 className="text-[#ffc107] font-bold text-lg mb-4 font-sans">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com/niyasolar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ffc107] transition duration-300" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.405.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.405 24 22.674V1.326C24 .595 23.405 0 22.675 0"/></svg>
              </a>
              <a href="https://twitter.com/niyasolar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ffc107] transition duration-300" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.93-.856 2.01-.857 3.17 0 2.188 1.115 4.118 2.813 5.254A4.904 4.904 0 01.964 9.1v.062a4.928 4.928 0 003.946 4.827c-.417.113-.855.171-1.308.171-.32 0-.626-.03-.928-.086.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z"/></svg>
              </a>
              <a href="https://instagram.com/niyasolar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ffc107] transition duration-300" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.31.974.974 1.248 2.241 1.31 3.608.058 1.266.069 1.646.069 4.849s-.011 3.584-.069 4.85c-.062 1.366-.336 2.633-1.31 3.608-.974.974-2.241 1.248-3.608 1.31-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.336-3.608-1.31-.974-.974-1.248-2.241-1.31-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.31-3.608C4.517 2.499 5.784 2.225 7.15 2.163 8.416 2.105 8.796 2.094 12 2.094m0-2.163C8.741-.069 8.332-.06 7.052.009 5.74.08 4.665.363 3.677 1.351c-.988.988-1.271 2.063-1.342 3.375C2.06 8.332 2.069 8.741 2.069 12c0 3.259-.009 3.668.009 4.948.071 1.312.354 2.387 1.342 3.375.988.988 2.063 1.271 3.375 1.342 1.28.069 1.689.078 4.948.078s3.668-.009 4.948-.078c1.312-.071 2.387-.354 3.375-1.342.988-.988 1.271-2.063 1.342-3.375.069-1.28.078-1.689.078-4.948s-.009-3.668-.078-4.948c-.071-1.312-.354-2.387-1.342-3.375-.988-.988-2.063-1.271-3.375-1.342C15.668-.06 15.259-.069 12-.069zm0 5.838A6.163 6.163 0 005.837 12 6.163 6.163 0 0012 18.163 6.163 6.163 0 0018.163 12 6.163 6.163 0 0012 5.769zm0 10.163A4 4 0 118 12a4 4 0 014 4zm6.406-11.845a1.44 1.44 0 11-2.879 0 1.44 1.44 0 012.879 0z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#ffc107]/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center text-gray-400 text-sm font-sans">
              &copy; 2025 SolarEase — Empowering Clean Energy
            </p>
            {/* Certifications or affiliations logos can go here if available */}
          </div>
        </div>
        <div className="mt-6 text-center">
          <div className="bg-[#fffbe6] text-[#8d5600] text-xs md:text-sm px-3 py-2 rounded shadow-sm inline-block border border-[#ffc107]/40 font-semibold">
            Disclaimer: This website is a Final Year BCA project created by Nivin Vincent (Cochin Arts and Science College, Kakkanad). For academic demonstration only. No real transactions or payments are processed.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;