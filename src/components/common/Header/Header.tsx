import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import Navigation from './Navigation';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = cart?.totalItems || 0;
  const showSearchBar = location.pathname === '/' || location.pathname === '/products';

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const CartIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
    </svg>
  );

  const UserDropdown = () => (
    <div className="relative group">
      <button className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors duration-300 px-4 py-2 rounded-xl hover:bg-orange-50">
        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {user.firstName?.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium">{user.firstName}</span>
        <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <div className="p-4 border-b border-gray-100">
          <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <Link to="/dashboard" className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200" onClick={closeMobileMenu}>
          📊 Dashboard
        </Link>
        {user.role === 'ADMIN' && (
          <Link to="/admin" className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200" onClick={closeMobileMenu}>
            ⚙️ Admin Panel
          </Link>
        )}
        <button onClick={handleLogout} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-b-2xl transition-colors duration-200 border-t border-gray-100">
          🚪 Sign Out
        </button>
      </div>
    </div>
  );

  const MobileUserActions = () => (
    <div className="space-y-3">
      <Link to="/cart" className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-orange-50 rounded-xl transition-colors duration-200" onClick={closeMobileMenu}>
        <div className="relative">
          <CartIcon />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {cartItemCount}
            </span>
          )}
        </div>
        <span>Cart ({cartItemCount})</span>
      </Link>
      <Link to="/dashboard" className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-orange-50 rounded-xl transition-colors duration-200" onClick={closeMobileMenu}>
        <span>📊</span>
        <span>Dashboard</span>
      </Link>
      {user.role === 'ADMIN' && (
        <Link to="/admin" className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-orange-50 rounded-xl transition-colors duration-200" onClick={closeMobileMenu}>
          <span>⚙️</span>
          <span>Admin Panel</span>
        </Link>
      )}
      <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200 text-left">
        <span>🚪</span>
        <span>Sign Out</span>
      </button>
    </div>
  );

  const MobileGuestActions = () => (
    <div className="space-y-3">
      <Link to="/login" className="block w-full text-center p-3 text-gray-700 hover:bg-orange-50 rounded-xl transition-colors duration-200 font-semibold" onClick={closeMobileMenu}>
        Sign In
      </Link>
      <Link to="/signup" className="block w-full text-center p-3 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-xl font-semibold shadow-lg transition-colors duration-200" onClick={closeMobileMenu}>
        Sign Up
      </Link>
    </div>
  );

  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group" onClick={closeMobileMenu}>
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">ChiefTain</span>
          </Link>

          {/* Desktop Navigation & Search */}
          <div className="hidden lg:block">
            <Navigation />
          </div>
          {showSearchBar && <div className="hidden lg:block flex-1 max-w-lg mx-8"><SearchBar /></div>}

          {/* Desktop User Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/cart" className="relative p-3 text-gray-600 hover:text-orange-600 transition-all duration-300 hover:scale-110">
                  <CartIcon />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <UserDropdown />
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-700 hover:text-orange-600 font-semibold transition-colors duration-300 px-4 py-2 rounded-xl hover:bg-orange-50">
                  Sign In
                </Link>
                <Link to="/signup" className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-300">
            <MenuIcon />
          </button>
        </div>

        {/* Mobile Search Bar */}
        {showSearchBar && <div className="lg:hidden pb-4"><SearchBar /></div>}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-2xl">
            <div className="px-4 py-6 space-y-4">
              <div className="pb-4 border-b border-gray-200">
                <Navigation mobile onItemClick={closeMobileMenu} />
              </div>
              {user ? <MobileUserActions /> : <MobileGuestActions />}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;