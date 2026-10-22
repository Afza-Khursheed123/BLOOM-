import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Layers, ArrowUpDown } from 'lucide-react';

export const AdminSubNav: React.FC = () => {
  const navTabs = [
    { label: 'Overview', to: '/admin', end: true, icon: BarChart3 },
    { label: 'Live Inventory & Control', to: '/admin/inventory', end: false, icon: ArrowUpDown },
    { label: 'Batch Details', to: '/admin/batches/BCH-2026-Rose03', end: false, icon: Layers },
  ];

  return (
    <div className="bg-[#182E25] border-b border-[#13251E] sticky top-16 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.to}
                to={tab.to}
                end={tab.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-[#3A7D6A] text-white font-semibold bg-white/10'
                      : 'border-transparent text-white/70 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
