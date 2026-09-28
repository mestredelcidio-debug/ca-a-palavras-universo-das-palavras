import React from 'react';
import { Check } from 'lucide-react';
import { PlacedWord, SupportedLanguage } from '../types/game';
import { getTranslation } from '../data/translations';

interface WordListProps {
  words: PlacedWord[];
  categoryTitle: string;
  highContrast?: boolean;
  language?: SupportedLanguage;
}

export const WordList: React.FC<WordListProps> = ({
  words,
  categoryTitle,
  highContrast = false,
  language = 'pt'
}) => {
  const t = getTranslation(language);
  const foundCount = words.filter(w => w.found).length;
  const totalCount = words.length;

  return (
    <div className="w-full max-w-lg mx-auto px-3 py-2 flex flex-col gap-2">
      {/* Category and Progress Counter */}
      <div className="flex items-center justify-between text-xs text-white/70 px-1 font-medium">
        <span className="flex items-center gap-1.5 font-semibold text-white/90">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {categoryTitle}
        </span>
        <span className="tabular-nums font-bold text-amber-300">
          {foundCount} / {totalCount} {t.foundOf}
        </span>
      </div>

      {/* Words Tags Container */}
      <div className="flex flex-wrap gap-1.5 justify-center max-h-36 overflow-y-auto p-1.5 rounded-xl bg-black/20 border border-white/5 scrollbar-thin">
        {words.map((item, index) => {
          const isFound = item.found;
          return (
            <div
              key={`${item.normalized}-${index}`}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 select-none ${
                isFound
                  ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 line-through opacity-75 scale-95'
                  : highContrast
                  ? 'bg-zinc-800 text-white border border-zinc-600'
                  : 'bg-white/10 text-white/90 border border-white/10 hover:bg-white/15'
              }`}
            >
              {isFound ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[3]" />
              ) : (
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color || '#10b981' }}
                />
              )}
              <span className="font-mono text-[11px] sm:text-xs">
                {item.cleanDisplay}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
