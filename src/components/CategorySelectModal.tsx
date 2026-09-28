import React, { useState } from 'react';
import { X, Search, Sparkles, Flame, Clock, Compass, Check } from 'lucide-react';
import { CATEGORIES, CategoryData } from '../data/categories';
import { Difficulty, GameMode } from '../types/game';

interface CategorySelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  selectedDifficulty: Difficulty;
  selectedMode: GameMode;
  onSelectPuzzleConfig: (categoryId: string, difficulty: Difficulty, mode: GameMode) => void;
}

export const CategorySelectModal: React.FC<CategorySelectModalProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  selectedDifficulty,
  selectedMode,
  onSelectPuzzleConfig
}) => {
  const [search, setSearch] = useState('');
  const [currentDiff, setCurrentDiff] = useState<Difficulty>(selectedDifficulty);
  const [currentMode, setCurrentMode] = useState<GameMode>(selectedMode);

  if (!isOpen) return null;

  const filteredCategories = CATEGORIES.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (categoryId: string) => {
    onSelectPuzzleConfig(categoryId, currentDiff, currentMode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-emerald-500/30 p-5 shadow-2xl flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div>
            <h3 className="font-display font-bold text-base text-white">Temas & Modos de Jogo</h3>
            <p className="text-[11px] text-emerald-300 font-semibold">Escolha um vocabulário brasileiro</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Difficulty Selector */}
        <div className="my-2.5 shrink-0">
          <div className="text-[10px] text-white/50 uppercase tracking-wider font-bold mb-1.5">
            Dificuldade
          </div>
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-white/5 rounded-xl">
            {(
              [
                { id: 'easy', label: 'Fácil', sub: '9x9' },
                { id: 'medium', label: 'Médio', sub: '11x11' },
                { id: 'hard', label: 'Difícil', sub: '13x13' },
                { id: 'expert', label: 'Expert', sub: '15x15' }
              ] as const
            ).map(d => (
              <button
                key={d.id}
                onClick={() => setCurrentDiff(d.id)}
                className={`py-1.5 px-1 rounded-lg text-xs font-bold flex flex-col items-center justify-center transition-all ${
                  currentDiff === d.id
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{d.label}</span>
                <span className="text-[9px] opacity-75">{d.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selector */}
        <div className="mb-2.5 shrink-0">
          <div className="text-[10px] text-white/50 uppercase tracking-wider font-bold mb-1.5">
            Modo de Jogo
          </div>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-white/5 rounded-xl">
            {(
              [
                { id: 'classic', label: 'Clássico', icon: Sparkles },
                { id: 'timed', label: 'Contra Relógio', icon: Clock },
                { id: 'relax', label: 'Modo Relax', icon: Compass }
              ] as const
            ).map(m => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setCurrentMode(m.id)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                    currentMode === m.id
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-3 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Buscar tema (ex: Frutas, Carnaval, Praia)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-400"
          />
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filteredCategories.map(cat => {
            const isCurrent = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className={`p-3 rounded-2xl border text-left flex items-center justify-between gap-2.5 transition-all active:scale-98 ${
                  isCurrent
                    ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                    : 'bg-white/5 border-white/10 text-white/90 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="font-bold text-xs flex items-center gap-1.5">
                    <span>{cat.title}</span>
                    {isCurrent && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <p className="text-[11px] text-white/60 line-clamp-1 mt-0.5">
                    {cat.description}
                  </p>
                  <span className="text-[10px] text-emerald-300/80 font-medium">
                    {cat.words.length} palavras disponíveis
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
