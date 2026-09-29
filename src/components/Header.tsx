import React from 'react';
import { Settings, Coins, Map, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { GameMode, SupportedLanguage } from '../types/game';
import { formatTime } from '../utils/text';
import { ChapterData } from '../data/chapters';
import { getTranslation } from '../data/translations';

interface HeaderProps {
  currentTab: 'home' | 'game';
  currentChapter?: ChapterData;
  mode: GameMode;
  levelNumber: number;
  timerSeconds: number;
  coins: number;
  dailyStreak: number;
  soundEnabled: boolean;
  language?: SupportedLanguage;
  onGoHome: () => void;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  onOpenChapters: () => void;
  onOpenDaily: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  currentChapter,
  mode,
  levelNumber,
  timerSeconds,
  coins,
  soundEnabled,
  language = 'pt',
  onGoHome,
  onToggleSound,
  onOpenSettings,
  onOpenChapters
}) => {
  const t = getTranslation(language);

  if (currentTab === 'home') {
    // ABA PRINCIPAL: Ícone das Configurações, ao lado Capítulos, e as Moedas do outro lado!
    return (
      <header className="w-full max-w-lg mx-auto flex items-center justify-between px-3 py-2.5 border-b border-white/10 shrink-0">
        {/* Lado Esquerdo: Configurações + Capítulos lado a lado */}
        <div className="flex items-center gap-2">
          {/* Botão Configurações */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-2xl bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-all active:scale-95 shadow-sm"
            aria-label={t.settingsTitle}
            title={t.settingsTitle}
          >
            <Settings className="w-4 h-4 text-slate-200" />
          </button>

          {/* Botão Capítulos do lado das configurações */}
          <button
            onClick={onOpenChapters}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all active:scale-95 shadow-sm"
            title={t.chapters}
          >
            <Map className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-display">
              {currentChapter ? `${currentChapter.title}` : t.chapters}
            </span>
          </button>
        </div>

        {/* Lado Direito: Moedas (Apenas exibir) */}
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/35 shadow-sm"
            title={t.coins}
          >
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-black tabular-nums">{coins}</span>
          </div>
        </div>
      </header>
    );
  }

  // TELA DO JOGO ATIVO
  return (
    <header className="w-full max-w-lg mx-auto flex items-center justify-between px-3 py-2 border-b border-white/10 shrink-0">
      {/* Botão Voltar para o Início */}
      <button
        onClick={onGoHome}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white/90 text-xs font-bold border border-white/10 transition-all active:scale-95"
      >
        <ArrowLeft className="w-4 h-4 text-emerald-400" />
        <span>{t.home}</span>
      </button>

      {/* Status da Fase / Modo */}
      <div className="flex items-center gap-2 text-xs font-bold">
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 tabular-nums">
          {mode === 'classic'
            ? `${t.level} ${levelNumber}`
            : mode === 'timed'
            ? `${t.time}: ${formatTime(timerSeconds)}`
            : mode === 'daily'
            ? t.dailyChallenge
            : `${t.level} #${levelNumber}`}
        </span>
      </div>

      {/* Moedas e Configurações */}
      <div className="flex items-center gap-1.5">
        <div
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold"
        >
          <Coins className="w-3.5 h-3.5" />
          <span className="tabular-nums font-black">{coins}</span>
        </div>

        <button
          onClick={onToggleSound}
          className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
        </button>
      </div>
    </header>
  );
};
