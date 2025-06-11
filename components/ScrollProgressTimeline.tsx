// components/ScrollProgressTimeline.tsx
import React, { useState, useEffect } from 'react';

interface Milestone {
  id: string;
  label: string;
  progressThreshold: number; // e.g., 0.25 for 25% scroll
  topPosition: string; // e.g., '25%' for positioning along the bar
}

const milestones: Milestone[] = [
  { id: 'm1', label: 'O Início de Tudo', progressThreshold: 0.25, topPosition: '25%' },
  { id: 'm2', label: 'O Dia do "Sim"', progressThreshold: 0.70, topPosition: '70%' }, // Adjusted threshold
];

const ScrollProgressTimeline: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const scrollFraction = currentScroll / totalHeight;
      setProgress(Math.min(scrollFraction, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-2 md:left-4 w-1 h-full bg-[var(--background-light)] z-20" // Adjusted left padding for smaller screens
    >
      <div
        className="w-full bg-[var(--primary-accent)]"
        style={{
          height: `${progress * 100}%`,
          transition: 'height 0.1s ease-out',
        }}
      />

      {/* Milestone Markers and Text */}
      <div className="absolute top-0 left-0 w-full h-full"> {/* Container for milestone markers */}
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="absolute left-0 w-full" // Span full width of the bar container for positioning
            style={{ top: milestone.topPosition }}
          >
            {/* Small dot/marker on the bar itself */}
            <div
              className={`absolute left-[-3px] w-2.5 h-2.5 rounded-full transition-all duration-500 ease-in-out
                          ${progress >= milestone.progressThreshold ? 'bg-[var(--primary-accent)] scale-100' : 'bg-gray-500 scale-75'}`}
            />
            {/* Text label next to the bar */}
            <span
              className={`absolute left-4 ml-2 whitespace-nowrap font-cormorant text-xs md:text-sm transition-opacity duration-500 ease-in-out
                          ${progress >= milestone.progressThreshold ? 'opacity-100 text-[var(--text-primary)]' : 'opacity-0 text-transparent'}`}
              style={{ transform: 'translateY(-50%)' }} // Vertically center text with the marker
            >
              {milestone.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollProgressTimeline;
