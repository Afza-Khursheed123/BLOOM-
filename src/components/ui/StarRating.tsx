import React from 'react';
import { Star } from 'lucide-react';

export interface StarRatingProps {
  rating: number; // e.g. 4.8
  reviewCount?: number;
  size?: 'sm' | 'md';
  showText?: boolean;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviewCount,
  size = 'md',
  showText = true,
  className = '',
}) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center text-[#D97706]">
        {[...Array(5)].map((_, i) => {
          const isFilled = i < fullStars || (i === fullStars && hasHalfStar);
          return (
            <Star
              key={i}
              className={`${iconSize} ${
                isFilled ? 'fill-[#D97706] text-[#D97706]' : 'text-gray-300'
              }`}
            />
          );
        })}
      </div>
      {showText && (
        <span className="text-xs font-medium text-gray-600">
          {rating.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="text-gray-400 ml-1">({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
};
