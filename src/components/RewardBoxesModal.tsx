import React, { useState, useEffect } from 'react';
import { X, Play, Sparkles, Check, Film, Gift, Coins, Trophy, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { REWARD_BOXES, RewardBox } from '../data/rewardBoxes';

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
  const [activeWatchingBox, setActiveWatchingBox] = useState<RewardBox | null>(null);
  const [adCountdown, setAdCountdown] = useState<number>(4);
  const [adFinished, setAdFinished] = useState<boolean>(false);
  const [claimedBoxes, setClaimedBoxes] = useState<number[]>(claimedBoxIds);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeWatchingBox) {
      setAdCountdown(4);
      setAdFinished(false);

      timer = setInterval(() => {
        setAdCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setAdFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeWatchingBox]);

  if (!isOpen) return null;

  const handleStartWatchAd = (box: RewardBox) => {
    setActiveWatchingBox(box);
  };

  const handleCollectReward = () => {
    if (!activeWatchingBox) return;

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#ffffff']
      });
    } catch {}

    onClaimCoins(activeWatchingBox.coinsReward);
    setClaimedBoxes(prev => [...prev, activeWatchingBox.id]);
    setActiveWatchingBox(null);
    setAdFinished(false);
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

        {/* AD PLAYER SIMULATION OVERLAY */}
        {activeWatchingBox && (
          <div className="absolute inset-0 bg-slate-950/95 z-30 flex flex-col items-center justify-center p-5 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-3xl bg-amber-400/20 border-2 border-amber-400 text-amber-300 flex items-center justify-center mb-3 shadow-lg animate-pulse">
              <Film className="w-8 h-8" />
            </div>

            <span className="text-[10px] font-black uppercase text-amber-400 tracking-widest mb-1">
              Vídeo Patrocinado em Andamento
            </span>
            <h4 className="font-display font-black text-lg text-white mb-2">
              {activeWatchingBox.title}
            </h4>

            {/* Countdown / Progress Bar */}
            {!adFinished ? (
              <div className="w-full max-w-[280px] flex flex-col gap-2 my-4">
                <div className="flex items-center justify-between text-xs text-white/80 font-bold px-1">
                  <span>Carregando recompensa...</span>
                  <span className="font-mono text-amber-300 text-sm font-black">{adCountdown}s</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-white/20">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${((4 - adCountdown) / 4) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-white/60 italic">
                  Aguarde os segundos finais para resgatar suas moedas
                </p>
              </div>
            ) : (
              <div className="w-full max-w-[280px] flex flex-col items-center gap-3 my-4 animate-scaleUp">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400 text-xs font-black uppercase">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Vídeo Assistido com Sucesso!</span>
                </div>

                <div className="text-2xl font-display font-black text-amber-300 flex items-center gap-1.5">
                  <Coins className="w-7 h-7 text-amber-400" />
                  <span>+{activeWatchingBox.coinsReward} MOEDAS</span>
                </div>

                <button
                  onClick={handleCollectReward}
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-display font-black text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>RESGATAR MOEDAS AGORA</span>
                </button>
              </div>
            )}

            <button
              onClick={() => setActiveWatchingBox(null)}
              className="mt-3 text-xs text-white/50 hover:text-white underline cursor-pointer"
            >
              Cancelar vídeo
            </button>
          </div>
        )}

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
                    className="py-1 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-display font-black text-[10px] uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-slate-950" />
                    <span>ASSISTIR</span>
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
