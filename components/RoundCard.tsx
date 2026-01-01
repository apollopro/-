import React from 'react';
import { Round, Player } from '../types';

interface RoundCardProps {
  round: Round;
  players: Player[];
  index: number;
  onDelete: (roundId: string) => void;
}

export const RoundCard: React.FC<RoundCardProps> = ({ round, players, index, onDelete }) => {
  return (
    <div className="relative mb-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 animate-fade-in-up">
        <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-2">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Round {index}</h3>
            <div className="text-xs text-gray-400 font-mono">
                {new Date(round.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
            {players.map(player => {
                const score = round.scores[player.id] || 0;
                return (
                    <div key={player.id} className="flex flex-col items-center">
                        <span className="text-xs text-gray-400 mb-1">{player.name}</span>
                        <span className={`text-lg font-medium ${score > 0 ? 'text-android-primary' : score < 0 ? 'text-red-500' : 'text-gray-300'}`}>
                            {score > 0 ? `+${score}` : score}
                        </span>
                    </div>
                );
            })}
        </div>

        <button 
            onClick={(e) => {
                e.stopPropagation();
                if(confirm('Delete this round?')) onDelete(round.id);
            }}
            className="absolute top-4 right-4 text-gray-300 hover:text-red-500 p-1"
        >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
  );
};