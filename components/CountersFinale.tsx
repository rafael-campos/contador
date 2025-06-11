// components/CountersFinale.tsx
import React from 'react';
import dynamic from 'next/dynamic';

const AnimatedTimeCounter = dynamic(() => import('./AnimatedTimeCounter'), {
  ssr: false,
  loading: () => <div className="h-24" /> // Placeholder para evitar que o layout pule
});

interface CountersFinaleProps {
  datingStartDate: string;
  weddingStartDate: string;
  yourName: string;
}

const CountersFinale: React.FC<CountersFinaleProps> = ({
  datingStartDate,
  weddingStartDate,
  yourName,
}) => {
  // Função para formatar a data no estilo brasileiro
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="title-large animate-fade">
          Nossa História de Amor
        </h2>
        
        {/* Datas centralizadas */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16 text-center">
          <div className="animate-fade delay-1">
            <h3 className="title-medium mb-2">Início do Namoro</h3>
            <span className="date-display">{formatDate(datingStartDate)}</span>
          </div>
          <div className="hidden md:block">
            <span className="text-5xl text-blue-500">♥</span>
          </div>
          <div className="animate-fade delay-2">
            <h3 className="title-medium mb-2">Início do Casamento</h3>
            <span className="date-display">{formatDate(weddingStartDate)}</span>
          </div>
        </div>
        
        {/* Contadores */}
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-20">
          <div className="counter-card w-full md:w-5/12 animate-fade delay-1">
            <AnimatedTimeCounter 
              startDateTime={datingStartDate} 
              title="Tempo de Namoro"
            />
          </div>
          <div className="counter-card w-full md:w-5/12 animate-fade delay-2">
            <AnimatedTimeCounter 
              startDateTime={weddingStartDate} 
              title="Tempo de Casamento"
            />
          </div>
        </div>
        
        {/* Mensagem de amor */}
        <div className="text-center mb-20 animate-fade delay-3">
          <p className="script-font text-4xl text-blue-600 mb-2">
            Eu te amo, hoje e sempre.
          </p>
          <p className="text-2xl text-blue-500">
            {yourName}
          </p>
        </div>
      </div>
      
      {/* Seta de rolagem fixa na parte inferior */}
      <div className="scroll-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default CountersFinale;
