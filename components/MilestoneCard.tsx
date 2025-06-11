// components/MilestoneCard.tsx
import React from 'react';
import Image from 'next/image'; // For optimized images

// Import specific icons (assuming they are in components/icons)
import { IntertwinedHeartsIcon, DiamondRingIcon } from './icons';

interface MilestoneCardProps {
  title: string;
  date: string; // Keep as string, formatting can be done if needed
  iconType: 'hearts' | 'ring'; // To select the correct icon
  photoUrl: string;
  align: 'left' | 'right'; // To alternate card alignment on the timeline
  // scrollTriggered (boolean or threshold) could be added for JS-driven animations
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({
  title,
  date,
  iconType,
  photoUrl,
  align,
}) => {
  const IconComponent = iconType === 'hearts' ? IntertwinedHeartsIcon : DiamondRingIcon;

  // Format date string if needed, e.g., from "YYYY-MM-DDTHH:mm:ss" to "Month DD, YYYY"
  // For now, displaying as is.
  const displayDate = new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const cardAlignmentClass = align === 'left' ? 'md:mr-auto md:ml-12' : 'md:ml-auto md:mr-12';
  // Animation class based on alignment for variety, or a generic one
  const animationClass = align === 'left' ? 'animate-slideInLeft' : 'animate-slideInRight';
  const iconAnimationClass = iconType === 'hearts' ? 'animate-pulseGlow' : ''; // Shimmer to be added for ring


  return (
    <div
      className={`my-16 p-6 bg-white/5 backdrop-blur-md shadow-xl rounded-lg w-full max-w-md mx-auto md:mx-0 ${cardAlignmentClass} ${animationClass} border border-rose-gold/30`}
    >
      <div className="flex items-center mb-4">
        <IconComponent className={`w-10 h-10 text-rose-gold mr-4 ${iconAnimationClass}`} />
        <div>
          <h3 className="font-script text-3xl text-rose-gold">{title}</h3>
          <p className="font-cormorant text-md text-champagne-gold">{displayDate}</p>
        </div>
      </div>

      <div className="relative w-full h-64 md:h-72 rounded-md overflow-hidden shadow-lg">
        <Image
          src={photoUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      {/* Optional: A short description could go here */}
    </div>
  );
};

export default MilestoneCard;
