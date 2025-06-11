// components/icons/DiamondRingIcon.tsx
import React from 'react';

interface IconProps {
  className?: string; // To pass Tailwind classes like fill color, size
  size?: number | string;
}

const DiamondRingIcon: React.FC<IconProps> = ({ className, size = 24 }) => {
  // Simplified SVG for a solitaire diamond ring (top view)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
    >
      {/* Ring band */}
      <circle
        cx="50"
        cy="50"
        r="40"
        strokeWidth="10"
        stroke="#B08D57" /* A slightly different gold for the band */
        fill="none"
        className="stroke-rose-gold" // Default stroke, can be overridden by className
      />
      {/* Diamond - a simple polygon */}
      <polygon
        points="50,15 65,30 50,45 35,30"
        className="fill-champagne-gold" // Default fill for diamond
      />
    </svg>
  );
};

export default DiamondRingIcon;
