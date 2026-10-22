import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { mockNavLinks } from '../../data/mockStorefrontData';

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-[#F9F9F6]/95 backdrop-blur-md border-b border-gray-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center transition-transform group-hover:scale-105">
              <svg className="w-5 h-5 text-[#E8EDEA]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22v-9" strokeLinecap="round" />
                <path d="M12 13c0-4.5-3.5-7-8-6 0 4.5 3.5 7 8 6Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 15c0-4 3-6 7-5 0 4-3 6-7 5Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-serif text-2xl tracking-wider font-semibold text-[#1E3A2F]">
              BLOOM
            </span>
          </Link>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {mockNavLinks.map((link) => {
              const linkPath = link.path.split('?')[0];
              const linkSearch = link.path.includes('?') ? link.path.split('?')[1] : '';

              let isActive = false;
              if (linkSearch) {
                isActive = location.pathname === linkPath && location.search.includes(linkSearch);
              } else if (linkPath === '/shop') {
                isActive = location.pathname === '/shop' && !location.search.includes('filter=new');
              } else {
                isActive = location.pathname === linkPath;
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#1E3A2F] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1E3A2F]'
                      : 'text-[#2C3E35]/80 hover:text-[#1E3A2F]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Admin Portal Gateway shortcut */}
            <Link
              to="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium bg-[#E8EDEA] text-[#1E3A2F] hover:bg-[#d8e0db] border border-[#1E3A2F]/10 transition-all hover:shadow-xs"
              title="Enter Nursery Intelligence Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#3A7D6A]" />
              <span>Nursery Intel</span>
            </Link>

            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => alert('Search catalog feature: Press / anywhere on catalog.')}
              className="p-2 text-[#2C3E35] hover:text-[#1E3A2F] rounded-full hover:bg-gray-200/50 transition-colors"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#1E3A2F] hover:bg-gray-200/50 rounded-full transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1E3A2F] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#2C3E35] hover:text-[#1E3A2F] rounded-md transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F9F9F6] border-b border-gray-200 px-6 py-5 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            {mockNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif font-medium text-[#1E3A2F] py-1 border-b border-gray-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-[#3A7D6A] pt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Nursery Intelligence Portal (Admin)
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
