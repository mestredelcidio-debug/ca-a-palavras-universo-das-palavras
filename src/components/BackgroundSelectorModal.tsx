import React from 'react';
import {
  X,
  Check,
  Lock,
  Sparkles,
  Star,
  Trees,
  CheckCircle2,
  Sparkle
} from 'lucide-react';
import { NATURE_BACKGROUNDS, NatureBackground } from '../data/natureBackgrounds';

interface BackgroundSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalStars: number;
  activeNatureBgId: string;
  onSelectNatureBg: (natureBgId: string) => void;
}

export const BackgroundSelectorModal: React.FC<BackgroundSelectorModalProps> = ({
  isOpen,
  onClose,
  totalStars,
  activeNatureBgId,
  onSelectNatureBg
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4 animate-fadeIn select-none">
      <div className="bg-slate-900 border-2 border-emerald-500/70 rounded-3xl w-full max-w-md max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-white">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center shadow-lg font-black">
              <Sparkles className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-display font-black text-base uppercase tracking-wide text-white flex items-center gap-1.5">
                Cenários do Universo (5)
                <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400/40" />
              </h2>
              <p className="text-[11px] text-indigo-200/90 font-medium">
                Cenários cósmicos aplicados a todos os mundos e fases
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stars summary banner */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between text-xs">
          <span className="text-slate-300 font-medium">
            Selecione a paisagem que você quer ver no fundo:
          </span>
          <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 font-display font-black text-[11px] border border-amber-400/30 flex items-center gap-1 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {totalStars} ⭐
          </span>
        </div>

        {/* 5 Nature Backgrounds List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none">
          {NATURE_BACKGROUNDS.map((item: NatureBackground) => {
            const isUnlocked = totalStars >= item.requiredStars || item.requiredStars === 0;
            const isCurrentActive = activeNatureBgId === item.id;

            return (
              <div
                key={item.id}
                className={`relative rounded-2xl overflow-hidden border-2 transition-all p-3 flex gap-3.5 items-center ${
                  isCurrentActive
                    ? 'border-emerald-400 bg-emerald-950/50 shadow-xl shadow-emerald-500/15 ring-2 ring-emerald-400/50'
                    : isUnlocked
                    ? 'border-white/15 bg-slate-800/80 hover:border-white/30 hover:bg-slate-800'
                    : 'border-white/10 bg-slate-900/60 opacity-75'
                }`}
              >
                {/* Image Thumbnail */}
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/20 shrink-0 shadow-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center text-amber-400 p-1 text-center">
                      <Lock className="w-6 h-6 mb-1 text-amber-400" />
                      <span className="text-[10px] font-black">{item.requiredStars} ⭐</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="font-display font-black text-xs sm:text-sm text-white truncate">
                        {item.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 mt-0.5 mb-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-sky-200 text-[9px] font-bold">
                        {item.tag}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-black border ${
                          item.requiredStars === 0
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : isUnlocked
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-300 line-clamp-2 leading-tight">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-2.5">
                    {isCurrentActive ? (
                      <div className="w-full py-1.5 px-3 rounded-xl bg-emerald-500 text-slate-950 font-display font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/40">
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>FUNDO ATIVO NO JOGO</span>
                      </div>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => onSelectNatureBg(item.id)}
                        className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-display font-black text-xs transition-all active:scale-95 cursor-pointer shadow-md shadow-emerald-950/40"
                      >
                        Equipar Fundo
                      </button>
                    ) : (
                      <div className="w-full py-1.5 px-3 rounded-xl bg-slate-800 text-slate-400 font-bold text-[10px] flex items-center justify-center gap-1 border border-white/5">
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Desbloqueia com {item.requiredStars} estrelas</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-950/90 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
          <span>O fundo escolhido fica ativo para todos os capítulos.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-black text-xs transition-all active:scale-95 cursor-pointer shadow-md"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
