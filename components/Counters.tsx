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
      <div className="counter-card w-full md:w-6/12 h-48 flex items-center justify-center">
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
  
  const cardWidth = size === 'large' ? 'md:w-7/12' : 'md:w-6/12';
  const containerOpacity = size === 'large' ? '' : 'opacity-80';
  const numberSize = size === 'large' ? '!text-5xl' : '!text-3xl';
  const labelSize = size === 'large' ? 'text-base' : 'text-sm';

  return (
    <div className={`counter-card w-full ${cardWidth} animate-fade ${containerOpacity} p-6`}>
        <h3 className="title-medium mb-8">{title}</h3>
        <div className="flex flex-wrap justify-center gap-x-2 sm:gap-x-4 gap-y-6">
            {units.map(unit => {
                const value = duration[unit as keyof Duration] || 0;
                const label = value === 1 ? labels[unit][0] : labels[unit][1];
                return (
                    <div key={unit} className="flex flex-col items-center min-w-[60px] sm:min-w-[70px]">
                        <span className={`counter-number ${numberSize}`}>{String(value).padStart(2, '0')}</span>
                        <span className={`counter-label mt-2 ${labelSize}`}>{label}</span>
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
        <section className="py-20 relative">
             <div className="container mx-auto px-4">
                <h2 className="title-large animate-fade">
                    Nossa História de Amor
                </h2>
                <div className="flex flex-col justify-center items-center mb-20 mt-12">
                    <div className="counter-wrapper w-full mb-16">
                        <Counter title="Tempo de Casamento" targetDate={weddingStartDate} size="large" />
                    </div>
                    <div className="counter-spacing" style={{ height: '3rem' }}></div>
                    <div className="counter-wrapper w-full mt-16">
                        <Counter title="Tempo de Namoro" targetDate={datingStartDate} size="normal" />
                    </div>
                </div>
             </div>
        </section>
    )
}

export default Counters; 