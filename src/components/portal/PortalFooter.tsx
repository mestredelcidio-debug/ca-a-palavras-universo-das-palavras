import React from 'react';
import { Gamepad2, Heart, Sparkles } from 'lucide-react';

interface PortalFooterProps {
  onSelectGameBySlug?: (slug: string) => void;
  onFilterCategory?: (category: string) => void;
}

export const PortalFooter: React.FC<PortalFooterProps> = ({
  onSelectGameBySlug,
  onFilterCategory
}) => {
  return (
    <footer id="sobre" className="w-full bg-slate-950 border-t border-slate-800/80 mt-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Studio Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-black tracking-wider text-white font-display">
                DECIX<span className="text-cyan-400 ml-1">GAMES</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              O portal oficial de jogos casual e raciocínio da marca DECIX GAMES.
              Criamos experiências originais, acessíveis e envolventes para jogadores no celular e computador.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Jogos desenvolvidos com carinho no Brasil</span>
            </div>
          </div>

          {/* Col 2: Jogos */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-white tracking-widest font-display">
              Jogos do Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectGameBySlug?.('universo-das-palavras')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Caça-Palavras: Universo das Palavras
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectGameBySlug?.('classificacao-das-cores')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Classificação das Cores (Em Breve)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectGameBySlug?.('block-puzzle')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Block Puzzle Desafio (Em Breve)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categorias */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-white tracking-widest font-display">
              Categorias
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onFilterCategory?.('palavras')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Palavras & Vocabulário
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterCategory?.('logica')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Puzzle & Lógica
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterCategory?.('arcade')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Arcade & Estratégia
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterCategory?.('all')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Ver Todos
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} DECIX GAMES. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Desenvolvido para entretenimento e agilidade mental</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
