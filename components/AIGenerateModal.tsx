import React, { useState, useEffect } from 'react';
import { analyzeGame } from '../services/geminiService';
import { Player, Round } from '../types';

interface AIGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  rounds: Round[];
}

export const AIGenerateModal: React.FC<AIGenerateModalProps> = ({ isOpen, onClose, players, rounds }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Trigger analysis automatically when opened
  useEffect(() => {
    if (isOpen && !analysis && !isLoading) {
        handleAnalyze();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    try {
        const result = await analyzeGame(players, rounds);
        setAnalysis(result);
    } catch (e) {
        setError('Failed to analyze game. Check API Key.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-android-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="bg-gradient-to-r from-android-primary to-blue-500 text-transparent bg-clip-text">
                Game Commentary
            </span>
        </h2>

        <div className="min-h-[150px] bg-gray-50 rounded-xl p-4 border border-gray-100 text-gray-700 text-sm leading-relaxed overflow-y-auto max-h-[60vh]">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full space-y-3 text-gray-400">
                    <svg className="animate-spin h-6 w-6 text-android-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Consulting the Gong Zhu Masters...</span>
                </div>
            ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
            ) : (
                <div className="markdown-prose whitespace-pre-wrap">{analysis}</div>
            )}
        </div>

        <div className="flex space-x-3 pt-4">
            <button 
                onClick={onClose}
                className="flex-1 py-3 bg-android-primary text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:bg-android-secondary transition-all"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};