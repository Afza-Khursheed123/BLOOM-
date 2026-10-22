import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AdminHeader } from './AdminHeader';
import { AdminSubNav } from './AdminSubNav';
import { CountReconciliationDrawer } from './CountReconciliationDrawer';
import { useAuth } from '../../context/AuthContext';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export const AdminLayout: React.FC = () => {
  useScrollToTop();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-[#F9F9F6] text-[#2C3E35] flex flex-col font-sans antialiased">
      <AdminHeader />
      <AdminSubNav />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <CountReconciliationDrawer />
    </div>
  );
};
