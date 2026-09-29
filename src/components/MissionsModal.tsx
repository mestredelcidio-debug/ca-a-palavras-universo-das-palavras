import React, { useState } from 'react';
import { X, Target, Check, Coins, Award, Sparkles, ChevronRight, Flame, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Mission } from '../data/missions';
import { ChapterData } from '../data/chapters';

interface MissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  globalMissions: Mission[];
  chapterMissions: Mission[];
  currentChapter: ChapterData;
  onClaimMission: (missionId: string, isChapterMission?: boolean) => void;
}

export const MissionsModal: React.FC<MissionsModalProps> = ({
  isOpen,
  onClose,
  globalMissions,
  chapterMissions,
  currentChapter,
  onClaimMission
}) => {
  const [activeTab, setActiveTab] = useState<'chapter' | 'global'>('chapter');

  if (!isOpen) return null;

  const handleClaim = (mission: Mission, isChapter: boolean) => {
    try {
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#fbbf24', '#34d399', '#f472b6', '#a855f7']
      });
    } catch {
      // Ignore
    }
    onClaimMission(mission.id, isChapter);
  };

  const currentList = activeTab === 'chapter' ? chapterMissions : globalMissions;
  const completedCount = currentList.filter(m => m.currentProgress >= m.targetProgress).length;
  const readyToClaimCount = currentList.filter(m => m.currentProgress >= m.targetProgress && !m.isClaimed).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] rounded-3xl bg-slate-900 border-2 border-sky-400/50 p-5 shadow-2xl flex flex-col max-h-[88vh] text-white relative animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-md">
              <Target className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-white tracking-wide">
                MISSÕES & METAS
              </h3>
              <p className="text-[11px] text-sky-300 font-semibold">
                30 missões temáticas por capítulo + metas globais
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md border border-white/50 active:scale-90 transition-all cursor-pointer"
            title="Fechar Missões"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Tab Switcher: Capítulo Atual vs Globais */}
        <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-2xl my-3 shrink-0">
          <button
            onClick={() => setActiveTab('chapter')}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all relative ${
              activeTab === 'chapter'
                ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="truncate">Capítulo: {currentChapter.subtitle} (30)</span>
            {chapterMissions.some(m => m.currentProgress >= m.targetProgress && !m.isClaimed) && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute top-1 right-2" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('global')}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all relative ${
              activeTab === 'global'
                ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Metas Globais</span>
            {globalMissions.some(m => m.currentProgress >= m.targetProgress && !m.isClaimed) && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute top-1 right-2" />
            )}
          </button>
        </div>

        {/* Status Tracker */}
        <div className="mb-3 p-3 rounded-2xl bg-gradient-to-r from-sky-950/60 via-blue-900/40 to-slate-900 border border-sky-400/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-white">
              {activeTab === 'chapter' ? `Missões de ${currentChapter.subtitle}` : 'Progresso Global'}
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-sky-400/20 text-sky-300 font-mono text-xs font-black">
            {completedCount} de {currentList.length} Concluídas
          </span>
        </div>

        {/* Missions List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 py-1">
          {currentList.map((m, idx) => {
            const isReadyToClaim = m.currentProgress >= m.targetProgress && !m.isClaimed;
            const isClaimed = m.isClaimed;
            const percent = Math.min(Math.round((m.currentProgress / m.targetProgress) * 100), 100);

            return (
              <div
                key={m.id}
                className={`p-3 rounded-2xl border transition-all ${
                  isReadyToClaim
                    ? 'bg-gradient-to-r from-amber-500/25 via-emerald-500/20 to-teal-500/25 border-amber-400 shadow-lg shadow-amber-500/10'
                    : isClaimed
                    ? 'bg-emerald-950/25 border-emerald-500/30 opacity-70'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-white/10 text-[10px] font-black text-sky-300 flex items-center justify-center shrink-0">
                        {m.missionNumber || idx + 1}
                      </span>
                      <h4 className="font-display font-black text-xs sm:text-sm text-white truncate">
                        {m.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-white/70 leading-snug mt-0.5 pl-6">
                      {m.description}
                    </p>
                  </div>

                  {/* Coin Badge */}
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-xl bg-amber-400/20 text-amber-300 text-xs font-black shrink-0">
                    <Coins className="w-3.5 h-3.5 text-amber-300" />
                    <span>+{m.rewardCoins}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2 pl-6 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-white/60 font-bold">
                    <span>Progresso</span>
                    <span className="font-mono text-sky-300">
                      {Math.min(m.currentProgress, m.targetProgress)} / {m.targetProgress} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-white/10 relative">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isReadyToClaim
                          ? 'bg-gradient-to-r from-amber-400 to-emerald-400'
                          : 'bg-gradient-to-r from-sky-500 to-cyan-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Action button */}
                <div className="mt-2.5 flex justify-end pl-6">
                  {isReadyToClaim ? (
                    <button
                      onClick={() => handleClaim(m, activeTab === 'chapter')}
                      className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 hover:brightness-105 active:scale-95 text-slate-950 font-display font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 transition-transform cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                      <span>RESGATAR (+{m.rewardCoins} MOEDAS)</span>
                    </button>
                  ) : isClaimed ? (
                    <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Missão Concluída</span>
                    </div>
                  ) : (
                    <div className="text-[10px] font-bold text-sky-200/60">
                      <span>Em andamento</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 shrink-0">
          <button
            onClick={onClose}
            className="w-full h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all cursor-pointer"
          >
            Voltar ao Jogo
          </button>
        </div>
      </div>
    </div>
  );
};
