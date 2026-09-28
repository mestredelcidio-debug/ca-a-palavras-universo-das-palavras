import React from 'react';
import { ArrowLeft, Search, Wand2, Snowflake, Coins, Sparkles } from 'lucide-react';
import { CoinPill } from './CoinPill';

interface ShopViewProps {
  coins: number;
  onGoBack: () => void;
  onClaimOffer: (amount: number) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  coins,
  onGoBack,
  onClaimOffer
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-start pb-12 overflow-y-auto bg-gradient-to-b from-[#181d52] via-[#101438] to-[#0a0d24] text-white">
      {/* Top Header matching Screenshot 5 */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between px-4 py-3 shrink-0">
        <button
          onClick={onGoBack}
          className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg border border-white/40 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <CoinPill coins={coins} onOpenShop={() => {}} />
      </header>

      {/* Offers Container */}
      <main className="w-full max-w-md mx-auto px-4 space-y-4 pt-1">
        {/* OFFER 1: OFERTA INCRÍVEL! x10 */}
        <div className="w-full rounded-3xl bg-[#fdf5f5] text-slate-800 shadow-2xl overflow-hidden border-2 border-white/80 relative">
          {/* Golden Ribbon on top right */}
          <div className="absolute top-2.5 right-[-24px] rotate-45 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-amber-950 font-black text-[9px] py-1 px-7 shadow-md tracking-wider uppercase z-20">
            Melhor Oferta!
          </div>

          {/* Banner Header */}
          <div className="bg-gradient-to-r from-[#ff6b8b] via-[#ff5376] to-[#ff6b8b] py-3 px-4 flex items-center justify-between text-white relative">
            <div>
              <h3 className="font-display font-black text-xl tracking-wide leading-none drop-shadow-sm">
                OFERTA INCRÍVEL!
              </h3>
            </div>
            <div className="font-display font-black text-3xl tracking-tight pr-6 drop-shadow-sm">
              x10
            </div>
          </div>

          {/* Body */}
          <div className="p-4 pt-2">
            <div className="flex items-center justify-between gap-2">
              {/* Left: 5000 Coins with Stack */}
              <div className="flex flex-col items-center">
                <span className="font-display font-black text-3xl text-[#9f1239] tracking-tight">
                  5000
                </span>
                {/* 3D Coin Stack Graphic */}
                <div className="relative w-24 h-16 flex items-center justify-center">
                  <div className="w-16 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 border-2 border-yellow-200 shadow-lg flex items-center justify-center transform -rotate-6">
                    <Coins className="w-8 h-8 text-amber-900" />
                  </div>
                </div>
              </div>

              {/* Plus Sign */}
              <div className="font-black text-2xl text-[#9f1239] pb-4">+</div>

              {/* Right: Powerups List */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border border-yellow-100 flex items-center justify-center shadow-sm">
                    <Search className="w-4 h-4 text-amber-900" />
                  </div>
                  <span className="font-black text-base text-slate-800">5</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border border-yellow-100 flex items-center justify-center shadow-sm">
                    <Wand2 className="w-4 h-4 text-purple-900" />
                  </div>
                  <span className="font-black text-base text-slate-800">5</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-400 to-cyan-300 border border-cyan-100 flex items-center justify-center shadow-sm">
                    <Snowflake className="w-4 h-4 text-blue-900" />
                  </div>
                  <span className="font-black text-base text-slate-800">5</span>
                </div>
              </div>
            </div>

            {/* Bottom Floating Bar */}
            <div className="mt-3 p-2 bg-[#ff5376] rounded-2xl flex items-center justify-between text-white shadow-md">
              <div className="pl-2">
                <div className="text-[10px] uppercase font-bold tracking-wider opacity-90">
                  Tempo restante:
                </div>
                <div className="font-black text-sm tracking-tight">1d 18h</div>
              </div>

              <button
                onClick={() => onClaimOffer(5000)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-display font-black text-sm tracking-wider shadow-md active:scale-95 transition-all"
              >
                BRL 16,99
              </button>
            </div>
          </div>
        </div>

        {/* OFFER 2: Grande Pacote */}
        <div className="w-full rounded-3xl bg-[#fdfaf3] text-slate-800 shadow-xl overflow-hidden border-2 border-white/80 relative">
          <div className="bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] py-2.5 px-4 text-white font-display font-black text-base tracking-wide text-center">
            Grande Pacote
          </div>

          <div className="p-4 flex items-center justify-between gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-black">
                <Coins className="w-3.5 h-3.5 text-yellow-400" />
                <span>1340</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm">
                    <Wand2 className="w-3.5 h-3.5 text-purple-900" />
                  </div>
                  <span className="font-bold text-xs">1</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm">
                    <Search className="w-3.5 h-3.5 text-amber-900" />
                  </div>
                  <span className="font-bold text-xs">3</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onClaimOffer(1340)}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-display font-black text-sm tracking-wider shadow-md active:scale-95 transition-all"
            >
              BRL 20,99
            </button>
          </div>
        </div>

        {/* OFFER 3: Super Pacote */}
        <div className="w-full rounded-3xl bg-[#fdf5f5] text-slate-800 shadow-xl overflow-hidden border-2 border-white/80 relative">
          <div className="bg-gradient-to-r from-[#ff6b8b] to-[#f43f5e] py-2.5 px-4 text-white font-display font-black text-base tracking-wide text-center">
            Super Pacote
          </div>

          <div className="p-4 flex items-center justify-between gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-black">
                <Coins className="w-3.5 h-3.5 text-yellow-400" />
                <span>2940</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 rounded-full bg-rose-400 flex items-center justify-center shadow-sm">
                    <Wand2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-bold text-xs">3</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 rounded-full bg-rose-400 flex items-center justify-center shadow-sm">
                    <Search className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-bold text-xs">6</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onClaimOffer(2940)}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-display font-black text-sm tracking-wider shadow-md active:scale-95 transition-all"
            >
              BRL 65,99
            </button>
          </div>
        </div>

        {/* Free Coins Daily Claim */}
        <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <div>
              <div className="text-xs font-bold text-white">Bônus Grátis Diário</div>
              <div className="text-[10px] text-white/60">Pegue 100 moedas para jogar agora</div>
            </div>
          </div>
          <button
            onClick={() => onClaimOffer(100)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md active:scale-95 transition-all"
          >
            +100 Grátis
          </button>
        </div>
      </main>
    </div>
  );
};
