import React, { useState, useEffect } from 'react';
import { Course, DAYS, DayOfWeek } from '../types';
import { COURSE_COLORS } from '../constants';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: Course) => void;
  onDelete: (id: string) => void;
  initialData: Course | null;
}

export const CourseModal: React.FC<CourseModalProps> = ({ isOpen, onClose, onSave, onDelete, initialData }) => {
  const [formData, setFormData] = useState<Course>({
    id: '',
    name: '',
    location: '',
    teacher: '',
    day: 'Mon',
    startTime: '08:00',
    endTime: '09:00',
    color: COURSE_COLORS[0],
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
            id: Date.now().toString(),
            name: '',
            location: '',
            teacher: '',
            day: 'Mon',
            startTime: '08:00',
            endTime: '09:00',
            color: COURSE_COLORS[Math.floor(Math.random() * COURSE_COLORS.length)],
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const isEdit = !!initialData;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-slide-up sm:animate-none">
        <div className="bg-android-primary p-4 flex justify-between items-center text-white">
          <h2 className="text-lg font-bold">{isEdit ? 'Edit Course' : 'New Course'}</h2>
          <button onClick={onClose} className="hover:bg-white/10 rounded-full p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-android-primary focus:border-transparent outline-none transition-all"
              placeholder="e.g. Calculus I"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             {/* Location Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input 
                type="text" 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-android-primary outline-none"
                placeholder="Room 101"
                />
            </div>
             {/* Teacher Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Professor</label>
                <input 
                type="text" 
                value={formData.teacher}
                onChange={(e) => setFormData({...formData, teacher: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-android-primary outline-none"
                placeholder="Dr. Smith"
                />
            </div>
          </div>

          {/* Day & Time */}
          <div className="grid grid-cols-3 gap-3">
             <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                <select
                    value={formData.day}
                    onChange={(e) => setFormData({...formData, day: e.target.value as DayOfWeek})}
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-android-primary outline-none bg-white"
                >
                    {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start</label>
                <input 
                  type="time" 
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-android-primary outline-none"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
                <input 
                  type="time" 
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-android-primary outline-none"
                />
             </div>
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Color</label>
            <div className="flex flex-wrap gap-2">
                {COURSE_COLORS.map(color => (
                    <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({...formData, color})}
                        className={`w-8 h-8 rounded-full border-2 ${formData.color === color ? 'border-gray-600 scale-110' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-4 space-x-3 border-t border-gray-100 mt-4">
            {isEdit && (
                <button 
                    type="button"
                    onClick={() => onDelete(formData.id)}
                    className="px-4 py-2 text-android-error font-medium hover:bg-red-50 rounded-lg transition-colors"
                >
                    Delete
                </button>
            )}
            <button 
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
            >
                Cancel
            </button>
            <button 
                type="submit"
                className="px-6 py-2 bg-android-primary text-white font-medium rounded-lg shadow-md hover:bg-android-secondary transition-colors"
            >
                Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};