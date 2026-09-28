import React, { useState } from 'react';
import { X, Gift, Calendar, Check, Lock, Coins, Clock, Star, Flame, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DAILY_GIFTS, isGiftAvailableToday, getTimeUntilNextGift } from '../data/dailyGifts';
import { getTodayDateString } from '../utils/text';
import { SupportedLanguage } from '../types/game';
import { getTranslation } from '../data/translations';

interface DailyHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  lastClaimedDate: string;
  currentStreakDay: number;
  dailyStreak: number;
  completedDates: string[];
  language?: SupportedLanguage;
  onClaimGift: (day: number, coins: number, isSpecial?: boolean) => void;
  onStartDailyChallenge: () => void;
  initialTab?: 'gifts' | 'challenge';
}

export const DailyHubModal: React.FC<DailyHubModalProps> = ({
  isOpen,
  onClose,
  lastClaimedDate,
  currentStreakDay,
  dailyStreak,
  completedDates,
  language = 'pt',
  onClaimGift,
  onStartDailyChallenge,
  initialTab = 'gifts'
}) => {
  const [activeTab, setActiveTab] = useState<'gifts' | 'challenge'>(initialTab);

  if (!isOpen) return null;

  const t = getTranslation(language);
  const canClaimGiftToday = isGiftAvailableToday(lastClaimedDate);
  const activeDay = Math.min(Math.max(currentStreakDay || 1, 1), 7);
  const timeUntilNext = getTimeUntilNextGift();

  // Calendar calculations for current month
  const todayStr = getTodayDateString();
  const isChallengeDoneToday = completedDates.includes(todayStr);
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = now.toLocaleDateString(language === 'pt' ? 'pt-BR' : language, { month: 'long', year: 'numeric' });

  const handleClaim = (dayItem: typeof DAILY_GIFTS[0]) => {
    if (!canClaimGiftToday || dayItem.day !== activeDay) return;

    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#fbbf24', '#10b981', '#3b82f6', '#ec4899', '#f59e0b']
      });
    } catch {
      // Ignore
    }

    onClaimGift(dayItem.day, dayItem.coins, dayItem.isSpecial);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-amber-500/40 p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-amber-400/20 text-amber-300 ring-2 ring-amber-400/30">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-base text-white tracking-tight">
                {t.dailyActivities}
              </h3>
              <p className="text-[11px] text-amber-300 font-semibold">
                {t.dailyGifts} & {t.dailyChallenge}
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

        {/* Tab switch: Presentes Diários vs Desafio Diário */}
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-2xl my-3 shrink-0">
          <button
            onClick={() => setActiveTab('gifts')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all relative ${
              activeTab === 'gifts'
                ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>{t.dailyGifts}</span>
            {canClaimGiftToday && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute top-1.5 right-2" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('challenge')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'challenge'
                ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.dailyChallenge}</span>
          </button>
        </div>

        {/* TAB 1: PRESENTES DIÁRIOS */}
        {activeTab === 'gifts' && (
          <div className="space-y-3">
            {/* Status Banner */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-emerald-500/20 border border-amber-500/30 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{t.consecutiveDays}</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black">
                    {t.day} {activeDay} / 7
                  </span>
                </div>
                <div className="text-[11px] text-white/70 mt-0.5">
                  {canClaimGiftToday
                    ? `🎁 ${t.giftReady}`
                    : `${t.nextGiftIn} ${timeUntilNext}`}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-amber-400 font-mono">
                  {t.day} {activeDay}
                </span>
              </div>
            </div>

            {/* 7 Days Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {DAILY_GIFTS.map(item => {
                const isClaimedPast = item.day < activeDay || (item.day === activeDay && !canClaimGiftToday);
                const isReadyToClaim = item.day === activeDay && canClaimGiftToday;
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
                    <div className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-wider mb-1">
                      <span>{t.day} {item.day}</span>
                      {isClaimedPast && <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />}
                      {isReadyToClaim && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      )}
                      {isLockedFuture && <Lock className="w-3 h-3 text-white/40" />}
                    </div>

                    <div className="my-1.5 flex items-center justify-center">
                      {isDay7 ? (
                        <div className="relative">
                          <Gift className="w-8 h-8 text-amber-300 animate-pulse" />
                          <Star className="w-3 h-3 fill-amber-300 text-amber-300 absolute -top-1 -right-1" />
                        </div>
                      ) : (
                        <Coins className={`w-5 h-5 ${isReadyToClaim ? 'text-amber-300' : 'text-white/60'}`} />
                      )}
                    </div>

                    <div className="font-display font-black text-xs text-amber-300 tabular-nums">
                      +{item.coins}
                    </div>
                    <div className="text-[9px] text-white/60 leading-tight line-clamp-1">
                      {isDay7 ? t.superChest : item.title}
                    </div>

                    {isReadyToClaim && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleClaim(item);
                        }}
                        className="w-full mt-2 py-1 px-1 rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md transition-transform"
                      >
                        {t.claimDailyGift}!
                      </button>
                    )}

                    {isClaimedPast && (
                      <div className="mt-1 text-[9px] font-bold text-emerald-400">
                        {t.giftCollected}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Claim button */}
            {canClaimGiftToday ? (
              <button
                onClick={() => {
                  const currentItem = DAILY_GIFTS.find(g => g.day === activeDay);
                  if (currentItem) handleClaim(currentItem);
                }}
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-400/30 hover:brightness-105 active:scale-98 transition-all"
              >
                <Gift className="w-5 h-5 fill-slate-950" />
                <span>{t.claimDailyGift} {t.day} {activeDay} (+{DAILY_GIFTS[activeDay - 1]?.coins || 50} {t.coins})</span>
              </button>
            ) : (
              <div className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-center flex items-center justify-center gap-2 text-xs text-white/70 font-semibold">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{t.nextGiftIn} {timeUntilNext}</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DESAFIO DIÁRIO */}
        {activeTab === 'challenge' && (
          <div className="space-y-3">
            {/* Streak banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Flame className="w-6 h-6 text-amber-400 fill-amber-400 animate-pulse" />
                <div>
                  <div className="text-xs font-bold text-white">{t.streak}</div>
                  <div className="text-[11px] text-cyan-300">
                    {dailyStreak > 0 ? `${dailyStreak} ${t.daysStreak}!` : '🔥'}
                  </div>
                </div>
              </div>
              <div className="text-xl font-black text-amber-400 font-mono">
                {dailyStreak} 🔥
              </div>
            </div>

            {/* Calendar */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[11px] font-bold text-white/60 mb-2 uppercase tracking-wider flex items-center justify-between">
                <span className="capitalize">{monthName}</span>
                <span className="text-emerald-400 font-mono font-bold">
                  {completedDates.filter(d => d.startsWith(`${year}-${(month + 1).toString().padStart(2, '0')}`)).length}/{daysInMonth}
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
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
                          ? 'bg-emerald-500/30 border border-emerald-500/60 text-emerald-300 font-bold'
                          : isToday
                          ? 'bg-amber-400/20 border border-amber-400 text-amber-300 ring-2 ring-amber-400/40'
                          : isPast
                          ? 'bg-white/5 text-white/30'
                          : 'bg-white/5 text-white/60'
                      }`}
                    >
                      <span className="text-[11px]">{dayNum}</span>
                      {isDone && <Check className="w-2.5 h-2.5 text-emerald-400 stroke-[3] mt-0.5" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => {
                onClose();
                onStartDailyChallenge();
              }}
              disabled={isChallengeDoneToday}
              className={`w-full h-12 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                isChallengeDoneToday
                  ? 'bg-white/10 text-white/40 border border-white/5 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 hover:brightness-110 shadow-cyan-500/20 active:scale-98'
              }`}
            >
              {isChallengeDoneToday ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                  <span>{t.challengeCompletedToday}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>{t.playTodayChallenge} (+150 {t.coins})</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
