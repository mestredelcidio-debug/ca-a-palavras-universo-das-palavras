import React, { useEffect } from 'react';
import { Award, Sparkles, Coins, ArrowRight, Compass, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChapterData } from '../data/chapters';

interface ChapterRewardModalProps {
  isOpen: boolean;
  chapter: ChapterData;
  onClaim: () => void;
}

export const ChapterRewardModal: React.FC<ChapterRewardModalProps> = ({
  isOpen,
  chapter,
  onClaim
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 130,
          spread: 85,
          origin: { y: 0.5 },
          colors: ['#fbbf24', '#f59e0b', '#10b981', '#38bdf8', '#ec4899', '#a855f7']
        });
      } catch {
        // Ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-[380px] rounded-3xl bg-gradient-to-b from-slate-900 via-[#132338] to-slate-950 border-3 border-amber-400 p-6 shadow-2xl text-center flex flex-col items-center gap-4 relative animate-scaleUp overflow-hidden">
        {/* Glowing Background Radial Light */}
        <div className="absolute -top-16 inset-x-0 h-40 bg-amber-400/25 blur-3xl pointer-events-none rounded-full" />

        {/* Top Floating Badge */}
        <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-display font-black text-xs uppercase tracking-widest shadow-lg flex items-center gap-1.5 border border-yellow-200">
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>NOVO CAPÍTULO DESBLOQUEADO!</span>
        </div>

        {/* Chapter Icon & Biome Badge */}
        <div className="relative my-1">
          <div
            className="w-20 h-20 rounded-3xl shadow-xl flex items-center justify-center text-white border-2 border-white/60 relative"
            style={{ backgroundColor: chapter.accentColor }}
          >
            <Compass className="w-10 h-10 animate-spin-slow" />
            <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-400 border border-slate-900 flex items-center justify-center text-slate-950 shadow-md">
              <Star className="w-4 h-4 fill-slate-950" />
            </div>
          </div>
        </div>

        {/* Chapter Titles */}
        <div className="space-y-1">
          <span className="text-xs uppercase font-black text-amber-300 tracking-widest font-mono">
            {chapter.title} · {chapter.biome}
          </span>
          <h2 className="font-display font-black text-2xl text-white tracking-wide drop-shadow-md">
            {chapter.subtitle}
          </h2>
          <p className="text-xs text-sky-100/80 max-w-[280px] leading-relaxed pt-1">
            {chapter.description}
          </p>
        </div>

        {/* Big Coin Bounty Display */}
        <div className="w-full py-3.5 px-4 rounded-2xl bg-amber-400/15 border-2 border-amber-400/60 shadow-inner flex items-center justify-between">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 shadow-md">
              <Coins className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-black text-amber-300 tracking-wider">
                BÔNUS DE DESCOBERTA
              </div>
              <div className="font-display font-black text-2xl text-amber-400 font-mono drop-shadow">
                +{chapter.rewardCoins} MOEDAS
              </div>
            </div>
          </div>
          <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
        </div>

        {/* Claim Button */}
        <button
          onClick={onClaim}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 hover:brightness-105 active:scale-95 text-slate-950 font-display font-black text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-transform cursor-pointer border border-yellow-200"
        >
          <span>RESGATAR +{chapter.rewardCoins} E JOGAR</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
