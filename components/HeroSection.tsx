// components/HeroSection.tsx
import React from 'react';
// Assuming a generic scroll down icon for now, or we can create a simple SVG one.
// For simplicity, using a text arrow. A proper SVG icon would be better.
const ScrollDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 animate-bounce text-rose-gold">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
  </svg>
);

interface HeroSectionProps {
  mainPhotoUrl: string; // URL for the background photo
  wifeName: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ mainPhotoUrl, wifeName }) => {
  return (
    <section
      className="h-screen flex flex-col items-center justify-center relative text-center p-4 text-creamy-off-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${mainPhotoUrl})`, // Dark overlay for text readability
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Fade-in animation container for text elements */}
      <div className="animate-fadeInUp"> {/* Simple CSS animation */}
        <h1 className="font-great-vibes text-6xl md:text-8xl text-champagne-gold mb-4">
          Para a minha amada {wifeName}
        </h1>
        <p className="font-lora text-xl md:text-2xl mb-12">
          Nossa jornada começou aqui...
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-fadeInUp animation-delay-500"> {/* Delayed fade in */}
        <p className="font-cormorant text-lg mb-2">Role para reviver nossa história</p>
        <ScrollDownIcon />
      </div>
    </section>
  );
};

export default HeroSection;
