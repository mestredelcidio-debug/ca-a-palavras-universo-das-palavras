import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Trophy, Clock, Coins, ArrowRight, RotateCcw } from 'lucide-react';
import { formatTime } from '../utils/text';
import { SupportedLanguage } from '../types/game';
import { getTranslation } from '../data/translations';

interface VictoryModalProps {
  isOpen: boolean;
  levelNumber: number;
  categoryTitle: string;
  completionTimeSeconds: number;
  wordsFoundCount: number;
  starsEarned: number;
  coinsEarned: number;
  language?: SupportedLanguage;
  onNextLevel: () => void;
  onReplay: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  levelNumber,
  categoryTitle,
  completionTimeSeconds,
  wordsFoundCount,
  starsEarned,
  coinsEarned,
  language = 'pt',
  onNextLevel,
  onReplay
}) => {
  const t = getTranslation(language);

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#009c3b', '#ffdf00', '#002776', '#ffffff', '#10b981']
        });
      } catch {
        // Ignore confetti canvas errors gracefully
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-emerald-500/40 p-6 text-center shadow-2xl shadow-emerald-950/80 flex flex-col items-center">
        {/* Trophy Header */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-3 animate-bounce">
          <Trophy className="w-9 h-9" />
        </div>

        <h2 className="font-display font-black text-2xl text-white tracking-tight mb-1">
          {t.congratulations}
        </h2>
        <p className="text-xs text-emerald-300 font-medium mb-4">
          {t.victoryDesc} <span className="font-bold">{categoryTitle}</span>!
        </p>

        {/* Stars */}
        <div className="flex items-center justify-center gap-2 mb-5">
          {[1, 2, 3].map(num => (
            <Star
              key={num}
              className={`w-8 h-8 transition-all duration-300 ${
                num <= starsEarned
                  ? 'fill-amber-400 text-amber-400 scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                  : 'text-zinc-600 fill-zinc-800'
              }`}
            />
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 w-full mb-6 text-left">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-sky-400 shrink-0" />
            <div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">{t.time}</div>
              <div className="text-sm font-bold text-white tabular-nums">
                {formatTime(completionTimeSeconds)}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
            <Coins className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">{t.earnedCoins}</div>
              <div className="text-sm font-bold text-amber-300 tabular-nums">
                +{coinsEarned}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 w-full">
          <button
            onClick={onNextLevel}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 hover:brightness-105 active:scale-98 transition-all"
          >
            <span>{t.nextLevel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onReplay}
            className="w-full h-10 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.replay}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
