import React, { useState, useEffect } from 'react';
import { Player } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  onUpdatePlayers: (players: Player[]) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, players, onUpdatePlayers }) => {
  const [apiKey, setApiKey] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [editedPlayers, setEditedPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (isOpen) {
      setApiKey(localStorage.getItem('gemini_api_key') || '');
      // Deep copy to ensure we don't mutate state directly until save
      setEditedPlayers(JSON.parse(JSON.stringify(players)));
    }
  }, [isOpen, players]);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('gemini_api_key', apiKey.trim());
    onUpdatePlayers(editedPlayers);
    onClose();
  };

  const updatePlayerName = (id: string, name: string) => {
    setEditedPlayers(prev => prev.map(p => p.id === id ? { ...p, name } : p));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 animate-slide-up flex flex-col max-h-[90vh]">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex-shrink-0">Settings</h2>
        
        <div className="overflow-y-auto flex-1 pr-1 -mr-1">
            {/* Player Names Configuration */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Player Names</label>
                <div className="space-y-3">
                    {editedPlayers.map((player) => (
                        <div key={player.id} className="flex items-center space-x-2">
                            <div 
                                className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-sm"
                                style={{ backgroundColor: player.color }}
                            >
                                {player.name.charAt(0).toUpperCase()}
                            </div>
                            <input
                                type="text"
                                value={player.name}
                                onChange={(e) => updatePlayerName(player.id, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-android-primary outline-none text-sm transition-all hover:border-android-primary/50"
                                placeholder="Player Name"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* API Key Configuration */}
            <div className="mb-2 pt-4 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">Google Gemini API Key</label>
                <div className="relative">
                    <input 
                    type={isVisible ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-android-primary focus:border-transparent outline-none transition-all"
                    />
                    <button 
                    type="button"
                    onClick={() => setIsVisible(!isVisible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                    {isVisible ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    )}
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Key is stored locally in your browser. Get one at <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-android-primary underline">Google AI Studio</a>.
                </p>
            </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 flex-shrink-0">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-android-primary text-white font-medium rounded-lg shadow-md hover:bg-android-secondary transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};