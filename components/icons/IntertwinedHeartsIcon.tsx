// components/icons/IntertwinedHeartsIcon.tsx
import React from 'react';

interface IconProps {
  className?: string; // To pass Tailwind classes like fill color, size
  size?: number | string;
}

const IntertwinedHeartsIcon: React.FC<IconProps> = ({ className, size = 24 }) => {
  // Simplified SVG path for two intertwined hearts
  // This is a conceptual representation. A more polished SVG might be needed.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 90" // Adjusted viewBox for better aspect ratio
      width={size}
      height={size}
      className={className} // Apply passed classes
    >
      {/* Heart 1 */}
      <path
        d="M40 20 C20 0 0 20 0 40 C0 60 20 80 40 90"
        transform="translate(10,0)" // Move right heart a bit
        className="fill-rose-gold" // Default fill, can be overridden by className
      />
      {/* Heart 2 - slightly offset and overlapping */}
      <path
        d="M40 20 C20 0 0 20 0 40 C0 60 20 80 40 90"
        transform="translate(30,0) rotate(15 40 40)" // Move and rotate second heart
        className="fill-rose-gold" // Default fill
      />
    </svg>
  );
};

export default IntertwinedHeartsIcon;
