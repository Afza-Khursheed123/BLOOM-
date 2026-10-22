import React from 'react';

export interface SectionHeaderProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  kicker,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignmentStyles = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={`max-w-2xl mb-12 ${alignmentStyles[align]} ${className}`}>
      {kicker && (
        <p className="text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase text-[#3A7D6A] mb-2.5">
          {kicker}
        </p>
      )}
      <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-[#1E3A2F] leading-tight mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
