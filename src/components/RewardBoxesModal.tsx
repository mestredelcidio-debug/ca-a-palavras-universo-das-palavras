import React, { useState } from 'react';
import { X, Play, Sparkles, Check, Film, Gift, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';
import { REWARD_BOXES, RewardBox } from '../data/rewardBoxes';
import { showRewardedAd } from '../utils/ads';

interface RewardBoxesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimCoins: (amount: number) => void;
  claimedBoxIds?: number[];
}

export const RewardBoxesModal: React.FC<RewardBoxesModalProps> = ({
  isOpen,
  onClose,
  onClaimCoins,
  claimedBoxIds = []
}) => {
  const [claimedBoxes, setClaimedBoxes] = useState<number[]>(claimedBoxIds);

  if (!isOpen) return null;

  const handleStartWatchAd = (box: RewardBox) => {
    // Trigger Google Rewarded Ad
    showRewardedAd(`reward_box_${box.id}`, () => {
      // Ad finished successfully
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#ffffff']
        });
      } catch {}

      onClaimCoins(box.coinsReward);
      setClaimedBoxes(prev => [...prev, box.id]);
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] rounded-3xl bg-slate-900 border-2 border-amber-400/60 p-4 sm:p-5 shadow-2xl flex flex-col max-h-[92vh] text-white relative animate-scaleUp overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-amber-500/15 via-yellow-500/5 to-transparent pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center shadow-lg font-black">
              <Gift className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <h3 className="font-display font-black text-base sm:text-lg text-white tracking-wide">
                5 CAIXAS DE MOEDAS GRÁTIS
              </h3>
              <p className="text-[11px] text-amber-300 font-bold">
                Assista a vídeos rápidos e ganhe recompensas crescentes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md border border-white/50 active:scale-90 transition-all cursor-pointer"
            title="Fechar"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* 5 BOXES LIST */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 py-3 scrollbar-thin">
          <div className="text-[11px] font-bold text-white/70 px-1">
            Cada caixa concede uma quantia maior de moedas grátis:
          </div>

          {REWARD_BOXES.map(box => {
            const isClaimed = claimedBoxes.includes(box.id);

            return (
              <div
                key={box.id}
                className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                  isClaimed
                    ? 'bg-white/5 border-white/10 opacity-70'
                    : `bg-gradient-to-r ${box.gradient} ${box.border} shadow-lg hover:scale-[1.01]`
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0 border border-white/30"
                    style={{ backgroundColor: box.accentColor }}
                  >
                    {box.iconType === 'wood' && <span className="text-2xl">📦</span>}
                    {box.iconType === 'bronze' && <span className="text-2xl">🎁</span>}
                    {box.iconType === 'silver' && <span className="text-2xl">💎</span>}
                    {box.iconType === 'gold' && <span className="text-2xl">🌟</span>}
                    {box.iconType === 'legendary' && <span className="text-2xl">👑</span>}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold text-amber-300">
                        Caixa #{box.id}
                      </span>
                    </div>
                    <h4 className="font-display font-black text-sm text-white truncate">
                      {box.title}
                    </h4>
                    <p className="text-[10px] text-white/80">
                      {box.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="px-2 py-0.5 rounded-full bg-black/40 border border-white/20 text-amber-300 font-mono font-black text-xs">
                    +{box.coinsReward} 🪙
                  </div>

                  <button
                    onClick={() => handleStartWatchAd(box)}
                    disabled={isClaimed}
                    className={`py-1 px-3 rounded-xl font-display font-black text-[10px] uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center gap-1 cursor-pointer ${
                      isClaimed 
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950'
                    }`}
                  >
                    {isClaimed ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>COLETADO</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-slate-950" />
                        <span>ASSISTIR</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2.5 border-t border-white/10 shrink-0 flex items-center justify-between text-xs text-white/70">
          <span>Total disponível: <strong>+1.300 Moedas Grátis</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
