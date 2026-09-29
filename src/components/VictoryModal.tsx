import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Star, Trophy, Clock, Coins, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
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
  const [autoAdvanceSeconds, setAutoAdvanceSeconds] = useState<number>(3);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setAutoAdvanceSeconds(3);

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#009c3b', '#ffdf00', '#002776', '#ffffff', '#10b981', '#f59e0b']
        });
      } catch {
        // Ignore confetti errors
      }

      // Auto-advance countdown timer
      const interval = setInterval(() => {
        setAutoAdvanceSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            onNextLevel();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      timerRef.current = interval;

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [isOpen, onNextLevel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm rounded-3xl bg-slate-900 border-2 border-emerald-500/60 p-6 text-center shadow-2xl shadow-emerald-950/80 flex flex-col items-center relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-emerald-500/20 to-transparent pointer-events-none" />

        {/* Trophy Header */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-3 animate-bounce relative z-10">
          <Trophy className="w-9 h-9" />
        </div>

        {/* Mission Passed Banner */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VOCÊ PASSOU DE MISSÃO!</span>
        </div>

        <h2 className="font-display font-black text-2xl text-white tracking-tight mb-1">
          Missão {levelNumber} Concluída!
        </h2>
        <p className="text-xs text-emerald-200 font-medium mb-4">
          Excelente desempenho em <span className="font-bold text-white">{categoryTitle}</span>!
        </p>

        {/* Stars */}
        <div className="flex items-center justify-center gap-2 mb-4">
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
        <div className="grid grid-cols-2 gap-2.5 w-full mb-4 text-left">
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

        {/* Automatic Advance Indicator */}
        <div className="w-full mb-4 p-2.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex flex-col gap-1.5 text-center">
          <div className="flex items-center justify-between text-[11px] text-emerald-200 font-bold px-1">
            <span>Avançando automaticamente...</span>
            <span className="font-mono text-amber-300 text-xs font-black">{autoAdvanceSeconds}s</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-amber-300 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${(autoAdvanceSeconds / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={() => {
              if (timerRef.current) clearInterval(timerRef.current);
              onNextLevel();
            }}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>PRÓXIMA MISSÃO</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>

          <button
            onClick={() => {
              if (timerRef.current) clearInterval(timerRef.current);
              onReplay();
            }}
            className="w-full h-9 rounded-xl bg-white/10 hover:bg-white/15 text-white/70 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Jogar Esta Novamente</span>
          </button>
        </div>
      </div>
    </div>
  );
};
