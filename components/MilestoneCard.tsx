// components/MilestoneCard.tsx
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import DiamondRingIcon from './icons/DiamondRingIcon';
import IntertwinedHeartsIcon from './icons/IntertwinedHeartsIcon';

export type IconType = 'hearts' | 'ring';

export interface Milestone {
  title: string;
  date: string;
  icon: IconType;
  photoUrl: string;
  description: string;
  align: 'left' | 'right';
}

const icons = {
  hearts: IntertwinedHeartsIcon,
  ring: DiamondRingIcon,
};

const MilestoneCard: React.FC<Milestone> = ({ title, date, icon, photoUrl, description, align }) => {
  const IconComponent = icons[icon];
  const cardAlignment = align === 'left' ? 'md:mr-auto md:ml-16' : 'md:ml-auto md:mr-16';

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className={`my-8 p-6 bg-white/70 backdrop-blur-md shadow-xl rounded-lg w-full max-w-md mx-auto md:mx-0 ${cardAlignment} border border-blue-200/50`}
      variants={cardVariants}
    >
      <div className="flex items-center mb-4">
        <IconComponent className="w-10 h-10 text-blue-500 mr-4" />
        <div>
          <h3 className="font-serif text-2xl text-blue-800">{title}</h3>
          <p className="font-sans text-sm text-blue-600">
            {new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="relative w-full h-56 md:h-64 rounded-md overflow-hidden shadow-lg mb-4">
        <Image src={photoUrl} alt={title} layout="fill" objectFit="cover" className="rounded-md" />
      </div>

      <p className="text-blue-900/80 leading-relaxed text-center">{description}</p>
    </motion.div>
  );
};

export default MilestoneCard;
