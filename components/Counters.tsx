import React, { useState, useEffect } from 'react';
import { intervalToDuration, Duration } from 'date-fns';

interface CounterProps {
  title: string;
  targetDate: string;
  size?: 'large' | 'normal';
}

const Counter: React.FC<CounterProps> = ({ title, targetDate, size = 'normal' }) => {
  const [duration, setDuration] = useState<Duration | null>(null);

  useEffect(() => {
    const calculateDuration = () => {
      if (!targetDate) return;
      const durationObj = intervalToDuration({
        start: new Date(targetDate),
        end: new Date(),
      });
      setDuration(durationObj);
    };

    calculateDuration();
    const timer = setInterval(calculateDuration, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!duration) {
    return (
      <div className="w-full max-w-md mx-auto flex items-center justify-center h-48">
        <p>Carregando...</p>
      </div>
    );
  }

  const units = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];
  const labels: { [key: string]: string[] } = {
    years: ['Ano', 'Anos'],
    months: ['Mês', 'Meses'],
    days: ['Dia', 'Dias'],
    hours: ['Hora', 'Horas'],
    minutes: ['Minuto', 'Minutos'],
    seconds: ['Segundo', 'Segundos'],
  };
  
  const containerOpacity = size === 'large' ? '' : 'opacity-80';
  const numberSize = size === 'large' ? '!text-4xl md:!text-5xl' : '!text-3xl md:!text-4xl';
  const labelSize = size === 'large' ? 'text-sm md:text-base' : 'text-xs md:text-sm';

  return (
    <div className={`w-full max-w-md mx-auto animate-fade ${containerOpacity} p-4 md:p-6`}>
        <h3 className="title-medium mb-6 md:mb-8">{title}</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 justify-items-center">
            {units.map(unit => {
                const value = duration[unit as keyof Duration] || 0;
                const label = value === 1 ? labels[unit][0] : labels[unit][1];
                return (
                    <div key={unit} className="flex flex-col items-center w-full">
                        <span className={`counter-number ${numberSize}`}>{String(value).padStart(2, '0')}</span>
                        <span className={`counter-label mt-1 md:mt-2 ${labelSize}`}>{label}</span>
                    </div>
                );
            })}
        </div>
    </div>
  );
};


interface CountersProps {
    datingStartDate: string;
    weddingStartDate: string;
}

const Counters: React.FC<CountersProps> = ({ datingStartDate, weddingStartDate }) => {
    return (
        <section className="py-10 md:py-20 relative">
             <div className="container mx-auto px-4">
                <h2 className="title-large animate-fade">
                    Nossa História de Amor
                </h2>
                <div className="flex flex-col items-center mb-10 md:mb-20 mt-8 md:mt-12">
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-md mb-8 md:mb-16">
                            <Counter title="Tempo de Casamento" targetDate={weddingStartDate} size="large" />
                        </div>
                    </div>
                    <div className="counter-spacing" style={{ height: '2rem' }}></div>
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-md mt-8 md:mt-16">
                            <Counter title="Tempo de Namoro" targetDate={datingStartDate} size="normal" />
                        </div>
                    </div>
                </div>
             </div>
        </section>
    )
}

export default Counters; 