import React from 'react';

interface HeaderProps {
  onOpenAI: () => void;
  onOpenSettings: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAI, onOpenSettings, onReset }) => {
  return (
    <header className="sticky top-0 z-50 bg-android-primary text-white shadow-md">
      <div className="flex justify-between items-center px-4 h-16">
        <div className="flex items-center space-x-2">
            <button onClick={onOpenSettings} className="p-1 rounded-full hover:bg-white/10" title="Settings">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
               </svg>
            </button>
            <h1 className="text-xl font-medium tracking-wide">拱猪计分器</h1>
        </div>
        <div className="flex items-center space-x-1">
            <button 
            onClick={onReset}
            className="p-2 rounded-full hover:bg-white/10 text-white/80"
            title="Reset Game"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            </button>
            <button 
            onClick={onOpenAI}
            className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center space-x-1"
            title="Analyze Game"
            >
            <span className="text-sm font-medium">AI Analysis</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            </button>
        </div>
      </div>
    </header>
  );
};