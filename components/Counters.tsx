import React, { useState, useEffect, useRef } from 'react';
import { intervalToDuration, Duration } from 'date-fns';
import BlurText from './BlurText';

// Hook customizado para obter o valor anterior de um estado ou prop
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

interface CounterProps {
  title: string;
  targetDate: string;
  size?: 'large' | 'normal';
}

const Counter: React.FC<CounterProps> = ({ title, targetDate, size = 'normal' }) => {
  const [duration, setDuration] = useState<Duration | null>(null);
  const prevDuration = usePrevious(duration);

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
  const numberSizeClass = size === 'large' ? 'number-large' : 'number-normal';
  const labelSize = size === 'large' ? 'text-sm md:text-base' : 'text-xs md:text-sm';

  return (
    <div className={`w-full max-w-md mx-auto animate-fade ${containerOpacity} p-4 md:p-6`}>
        <h3 className="title-medium mb-6 md:mb-8">{title}</h3>
        <div className="grid grid-cols-3 gap-2 md:gap-4 justify-items-center">
            {units.map(unit => {
                const value = duration[unit as keyof Duration] || 0;
                const prevValue = prevDuration?.[unit as keyof Duration] || 0;
                
                // Determina a animação com base na mudança de valor
                const animationClass = value !== prevValue ? 'animate-tick' : 'animate-subtle-pulse';

                const label = value === 1 ? labels[unit][0] : labels[unit][1];
                return (
                    <div key={unit} className="flex flex-col items-center w-full">
                        <span className={`counter-number ${numberSizeClass} ${animationClass}`}>{String(value).padStart(2, '0')}</span>
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
        <section className="py-10 md:py-16 relative">
             <div className="container mx-auto px-4">
                <BlurText
                  as="h2"
                  text="Nossa História de Amor"
                  className="title-large"
                  delay={80}
                  animateBy="words"
                />
                <div className="flex flex-col items-center gap-8 md:gap-10 mt-8 md:mt-12">
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-md">
                            <Counter title="Tempo de Casamento" targetDate={weddingStartDate} size="large" />
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-md">
                            <Counter title="Tempo de Namoro" targetDate={datingStartDate} size="normal" />
                        </div>
                    </div>
                </div>
             </div>
        </section>
    )
}

export default Counters; 