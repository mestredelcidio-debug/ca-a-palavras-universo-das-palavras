import React from 'react';
import { Gamepad2, Search, Sparkles, ArrowLeft } from 'lucide-react';

interface PortalHeaderProps {
  activeView: 'portal' | 'game';
  activeGameTitle?: string;
  onNavigateHome: () => void;
  onQuickPlay: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  activeView,
  activeGameTitle,
  onNavigateHome,
  onQuickPlay,
  searchQuery = '',
  onSearchChange
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark (Single text element wordmark, clean display font) */}
        <div className="flex items-center gap-3 shrink-0">
          {activeView === 'game' ? (
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              title="Voltar ao Portal DECIX GAMES"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Voltar ao Portal</span>
            </button>
          ) : null}

          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-500 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-white font-display leading-tight group-hover:text-cyan-400 transition-colors">
                DECIX<span className="text-cyan-400 font-extrabold ml-1">GAMES</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                Portal Oficial
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Clean single-line prose, no static pill islands) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={onNavigateHome}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            Todos os Jogos
          </button>
          <a
            href="#catalogo"
            onClick={(e) => {
              if (activeView === 'game') {
                e.preventDefault();
                onNavigateHome();
                setTimeout(() => {
                  document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            Catálogo
          </a>
          <a
            href="#sobre"
            onClick={(e) => {
              if (activeView === 'game') {
                e.preventDefault();
                onNavigateHome();
                setTimeout(() => {
                  document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            Sobre a DECIX
          </a>
        </nav>

        {/* Zone 3: Primary Action & Quick Search */}
        <div className="flex items-center gap-3 shrink-0">
          {activeView === 'portal' && onSearchChange && (
            <div className="relative hidden sm:block w-48 lg:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar jogos..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          )}

          {activeView === 'portal' ? (
            <button
              onClick={onQuickPlay}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-300 hover:from-cyan-300 hover:to-indigo-200 rounded-lg shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              <span>Jogar Caça-Palavras</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-slate-400 truncate max-w-[200px]">
                {activeGameTitle}
              </span>
              <button
                onClick={onNavigateHome}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Sair do Jogo
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
