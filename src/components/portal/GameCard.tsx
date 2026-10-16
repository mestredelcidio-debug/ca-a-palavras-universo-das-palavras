import React from 'react';
import { Play, Sparkles, Clock, Star, Users } from 'lucide-react';
import { GameItem } from '../../data/gamesCatalog';

interface GameCardProps {
  game: GameItem;
  onPlay: (game: GameItem) => void;
  onOpenDetails: (game: GameItem) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPlay, onOpenDetails }) => {
  const isAvailable = game.status === 'available';

  return (
    <article className="group bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={game.thumbnailUrl}
          alt={game.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback gradient if file fails
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />

        {/* Subtle Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Availability Marker (Unboxed, clean text indicator) */}
        <div className="absolute top-3 right-3">
          {isAvailable ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase bg-emerald-500/90 text-slate-950 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3 h-3 fill-slate-950" />
              Disponível
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase bg-amber-500/90 text-slate-950 backdrop-blur-md shadow-sm">
              <Clock className="w-3 h-3" />
              Em Breve
            </span>
          )}
        </div>

        {/* Quick Play Hover Overlay on Desktop for Available Game */}
        {isAvailable && (
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
            <button
              onClick={() => onPlay(game)}
              className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-400/25 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              Jogar Agora
            </button>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          {/* Metadata line (Clean unboxed text with subtle separators, NO static pill badges) */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span className="text-cyan-400 font-semibold">{game.categoryLabel}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="tabular-nums font-mono">{game.rating.toFixed(1)}</span>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Users className="w-3 h-3" />
              <span>{game.playersCount}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
            {game.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
            {game.shortDescription}
          </p>
        </div>

        {/* Action Button Strip */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
          {isAvailable ? (
            <>
              <button
                onClick={() => onPlay(game)}
                className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/10 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>Jogar Agora</span>
              </button>
              <button
                onClick={() => onOpenDetails(game)}
                className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                title="Ver detalhes e recursos"
              >
                Detalhes
              </button>
            </>
          ) : (
            <button
              onClick={() => onOpenDetails(game)}
              className="w-full py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 border border-amber-500/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Em Desenvolvimento · Ver Prévia</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
