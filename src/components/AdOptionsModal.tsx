import React from 'react';
import { X, Play, Coins } from 'lucide-react';

interface AdOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWatchAd: (reward: number) => void;
}

export const AdOptionsModal: React.FC<AdOptionsModalProps> = ({ isOpen, onClose, onWatchAd }) => {
  if (!isOpen) return null;

  const options = [
    { id: 1, reward: 50 },
    { id: 2, reward: 100 },
    { id: 3, reward: 150 },
    { id: 4, reward: 200 },
    { id: 5, reward: 250 },
    { id: 6, reward: 300 },
    { id: 7, reward: 400 },
    { id: 8, reward: 500 },
    { id: 9, reward: 750 },
    { id: 10, reward: 1000 },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-3xl w-full max-w-sm p-5 border border-amber-500/50 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-black text-white uppercase tracking-wider">Moedas Grátis</h2>
          <button onClick={onClose} className="p-1 rounded-full bg-white/10 text-white"><X size={20}/></button>
        </div>
        <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onWatchAd(opt.reward)}
              className="bg-gradient-to-br from-amber-600 to-amber-800 p-3 rounded-xl flex items-center justify-between border border-amber-400 active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-white" />
                <span className="font-bold text-white text-sm">+{opt.reward}</span>
              </div>
              <Coins className="w-4 h-4 text-amber-200" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
