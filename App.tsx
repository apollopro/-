import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScoreDashboard } from './components/ScoreDashboard';
import { RoundCard } from './components/RoundCard';
import { ScoreEntryModal } from './components/ScoreEntryModal';
import { AIGenerateModal } from './components/AIGenerateModal';
import { SettingsModal } from './components/SettingsModal';
import { Player, Round } from './types';
import { INITIAL_PLAYERS } from './constants';
import { hasApiKey } from './services/geminiService';

const App: React.FC = () => {
  // State
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [rounds, setRounds] = useState<Round[]>([]);
  
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedPlayers = localStorage.getItem('gongzhu_players');
    const savedRounds = localStorage.getItem('gongzhu_rounds');
    
    if (savedPlayers) setPlayers(JSON.parse(savedPlayers));
    if (savedRounds) setRounds(JSON.parse(savedRounds));
  }, []);

  // Save to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem('gongzhu_players', JSON.stringify(players));
    localStorage.setItem('gongzhu_rounds', JSON.stringify(rounds));
  }, [players, rounds]);

  // Handlers
  const handleAddRound = (scores: Record<string, number>) => {
    const newRound: Round = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        scores: scores
    };

    // Update Round History
    const updatedRounds = [newRound, ...rounds]; // Newest first
    setRounds(updatedRounds);

    // Update Player Totals
    const updatedPlayers = players.map(p => ({
        ...p,
        totalScore: p.totalScore + (scores[p.id] || 0)
    }));
    setPlayers(updatedPlayers);
    
    setIsScoreModalOpen(false);
  };

  const handleDeleteRound = (roundId: string) => {
    const roundToDelete = rounds.find(r => r.id === roundId);
    if (!roundToDelete) return;

    // Revert Player Totals
    const updatedPlayers = players.map(p => ({
        ...p,
        totalScore: p.totalScore - (roundToDelete.scores[p.id] || 0)
    }));
    setPlayers(updatedPlayers);

    // Remove Round
    setRounds(prev => prev.filter(r => r.id !== roundId));
  };

  const handleReset = () => {
      if(window.confirm("Reset all game data? This cannot be undone.")) {
          setPlayers(INITIAL_PLAYERS);
          setRounds([]);
      }
  };

  const handleOpenAI = () => {
    if (!hasApiKey()) {
      setIsSettingsModalOpen(true);
      return;
    }
    setIsAIModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-android-background pb-24 font-sans">
      <Header 
        onOpenAI={handleOpenAI} 
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onReset={handleReset}
      />
      
      <ScoreDashboard players={players} />

      <main className="px-4 py-4 max-w-2xl mx-auto min-h-[60vh]">
        {rounds.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-400 mt-20 space-y-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-4xl">🃏</span>
            </div>
            <p className="text-lg font-medium">New game started.</p>
            <button 
                onClick={() => setIsScoreModalOpen(true)}
                className="text-android-primary font-bold hover:underline"
            >
                Record first hand
            </button>
          </div>
        ) : (
          <div className="animate-fade-in-up">
             {rounds.map((round, index) => (
               <RoundCard 
                 key={round.id} 
                 round={round} 
                 players={players}
                 index={rounds.length - index}
                 onDelete={handleDeleteRound}
               />
             ))}
             <div className="text-center text-xs text-gray-300 mt-4">End of History</div>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsScoreModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-android-primary text-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-android-secondary hover:shadow-xl hover:scale-105 transition-all z-40 active:scale-95"
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Modals */}
      <ScoreEntryModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        onSave={handleAddRound}
        players={players}
      />

      <AIGenerateModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        players={players}
        rounds={rounds}
      />

      <SettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        players={players}
        onUpdatePlayers={setPlayers}
      />
    </div>
  );
};

export default App;