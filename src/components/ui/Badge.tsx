import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'bestseller' | 'new' | 'rare' | 'healthy' | 'attention' | 'critical' | 'neutral' | 'sage';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-medium tracking-wider uppercase',
    md: 'text-xs px-2.5 py-1 font-medium',
  };

  const variantStyles = {
    bestseller: 'bg-[#C86D51] text-white',
    new: 'bg-[#1E3A2F] text-white',
    rare: 'bg-[#3A7D6A] text-white',
    healthy: 'bg-[#ECFDF5] text-[#059669] border border-[#10B981]/30',
    attention: 'bg-[#FFFBEB] text-[#D97706] border border-[#F59E0B]/30',
    critical: 'bg-[#FEF2F2] text-[#DC2626] border border-[#EF4444]/30',
    neutral: 'bg-gray-100 text-gray-700 border border-gray-200',
    sage: 'bg-[#E8EDEA] text-[#1E3A2F]',
  };

  return (
    <span className={`inline-flex items-center justify-center rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
