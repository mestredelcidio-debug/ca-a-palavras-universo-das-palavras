import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Timer,
  EyeOff,
  Waves,
  HelpCircle,
  RotateCcw,
  Compass,
  Bomb,
  Link,
  Moon,
  Flame,
  Shuffle,
  Eye,
  Feather,
  Check,
  Coins,
  ChevronRight,
  Shield,
  Clock,
  BookOpen,
  Globe,
  Heart,
  Search,
  Trophy,
  Scissors,
  Glasses,
  Sun,
  Lightbulb,
  Award
} from 'lucide-react';
import { GAME_MODES, GameModeDefinition } from '../data/gameModes';

interface GameModesModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModeId: number;
  onSelectMode: (mode: GameModeDefinition) => void;
}

export const GameModesModal: React.FC<GameModesModalProps> = ({
  isOpen,
  onClose,
  selectedModeId,
  onSelectMode
}) => {
  const [activeMode, setActiveMode] = useState<GameModeDefinition>(() => {
    return GAME_MODES.find(m => m.id === selectedModeId) || GAME_MODES[0];
  });

  if (!isOpen) return null;

  const getModeIcon = (iconName: string, className: string = 'w-5 h-5') => {
    switch (iconName) {
      case 'Waves': return <Waves className={className} />;
      case 'EyeOff': return <EyeOff className={className} />;
      case 'RotateCcw': return <RotateCcw className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Bomb': return <Bomb className={className} />;
      case 'HelpCircle': return <HelpCircle className={className} />;
      case 'Timer': return <Timer className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Heart': return <Heart className={className} />;
      case 'Search': return <Search className={className} />;
      case 'Shuffle': return <Shuffle className={className} />;
      case 'Link': return <Link className={className} />;
      case 'Moon': return <Moon className={className} />;
      case 'Trophy': return <Trophy className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const handleConfirmMode = (mode: GameModeDefinition) => {
    onSelectMode(mode);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[430px] rounded-3xl bg-slate-900 border-2 border-amber-400/50 p-4 sm:p-5 shadow-2xl flex flex-col max-h-[92vh] text-white relative animate-scaleUp overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center shadow-md font-black">
              <Sparkles className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <h3 className="font-display font-black text-base sm:text-lg text-white tracking-wide">
                ARENA DOS 15 MODOS
              </h3>
              <p className="text-[11px] text-amber-300 font-semibold">
                Desafios exclusivos com regras especiais e consumíveis
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

        {/* Selected Mode Detail Spotlight */}
        <div className="my-2 p-3 rounded-2xl bg-gradient-to-br from-slate-850 to-slate-800 border-2 border-amber-400/40 shadow-lg flex flex-col gap-2 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
                style={{ backgroundColor: activeMode.accentColor }}
              >
                {getModeIcon(activeMode.iconName, 'w-5 h-5')}
              </div>
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-amber-400 font-mono">
                  MODO #{activeMode.id} · {activeMode.badge}
                </span>
                <h4 className="font-display font-black text-sm text-white leading-tight">
                  {activeMode.name}
                </h4>
              </div>
            </div>

            <button
              onClick={() => handleConfirmMode(activeMode)}
              className="py-1 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:brightness-110 active:scale-95 text-white font-display font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>SELECIONAR</span>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>

          <p className="text-[11px] text-sky-100/95 leading-relaxed bg-black/30 p-2 rounded-xl border border-white/10">
            <span className="font-bold text-amber-300">Como funciona: </span>
            {activeMode.howItWorks}
          </p>

          {/* Consumable / Monetization Item Highlight */}
          <div className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-between text-[11px]">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-black text-amber-400 tracking-wider">
                Gatilho & Consumível de Alívio:
              </span>
              <span className="font-bold text-white">
                {activeMode.consumableItem.name}
              </span>
            </div>
            <div className="text-right">
              <div className="font-display font-black text-xs text-amber-300 font-mono">
                {activeMode.consumableItem.priceBRL}
              </div>
              <div className="text-[9px] text-white/50">
                ({activeMode.consumableItem.coinsCost} moedas)
              </div>
            </div>
          </div>
        </div>

        {/* 15 Modes List */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 py-1 scrollbar-thin">
          <div className="text-[10px] font-black text-white/60 uppercase tracking-widest px-1 pb-1">
            Escolha um dos 15 modos exclusivos:
          </div>

          {GAME_MODES.map(mode => {
            const isCurrentActive = activeMode.id === mode.id;
            const isSelectedInGame = selectedModeId === mode.id;

            return (
              <div
                key={mode.id}
                onClick={() => setActiveMode(mode)}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                  isCurrentActive
                    ? 'bg-gradient-to-r from-blue-900/70 to-indigo-900/70 border-amber-400 shadow-md ring-1 ring-amber-400/50 scale-[1.01]'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md"
                    style={{ backgroundColor: mode.accentColor }}
                  >
                    {getModeIcon(mode.iconName, 'w-4 h-4')}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono font-bold text-amber-300">
                        #{mode.id}
                      </span>
                      <h5 className="font-display font-black text-xs sm:text-sm text-white truncate">
                        {mode.name}
                      </h5>
                    </div>
                    <p className="text-[10px] text-white/70 line-clamp-1">
                      {mode.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {isSelectedInGame && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 text-[9px] font-black uppercase">
                      Ativo
                    </span>
                  )}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      isCurrentActive
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'text-white/40'
                    }`}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2.5 border-t border-white/10 shrink-0 flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all cursor-pointer"
          >
            Fechar
          </button>
          <button
            onClick={() => handleConfirmMode(activeMode)}
            className="flex-1 h-10 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-transform cursor-pointer"
          >
            <span>Confirmar Modo</span>
            <Check className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
