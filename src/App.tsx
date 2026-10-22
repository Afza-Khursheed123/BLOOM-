import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminInventoryProvider } from './context/AdminInventoryContext';
import { CartProvider } from './context/CartContext';

// Storefront
import { StorefrontLayout } from './components/layout/StorefrontLayout';
import { HomePage } from './pages/storefront/HomePage';
import { ShopPage } from './pages/storefront/ShopPage';
import { ProductDetailPage } from './pages/storefront/ProductDetailPage';
import { AboutPage } from './pages/storefront/AboutPage';
import { ContactPage } from './pages/storefront/ContactPage';
import { NotFoundPage } from './pages/storefront/NotFoundPage';

// Admin
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminBatchDetailPage } from './pages/admin/AdminBatchDetailPage';
import { AdminInventoryPage } from './pages/admin/AdminInventoryPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AdminInventoryProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Storefront Layout Routes */}
              <Route element={<StorefrontLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/404" element={<NotFoundPage />} />
              </Route>

              {/* Admin Sign-in Page */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Protected Admin Suite Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminOverviewPage />} />
                <Route path="overview" element={<AdminOverviewPage />} />
                <Route path="inventory" element={<AdminInventoryPage />} />
                <Route path="batches" element={<AdminInventoryPage />} />
                <Route path="batches/:batchId" element={<AdminBatchDetailPage />} />
                <Route path="map" element={<AdminOverviewPage />} />
                <Route path="inspections" element={<AdminOverviewPage />} />
                <Route path="reports" element={<AdminOverviewPage />} />
              </Route>

              {/* Fallback to 404 */}
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AdminInventoryProvider>
    </AuthProvider>
  );
};

export default App;
