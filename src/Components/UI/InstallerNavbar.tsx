import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const InstallerNavbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      try {
        const user = JSON.parse(currentUser);
        setIsLoggedIn(user.isLoggedIn && user.role === 'Installer');
        setUserName(user.name || "");
      } catch {
        setIsLoggedIn(false);
        setUserName("");
      }
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setUserName("");
  };

  const navLinks = [
    { to: "/installer/dashboard", label: "Dashboard" },
    { to: "/installer/orders", label: "Orders" },
    { to: "/installer/installations", label: "Installations" },
    { to: "/installer/contact", label: "Contact" },
  ];
    return (
    <div className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#0a0a1a]/95 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,255,255,0.15)]'
      : 'bg-[#0a0a1a] shadow-[0_4px_12px_rgba(0,255,255,0.1)]'
    }`}>
      <nav className="px-4 py-3">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link
              to="/installer/dashboard"
              className="text-3xl md:text-4xl font-bold text-[#00ffff] font-['Roboto_Condensed'] tracking-wider hover:text-[#00cccc] transition-all duration-300 transform hover:scale-105 drop-shadow-[0_0_12px_rgba(0,255,255,0.5)]"
            >
              Installer Portal
            </Link>
            <div className="flex items-center space-x-4 md:space-x-8 lg:space-x-10">
              {isLoggedIn && (
                <div className="text-[#00ffff] font-['Poppins'] bg-[#262626]/80 backdrop-blur-sm px-3 py-1.5 md:px-5 md:py-2 rounded-full border border-[#00ffff]/20">
                  Welcome, {userName}
                </div>
              )}
              <div className="flex items-center space-x-3 md:space-x-6 lg:space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-[#ccfaff] hover:text-[#00ffff] transition-all duration-200 font-['Poppins'] hover:scale-105 text-sm md:text-base"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 md:px-5 md:py-2.5 bg-[#00ffff] text-[#0a0a1a] rounded-full font-semibold hover:bg-[#00cccc] transition-all duration-300 font-['Poppins'] shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transform hover:scale-105 text-xs md:text-sm"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="px-3 py-1.5 md:px-5 md:py-2.5 bg-[#00ffff] text-[#0a0a1a] rounded-full font-semibold hover:bg-[#00cccc] transition-all duration-300 font-['Poppins'] shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transform hover:scale-105 text-xs md:text-sm"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default InstallerNavbar;
