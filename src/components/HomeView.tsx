import React, { useState } from 'react';
import {
  Settings,
  List,
  Palette,
  Lock,
  Gift,
  Sparkles,
  Flame,
  Zap,
  ShieldAlert,
  Check,
  Star,
  Target,
  ChevronRight,
  Compass,
  ShoppingBag,
  Layers,
  Map,
  Shield,
  Clock,
  HelpCircle,
  EyeOff,
  Waves,
  RotateCcw,
  Bomb,
  Feather,
  Globe,
  Heart,
  Search,
  Shuffle,
  Link,
  Moon,
  Trophy,
  User,
  LogOut
} from 'lucide-react';
import { CoinPill } from './CoinPill';
import { Difficulty } from '../types/game';
import { ChapterData } from '../data/chapters';
import { Mission } from '../data/missions';
import { GAME_MODES, GameModeDefinition } from '../data/gameModes';

interface HomeViewProps {
  currentLevel: number;
  activeSelectedLevel: number;
  coins: number;
  chapter: ChapterData;
  completedLevels: Record<number, { stars: number; time: number }>;
  difficulty?: Difficulty;
  selectedMode?: GameModeDefinition;
  activeMission?: Mission;
  hasUnclaimedMissions?: boolean;
  hasDailyGiftReady?: boolean;
  onSelectDifficulty?: (diff: Difficulty) => void;
  onSelectMode?: (mode: GameModeDefinition) => void;
  onOpenModesModal?: () => void;
  onSelectLevelNode: (level: number) => void;
  onOpenSettings: () => void;
  onOpenChapters: () => void;
  onOpenDaily: () => void;
  onOpenMissions: () => void;
  onOpenRewardBoxes?: () => void;
  onOpenFullShop: () => void;
  onOpenBackgroundSelector: () => void;
  onPlayLevel: () => void;
  onPlaySpecialMode?: (mode: GameModeDefinition) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentLevel,
  activeSelectedLevel,
  coins,
  chapter,
  completedLevels,
  difficulty = 'medium',
  selectedMode = GAME_MODES[0],
  activeMission,
  hasUnclaimedMissions = false,
  hasDailyGiftReady = false,
  onSelectDifficulty,
  onSelectMode,
  onOpenModesModal,
  onSelectLevelNode,
  onOpenSettings,
  onOpenChapters,
  onOpenDaily,
  onOpenMissions,
  onOpenRewardBoxes,
  onOpenFullShop,
  onOpenBackgroundSelector,
  onPlayLevel,
  onPlaySpecialMode
}) => {
  // Navigation segment: 'campaign' (Capítulos & Missões Principais) vs 'special_modes' (15 Modos Exclusivos)
  const [activeSegment, setActiveSegment] = useState<'campaign' | 'special_modes'>('campaign');

  const difficulties: { id: Difficulty; label: string; icon: any; color: string; desc: string }[] = [
    { id: 'easy', label: 'Fácil', icon: Sparkles, color: 'from-emerald-500 to-teal-500', desc: '6 palavras · Grade 8x8' },
    { id: 'medium', label: 'Médio', icon: Zap, color: 'from-sky-500 to-blue-600', desc: '8 palavras · Grade 10x10' },
    { id: 'hard', label: 'Difícil', icon: Flame, color: 'from-amber-500 to-orange-600', desc: '11 palavras · Grade 12x12' },
    { id: 'expert', label: 'Mestre', icon: ShieldAlert, color: 'from-rose-500 to-red-600', desc: '14 palavras · Grade 13x13' }
  ];

  // Generate levels for current chapter
  const chapterLevels: number[] = [];
  for (let l = chapter.startLevel; l <= chapter.endLevel; l++) {
    chapterLevels.push(l);
  }

  const activePlayLevel = activeSelectedLevel || currentLevel;

  const getModeIcon = (iconName: string, className: string = 'w-4 h-4') => {
    switch (iconName) {
      case 'Waves': return <Waves className={className} />;
      case 'EyeOff': return <EyeOff className={className} />;
      case 'RotateCcw': return <RotateCcw className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Bomb': return <Bomb className={className} />;
      case 'HelpCircle': return <HelpCircle className={className} />;
      case 'Timer': return <Clock className={className} />;
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

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col justify-between overflow-y-auto select-none pb-2 scrollbar-none">
      {/* 1. TOP HEADER */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between px-4 pt-3 z-30 shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSettings}
            className="w-11 h-11 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white flex items-center justify-center shadow-lg border-2 border-white/70 active:scale-90 transition-all cursor-pointer relative"
            title="Configurações (Som, Música, Idiomas)"
          >
            <Settings className="w-5 h-5 stroke-[2.4]" />
          </button>

          <button
            onClick={onOpenChapters}
            className="w-11 h-11 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white flex items-center justify-center shadow-lg border-2 border-white/70 active:scale-90 transition-all cursor-pointer"
            title="Capítulos do Brasil"
          >
            <List className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={onOpenBackgroundSelector}
            className="w-11 h-11 rounded-full bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 flex items-center justify-center shadow-lg border-2 border-white/70 active:scale-90 transition-all cursor-pointer"
            title="Escolha seus Cenários e Fundos do Jogo"
          >
            <Palette className="w-5 h-5 stroke-[2.4]" />
          </button>
        </div>

        <CoinPill coins={coins} onOpenRewardBoxes={onOpenFullShop} />
      </header>

      {/* 2. SEGMENT SWITCHER: CAMPANHA PRINCIPAL vs ARENA 15 MODOS */}
      <div className="w-full max-w-[390px] mx-auto px-3 mt-2.5 z-20">
        <div className="w-full p-1 bg-slate-900/85 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl flex items-center gap-1">
          <button
            onClick={() => setActiveSegment('campaign')}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-display font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSegment === 'campaign'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>CAMPANHA (CAPÍTULOS)</span>
          </button>

          <button
            onClick={() => setActiveSegment('special_modes')}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-display font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
              activeSegment === 'special_modes'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>15 MODOS ESPECIAIS</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse absolute top-1 right-2" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SEÇÃO A: FLUXO DA CAMPANHA PRINCIPAL (CAPÍTULOS & MISSÕES PRINCIPAIS) */}
      {/* ========================================================================= */}
      {activeSegment === 'campaign' && (
        <div className="w-full flex flex-col gap-1.5 animate-fadeIn">
          {/* 3. CAPÍTULO EM CIMA */}
          <div className="w-full max-w-[390px] mx-auto px-3 mt-1 z-20">
            <div
              onClick={onOpenChapters}
              className="relative w-full rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-blue-950/90 backdrop-blur-md border border-white/40 shadow-xl p-3 flex items-center justify-between cursor-pointer hover:border-amber-400/70 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md font-display font-black text-sm"
                  style={{ backgroundColor: chapter.accentColor }}
                >
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-black tracking-widest text-amber-300">
                      {chapter.title}
                    </span>
                    <span className="text-[10px] text-white/50">·</span>
                    <span className="text-[10px] font-bold text-sky-200">
                      {chapter.biome}
                    </span>
                  </div>
                  <h2 className="font-display font-black text-base text-white tracking-wide">
                    {chapter.subtitle}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenBackgroundSelector();
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-display font-black text-[11px] shadow-md active:scale-95 transition-all cursor-pointer border border-amber-300/40"
                  title="Personalizar os 3 Fundos deste Capítulo"
                >
                  <Palette className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Fundos</span>
                </button>
                <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold">
                  <span>Trocar</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* 4. PERCURSO DE FASES DO CAPÍTULO */}
          <div className="w-full max-w-[390px] mx-auto px-3 my-1 z-20">
            <div className="w-full rounded-2xl bg-white/85 backdrop-blur-md p-3 shadow-xl border border-white/70 flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <span className="font-display font-black text-xs text-blue-950 uppercase tracking-wide">
                  Percurso da Campanha
                </span>
                <span className="text-[10px] font-bold text-slate-600">
                  Fases {chapter.startLevel} a {chapter.endLevel} (30 Fases)
                </span>
              </div>

              {/* Level Nodes Horizontal Trail */}
              <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 scrollbar-none">
                {chapterLevels.map(lvl => {
                  const isDone = !!completedLevels[lvl];
                  const isSelected = lvl === activePlayLevel;
                  const isUnlocked = isDone || lvl <= currentLevel;

                  return (
                    <button
                      key={lvl}
                      onClick={() => isUnlocked && onSelectLevelNode(lvl)}
                      disabled={!isUnlocked}
                      className={`shrink-0 w-12 h-14 rounded-2xl flex flex-col items-center justify-between p-1 shadow-md transition-all relative ${
                        isSelected
                          ? 'bg-gradient-to-b from-blue-600 to-indigo-700 text-white ring-3 ring-amber-400 scale-105 shadow-blue-500/40'
                          : isDone
                          ? 'bg-gradient-to-b from-emerald-500 to-green-600 text-white active:scale-95'
                          : isUnlocked
                          ? 'bg-gradient-to-b from-sky-400 to-blue-500 text-white active:scale-95'
                          : 'bg-slate-200 text-slate-400 border border-slate-300 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="w-full flex justify-center">
                        {isDone ? (
                          <Check className="w-3 h-3 text-white stroke-[3.5]" />
                        ) : !isUnlocked ? (
                          <Lock className="w-3 h-3 text-slate-500" />
                        ) : (
                          <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                        )}
                      </div>

                      <span className="font-display font-black text-xs leading-none">
                        {lvl}
                      </span>

                      <div className="flex items-center justify-center gap-0.5">
                        {isDone ? (
                          <div className="flex text-amber-300 text-[8px] leading-none">
                            ★★★
                          </div>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 5. MISSÃO ATIVA DA CAMPANHA */}
          {activeMission && (
            <div className="w-full max-w-[390px] mx-auto px-3 my-0.5 z-20">
              <div
                onClick={onOpenMissions}
                className="w-full rounded-2xl bg-gradient-to-r from-slate-900/90 via-sky-950/80 to-slate-900/90 backdrop-blur-md p-2.5 border border-sky-400/40 shadow-xl cursor-pointer hover:border-amber-400/60 transition-all flex flex-col gap-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-amber-400 stroke-[2.5]" />
                    <span className="text-[11px] font-black text-white tracking-wide uppercase truncate max-w-[200px]">
                      Missão: {activeMission.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-300">
                    +{activeMission.rewardCoins} Moedas
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-white/20">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-amber-400 transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        Math.round((activeMission.currentProgress / activeMission.targetProgress) * 100),
                        100
                      )}%`
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-white/70">
                  <span className="truncate max-w-[220px]">{activeMission.description}</span>
                  <span className="font-mono font-bold text-sky-300">
                    {Math.min(activeMission.currentProgress, activeMission.targetProgress)} / {activeMission.targetProgress}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 6. 5 CAIXAS DE RECOMPENSAS / ANÚNCIOS (GANHE MOEDAS GRÁTIS) */}
          <div className="w-full max-w-[390px] mx-auto px-3 my-1 z-20">
            <button
              onClick={onOpenRewardBoxes}
              className="w-full p-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-xl border-2 border-amber-300 flex items-center justify-between gap-2.5 active:scale-95 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-slate-950 text-amber-300 flex items-center justify-center shadow-md shrink-0 border border-amber-300/40 font-black text-xl">
                  🎁
                </div>
                <div className="text-left min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-slate-950/80 text-amber-300 text-[9px] font-black uppercase tracking-wider">
                      5 Caixas Grátis
                    </span>
                    <span className="text-[10px] font-bold text-white drop-shadow">
                      Assista & Ganhe
                    </span>
                  </div>
                  <h4 className="font-display font-black text-xs sm:text-sm text-slate-950 truncate drop-shadow-sm">
                    Recompensas Crescentes de Moedas!
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 px-2.5 py-1.5 rounded-xl bg-slate-950 text-amber-300 font-display font-black text-xs shadow">
                <span>ABRIR</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>

          {/* BOTÃO JOGAR FASE DA CAMPANHA */}
          <div className="w-full max-w-[390px] mx-auto px-3 my-1.5 z-20">
            <button
              onClick={onPlayLevel}
              className="w-full h-14 rounded-full bg-gradient-to-b from-[#34d353] via-[#22c543] to-[#15803d] border-2 border-emerald-200/90 text-white font-display font-black text-xl tracking-wide uppercase shadow-[0_5px_0_#0f5127,0_10px_20px_rgba(0,0,0,0.4)] hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_#0f5127] transition-all flex items-center justify-center text-center drop-shadow-md relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent rounded-t-full pointer-events-none" />
              <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                NÍVEL {activePlayLevel}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEÇÃO B: ARENA DOS 15 MODOS ESPECIAIS (SEPARADA DAS MISSÕES PRINCIPAIS) */}
      {/* ========================================================================= */}
      {activeSegment === 'special_modes' && (
        <div className="w-full flex flex-col gap-1.5 animate-fadeIn">
          {/* Card em Destaque do Modo Especial Ativo */}
          <div className="w-full max-w-[390px] mx-auto px-3 mt-1 z-20">
            <div className="w-full rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-900 border-2 border-amber-400 p-3 shadow-2xl flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
                    style={{ backgroundColor: selectedMode.accentColor }}
                  >
                    {getModeIcon(selectedMode.iconName, 'w-5 h-5')}
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-300 font-mono">
                      MODO #{selectedMode.id} · {selectedMode.badge}
                    </span>
                    <h3 className="font-display font-black text-base text-white leading-tight">
                      {selectedMode.name}
                    </h3>
                  </div>
                </div>

                {onOpenModesModal && (
                  <button
                    onClick={onOpenModesModal}
                    className="py-1 px-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-black text-[10px] uppercase tracking-wider shadow-md flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>VER 15 MODOS</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Explicação de como funciona */}
              <div className="p-2 rounded-xl bg-black/40 border border-white/10 text-[11px] text-sky-100/90 leading-snug">
                <span className="font-bold text-amber-300">Regra especial: </span>
                {selectedMode.howItWorks}
              </div>

              {/* Gatilho de compra e item consumível */}
              <div className="p-2 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-between text-[11px]">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-black text-amber-300 tracking-wider">
                    Consumível de Alívio:
                  </span>
                  <span className="font-bold text-white">
                    {selectedMode.consumableItem.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-black text-amber-300">
                    {selectedMode.consumableItem.priceBRL}
                  </span>
                  <span className="text-[9px] text-white/50 block">
                    ({selectedMode.consumableItem.coinsCost} moedas)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Carrossel / Grid Rápido dos 15 Modos para Selecionar com 1 Toque */}
          <div className="w-full max-w-[390px] mx-auto px-3 my-1 z-20">
            <div className="w-full bg-slate-900/80 backdrop-blur-md rounded-2xl p-2.5 border border-white/30 shadow-lg flex flex-col gap-1.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] uppercase font-black tracking-wider text-white">
                  Selecione o Modo Desejado (15)
                </span>
                <span className="text-[9px] text-amber-300 font-bold">
                  Toque para ativar
                </span>
              </div>

              {/* Grid compacto com rolagem para os 15 modos */}
              <div className="grid grid-cols-3 gap-1.5 max-h-[145px] overflow-y-auto pr-1 scrollbar-thin">
                {GAME_MODES.map(mode => {
                  const isSelected = selectedMode.id === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => onSelectMode?.(mode)}
                      className={`p-1.5 rounded-xl flex flex-col items-center justify-center text-center gap-1 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-b from-amber-400 to-yellow-500 text-slate-950 font-black shadow-md border border-yellow-200 scale-[1.02]'
                          : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-white ${
                          isSelected ? 'bg-slate-950 text-amber-300' : ''
                        }`}
                        style={{ backgroundColor: !isSelected ? mode.accentColor : undefined }}
                      >
                        {getModeIcon(mode.iconName, 'w-3 h-3')}
                      </div>
                      <span className="text-[9px] font-bold truncate max-w-[95px] leading-tight">
                        {mode.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Informações da Arquitetura do Modo */}
          <div className="w-full max-w-[390px] mx-auto px-3 z-20">
            <div className="w-full p-2 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between text-[10px] text-white/70">
              <span className="font-semibold">Macroestrutura de Conteúdo:</span>
              <span className="font-mono text-amber-300 font-bold">30 Capítulos · 60 Fases/Capítulo</span>
            </div>
          </div>

          {/* BOTÃO JOGAR O MODO ESPECIAL SELECIONADO */}
          <div className="w-full max-w-[390px] mx-auto px-3 my-1.5 z-20">
            <button
              onClick={() => (onPlaySpecialMode ? onPlaySpecialMode(selectedMode) : onPlayLevel())}
              className="w-full h-14 rounded-full bg-gradient-to-b from-amber-400 via-yellow-400 to-amber-500 border-2 border-yellow-200 text-slate-950 font-display font-black text-lg tracking-wide uppercase shadow-[0_5px_0_#92400e,0_10px_20px_rgba(0,0,0,0.4)] hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_#92400e] transition-all flex items-center justify-center text-center drop-shadow-md relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-full pointer-events-none" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>⚔️</span>
                <span>JOGAR · {selectedMode.name.toUpperCase()}</span>
              </span>
            </button>
          </div>
        </div>
      )}

      {/* 7. BOTTOM NAVIGATION BAR */}
      <nav className="w-full bg-[#182f4d] border-t-2 border-blue-400/40 px-5 py-2 z-30 shrink-0 mt-auto">
        <div className="w-full max-w-sm mx-auto flex items-center justify-between relative">
          <button
            onClick={() => setActiveSegment('campaign')}
            className={`flex flex-col items-center gap-0.5 font-bold active:scale-95 cursor-pointer ${
              activeSegment === 'campaign' ? 'text-sky-300' : 'text-sky-200/70 hover:text-white'
            }`}
            title="Tela Inicial da Campanha"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
              </svg>
            </div>
            <span className="text-[10px]">Início</span>
          </button>

          <button
            onClick={onOpenMissions}
            className="flex flex-col items-center gap-0.5 text-sky-200/80 hover:text-white font-bold active:scale-95 cursor-pointer relative"
            title="Missões e Metas"
          >
            <div className="w-10 h-10 rounded-xl bg-[#23436d] hover:bg-[#2b5285] flex items-center justify-center shadow-md">
              <Target className="w-5 h-5 text-sky-200" />
            </div>
            <span className="text-[10px]">Missões</span>
            {hasUnclaimedMissions && (
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-slate-900 animate-ping absolute -top-1 right-2" />
            )}
          </button>

          <button
            onClick={onOpenDaily}
            className="flex flex-col items-center gap-0.5 text-sky-200/80 hover:text-white font-bold active:scale-95 cursor-pointer relative"
            title="Presentes e Desafios Diários"
          >
            <div className="w-10 h-10 rounded-xl bg-[#23436d] hover:bg-[#2b5285] flex items-center justify-center shadow-md">
              <Gift className="w-5 h-5 text-amber-300 fill-amber-300/40" />
            </div>
            <span className="text-[10px]">Diários</span>
            {hasDailyGiftReady && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900 animate-pulse absolute -top-1 right-2" />
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};
