import React, { useState, useMemo } from 'react';
import {
  Play,
  Search,
  Sparkles,
  Gamepad2,
  Compass,
  Trophy,
  Zap,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { GAMES_CATALOG, GameItem, GameCategory, PORTAL_CATEGORIES } from '../../data/gamesCatalog';
import { GameCard } from './GameCard';
import { ComingSoonModal } from './ComingSoonModal';

interface DecixGamesPortalProps {
  onPlayGame: (game: GameItem) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const DecixGamesPortal: React.FC<DecixGamesPortalProps> = ({
  onPlayGame,
  searchQuery,
  onSearchChange
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('all');
  const [selectedGameForDetails, setSelectedGameForDetails] = useState<GameItem | null>(null);

  // Filter games based on search query and category
  const filteredGames = useMemo(() => {
    return GAMES_CATALOG.filter((game) => {
      const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesSearch =
        game.title.toLowerCase().includes(q) ||
        game.shortDescription.toLowerCase().includes(q) ||
        game.categoryLabel.toLowerCase().includes(q) ||
        game.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredGame = GAMES_CATALOG.find((g) => g.isFeatured) || GAMES_CATALOG[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* 1. HERO SPOTLIGHT SECTION */}
      <section className="relative w-full overflow-hidden border-b border-slate-800/80 bg-slate-950">
        {/* Background Artwork with Deep Space Tone Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/decix_hero_banner_1792169028263.jpg"
            alt="DECIX GAMES Arena"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="max-w-2xl space-y-6">
            {/* Studio Badge (Unboxed text, no static pills) */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Portal Oficial de Jogos</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">DECIX GAMES</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-[1.1] text-balance">
              Jogos inteligentes e relaxantes para desafiar a sua mente.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl">
              Descubra os títulos originais da <strong className="text-white font-bold">DECIX GAMES</strong>.
              Comece agora mesmo pelo épico <strong className="text-cyan-300">Caça-Palavras: Universo das Palavras</strong> com
              centenas de níveis cósmicos jogáveis no celular e computador.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onPlayGame(featuredGame)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 hover:from-cyan-300 hover:to-indigo-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-xl shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Jogar Caça-Palavras Agora</span>
              </button>

              <a
                href="#catalogo"
                className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick KPI Strip below Hero */}
        <div className="relative z-10 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center sm:text-left">
              <div className="space-y-0.5">
                <span className="text-lg sm:text-xl font-black text-white font-mono tabular-nums">
                  1º Jogo Oficial
                </span>
                <p className="text-xs text-slate-400">Universo das Palavras liberado</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-lg sm:text-xl font-black text-cyan-400 font-mono tabular-nums">
                  +750 Fases
                </span>
                <p className="text-xs text-slate-400">25 capítulos estelares</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-lg sm:text-xl font-black text-amber-400 font-mono tabular-nums">
                  2 Em Produção
                </span>
                <p className="text-xs text-slate-400">Classificação Cores & Block</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-lg sm:text-xl font-black text-emerald-400 font-mono tabular-nums">
                  100% Gratuito
                </span>
                <p className="text-xs text-slate-400">Sem download obrigatório</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATALOGO & FILTER SECTION */}
      <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
              Catálogo de Jogos
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Explore os títulos lançados e os próximos lançamentos da DECIX GAMES.
            </p>
          </div>

          {/* Mobile search bar if on small screen */}
          <div className="sm:hidden w-full relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar jogos..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Interactive Category Filter Tabs (Functional segmented buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PORTAL_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}

          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="ml-auto px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar busca ("{searchQuery}")</span>
            </button>
          )}
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onPlay={onPlayGame}
                onOpenDetails={(g) => setSelectedGameForDetails(g)}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="p-12 text-center bg-slate-900/50 border border-slate-800 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 mx-auto flex items-center justify-center text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Nenhum jogo encontrado</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Não encontramos resultados para "{searchQuery}". Tente outro termo ou veja todos os títulos da DECIX GAMES.
              </p>
            </div>
            <button
              onClick={() => {
                onSearchChange('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Ver todos os jogos
            </button>
          </div>
        )}

        {/* 3. FEATURED BANNER CARD FOR UNIVERSO DAS PALAVRAS */}
        <div className="mt-12 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-800/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Jogo Estreia da DECIX GAMES</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
              Pronto para viajar pelo cosmos das palavras?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore constelações temáticas, desbloqueie missões diárias com recompensas em moedas e personalize seus cenários espaciais no clássico caça-palavras brasileiro definitivo.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onPlayGame(featuredGame)}
                className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-400/20 active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Começar no Nível 1</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4. UPCOMING ROADMAP INFO (Preparação para os outros 2 jogos) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-950/80 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">
              Em Breve: Classificação das Cores
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Desenvolvido com mecânica suave de ordenação de líquidos e tubos de ensaio. Ideal para exercitar o pensamento lógico e descontrair a mente.
            </p>
            <button
              onClick={() => {
                const game = GAMES_CATALOG.find((g) => g.id === 'classificacao-das-cores');
                if (game) setSelectedGameForDetails(game);
              }}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Ver detalhes do projeto</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">
              Em Breve: Block Puzzle Desafio
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Encaixe blocos poliominós geométricos para eliminar linhas e colunas simultâneas, criando reações em cadeia e batendo suas melhores pontuações.
            </p>
            <button
              onClick={() => {
                const game = GAMES_CATALOG.find((g) => g.id === 'block-puzzle');
                if (game) setSelectedGameForDetails(game);
              }}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Ver detalhes do projeto</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Details / Coming Soon Modal */}
      <ComingSoonModal
        game={selectedGameForDetails}
        isOpen={!!selectedGameForDetails}
        onClose={() => setSelectedGameForDetails(null)}
        onPlay={(game) => {
          setSelectedGameForDetails(null);
          onPlayGame(game);
        }}
      />
    </div>
  );
};
