import React, { useState } from 'react';
import { X, Gift, Check, Lock, Sparkles, Coins, Clock, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DAILY_GIFTS, isGiftAvailableToday, getTimeUntilNextGift } from '../data/dailyGifts';

interface DailyGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  lastClaimedDate: string;
  currentStreakDay: number;
  onClaimGift: (day: number, coins: number, isSpecial?: boolean) => void;
}

export const DailyGiftModal: React.FC<DailyGiftModalProps> = ({
  isOpen,
  onClose,
  lastClaimedDate,
  currentStreakDay,
  onClaimGift
}) => {
  const [justClaimed, setJustClaimed] = useState<number | null>(null);

  if (!isOpen) return null;

  const canClaimToday = isGiftAvailableToday(lastClaimedDate);
  // Current active day (between 1 and 7)
  const activeDay = Math.min(Math.max(currentStreakDay || 1, 1), 7);
  const timeUntilNext = getTimeUntilNextGift();

  const handleClaim = (dayItem: typeof DAILY_GIFTS[0]) => {
    if (!canClaimToday || dayItem.day !== activeDay) return;

    setJustClaimed(dayItem.day);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#fbbf24', '#10b981', '#3b82f6', '#ec4899', '#f59e0b']
      });
    } catch {
      // Ignore confetti canvas errors
    }

    onClaimGift(dayItem.day, dayItem.coins, dayItem.isSpecial);

    setTimeout(() => {
      setJustClaimed(null);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-amber-500/40 p-5 shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-amber-400/20 text-amber-300 ring-2 ring-amber-400/30">
              <Gift className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-white tracking-tight">
                Presentes Diários
              </h3>
              <p className="text-[11px] text-amber-300 font-semibold">
                Volte todos os dias para recompensas maiores!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Banner */}
        <div className="my-3 p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-emerald-500/20 border border-amber-500/30 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Sequência de Recompensas</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black">
                Dia {activeDay} de 7
              </span>
            </div>
            <div className="text-[11px] text-white/70 mt-0.5">
              {canClaimToday
                ? '🎁 Seu presente de hoje está liberado!'
                : `Próximo presente em ${timeUntilNext}`}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-amber-400 font-mono">
              Dia {activeDay}
            </span>
          </div>
        </div>

        {/* 7-Days Cards Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 my-2">
          {DAILY_GIFTS.map(item => {
            const isClaimedPast = item.day < activeDay || (item.day === activeDay && !canClaimToday);
            const isReadyToClaim = item.day === activeDay && canClaimToday;
            const isLockedFuture = item.day > activeDay;
            const isDay7 = item.isSpecial;

            return (
              <div
                key={item.day}
                onClick={() => isReadyToClaim && handleClaim(item)}
                className={`relative flex flex-col items-center justify-between p-2.5 rounded-2xl border text-center transition-all ${
                  isDay7 ? 'col-span-3 sm:col-span-2 bg-gradient-to-br from-amber-500/25 via-emerald-500/20 to-teal-500/30 border-amber-400 shadow-lg' : ''
                } ${
                  isClaimedPast
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 opacity-80'
                    : isReadyToClaim
                    ? 'bg-gradient-to-b from-amber-500/30 to-amber-600/20 border-amber-400 text-white shadow-xl shadow-amber-500/20 scale-[1.03] cursor-pointer ring-2 ring-amber-400/50'
                    : 'bg-white/5 border-white/10 text-white/50 opacity-65'
                }`}
              >
                {/* Badge top */}
                <div className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-wider mb-1">
                  <span>Dia {item.day}</span>
                  {isClaimedPast && <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />}
                  {isReadyToClaim && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  )}
                  {isLockedFuture && <Lock className="w-3 h-3 text-white/40" />}
                </div>

                {/* Icon */}
                <div className="my-1.5 flex items-center justify-center">
                  {isDay7 ? (
                    <div className="relative">
                      <Gift className="w-9 h-9 text-amber-300 animate-pulse" />
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300 absolute -top-1 -right-1" />
                    </div>
                  ) : item.day % 2 === 0 ? (
                    <Sparkles className={`w-6 h-6 ${isReadyToClaim ? 'text-amber-300' : 'text-white/60'}`} />
                  ) : (
                    <Coins className={`w-6 h-6 ${isReadyToClaim ? 'text-amber-300' : 'text-white/60'}`} />
                  )}
                </div>

                {/* Reward count */}
                <div className="font-display font-black text-xs text-amber-300 tabular-nums">
                  +{item.coins}
                </div>
                <div className="text-[9px] text-white/60 leading-tight line-clamp-1">
                  {item.title}
                </div>

                {/* Collect Button on Card */}
                {isReadyToClaim && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleClaim(item);
                    }}
                    className="w-full mt-2 py-1 px-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md transition-transform"
                  >
                    Resgatar!
                  </button>
                )}

                {isClaimedPast && (
                  <div className="mt-1 text-[9px] font-bold text-emerald-400 flex items-center gap-0.5">
                    <span>Coletado</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Big CTA when available */}
        {canClaimToday ? (
          <button
            onClick={() => {
              const currentItem = DAILY_GIFTS.find(g => g.day === activeDay);
              if (currentItem) handleClaim(currentItem);
            }}
            className="w-full mt-3 h-12 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-400/30 hover:brightness-105 active:scale-98 transition-all"
          >
            <Gift className="w-5 h-5 fill-slate-950" />
            <span>Resgatar Presente do Dia {activeDay} (+{DAILY_GIFTS[activeDay - 1]?.coins || 50} Moedas)</span>
          </button>
        ) : (
          <div className="w-full mt-3 p-3 rounded-2xl bg-white/5 border border-white/10 text-center flex items-center justify-center gap-2 text-xs text-white/70 font-semibold">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Você já garantiu seu presente de hoje! Volte em {timeUntilNext}</span>
          </div>
        )}
      </div>
    </div>
  );
};
