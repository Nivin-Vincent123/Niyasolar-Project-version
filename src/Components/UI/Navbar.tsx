import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setIsLoggedIn(user.isLoggedIn);
      setUserName(user.name);
      setUserRole(user.role || null);
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

  // Role-based nav links
  let navLinks: any[] = [];
  if (!userRole || userRole === "Buyer") {
    navLinks = [
      { to: "/", label: "Home" },
      { to: "/products", label: "Products" },
      { to: "/cart", label: "Cart" },
      { to: "/support", label: "Support & Help" },
    ];
  } else if (userRole === 'Installer') {
    navLinks = [
      { to: "/installer/dashboard", label: "Dashboard" },
      { to: "/installer/orders", label: "Orders" },
      { to: "/installer/installations", label: "Installations" },
      { to: "/contact", label: "Contact" }
    ];
  } else if (userRole === 'Admin') {
    navLinks = [
      { to: "/admin/dashboard", label: "Dashboard" },
      { to: "/admin/manage-products", label: "Manage Products" },
      { to: "/admin/add-product", label: "Upload Product" }
    ];
  }
  if (userRole === 'Installer') {
    navLinks = [
      { to: "/installer/dashboard", label: "Dashboard" },
      { to: "/installer/orders", label: "Orders" },
      { to: "/installer/installations", label: "Installations" },
      { to: "/contact", label: "Contact" }
    ];
  } else if (userRole === 'Admin') {
    navLinks = [
      { to: "/admin/dashboard", label: "Dashboard" },
      { to: "/admin/manage-products", label: "Manage Products" },
      { to: "/admin/add-product", label: "Upload Product" }
    ];
  }

  // Hamburger menu state
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#1a1a1a]/95 backdrop-blur-sm shadow-[0_4px_20px_rgba(255,215,0,0.15)]'
      : 'bg-[#1a1a1a] shadow-[0_4px_12px_rgba(255,215,0,0.1)]'
    }`} style={{height: '64px', minHeight: '64px'}}>
      <nav className="px-4 py-3">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-lg md:text-2xl lg:text-3xl font-semibold text-[#ffc107] font-['Roboto_Condensed'] tracking-wide hover:text-[#e0ac00] transition-all duration-300 transform hover:scale-105 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]"
            >
              Niya Solar Online Store
            </Link>
            {/* Hamburger button for mobile */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-[#ffc107] mb-1 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-[#ffc107] mb-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-[#ffc107] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
            {/* Nav links */}
            <div className="hidden md:flex items-center space-x-4 md:space-x-8 lg:space-x-10">
              {isLoggedIn && (
                <div className="text-[#ffca28] font-['Poppins'] bg-[#262626]/80 backdrop-blur-sm px-3 py-1.5 md:px-5 md:py-2 rounded-full border border-[#ffca28]/20">
                  Welcome, {userName} {userRole && (<span className="ml-2 text-xs text-[#00ffff]">({userRole})</span>)}
                </div>
              )}
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-gray-300 hover:text-[#ffca28] transition-all duration-200 font-['Poppins'] hover:scale-105 text-sm md:text-base px-3 py-2 rounded ${isActive ? 'bg-[#ffc107]/20 text-[#ffc107] font-bold' : ''}`
                  }
                  end={link.to === "/"}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            {/* Mobile menu */}
            <div
              className={`md:hidden absolute top-full left-0 w-full bg-[#1a1a1a] shadow-lg transition-all duration-300 z-40 ${menuOpen ? 'block' : 'hidden'}`}
            >
              <div className="flex flex-col items-center py-4 space-y-3">
                {isLoggedIn && (
                  <div className="text-[#ffca28] font-['Poppins'] bg-[#262626]/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#ffca28]/20 mb-2">
                    Welcome, {userName} {userRole && (<span className="ml-2 text-xs text-[#00ffff]">({userRole})</span>)}
                  </div>
                )}
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `block w-full text-center text-gray-300 hover:text-[#ffca28] transition-all duration-200 font-['Poppins'] hover:scale-105 text-base px-4 py-2 rounded ${isActive ? 'bg-[#ffc107]/20 text-[#ffc107] font-bold' : ''}`
                    }
                    end={link.to === "/"}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="flex justify-center w-full mt-2">
                  {isLoggedIn ? (
                    <button
                      onClick={() => { setMenuOpen(false); handleLogout(); }}
                      className="w-full px-4 py-2 bg-[#ffca28] text-[#1a1a1a] rounded-full font-semibold hover:bg-[#e0ac00] transition-all duration-300 font-['Poppins'] shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transform hover:scale-105 text-base"
                    >
                      Logout
                    </button>
                  ) : (
                    <NavLink
                      to="/login"
                      className="w-full px-4 py-2 bg-[#ffca28] text-[#1a1a1a] rounded-full font-semibold hover:bg-[#e0ac00] transition-all duration-300 font-['Poppins'] shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transform hover:scale-105 text-base"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
            {/* Desktop login/logout */}
            <div className="hidden md:flex items-center space-x-3 md:space-x-4 lg:space-x-6">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 md:px-5 md:py-2.5 bg-[#ffca28] text-[#1a1a1a] rounded-full font-semibold hover:bg-[#e0ac00] transition-all duration-300 font-['Poppins'] shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transform hover:scale-105 text-xs md:text-sm"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="px-3 py-1.5 md:px-5 md:py-2.5 bg-[#ffca28] text-[#1a1a1a] rounded-full font-semibold hover:bg-[#e0ac00] transition-all duration-300 font-['Poppins'] shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transform hover:scale-105 text-xs md:text-sm"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;