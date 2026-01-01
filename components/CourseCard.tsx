import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  // Calculate height or visual spacing based on duration could go here
  // For now, we use a standard card layout
  
  return (
    <div 
      onClick={() => onClick(course)}
      className="relative mb-4 pl-4 cursor-pointer active:scale-[0.98] transition-transform duration-200"
    >
        {/* Timeline Line */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 ml-1.5 z-0"></div>
        {/* Timeline Dot */}
        <div className="absolute left-0 top-6 w-3.5 h-3.5 bg-android-primary rounded-full z-10 border-2 border-android-background"></div>

        <div className="flex items-start">
            <div className="w-16 pt-5 text-right pr-3 flex-shrink-0">
                <div className="text-sm font-bold text-gray-800">{course.startTime}</div>
                <div className="text-xs text-gray-400">{course.endTime}</div>
            </div>

            <div 
                className="flex-1 rounded-2xl p-4 shadow-sm border border-black/5"
                style={{ backgroundColor: course.color }}
            >
                <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1">{course.name}</h3>
                <div className="flex flex-col space-y-1 text-sm text-gray-700/80">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {course.location}
                    </div>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {course.teacher}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};