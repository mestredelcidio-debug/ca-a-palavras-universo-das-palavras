import React from 'react';
import { X, Award, Check, Coins, Target, Eye, BookOpen, Compass, CalendarCheck, Flame, Zap } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/themes';
import { UserProfile } from '../types/game';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onClaimAchievement: (achievementId: string, reward: number) => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onClaimAchievement
}) => {
  if (!isOpen) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target': return <Target className="w-5 h-5 text-amber-400" />;
      case 'Eye': return <Eye className="w-5 h-5 text-cyan-400" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-emerald-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-purple-400" />;
      case 'CalendarCheck': return <CalendarCheck className="w-5 h-5 text-blue-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Award': return <Award className="w-5 h-5 text-yellow-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-rose-400" />;
      default: return <Award className="w-5 h-5 text-amber-400" />;
    }
  };

  const isUnlocked = (id: string): boolean => {
    const stats = profile.stats;
    switch (id) {
      case 'first_word':
        return stats.wordsFound >= 1;
      case 'words_25':
        return stats.wordsFound >= 25;
      case 'words_100':
        return stats.wordsFound >= 100;
      case 'levels_5':
        return stats.puzzlesSolved >= 5;
      case 'daily_first':
        return profile.completedDailyDates.length >= 1;
      case 'streak_3':
        return profile.dailyStreak >= 3;
      case 'hard_puzzle':
        return stats.puzzlesSolved >= 3;
      case 'no_hints':
        return stats.puzzlesSolved >= 1 && stats.hintsUsed === 0;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-amber-500/30 p-5 shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">Conquistas</h3>
              <p className="text-[11px] text-white/60">Complete desafios e ganhe moedas extras</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto pr-1 my-3 space-y-2.5">
          {ACHIEVEMENTS.map(item => {
            const unlocked = isUnlocked(item.id);
            const claimed = profile.achievements[item.id] === true;

            return (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    {getIcon(item.icon)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">{item.title}</h4>
                    <p className="text-[11px] text-white/60 leading-snug mt-0.5">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold mt-1">
                      <Coins className="w-3 h-3" />
                      <span>+{item.rewardCoins} moedas</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  {claimed ? (
                    <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[11px] font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Resgatado</span>
                    </div>
                  ) : unlocked ? (
                    <button
                      onClick={() => onClaimAchievement(item.id, item.rewardCoins)}
                      className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md shadow-amber-400/20 active:scale-95 transition-all"
                    >
                      Resgatar
                    </button>
                  ) : (
                    <div className="px-2.5 py-1 rounded-lg bg-white/5 text-white/30 text-[11px] font-semibold">
                      Bloqueado
                    </div>
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
