import React, { useState, useEffect } from 'react';
import { intervalToDuration, formatDuration, Duration } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CounterProps {
  title: string;
  targetDate: string;
}

const Counter: React.FC<CounterProps> = ({ title, targetDate }) => {
  const [duration, setDuration] = useState<Duration | null>(null);

  useEffect(() => {
    const calculateDuration = () => {
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
    return null;
  }

  const formattedDuration = formatDuration(duration, {
    locale: ptBR,
    delimiter: ', ',
  })
  .replace(/ s,/, ' segundos,') // Quick fix for short format
  .replace(/ m,/, ' minutos,')
  .replace(/ h,/, ' horas,');


  const units = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];
  const labels: { [key: string]: string[] } = {
    years: ['Ano', 'Anos'],
    months: ['Mês', 'Meses'],
    days: ['Dia', 'Dias'],
    hours: ['Hora', 'Horas'],
    minutes: ['Minuto', 'Minutos'],
    seconds: ['Segundo', 'Segundos'],
  };

  return (
    <div className="counter-card w-full md:w-5/12 animate-fade">
        <h3 className="title-medium mb-6">{title}</h3>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-6">
            {units.map(unit => {
                const value = duration[unit as keyof Duration] || 0;
                const label = value === 1 ? labels[unit][0] : labels[unit][1];
                return (
                    <div key={unit} className="flex flex-col items-center min-w-[70px]">
                        <span className="counter-number">{String(value).padStart(2, '0')}</span>
                        <span className="counter-label">{label}</span>
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
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-20 mt-12">
                    <Counter title="Tempo de Namoro" targetDate={datingStartDate} />
                    <Counter title="Tempo de Casamento" targetDate={weddingStartDate} />
                </div>
             </div>
        </section>
    )
}

export default Counters; 