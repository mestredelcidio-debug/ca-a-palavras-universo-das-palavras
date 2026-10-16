import React from 'react';
import { X, Play, Clock, Sparkles, CheckCircle2, ShieldCheck, Gamepad2 } from 'lucide-react';
import { GameItem } from '../../data/gamesCatalog';

interface ComingSoonModalProps {
  game: GameItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPlay: (game: GameItem) => void;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  game,
  isOpen,
  onClose,
  onPlay
}) => {
  if (!isOpen || !game) return null;

  const isAvailable = game.status === 'available';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] text-left relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Media */}
        <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
          <img
            src={game.bannerUrl || game.thumbnailUrl}
            alt={game.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Fechar janela"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-950 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Tagline */}
          <div className="absolute bottom-3 left-5 right-5">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-1">
              {game.categoryLabel}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight font-display drop-shadow-md">
              {game.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Status banner */}
          <div
            className={`p-3.5 rounded-xl border flex items-start gap-3 ${
              isAvailable
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                : 'bg-amber-950/40 border-amber-500/30 text-amber-200'
            }`}
          >
            {isAvailable ? (
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">
                {isAvailable ? 'Jogo Oficial Disponível' : 'Em Preparação para Lançamento'}
              </p>
              <p className="text-xs opacity-90 mt-0.5 leading-relaxed">
                {isAvailable
                  ? 'Você pode jogar agora mesmo diretamente pelo seu navegador no computador ou celular.'
                  : 'Este jogo faz parte do catálogo oficial DECIX GAMES e está em fase final de testes e polimento para ser disponibilizado em breve no portal.'}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1.5">
              Sobre o Jogo
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {game.fullDescription}
            </p>
          </div>

          {/* Features */}
          {game.features && game.features.length > 0 && (
            <div>
              <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                Destaques & Mecânicas
              </h3>
              <ul className="space-y-2">
                {game.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Developer / Studio info */}
          <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Desenvolvido por {game.developer}</span>
            </span>
            <span className="font-mono tabular-nums">{game.releaseYear}</span>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            Fechar
          </button>
          {isAvailable ? (
            <button
              onClick={() => {
                onClose();
                onPlay(game);
              }}
              className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-300 hover:from-cyan-300 hover:to-indigo-200 rounded-xl shadow-lg shadow-cyan-400/20 flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Jogar Agora</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                const wordGame = { ...game, id: 'universo-das-palavras', slug: 'universo-das-palavras', title: 'Caça-Palavras: Universo das Palavras' };
                onPlay(wordGame as any);
              }}
              className="px-4 py-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 hover:bg-cyan-950 border border-cyan-800/60 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Jogar Caça-Palavras enquanto isso</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
