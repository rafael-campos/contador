// components/AnimatedTimeCounter.tsx
import React, { useState, useEffect } from 'react';
import { intervalToDuration } from 'date-fns';

interface TimeCounterProps {
  startDateTime: string;
  title: string; // Prop para o título como "Tempo de Namoro"
}

interface Duration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Componente TimeDisplayUnit interno
const TimeDisplayUnit: React.FC<{ 
  value: number; 
  label: string; 
  isSeconds?: boolean; 
  key?: React.Key;
}> = ({ value, label, isSeconds = false }) => {
  return (
    <div className="flex flex-col items-center p-3 animate-fade delay-1">
      <div className="relative mb-3">
        <span 
          key={isSeconds ? value : undefined}
          className={`counter-number ${isSeconds ? 'animate-tick' : ''}`}
        >
          {value}
        </span>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-300 rounded-lg blur-md -z-10"></div>
      </div>
      <span className="counter-label">{label}</span>
    </div>
  );
};

const AnimatedTimeCounter: React.FC<TimeCounterProps> = ({ startDateTime, title }) => {
  const [duration, setDuration] = useState<Duration>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Estado para ajudar a disparar a animação dos segundos
  const [secondTick, setSecondTick] = useState(0);

  useEffect(() => {
    const calculateDuration = () => {
      const durationObj = intervalToDuration({
        start: new Date(startDateTime),
        end: new Date()
      });

      setDuration({
        years: durationObj.years || 0,
        months: durationObj.months || 0,
        days: durationObj.days || 0,
        hours: durationObj.hours || 0,
        minutes: durationObj.minutes || 0,
        seconds: durationObj.seconds || 0,
      });
      setSecondTick(s => s + 1); // Disparar re-render para animação dos segundos
    };

    calculateDuration();
    const intervalId = setInterval(calculateDuration, 1000);
    return () => clearInterval(intervalId);
  }, [startDateTime]);

  return (
    <div className="text-center w-full">
      <h3 className="title-medium mb-6">{title}</h3>
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        <TimeDisplayUnit value={duration.years} label={duration.years === 1 ? "Ano" : "Anos"} />
        <TimeDisplayUnit value={duration.months} label={duration.months === 1 ? "Mês" : "Meses"} />
        <TimeDisplayUnit value={duration.days} label={duration.days === 1 ? "Dia" : "Dias"} />
        <TimeDisplayUnit value={duration.hours} label={duration.hours === 1 ? "Hora" : "Horas"} />
        <TimeDisplayUnit value={duration.minutes} label={duration.minutes === 1 ? "Minuto" : "Minutos"} />
        <TimeDisplayUnit value={duration.seconds} label={duration.seconds === 1 ? "Segundo" : "Segundos"} isSeconds={true} key={secondTick} />
      </div>
    </div>
  );
};

export default AnimatedTimeCounter;
