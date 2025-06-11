// components/TimeDisplayUnit.tsx
import React from 'react';

interface TimeDisplayUnitProps {
  value: number;
  label: string;
}

const TimeDisplayUnit: React.FC<TimeDisplayUnitProps> = ({
  value,
  label
}) => {
  return (
    <div className="flex flex-col items-center p-3 mx-4 md:mx-6 lg:mx-8 animate-fade delay-1">
      <div className="relative mb-3">
        <span className="counter-number">{value}</span>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-300 rounded-lg blur-md -z-10"></div>
      </div>
      <span className="counter-label">{label}</span>
    </div>
  );
};

export default TimeDisplayUnit;
