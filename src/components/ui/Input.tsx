import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  icon,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-[#2C3E35] tracking-wide">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[#2C3E35] placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3A7D6A]/30 focus:border-[#3A7D6A] disabled:bg-gray-50 disabled:text-gray-400 ${
            icon ? 'pl-10' : ''
          } ${
            error ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/30' : 'border-gray-200'
          } ${className}`}
          {...props}
        />
      </div>
      {error ? (
        <p className="text-xs text-[#EF4444] mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
