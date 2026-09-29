import React from 'react';
import { ArrowLeft, Lock, Check, Star, Coins, Sparkles, Palette } from 'lucide-react';
import { CoinPill } from './CoinPill';
import { CHAPTERS, ChapterData } from '../data/chapters';
import beachThumbnail from '../assets/images/beach_paradise_bg_1790595434475.jpg';

interface ChaptersViewProps {
  currentLevel: number;
  completedLevels: Record<number, { stars: number; time: number }>;
  coins: number;
  onGoBack: () => void;
  onSelectLevel: (lvl: number) => void;
  onOpenBackgroundSelector?: () => void;
}

export const ChaptersView: React.FC<ChaptersViewProps> = ({
  currentLevel,
  completedLevels,
  coins,
  onGoBack,
  onSelectLevel,
  onOpenBackgroundSelector
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-start pb-16 overflow-y-auto bg-gradient-to-b from-sky-400/40 via-sky-200/30 to-amber-100/50 backdrop-blur-sm">
      {/* Top Header matching Screenshot 4 */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between px-4 py-3 shrink-0 sticky top-0 bg-slate-900/60 backdrop-blur-md z-30 border-b border-white/20">
        <div className="flex items-center gap-2">
          <button
            onClick={onGoBack}
            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg border border-white/40 active:scale-95 transition-transform cursor-pointer"
            title="Voltar ao Início"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {onOpenBackgroundSelector && (
            <button
              onClick={onOpenBackgroundSelector}
              className="w-10 h-10 rounded-full bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 flex items-center justify-center shadow-lg border border-white/40 active:scale-95 transition-transform cursor-pointer"
              title="Escolher Cenários e Fundos do Jogo"
            >
              <Palette className="w-5 h-5 stroke-[2.2]" />
            </button>
          )}
        </div>

        <h1 className="font-display font-black text-sm text-white uppercase tracking-wider">
          Capítulos do Brasil (30)
        </h1>

        <CoinPill coins={coins} onOpenRewardBoxes={() => {}} />
      </header>

      {/* Chapters Cards Container with All 25 Brazilian Biomes */}
      <main className="w-full max-w-md mx-auto px-4 space-y-4 pt-3">
        {CHAPTERS.map(chapter => {
          const isChapterUnlocked = currentLevel >= chapter.startLevel;
          const isChapterCurrent = currentLevel >= chapter.startLevel && currentLevel <= chapter.endLevel;
          const isChapterCompleted = currentLevel > chapter.endLevel;

          const chapterLevels: number[] = [];
          for (let lvl = chapter.startLevel; lvl <= chapter.endLevel; lvl++) {
            chapterLevels.push(lvl);
          }

          // Count stars
          let starsCount = 0;
          chapterLevels.forEach(l => {
            if (completedLevels[l]) starsCount += completedLevels[l].stars;
          });

          return (
            <div
              key={chapter.id}
              className={`w-full rounded-2xl bg-[#fffef5] border-2 border-white shadow-xl overflow-hidden transition-all ${
                !isChapterUnlocked ? 'opacity-85' : ''
              }`}
            >
              {/* Header Banner */}
              <div
                className="py-3 px-4 text-center text-white relative shadow-inner"
                style={{ backgroundColor: chapter.accentColor }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/80">
                    {chapter.title}
                  </span>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/25 text-amber-300 font-mono text-[10px] font-bold">
                    <Coins className="w-3 h-3 text-amber-300" />
                    <span>+{chapter.rewardCoins}</span>
                  </div>
                </div>

                <h2 className="font-display font-black text-lg sm:text-xl text-white tracking-wider uppercase drop-shadow-sm mt-0.5">
                  {chapter.subtitle}
                </h2>

                <div className="flex items-center justify-center gap-2 text-[10px] text-white/95 font-semibold mt-0.5">
                  <span>{chapter.biome}</span>
                  <span>·</span>
                  <span>30 Fases ({chapter.startLevel} a {chapter.endLevel})</span>
                  {starsCount > 0 && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-0.5 text-amber-300">
                        <Star className="w-3 h-3 fill-amber-300" />
                        <span>{starsCount}</span>
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-3.5">
                {/* Postcards Row */}
                <div className="flex items-center justify-center gap-2.5">
                  {/* Postcard 1 */}
                  <div
                    onClick={() => isChapterUnlocked && onSelectLevel(chapter.startLevel)}
                    className="w-20 h-28 rounded-xl overflow-hidden border-2 border-blue-400 shadow-md cursor-pointer hover:scale-105 transition-transform relative bg-sky-100"
                  >
                    <img
                      src={beachThumbnail}
                      alt={chapter.subtitle}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Postcard 2 */}
                  <div className="w-20 h-28 rounded-xl bg-slate-300 border-2 border-slate-200 shadow-sm flex items-center justify-center relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-md flex items-center justify-center border border-yellow-100">
                      {currentLevel > chapter.startLevel + 14 ? (
                        <Check className="w-4 h-4 text-emerald-950 stroke-[3]" />
                      ) : (
                        <Lock className="w-4 h-4 text-amber-950 stroke-[2.5]" />
                      )}
                    </div>
                  </div>

                  {/* Postcard 3 */}
                  <div className="w-20 h-28 rounded-xl bg-slate-300 border-2 border-slate-200 shadow-sm flex items-center justify-center relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-md flex items-center justify-center border border-yellow-100">
                      {isChapterCompleted ? (
                        <Check className="w-4 h-4 text-emerald-950 stroke-[3]" />
                      ) : (
                        <Lock className="w-4 h-4 text-amber-950 stroke-[2.5]" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Sub-Banner: 30 Fases e Missões */}
                <div className="w-full py-1.5 bg-[#f5ebd7] text-center border-y border-[#e2d5bd] flex items-center justify-center gap-2">
                  <span className="font-display font-black text-xs text-[#1e58b8] tracking-widest uppercase">
                    30 FASES & 30 MISSÕES
                  </span>
                </div>

                {/* Level Circles Grid: 6 columns x 5 rows = 30 levels per chapter */}
                <div className="grid grid-cols-6 gap-2 pt-1 max-h-[180px] overflow-y-auto p-1 scrollbar-thin">
                  {chapterLevels.map(lvl => {
                    const isCompleted = !!completedLevels[lvl];
                    const isCurrent = lvl === currentLevel;
                    const isUnlocked = isCompleted || lvl <= currentLevel;

                    return (
                      <button
                        key={lvl}
                        onClick={() => isUnlocked && onSelectLevel(lvl)}
                        disabled={!isUnlocked}
                        className={`aspect-square rounded-xl font-display font-black text-xs flex flex-col items-center justify-center shadow-sm transition-all ${
                          isCurrent
                            ? 'bg-[#135cd4] text-white border-2 border-white ring-2 ring-blue-500/50 scale-105 shadow-md active:scale-95 cursor-pointer'
                            : isCompleted
                            ? 'bg-emerald-600 text-white border border-emerald-400 active:scale-95 cursor-pointer'
                            : isUnlocked
                            ? 'bg-[#135cd4] text-white border border-blue-400 active:scale-95 cursor-pointer'
                            : 'bg-slate-200 text-slate-400 border border-slate-300 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        {isCompleted ? (
                          <div className="flex flex-col items-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span className="text-[9px] leading-none">{lvl}</span>
                          </div>
                        ) : !isUnlocked ? (
                          <Lock className="w-3 h-3 text-slate-400" />
                        ) : (
                          lvl
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};
