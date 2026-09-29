import React from 'react';
import { Plus } from 'lucide-react';

interface CoinPillProps {
  coins: number;
  onOpenRewardBoxes: () => void;
}

export const CoinPill: React.FC<CoinPillProps> = ({ coins, onOpenRewardBoxes }) => {
  return (
    <button
      onClick={onOpenRewardBoxes}
      className="relative flex items-center h-9 pr-1 pl-3 bg-gradient-to-r from-amber-700 to-amber-600 border border-amber-400/60 rounded-full shadow-md hover:brightness-105 active:scale-95 transition-all group"
      title="Moedas (Abrir Recompensas)"
    >
      {/* 3D Shiny Gold Coin on the left */}
      <div className="absolute -left-3.5 w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 border-2 border-yellow-200 shadow-md flex items-center justify-center transform group-hover:rotate-12 transition-transform">
        <div className="w-5 h-5 rounded-full border border-amber-600/60 bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center shadow-inner">
          <div className="w-2 h-2 rounded-full bg-yellow-100 opacity-80" />
        </div>
      </div>

      {/* Coin Amount */}
      <span className="font-display font-black text-sm text-white pl-3.5 pr-2.5 drop-shadow-sm tabular-nums">
        {coins}
      </span>

      {/* Green Plus Button on the right */}
      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-lime-600 to-emerald-400 border border-emerald-200/80 flex items-center justify-center shadow-sm text-white">
        <Plus className="w-4 h-4 stroke-[3.5]" />
      </div>
    </button>
  );
};
