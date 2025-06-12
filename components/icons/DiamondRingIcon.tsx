// components/icons/DiamondRingIcon.tsx
import React from 'react';

interface IconProps {
  className?: string;
}

const DiamondRingIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    xmlns="http://www.w3.org/2000/svg" >
    <path
      d="M12 21.5C12 21.5 8.90909 18.25 4.5 16C0.0909091 13.75 2.18182 8.25 6.68182 6C11.1818 3.75 16.8182 3.75 21.3182 6C25.8182 8.25 27.9091 13.75 23.5 16C19.0909 18.25 16 21.5 16 21.5"
      strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 21.5L16 16L12 6L8 16L12 21.5Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default DiamondRingIcon;
