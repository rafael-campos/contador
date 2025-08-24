// components/MilestoneCard.tsx
import React from 'react';

export interface Milestone {
  title: string;
  date: string;
  icon: string;
  photoUrl: string;
  description: string;
  align: 'left' | 'right';
}

const MilestoneCard: React.FC<Milestone> = ({ title, date, photoUrl, description }) => {

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-blue-200/30 hover:bg-white/20 transition-all duration-300">
      <div className="mb-4">
        <img 
          src={photoUrl} 
          alt={title} 
          className="w-full h-16 object-cover rounded-lg mb-4"
          loading="lazy"
        />
        
        <div className="mb-3">
          <h3 className="font-serif text-xl text-blue-100">{title}</h3>
        </div>
        
        <p className="text-blue-300 text-sm mb-3">
          {new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </p>
        
        <p className="text-blue-200/80 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default MilestoneCard;
