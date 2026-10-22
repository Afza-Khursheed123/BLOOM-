import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, LogOut, ExternalLink, Leaf } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAdminInventory } from '../../context/AdminInventoryContext';

export const AdminHeader: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { actionQueue } = useAdminInventory();
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path.includes('/batches')) return 'Batch Details';
    if (path.includes('/inventory')) return 'Inventory Control';
    return 'Executive Overview';
  };

  const pendingAlerts = actionQueue.filter((a) => a.status === 'Pending');

  return (
    <header className="bg-[#1E3A2F] text-white border-b border-[#162C23] sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Logo & Section */}
          <div className="flex items-center gap-5">
            <Link to="/admin" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-[#E8EDEA] text-[#1E3A2F] flex items-center justify-center font-bold transition-transform group-hover:scale-105">
                <Leaf className="w-4 h-4 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-wider leading-none text-white">
                  BLOOM
                </span>
                <span className="text-[10px] tracking-widest text-[#E8EDEA]/70 font-medium uppercase mt-0.5">
                  NURSERY INTEL
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-block h-4 w-px bg-white/20" />
            <span className="hidden sm:inline-block text-xs text-[#E8EDEA]/80 font-medium">
              {getBreadcrumb()}
            </span>
          </div>

          {/* Center: Clean Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search batches or flower varieties..."
                className="w-full bg-[#152A22]/80 border border-white/10 text-xs text-white rounded-lg pl-9 pr-4 py-2 placeholder:text-white/40 focus:outline-none focus:border-[#5B9A82] focus:ring-1 focus:ring-[#5B9A82] transition-colors"
              />
            </div>
          </div>

          {/* Right: Actions, Storefront Link, User */}
          <div className="flex items-center gap-3">
            {/* Link to Main Storefront */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/90 bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
              title="Return to Customer Storefront"
            >
              <span>View Store</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {pendingAlerts.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4 text-[#2C3E35] text-xs space-y-2 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100 font-semibold text-[#1E3A2F]">
                    <span>Nursery Alerts</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      {pendingAlerts.length} pending
                    </span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {pendingAlerts.slice(0, 3).map((alert) => (
                      <div key={alert.id} className="p-2 rounded bg-gray-50 border border-gray-100">
                        <p className="font-medium text-[#1E3A2F]">{alert.title}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">{alert.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Badge */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10 text-xs text-white/90">
              <div className="w-6 h-6 rounded-full bg-[#3A7D6A] text-white flex items-center justify-center font-serif text-[11px] font-semibold">
                {currentUser?.name?.charAt(0) || 'A'}
              </div>
              <span className="font-medium text-white/90">{currentUser?.name || 'Avis Lee'}</span>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
