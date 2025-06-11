// components/CountersFinale.tsx
import React from 'react';
import AnimatedTimeCounter from './AnimatedTimeCounter';
import { IntertwinedHeartsIcon, DiamondRingIcon } from './icons'; // Assuming icons are in components/icons

interface CountersFinaleProps {
  datingStartDate: string;
  weddingStartDate: string;
  yourName: string; // For the final message
}

const CountersFinale: React.FC<CountersFinaleProps> = ({
  datingStartDate,
  weddingStartDate,
  yourName,
}) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#4C1A2B] to-[#3D2C42] text-creamy-off-white text-center"> {/* Slightly different gradient or brighter feel */}
      <div className="container mx-auto px-4">
        <h2 className="font-script text-4xl md:text-5xl text-champagne-gold mb-12">
          E a nossa história continua a ser escrita, a cada segundo...
        </h2>

        <div className="flex flex-col md:flex-row justify-around items-center md:items-start gap-12 md:gap-8">
          {/* Dating Counter */}
          <div className="flex flex-col items-center p-6 rounded-lg shadow-xl bg-white/10 backdrop-blur-md border border-rose-gold/50 w-full md:w-2/5">
            <IntertwinedHeartsIcon className="w-20 h-20 md:w-28 md:h-28 text-rose-gold mb-6 animate-pulseGlow" />
            <h3 className="font-script text-3xl text-rose-gold mb-4">Tempo de Namoro</h3>
            <AnimatedTimeCounter startDateTime={datingStartDate} />
          </div>

          {/* Wedding Counter */}
          <div className="flex flex-col items-center p-6 rounded-lg shadow-xl bg-white/10 backdrop-blur-md border border-rose-gold/50 w-full md:w-2/5">
            {/* Apply shimmer animation class here once created */}
            <DiamondRingIcon className="w-20 h-20 md:w-28 md:h-28 text-rose-gold mb-6 animate-shimmer" />
            <h3 className="font-script text-3xl text-rose-gold mb-4">Tempo de Casamento</h3>
            <AnimatedTimeCounter startDateTime={weddingStartDate} />
          </div>
        </div>

        <p className="font-great-vibes text-3xl md:text-4xl text-champagne-gold mt-20 md:mt-24">
          Eu te amo, hoje e sempre.
        </p>
        <p className="font-script text-2xl md:text-3xl text-rose-gold mt-2">
          {yourName}
        </p>
      </div>
    </section>
  );
};

export default CountersFinale;
