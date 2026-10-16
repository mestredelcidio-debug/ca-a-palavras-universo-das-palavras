import React, { useState, useEffect, useCallback } from 'react';
import { PortalHeader } from './components/portal/PortalHeader';
import { DecixGamesPortal } from './components/portal/DecixGamesPortal';
import { PortalFooter } from './components/portal/PortalFooter';
import { UniversoGameApp } from './games/universo-das-palavras/UniversoGameApp';
import { GameItem, GAMES_CATALOG, getGameBySlug } from './data/gamesCatalog';
import { ComingSoonModal } from './components/portal/ComingSoonModal';

export default function App() {
  // Routing state: 'portal' | 'game'
  const [activeRoute, setActiveRoute] = useState<'portal' | 'game'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('/jogos/universo-das-palavras') || window.location.hash.includes('universo-das-palavras')) {
        return 'game';
      }
    }
    return 'portal';
  });

  const [activeGame, setActiveGame] = useState<GameItem>(() => GAMES_CATALOG[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGameForModal, setSelectedGameForModal] = useState<GameItem | null>(null);

  // Sync with browser history and popstate
  const navigateTo = useCallback((route: 'portal' | 'game', game?: GameItem) => {
    setActiveRoute(route);
    if (game) setActiveGame(game);

    if (typeof window !== 'undefined') {
      const targetUrl = route === 'game' ? (game?.route || '/jogos/universo-das-palavras') : '/';
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({ route, gameId: game?.id }, '', targetUrl);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const path = window.location.pathname;
      if (path.includes('/jogos/universo-das-palavras') || window.location.hash.includes('universo-das-palavras')) {
        setActiveRoute('game');
        setActiveGame(GAMES_CATALOG[0]);
      } else {
        setActiveRoute('portal');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle game selection from portal cards or buttons
  const handleSelectGame = (game: GameItem) => {
    if (game.status === 'available') {
      navigateTo('game', game);
    } else {
      setSelectedGameForModal(game);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* PORTAL HEADER (Visible on portal, and adapts when inside a game) */}
      {activeRoute === 'portal' && (
        <PortalHeader
          activeView={activeRoute}
          activeGameTitle={activeGame.title}
          onNavigateHome={() => navigateTo('portal')}
          onQuickPlay={() => handleSelectGame(GAMES_CATALOG[0])}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      {/* VIEW 1: DECIX GAMES PORTAL HOMEPAGE */}
      {activeRoute === 'portal' && (
        <main className="flex-1 flex flex-col">
          <DecixGamesPortal
            onPlayGame={handleSelectGame}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </main>
      )}

      {/* VIEW 2: GAME VIEW — 100% PRESERVED CAÇA-PALAVRAS: UNIVERSO DAS PALAVRAS */}
      {activeRoute === 'game' && (
        <main className="flex-1 flex flex-col">
          <UniversoGameApp onBackToPortal={() => navigateTo('portal')} />
        </main>
      )}

      {/* PORTAL FOOTER (Visible on portal) */}
      {activeRoute === 'portal' && (
        <PortalFooter
          onSelectGameBySlug={(slug) => {
            const game = getGameBySlug(slug);
            if (game) handleSelectGame(game);
          }}
          onFilterCategory={(category) => {
            // Scroll to catalog section smoothly
            const catalogoEl = document.getElementById('catalogo');
            catalogoEl?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* MODAL FOR UNRELEASED / PREVIEW GAMES */}
      <ComingSoonModal
        game={selectedGameForModal}
        isOpen={!!selectedGameForModal}
        onClose={() => setSelectedGameForModal(null)}
        onPlay={(game) => {
          setSelectedGameForModal(null);
          handleSelectGame(game);
        }}
      />
    </div>
  );
}
