import React, { useRef, useEffect } from 'react';
import { DAYS, DayOfWeek } from '../types';

interface DaySelectorProps {
  selectedDay: DayOfWeek;
  onSelectDay: (day: DayOfWeek) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({ selectedDay, onSelectDay }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic auto-scroll to view could be added here if needed
  }, [selectedDay]);

  return (
    <div className="sticky top-16 z-40 bg-android-background shadow-sm pb-2">
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar space-x-2 px-4 py-3"
      >
        {DAYS.map((day) => {
          const isSelected = day === selectedDay;
          return (
            <button
              key={day}
              onClick={() => onSelectDay(day)}
              className={`
                flex-shrink-0 w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all duration-300
                ${isSelected 
                  ? 'bg-android-primary text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-500 shadow-sm border border-gray-100 hover:bg-gray-50'
                }
              `}
            >
              <span className={`text-xs ${isSelected ? 'font-light' : 'font-normal'}`}>{day}</span>
              <span className={`text-sm ${isSelected ? 'font-bold' : 'font-medium'}`}>
                {/* Fake date simulation for aesthetics */}
                {DAYS.indexOf(day) + 10}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};