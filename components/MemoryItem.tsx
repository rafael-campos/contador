// components/MemoryItem.tsx
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Memory } from '@/types/memory';

interface MemoryItemProps {
  memory: Memory;
  align: 'left' | 'right';
}

const MemoryItem: React.FC<MemoryItemProps> = ({ memory, align }) => {
  const { title, date, imageUrl, description } = memory;
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
      <div className="mb-4 text-center">
        <h3 className="font-serif text-2xl text-blue-800">{title}</h3>
        <p className="font-sans text-sm text-blue-600">
          {new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {imageUrl && (
        <div className="relative w-full h-56 md:h-64 rounded-md overflow-hidden shadow-lg mb-4">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className="rounded-md" />
        </div>
      )}

      <p className="text-blue-900/80 leading-relaxed text-center">{description}</p>
    </motion.div>
  );
};

export default MemoryItem;
