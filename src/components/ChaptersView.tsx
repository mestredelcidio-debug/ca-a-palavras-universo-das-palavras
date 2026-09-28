import React from 'react';
import { ArrowLeft, Lock, Check } from 'lucide-react';
import { CoinPill } from './CoinPill';
import beachThumbnail from '../assets/images/beach_paradise_bg_1790595434475.jpg';

interface ChaptersViewProps {
  currentLevel: number;
  coins: number;
  onGoBack: () => void;
  onOpenShop: () => void;
  onSelectLevel: (lvl: number) => void;
}

export const ChaptersView: React.FC<ChaptersViewProps> = ({
  currentLevel,
  coins,
  onGoBack,
  onOpenShop,
  onSelectLevel
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-start pb-12 overflow-y-auto bg-gradient-to-b from-sky-400/40 via-sky-200/30 to-amber-100/50 backdrop-blur-sm">
      {/* Top Header matching Screenshot 4 */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between px-4 py-3 shrink-0">
        <button
          onClick={onGoBack}
          className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg border border-white/40 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <CoinPill coins={coins} onOpenShop={onOpenShop} />
      </header>

      {/* Chapters Cards Container */}
      <main className="w-full max-w-md mx-auto px-4 space-y-4 pt-1">
        {/* CHAPTER 1: MAR */}
        <div className="w-full rounded-2xl bg-[#fffef5] border-2 border-white shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#1d63dd] py-2.5 px-4 text-center">
            <h2 className="font-display font-black text-xl text-white tracking-widest uppercase drop-shadow-sm">
              MAR
            </h2>
          </div>

          <div className="p-4 space-y-4">
            {/* Postcards Row */}
            <div className="flex items-center justify-center gap-3">
              {/* Postcard 1: Unlocked with beach photo */}
              <div
                onClick={() => onSelectLevel(1)}
                className="w-24 h-32 rounded-xl overflow-hidden border-2 border-blue-500 shadow-md cursor-pointer hover:scale-105 transition-transform relative bg-sky-100"
              >
                <img
                  src={beachThumbnail}
                  alt="Praia Tropical"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Postcard 2: Locked */}
              <div className="w-24 h-32 rounded-xl bg-slate-300 border-2 border-slate-200 shadow-sm flex items-center justify-center relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-md flex items-center justify-center border border-yellow-100">
                  <Lock className="w-4 h-4 text-amber-950 stroke-[2.5]" />
                </div>
              </div>

              {/* Postcard 3: Locked */}
              <div className="w-24 h-32 rounded-xl bg-slate-300 border-2 border-slate-200 shadow-sm flex items-center justify-center relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-md flex items-center justify-center border border-yellow-100">
                  <Lock className="w-4 h-4 text-amber-950 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Sub-Banner: CAPÍTULO 1 */}
            <div className="w-full py-1.5 bg-[#f5ebd7] text-center border-y border-[#e2d5bd]">
              <span className="font-display font-black text-xs text-[#1e58b8] tracking-widest uppercase">
                CAPÍTULO 1
              </span>
            </div>

            {/* Level Circles Row matching Screenshot 4 */}
            <div className="flex items-center justify-center gap-5 pt-1">
              {/* Level 1 */}
              <button
                onClick={() => onSelectLevel(1)}
                className="w-12 h-12 rounded-full bg-[#135cd4] text-white font-display font-black text-base flex items-center justify-center shadow-md border-2 border-blue-400 active:scale-95 hover:scale-105 transition-all"
              >
                1
              </button>

              {/* Level 2: With active glowing white ring */}
              <button
                onClick={() => onSelectLevel(2)}
                className="relative w-14 h-14 rounded-full bg-[#135cd4] text-white font-display font-black text-lg flex items-center justify-center shadow-lg border-4 border-white ring-4 ring-blue-500/40 active:scale-95 hover:scale-105 transition-all"
              >
                2
              </button>

              {/* Level 3: Locked with golden lock */}
              <button
                onClick={() => {
                  if (currentLevel >= 3) onSelectLevel(3);
                }}
                disabled={currentLevel < 3}
                className="w-12 h-12 rounded-full bg-[#135cd4] text-white font-display font-black text-base flex items-center justify-center shadow-md border-2 border-blue-400 active:scale-95 transition-all disabled:opacity-85"
              >
                {currentLevel >= 3 ? 3 : <Lock className="w-5 h-5 text-amber-300 fill-amber-300" />}
              </button>
            </div>
          </div>
        </div>

        {/* CHAPTER 2: FLORESTA */}
        <div className="w-full rounded-2xl bg-[#fffef5] border-2 border-white shadow-xl overflow-hidden opacity-95">
          {/* Header Banner */}
          <div className="bg-[#1ea345] py-2.5 px-4 text-center">
            <h2 className="font-display font-black text-xl text-white tracking-widest uppercase drop-shadow-sm">
              FLORESTA
            </h2>
          </div>

          <div className="p-4">
            {/* 5 locked postcards */}
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map(idx => (
                <div
                  key={idx}
                  className="aspect-[3/4] rounded-lg bg-slate-300 border border-slate-200 shadow-sm flex items-center justify-center"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-sm flex items-center justify-center border border-yellow-100">
                    <Lock className="w-3.5 h-3.5 text-amber-950 stroke-[2.5]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CHAPTER 3: DESERTO */}
        <div className="w-full rounded-2xl bg-[#fffef5] border-2 border-white shadow-xl overflow-hidden opacity-95">
          {/* Header Banner */}
          <div className="bg-[#f39c12] py-2.5 px-4 text-center">
            <h2 className="font-display font-black text-xl text-white tracking-widest uppercase drop-shadow-sm">
              DESERTO
            </h2>
          </div>

          <div className="p-4">
            {/* 5 locked postcards */}
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map(idx => (
                <div
                  key={idx}
                  className="aspect-[3/4] rounded-lg bg-slate-300 border border-slate-200 shadow-sm flex items-center justify-center"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-sm flex items-center justify-center border border-yellow-100">
                    <Lock className="w-3.5 h-3.5 text-amber-950 stroke-[2.5]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
