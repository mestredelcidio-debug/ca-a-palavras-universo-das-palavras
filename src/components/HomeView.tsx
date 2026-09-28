import React from 'react';
import { Settings, List, Lock, Gift } from 'lucide-react';
import { CoinPill } from './CoinPill';

interface HomeViewProps {
  currentLevel: number;
  coins: number;
  chapterTitle: string;
  levelProgressText: string;
  progressPercent: number;
  onOpenSettings: () => void;
  onOpenChapters: () => void;
  onOpenShop: () => void;
  onOpenDaily: () => void;
  onPlayLevel: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentLevel,
  coins,
  chapterTitle = 'Mar: Capítulo 1',
  levelProgressText = '1/3',
  progressPercent = 33,
  onOpenSettings,
  onOpenChapters,
  onOpenShop,
  onOpenDaily,
  onPlayLevel
}) => {
  return (
    <div className="relative w-full h-full min-h-screen flex flex-col justify-between overflow-hidden select-none">
      {/* 1. TOP HEADER matching Screenshot 1 */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between px-4 pt-3 z-30 shrink-0">
        {/* Left Side: Settings Button + Menu/Chapters Button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSettings}
            className="w-11 h-11 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white flex items-center justify-center shadow-lg border-2 border-white/60 active:scale-95 transition-transform"
            title="Configurações"
          >
            <Settings className="w-6 h-6 stroke-[2.2]" />
          </button>

          <button
            onClick={onOpenChapters}
            className="w-11 h-11 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white flex items-center justify-center shadow-lg border-2 border-white/60 active:scale-95 transition-transform"
            title="Capítulos e Níveis"
          >
            <List className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Right Side: Coin Pill */}
        <CoinPill coins={coins} onOpenShop={onOpenShop} />
      </header>

      {/* 2. DAILY CHALLENGE BANNER matching Screenshot 1 */}
      <div className="w-full max-w-[340px] mx-auto px-2 mt-4 z-20">
        <div
          onClick={onOpenDaily}
          className="relative w-full rounded-2xl shadow-2xl cursor-pointer active:scale-[0.99] transition-transform overflow-visible"
        >
          {/* 3D Silver Gift Box protruding on the top right */}
          <div className="absolute -top-3.5 -right-3 z-30 transform rotate-6 hover:rotate-12 transition-transform">
            <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-slate-100 via-slate-200 to-slate-400 border-2 border-white shadow-xl flex items-center justify-center relative p-1">
              <Gift className="w-8 h-8 text-slate-100 fill-slate-300 drop-shadow" />
            </div>
          </div>

          {/* Banner Top Bar */}
          <div className="bg-gradient-to-r from-[#445b73] via-[#35485c] to-[#445b73] px-3.5 py-2 rounded-t-2xl flex items-center gap-3 border-t border-x border-white/30">
            {/* White lock badge */}
            <div className="w-8 h-8 rounded-lg bg-white/95 flex items-center justify-center shadow-sm">
              <Lock className="w-4 h-4 text-sky-800 stroke-[2.5]" />
            </div>
            <span className="font-display font-black text-sm text-white tracking-wide drop-shadow-sm">
              Desafio Diário
            </span>
          </div>

          {/* Banner Body */}
          <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-b-2xl text-center shadow-lg border-b border-x border-white/40">
            <p className="font-display font-black text-sm text-[#1e3a5f] leading-snug">
              {currentLevel < 12
                ? 'Alcance o nível 12 para desbloquear!'
                : '🎁 Toque para jogar o Desafio Diário!'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. CENTER: Beach scenic space */}
      <div className="flex-1 min-h-[140px]" />

      {/* 4. BOTTOM PROGRESS & BIG PLAY BUTTON matching Screenshot 1 */}
      <div className="w-full max-w-[340px] mx-auto px-3 flex flex-col items-center gap-3 z-20 pb-3">
        {/* Title above progress bar: "Mar: Capítulo 1" */}
        <h3 className="font-display font-black text-xl text-white tracking-wide text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
          {chapterTitle}
        </h3>

        {/* Progress Bar with Green Gift at right end */}
        <div className="w-full relative flex items-center">
          {/* The Bar Track */}
          <div className="w-full h-7 rounded-full bg-slate-800/80 border border-white/40 p-0.5 shadow-inner relative overflow-hidden flex items-center">
            {/* Blue fill bar */}
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-300 shadow-md transition-all duration-500"
              style={{ width: `${Math.max(progressPercent, 15)}%` }}
            />
            {/* Centered fraction text */}
            <span className="absolute inset-0 flex items-center justify-center font-display font-black text-xs text-white drop-shadow-md">
              {levelProgressText}
            </span>
          </div>

          {/* 3D Green Gift Box with Orange Bow at right end */}
          <div
            onClick={onOpenDaily}
            className="absolute -right-3 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 border-2 border-yellow-300 shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform z-10"
            title="Presente do Capítulo"
          >
            <Gift className="w-6 h-6 text-amber-300 fill-amber-400 drop-shadow" />
          </div>
        </div>

        {/* Big 3D Jelly Green Button: "NÍVEL 2" */}
        <button
          onClick={onPlayLevel}
          className="w-full h-15 rounded-full bg-gradient-to-b from-[#34d353] via-[#22c543] to-[#15803d] border-2 border-emerald-200/80 text-white font-display font-black text-2xl tracking-wide uppercase shadow-[0_6px_0_#0f5127,0_10px_20px_rgba(0,0,0,0.4)] hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_#0f5127] transition-all flex items-center justify-center text-center drop-shadow-md relative overflow-hidden"
          style={{ height: '60px' }}
        >
          {/* Top Gloss Reflection */}
          <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent rounded-t-full pointer-events-none" />
          <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            NÍVEL {currentLevel}
          </span>
        </button>
      </div>

      {/* 5. BOTTOM NAVIGATION BAR matching Screenshot 1 */}
      <nav className="w-full bg-[#182f4d] border-t-2 border-blue-400/40 px-6 py-2 z-30 shrink-0">
        <div className="w-full max-w-sm mx-auto flex items-end justify-between relative">
          {/* Left Tab: Shop / Padlock */}
          <button
            onClick={onOpenShop}
            className="w-12 h-12 rounded-xl bg-[#23436d] hover:bg-[#2b5285] border border-blue-300/30 flex items-center justify-center text-sky-200 shadow-md active:scale-95 transition-transform"
            title="Loja"
          >
            <Lock className="w-6 h-6 text-sky-200/80 stroke-[2.2]" />
          </button>

          {/* Center Tab: Protruding Vibrant Blue House Tab */}
          <div className="relative -top-4 flex flex-col items-center">
            <button
              className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#2563eb] via-[#1d4ed8] to-[#1e40af] border-2 border-sky-300 text-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.5)] active:scale-95 transition-transform"
              title="Início"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                {/* Clean stylized House Icon matching Screenshot 1 */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-white drop-shadow-sm"
                >
                  <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                </svg>
              </div>
            </button>
          </div>

          {/* Right Tab: Daily / Padlock */}
          <button
            onClick={onOpenDaily}
            className="w-12 h-12 rounded-xl bg-[#23436d] hover:bg-[#2b5285] border border-blue-300/30 flex items-center justify-center text-sky-200 shadow-md active:scale-95 transition-transform"
            title="Desafios e Presentes Diários"
          >
            <Lock className="w-6 h-6 text-sky-200/80 stroke-[2.2]" />
          </button>
        </div>
      </nav>
    </div>
  );
};
