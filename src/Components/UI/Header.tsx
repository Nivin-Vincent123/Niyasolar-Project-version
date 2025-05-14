import React from 'react';
import Navbar from './Navbar';
import InstallerNavbar from './InstallerNavbar';
import AdminNavbar from './AdminNavbar';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  useLocation(); // trigger re-render on route changes
  let userRole = null;
  if (typeof window !== 'undefined') {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      try {
        userRole = JSON.parse(currentUser).role;
      } catch {}
    }
  }

  return (
    <header>
      {userRole === 'Admin' ? (
        <AdminNavbar />
      ) : userRole === 'Installer' ? (
        <InstallerNavbar />
      ) : (
        <Navbar />
      )}
    </header>
  );
};

export default Header;