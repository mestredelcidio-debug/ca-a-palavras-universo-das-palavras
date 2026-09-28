import React from 'react';
import { Lightbulb, Compass, Eye, Sparkles, Coins } from 'lucide-react';
import { SupportedLanguage } from '../types/game';
import { getTranslation } from '../data/translations';

interface ControlsProps {
  coins: number;
  leftHanded?: boolean;
  language?: SupportedLanguage;
  onHintFirstLetter: () => void;
  onHintDirection: () => void;
  onHintRevealWord: () => void;
  onHintClearFalse: () => void;
  disabled?: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  coins,
  leftHanded = false,
  language = 'pt',
  onHintFirstLetter,
  onHintDirection,
  onHintRevealWord,
  onHintClearFalse,
  disabled = false
}) => {
  const t = getTranslation(language);

  const hints = [
    {
      id: 'first',
      label: t.hintFirstLetter,
      cost: 25,
      icon: Lightbulb,
      action: onHintFirstLetter,
      color: 'from-amber-500/20 to-amber-600/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'dir',
      label: t.hintDirection,
      cost: 35,
      icon: Compass,
      action: onHintDirection,
      color: 'from-cyan-500/20 to-cyan-600/20 text-cyan-300 border-cyan-500/30'
    },
    {
      id: 'clear',
      label: t.hintClear,
      cost: 40,
      icon: Sparkles,
      action: onHintClearFalse,
      color: 'from-purple-500/20 to-purple-600/20 text-purple-300 border-purple-500/30'
    },
    {
      id: 'reveal',
      label: t.hintReveal,
      cost: 65,
      icon: Eye,
      action: onHintRevealWord,
      color: 'from-emerald-500/20 to-emerald-600/20 text-emerald-300 border-emerald-500/30'
    }
  ];

  const orderedHints = leftHanded ? [...hints].reverse() : hints;

  return (
    <div className="w-full max-w-lg mx-auto px-3 py-2 shrink-0">
      <div className="grid grid-cols-4 gap-2">
        {orderedHints.map(hint => {
          const Icon = hint.icon;
          const canAfford = coins >= hint.cost;
          const isDisabled = disabled || !canAfford;

          return (
            <button
              key={hint.id}
              onClick={hint.action}
              disabled={isDisabled}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border bg-gradient-to-b transition-all active:scale-95 ${
                isDisabled
                  ? 'opacity-40 border-white/5 bg-white/5 text-white/40 cursor-not-allowed'
                  : `${hint.color} hover:brightness-110 shadow-sm`
              }`}
            >
              <div className="flex items-center gap-1 mb-0.5">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold tracking-tight whitespace-nowrap">
                {hint.label}
              </span>
              <span className="flex items-center gap-0.5 text-[10px] opacity-90 tabular-nums font-semibold mt-0.5">
                <Coins className="w-2.5 h-2.5" />
                {hint.cost}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
