import React from 'react';
import { X, MapPin, Star, Lock, Check, ChevronRight } from 'lucide-react';
import { CHAPTERS, ChapterData } from '../data/chapters';

interface ChapterSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: number;
  completedLevels: Record<number, { stars: number; time: number }>;
  onSelectChapter: (chapter: ChapterData) => void;
}

export const ChapterSelectModal: React.FC<ChapterSelectModalProps> = ({
  isOpen,
  onClose,
  currentLevel,
  completedLevels,
  onSelectChapter
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-indigo-500/40 p-5 shadow-2xl flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-400/20 text-indigo-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">Mundos do Universo</h3>
              <p className="text-[11px] text-indigo-300 font-medium">Expedição pelas galáxias e constelações</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chapters list */}
        <div className="flex-1 overflow-y-auto pr-1 my-3 space-y-2.5">
          {CHAPTERS.map(chapter => {
            const isUnlocked = currentLevel >= chapter.startLevel;
            const isCompleted = currentLevel > chapter.endLevel;
            const isCurrent = currentLevel >= chapter.startLevel && currentLevel <= chapter.endLevel;

            // Calculate stars in this chapter
            let starsInChapter = 0;
            for (let lvl = chapter.startLevel; lvl <= chapter.endLevel; lvl++) {
              if (completedLevels[lvl]) {
                starsInChapter += completedLevels[lvl].stars;
              }
            }
            const maxStars = (chapter.endLevel - chapter.startLevel + 1) * 3;

            return (
              <div
                key={chapter.id}
                onClick={() => {
                  if (isUnlocked) {
                    onSelectChapter(chapter);
                    onClose();
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isUnlocked ? 'cursor-pointer active:scale-98' : 'opacity-60 cursor-not-allowed'
                } ${
                  isCurrent
                    ? 'bg-gradient-to-r from-emerald-950/80 to-slate-900 border-emerald-400/80 shadow-lg shadow-emerald-950/50 ring-2 ring-emerald-400/30'
                    : isCompleted
                    ? 'bg-slate-900/90 border-emerald-600/40 text-white'
                    : 'bg-white/5 border-white/10 text-white/60'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center font-display font-black text-sm shrink-0 ${
                        isCurrent
                          ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-400/30'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : !isUnlocked ? <Lock className="w-4 h-4" /> : chapter.id}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">
                          {chapter.title}: {chapter.subtitle}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[9px] font-black uppercase">
                            Atual
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-white/60 mt-0.5 line-clamp-1">
                        {chapter.description}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-emerald-300/90 font-semibold mt-1">
                        <span>Fases {chapter.startLevel} - {chapter.endLevel}</span>
                        {isUnlocked && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-0.5 text-amber-300">
                              <Star className="w-3 h-3 fill-amber-300" />
                              <span>{starsInChapter}/{maxStars}</span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {isUnlocked && (
                    <ChevronRight className="w-4 h-4 text-white/40 shrink-0" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
