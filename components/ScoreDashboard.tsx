import React from 'react';
import { Player } from '../types';

interface ScoreDashboardProps {
  players: Player[];
}

export const ScoreDashboard: React.FC<ScoreDashboardProps> = ({ players }) => {
  // Sort players by score (ascending usually better in Gong Zhu as low score wins, 
  // but negative is bad... actually in Gong Zhu:
  // Pig = -100 (Bad), Sheep = +100 (Good). 
  // High score is good.
  const sortedPlayers = [...players].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="sticky top-16 z-40 bg-android-background/95 backdrop-blur-sm shadow-sm pb-2 pt-2">
      <div className="flex justify-around px-2 space-x-2">
        {players.map((player) => {
           // Determine rank style
           const rank = sortedPlayers.indexOf(player);
           const isWinning = rank === 0;
           const isLosing = rank === players.length - 1;

           return (
            <div 
              key={player.id}
              className={`
                flex-1 flex flex-col items-center justify-center p-2 rounded-xl transition-all
                ${isWinning ? 'bg-white shadow-md border-t-4 border-android-primary transform -translate-y-1' : ''}
                ${isLosing ? 'bg-gray-100 opacity-80' : 'bg-white shadow-sm'}
              `}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mb-1"
                style={{ backgroundColor: player.color }}
              >
                {player.name.charAt(0)}
              </div>
              <div className="text-xs text-gray-500 font-medium truncate w-full text-center">{player.name}</div>
              <div className={`text-lg font-bold ${player.totalScore < 0 ? 'text-red-500' : 'text-gray-800'}`}>
                {player.totalScore}
              </div>
            </div>
           );
        })}
      </div>
    </div>
  );
};