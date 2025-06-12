// components/icons/IntertwinedHeartsIcon.tsx
import React from 'react';

interface IconProps {
  className?: string;
}

const IntertwinedHeartsIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    xmlns="http://www.w3.org/2000/svg" >
    <path
      d="M13.784 14.237L12.5 15.521L11.216 14.237C9.373 12.394 9.373 9.356 11.216 7.513C13.058 5.671 16.096 5.671 17.938 7.513C19.78 9.356 19.78 12.394 17.938 14.237"
      strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M10.216 9.763L11.5 8.479L12.784 9.763C14.627 11.606 14.627 14.644 12.784 16.487C10.942 18.329 7.904 18.329 6.062 16.487C4.22 14.644 4.22 11.606 6.062 9.763"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default IntertwinedHeartsIcon;
