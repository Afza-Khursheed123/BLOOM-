import React from 'react';
import { Outlet } from 'react-router-dom';
import { AnnouncementBar } from './AnnouncementBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export const StorefrontLayout: React.FC = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F6] text-[#2C3E35]">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};
