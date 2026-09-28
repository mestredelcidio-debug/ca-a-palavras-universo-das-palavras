import React from 'react';
import { Calendar, Flame, Check, X, Trophy, Play } from 'lucide-react';
import { getTodayDateString } from '../utils/text';

interface DailyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDaily: () => void;
  dailyStreak: number;
  completedDates: string[];
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  isOpen,
  onClose,
  onStartDaily,
  dailyStreak,
  completedDates
}) => {
  if (!isOpen) return null;

  const todayStr = getTodayDateString();
  const isTodayCompleted = completedDates.includes(todayStr);

  // Generate current month days
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-amber-500/30 p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">Desafio Diário</h3>
              <p className="text-[11px] text-white/60 capitalize">{monthName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Streak banner */}
        <div className="my-4 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Flame className="w-6 h-6 text-amber-400 fill-amber-400 animate-pulse" />
            <div>
              <div className="text-xs font-bold text-white">Sequência Atual</div>
              <div className="text-[11px] text-amber-300">
                {dailyStreak > 0 ? `${dailyStreak} dias seguidos!` : 'Comece sua sequência hoje!'}
              </div>
            </div>
          </div>
          <div className="text-xl font-black text-amber-400 font-mono">
            {dailyStreak} 🔥
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="mb-4">
          <div className="text-[11px] font-semibold text-white/50 mb-2 uppercase tracking-wider">
            Histórico do Mês
          </div>
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
              <span key={i} className="text-[10px] font-bold text-white/40 pb-1">
                {d}
              </span>
            ))}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;
              const isPast = dayNum < now.getDate();
              const isToday = dayNum === now.getDate();
              const isDone = completedDates.includes(dateStr);

              return (
                <div
                  key={dayNum}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-semibold relative transition-all ${
                    isDone
                      ? 'bg-emerald-500/25 border border-emerald-500/50 text-emerald-300 font-bold'
                      : isToday
                      ? 'bg-amber-400/20 border border-amber-400 text-amber-300 ring-2 ring-amber-400/30'
                      : isPast
                      ? 'bg-white/5 text-white/30'
                      : 'bg-white/5 text-white/60'
                  }`}
                >
                  <span className="text-[11px]">{dayNum}</span>
                  {isDone && <Check className="w-2.5 h-2.5 text-emerald-400 mt-0.5" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            onClose();
            onStartDaily();
          }}
          disabled={isTodayCompleted}
          className={`w-full h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
            isTodayCompleted
              ? 'bg-white/10 text-white/40 border border-white/5 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 hover:brightness-110 shadow-amber-500/20 active:scale-98'
          }`}
        >
          {isTodayCompleted ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Desafio de Hoje Concluído!</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Jogar Desafio de Hoje (+150 Moedas)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
