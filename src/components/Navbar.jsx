import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logOut } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import EternoLogo from '/assets/logo_1.webp';
import CartIcon from './CartIcon';

export default function Navbar() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const navigate = useNavigate();

  // Function to refresh the page
  const refreshPage = () => {
    navigate(window.location.pathname);
    window.location.reload();
  };

  const handleLogout = async () => {
    await logOut();
    refreshPage();
  };

  // Handle navigation and close mobile menu
  const handleNavigation = (e) => {
    setIsMobileMenuOpen(false);
    setIsMobileCategoriesOpen(false);
    // If it's a link, let it handle the navigation
    if (e.target.tagName === 'A') {
      return; // Let the Link component handle the navigation
    }
    // If it's a button, prevent default and use the URL from data-href
    if (e.target.tagName === 'BUTTON' && e.target.dataset.href) {
      e.preventDefault();
      navigate(e.target.dataset.href);
    }
  };

  return (
    <>
    {/* Mobile Navigation */}
    <nav className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 shadow-lg z-50">
      <div className="container mx-auto px-3 py-3 flex justify-between items-center">
        <button 
          className="p-3 -ml-2 text-white active:scale-95 transition-transform"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link to="/" className="flex items-center">
          <img src={EternoLogo} alt="Eterno fit forever" className="h-8 w-auto" />
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="text-white relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">0</span>
          </Link>
          
          {user ? (
            <Link to="/dashboard" className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          ) : (
            <Link to="/login" className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </nav>

    {/* Desktop Navigation */}
    <nav className="hidden md:flex bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 shadow-lg px-4 sm:px-6 py-2 items-center fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center" aria-label="Eterno fit forever Home">
          <img src={EternoLogo} alt="Eterno fit forever" className="h-10 w-auto" />
        </Link>
      </div>

      <ul className="flex gap-4 lg:gap-6 text-button text-white flex-1 justify-center">
        <li><Link to="/decode" className="text-white hover:text-yellow-300 transition text-button" onClick={handleNavigation}>Decode Diabetes</Link></li>
        <li><Link to="/balance" className="text-white hover:text-yellow-300 transition text-button" onClick={handleNavigation}>Balance Weight</Link></li>
        <li><Link to="/store" className="text-white hover:text-yellow-300 transition text-button" onClick={handleNavigation}>Longevity Kits</Link></li>
        <li className="relative group">
          <button className="flex items-center gap-1 hover:text-yellow-300 transition text-button focus:outline-none text-white">
            Company
            <svg className="w-4 h-4 ml-1 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="absolute left-0 mt-1 w-48 bg-white rounded-xl shadow-2xl border border-green-100 opacity-0 invisible group-hover:visible group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transform scale-95 group-hover:scale-100 transition-all duration-200 z-50">
            <div className="py-2">
              <Link to="/research" className="block px-5 py-2 rounded-lg text-gray-800 hover:bg-health-light hover:text-health-primary transition text-button" onClick={handleNavigation}>Research</Link>
              <Link to="/blog" className="block px-5 py-2 rounded-lg text-gray-800 hover:bg-health-light hover:text-health-primary transition text-button" onClick={handleNavigation}>Blog</Link>
              <Link to="/about" className="block px-5 py-2 rounded-lg text-gray-800 hover:bg-health-light hover:text-health-primary transition text-button" onClick={handleNavigation}>About Us</Link>
              <Link to="/community" className="block px-5 py-2 rounded-lg text-gray-800 hover:bg-health-light hover:text-health-primary transition text-button" onClick={handleNavigation}>Community</Link>
              <Link to="/partner" className="block px-5 py-2 rounded-lg text-gray-800 hover:bg-health-light hover:text-health-primary transition text-button" onClick={handleNavigation}>Partner With Us</Link>
            </div>
          </div>
        </li>
        <li><Link to="/contact" className="text-white hover:text-yellow-300 transition text-button" onClick={handleNavigation}>Contact us</Link></li>
      </ul>

      <div className="flex items-center gap-2 lg:gap-4">
        <Link to="/cart" className="text-white relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">0</span>
        </Link>

        {user ? (
          <div className="flex items-center gap-2">
            <span className="hidden lg:flex px-4 py-2 rounded-full bg-white/20 text-white text-button shadow border border-white/30 text-small backdrop-blur-sm">
              <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {user?.displayName || user?.email || 'User'}
            </span>
            <Link to="/dashboard" className="px-3 py-2 rounded-full bg-white/20 text-white text-button shadow border border-white/30 hover:bg-white/30 transition text-small backdrop-blur-sm">Dashboard</Link>
            <button onClick={handleLogout} className="px-3 py-2 rounded-full bg-white/20 text-white text-button shadow border border-white/30 hover:bg-white/30 transition text-small backdrop-blur-sm">Logout</button>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-health-primary text-button shadow-lg hover:shadow-xl hover:bg-health-light hover:-translate-y-0.5 transition-all duration-200 border border-health-primary text-small"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="hidden lg:inline">Login</span>
            <span className="lg:hidden">Login</span>
          </Link>
        )}
      </div>
    </nav>


    {/* Mobile Menu - Sidebar */}
    <div 
      className={`md:hidden fixed inset-0 z-40 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
      onClick={handleNavigation}
    >
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-72 sm:w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)} aria-label="Eterno fit forever Home">
            <img 
              src={EternoLogo} 
              alt="Eterno fit forever" 
              className="h-6 w-auto" 
            />
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Menu Content */}
        <div className="h-[calc(100%-60px)] overflow-y-auto p-4">
          <div className="space-y-1">
            {/* Main Navigation Items - Same as Desktop */}
            <Link 
              to="/decode" 
              className="flex items-center px-3 py-3 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors text-button"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Decode Diabetes
            </Link>
            <Link 
              to="/balance" 
              className="flex items-center px-3 py-3 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors text-button"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Balance Weight
            </Link>
            <Link 
              to="/store" 
              className="flex items-center px-3 py-3 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors text-button"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Longevity Kits
            </Link>
            
            {/* Company Dropdown - Same as Desktop */}
            <div className="mb-2">
              <button 
                onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-button text-gray-900">Company</span>
                <svg 
                  className={`w-5 h-5 text-gray-400 transition-transform ${isMobileCategoriesOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-200 ${isMobileCategoriesOpen ? 'max-h-48' : 'max-h-0'}`}>
                <div className="pl-4 py-2 space-y-1">
                  <Link 
                    to="/research" 
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors text-body"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Research
                  </Link>
                  <Link 
                    to="/blog" 
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors text-body"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link 
                    to="/about" 
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors text-body"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link 
                    to="/community" 
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors text-body"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Community
                  </Link>
                  <Link 
                    to="/partner" 
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors text-body"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Partner With Us
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Contact Us - Same as Desktop */}
            <Link 
              to="/contact" 
              className="flex items-center px-3 py-3 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors text-button"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact us
            </Link>
            
            {/* User Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center px-3 py-2 rounded-lg text-gray-900 bg-gray-50">
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-small">{user?.displayName || user?.email || 'User'}</span>
                  </div>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center px-3 py-3 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors text-button"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="flex items-center px-3 py-3 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors text-button w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="flex items-center justify-center px-4 py-3 rounded-lg bg-white text-health-primary text-button shadow-lg hover:shadow-xl hover:bg-health-light transition-all duration-200 border border-health-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
