import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeft, Settings, Search, Star, Play } from 'lucide-react';
import { CoinPill } from './CoinPill';
import { CellPos } from '../types/game';
import { JourneyLevelConfig, PRESET_LEVELS } from '../data/journeyLevels';
import { normalizePtBr } from '../utils/text';

interface GameViewProps {
  levelNumber: number;
  coins: number;
  soundEnabled: boolean;
  onGoHome: () => void;
  onOpenSettings: () => void;
  onOpenShop: () => void;
  onLevelComplete: (level: number, time: number) => void;
  onUseHint: () => void;
}

export const GameView: React.FC<GameViewProps> = ({
  levelNumber,
  coins,
  soundEnabled,
  onGoHome,
  onOpenSettings,
  onOpenShop,
  onLevelComplete,
  onUseHint
}) => {
  // Level configuration
  const levelConfig: JourneyLevelConfig = PRESET_LEVELS[levelNumber] || {
    levelNumber,
    chapterId: 'mar',
    chapterTitle: 'Mar: Capítulo 1',
    categoryTitle: 'CELEBRAÇÃO',
    gridSize: 5,
    words: ['AMOR', 'RISO', 'VIVA', 'FESTA', 'BOLO'],
    fixedGrid: [
      ['R', 'I', 'S', 'O', 'B'],
      ['A', 'V', 'I', 'V', 'O'],
      ['A', 'M', 'O', 'R', 'L'],
      ['A', 'I', 'V', 'E', 'O'],
      ['F', 'E', 'S', 'T', 'A']
    ]
  };

  const gridData = levelConfig.fixedGrid || [
    ['R', 'I', 'S', 'O', 'B'],
    ['A', 'V', 'I', 'V', 'O'],
    ['A', 'M', 'O', 'R', 'L'],
    ['A', 'I', 'V', 'E', 'O'],
    ['F', 'E', 'S', 'T', 'A']
  ];
  const gridSize = gridData.length;

  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [foundPaths, setFoundPaths] = useState<{ word: string; path: CellPos[]; color: string }[]>([]);

  // Drag selection state
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState<CellPos | null>(null);
  const [selectedPath, setSelectedPath] = useState<CellPos[]>([]);
  const [currentWordSpelled, setCurrentWordSpelled] = useState<string>('');

  const gridRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Palette for found words highlight
  const highlightColors = [
    'rgba(56, 189, 248, 0.5)',  // cyan
    'rgba(250, 204, 21, 0.5)',  // yellow
    'rgba(244, 114, 182, 0.5)', // pink
    'rgba(74, 222, 128, 0.5)',  // green
    'rgba(251, 146, 60, 0.5)'   // orange
  ];

  // Straight line path calculation (horizontal, vertical, diagonal)
  const calculateLinePath = useCallback((start: CellPos, end: CellPos): CellPos[] => {
    const dr = end.row - start.row;
    const dc = end.col - start.col;
    const absR = Math.abs(dr);
    const absC = Math.abs(dc);

    const path: CellPos[] = [];

    // Horizontal
    if (absR === 0) {
      const step = dc >= 0 ? 1 : -1;
      for (let c = start.col; c !== end.col + step; c += step) {
        path.push({ row: start.row, col: c });
      }
    }
    // Vertical
    else if (absC === 0) {
      const step = dr >= 0 ? 1 : -1;
      for (let r = start.row; r !== end.row + step; r += step) {
        path.push({ row: r, col: start.col });
      }
    }
    // Diagonal
    else if (absR === absC) {
      const stepR = dr >= 0 ? 1 : -1;
      const stepC = dc >= 0 ? 1 : -1;
      let r = start.row;
      let c = start.col;
      for (let i = 0; i <= absR; i++) {
        path.push({ row: r, col: c });
        r += stepR;
        c += stepC;
      }
    } else {
      // Snap to closest straight direction
      if (absR > absC * 2) {
        const step = dr >= 0 ? 1 : -1;
        for (let r = start.row; r !== end.row + step; r += step) {
          path.push({ row: r, col: start.col });
        }
      } else if (absC > absR * 2) {
        const step = dc >= 0 ? 1 : -1;
        for (let c = start.col; c !== end.col + step; c += step) {
          path.push({ row: start.row, col: c });
        }
      } else {
        const stepR = dr >= 0 ? 1 : -1;
        const stepC = dc >= 0 ? 1 : -1;
        const steps = Math.min(absR, absC);
        let r = start.row;
        let c = start.col;
        for (let i = 0; i <= steps; i++) {
          path.push({ row: r, col: c });
          r += stepR;
          c += stepC;
        }
      }
    }

    return path;
  }, []);

  const getCellFromCoords = useCallback(
    (clientX: number, clientY: number): CellPos | null => {
      if (!gridRef.current) return null;
      const rect = gridRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x < 0 || x >= rect.width || y < 0 || y >= rect.height) return null;

      const col = Math.floor((x / rect.width) * gridSize);
      const row = Math.floor((y / rect.height) * gridSize);

      if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
        return { row, col };
      }
      return null;
    },
    [gridSize]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

    const cell = getCellFromCoords(e.clientX, e.clientY);
    if (!cell) return;

    setIsSelecting(true);
    setStartCell(cell);
    setSelectedPath([cell]);
    setCurrentWordSpelled(gridData[cell.row][cell.col]);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isSelecting || !startCell) return;

    const cell = getCellFromCoords(e.clientX, e.clientY);
    if (!cell) return;

    const newPath = calculateLinePath(startCell, cell);
    setSelectedPath(newPath);

    let spelled = '';
    newPath.forEach(p => {
      spelled += gridData[p.row][p.col];
    });
    setCurrentWordSpelled(spelled);
  };

  const handlePointerUp = () => {
    if (!isSelecting) return;
    setIsSelecting(false);

    if (selectedPath.length > 0) {
      let forwardStr = '';
      selectedPath.forEach(p => {
        forwardStr += gridData[p.row][p.col];
      });
      const reversedStr = forwardStr.split('').reverse().join('');

      const normalizedForward = normalizePtBr(forwardStr);
      const normalizedReversed = normalizePtBr(reversedStr);

      const matchedWord = levelConfig.words.find(w => {
        const norm = normalizePtBr(w);
        return !foundWords.has(w) && (norm === normalizedForward || norm === normalizedReversed);
      });

      if (matchedWord) {
        const updatedSet = new Set(foundWords);
        updatedSet.add(matchedWord);
        setFoundWords(updatedSet);

        const color = highlightColors[foundPaths.length % highlightColors.length];
        setFoundPaths(prev => [...prev, { word: matchedWord, path: selectedPath, color }]);

        // Check if all words completed
        if (updatedSet.size === levelConfig.words.length) {
          const elapsedSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
          setTimeout(() => {
            onLevelComplete(levelNumber, elapsedSeconds);
          }, 600);
        }
      }
    }

    setSelectedPath([]);
    setStartCell(null);
    setCurrentWordSpelled('');
  };

  // Helper set of selected cells
  const selectedCellsSet = new Set(selectedPath.map(p => `${p.row},${p.col}`));

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col justify-between overflow-hidden select-none pb-4">
      {/* 1. TOP HEADER matching Screenshot 2 */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between px-4 pt-3 z-30 shrink-0">
        {/* Left Side: Back button + Settings button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onGoHome}
            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg border border-white/40 active:scale-95 transition-transform"
            title="Voltar ao Início"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={onOpenSettings}
            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg border border-white/40 active:scale-95 transition-transform"
            title="Configurações"
          >
            <Settings className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Center: "Nível 2" Pill */}
        <div className="px-5 py-1.5 rounded-full bg-white text-blue-800 font-display font-black text-sm tracking-wide shadow-md border-2 border-blue-400">
          Nível {levelNumber}
        </div>

        {/* Right Side: Coin Pill */}
        <CoinPill coins={coins} onOpenShop={onOpenShop} />
      </header>

      {/* 2. CATEGORY & WORDS LIST CARD matching Screenshot 2 */}
      <div className="w-full max-w-[340px] mx-auto px-2 mt-3 z-20">
        <div className="w-full rounded-2xl shadow-xl overflow-hidden border border-white/40">
          {/* Blue Header Bar with Star Gauge on left & Title */}
          <div className="bg-[#1c56b8] px-3.5 py-2 flex items-center justify-center relative">
            {/* Star on the left */}
            <div className="absolute left-2.5 flex items-center gap-1">
              <Star className="w-5 h-5 fill-amber-400 text-amber-300 drop-shadow" />
              <div className="w-10 h-2 bg-blue-950 rounded-full overflow-hidden border border-blue-400/40">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all"
                  style={{ width: `${(foundWords.size / levelConfig.words.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="font-display font-black text-base text-white tracking-widest uppercase drop-shadow-sm">
              {levelConfig.categoryTitle}
            </h3>
          </div>

          {/* White Card with Words to Find */}
          <div className="bg-white/95 backdrop-blur-sm p-3.5 flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-center">
            {levelConfig.words.map(w => {
              const isFound = foundWords.has(w);
              return (
                <span
                  key={w}
                  className={`font-display font-black text-sm tracking-wider uppercase transition-all duration-300 ${
                    isFound
                      ? 'text-emerald-600 line-through opacity-50 scale-95'
                      : 'text-slate-800'
                  }`}
                >
                  {w}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. LETTER GRID matching Screenshot 2 */}
      <div className="w-full max-w-[340px] mx-auto px-2 my-auto z-20 flex flex-col items-center">
        <div
          ref={gridRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full aspect-square bg-white/95 rounded-3xl p-3 shadow-2xl border-2 border-white shadow-emerald-950/20 grid touch-none select-none relative"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
            gap: '2px'
          }}
        >
          {gridData.map((row, r) =>
            row.map((letter, c) => {
              const isSelected = selectedCellsSet.has(`${r},${c}`);
              // Check if cell is in found path
              const foundMatch = foundPaths.find(fp =>
                fp.path.some(p => p.row === r && p.col === c)
              );

              return (
                <div
                  key={`${r}-${c}`}
                  className="flex items-center justify-center relative font-display font-black text-xl sm:text-2xl text-slate-900 rounded-xl transition-all"
                  style={{
                    backgroundColor: isSelected
                      ? '#38bdf8'
                      : foundMatch
                      ? foundMatch.color
                      : 'transparent',
                    color: isSelected ? '#ffffff' : '#0f172a'
                  }}
                >
                  <span className="relative z-10">{letter}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 4. FLOATING HINT (MAGNIFYING GLASS) & WORD PREVIEW TRAY matching Screenshot 2 */}
      <div className="w-full max-w-[340px] mx-auto px-2 flex flex-col items-center gap-3 z-30">
        {/* Floating Magnifying Glass on the right */}
        <div className="w-full flex justify-end pr-1">
          <button
            onClick={onUseHint}
            className="w-13 h-13 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 border-2 border-white shadow-xl flex items-center justify-center relative active:scale-95 transition-transform"
            style={{ width: '52px', height: '52px' }}
            title="Dica (Lupa)"
          >
            <Search className="w-6 h-6 text-amber-300 stroke-[2.8]" />
            {/* Small video play icon badge */}
            <div className="absolute -bottom-1 w-6 h-4 rounded bg-blue-900 border border-white/60 flex items-center justify-center">
              <Play className="w-2.5 h-2.5 text-white fill-white ml-0.5" />
            </div>
          </button>
        </div>

        {/* Bottom Word Preview Tray matching Screenshot 2 */}
        <div className="w-full h-11 rounded-2xl bg-white/95 border-2 border-white/80 shadow-lg flex items-center justify-center font-display font-black text-base text-slate-800 tracking-widest uppercase">
          {currentWordSpelled}
        </div>
      </div>
    </div>
  );
};
