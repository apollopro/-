import React, { useState } from 'react';
import { Player } from '../types';

interface ScoreEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (scores: Record<string, number>) => void;
  players: Player[];
}

export const ScoreEntryModal: React.FC<ScoreEntryModalProps> = ({ isOpen, onClose, onSave, players }) => {
  const [scores, setScores] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleScoreChange = (playerId: string, value: string) => {
    setScores(prev => ({ ...prev, [playerId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericScores: Record<string, number> = {};
    let isValid = true;

    players.forEach(p => {
        const val = scores[p.id];
        if (val === undefined || val === '') {
            numericScores[p.id] = 0;
        } else {
            const num = parseInt(val);
            if (isNaN(num)) isValid = false;
            numericScores[p.id] = num;
        }
    });

    if (isValid) {
        onSave(numericScores);
        setScores({}); // Reset
    }
  };

  // Helper buttons
  const setPreset = (pid: string, val: number) => {
      const current = parseInt(scores[pid] || '0');
      if (!isNaN(current)) {
          handleScoreChange(pid, (current + val).toString());
      } else {
          handleScoreChange(pid, val.toString());
      }
  };

  const multiply = (pid: string, factor: number) => {
      const current = parseInt(scores[pid] || '0');
      if (!isNaN(current)) {
        handleScoreChange(pid, (current * factor).toString());
      }
  };
  
  const clear = (pid: string) => {
      handleScoreChange(pid, '');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-slide-up sm:animate-none">
        <div className="bg-android-primary p-4 flex justify-between items-center text-white">
          <h2 className="text-lg font-bold">Record Scores</h2>
          <button onClick={onClose} className="hover:bg-white/10 rounded-full p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div className="grid grid-cols-2 gap-3">
            {players.map(player => (
                <div key={player.id} className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                    <label 
                        className="block text-xs font-bold mb-1 flex items-center uppercase tracking-wide"
                        style={{color: player.color}}
                    >
                        {player.name}
                    </label>
                    <input 
                        type="number" 
                        value={scores[player.id] || ''}
                        onChange={(e) => handleScoreChange(player.id, e.target.value)}
                        placeholder="0"
                        className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-android-primary outline-none text-lg font-mono text-center shadow-inner"
                    />
                    {/* Quick Add Buttons */}
                    <div className="grid grid-cols-3 gap-1 mt-2">
                        <button type="button" onClick={() => setPreset(player.id, -100)} className="text-[10px] bg-red-100 text-red-700 py-1 rounded border border-red-200 font-bold hover:bg-red-200">Pig</button>
                        <button type="button" onClick={() => setPreset(player.id, 100)} className="text-[10px] bg-blue-100 text-blue-700 py-1 rounded border border-blue-200 font-bold hover:bg-blue-200">Sheep</button>
                        <button type="button" onClick={() => setPreset(player.id, -10)} className="text-[10px] bg-pink-100 text-pink-700 py-1 rounded border border-pink-200 font-bold hover:bg-pink-200">♥-10</button>
                    </div>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                        <button type="button" onClick={() => multiply(player.id, 2)} className="text-[10px] bg-purple-100 text-purple-700 py-1 rounded border border-purple-200 font-bold hover:bg-purple-200">x2</button>
                        <button type="button" onClick={() => clear(player.id)} className="text-[10px] bg-gray-200 text-gray-700 py-1 rounded border border-gray-300 font-bold hover:bg-gray-300">Clr</button>
                    </div>
                </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-2 border-t border-gray-100">
            <button 
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors w-1/3"
            >
                Cancel
            </button>
            <button 
                type="submit"
                className="px-6 py-2.5 bg-android-primary text-white font-bold rounded-xl shadow-md hover:bg-android-secondary transition-colors w-2/3"
            >
                Add Round
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};