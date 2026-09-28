import React, { useRef, useState, useCallback, useEffect } from 'react';
import { CellPos, PlacedWord, PuzzleData } from '../types/game';
import { playLetterTick, triggerHaptic } from '../utils/audio';

interface WordGridProps {
  puzzle: PuzzleData;
  activeWordHintId?: string;
  dimIrrelevantLetters?: boolean;
  highContrast?: boolean;
  fontSize: 'normal' | 'large' | 'extralarge';
  soundEnabled: boolean;
  hapticEnabled: boolean;
  onAttemptWord: (selectedWord: string, path: CellPos[]) => void;
}

export const WordGrid: React.FC<WordGridProps> = ({
  puzzle,
  activeWordHintId,
  dimIrrelevantLetters = false,
  highContrast = false,
  fontSize,
  soundEnabled,
  hapticEnabled,
  onAttemptWord
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<CellPos | null>(null);
  const [currentPos, setCurrentPos] = useState<CellPos | null>(null);
  const [activePath, setActivePath] = useState<CellPos[]>([]);
  const prevPathLenRef = useRef<number>(0);

  const size = puzzle.size;

  // Compute active path between start and current cell strictly snapped to 8 directions
  const calculatePath = useCallback((start: CellPos, curr: CellPos): CellPos[] => {
    const dr = curr.row - start.row;
    const dc = curr.col - start.col;

    if (dr === 0 && dc === 0) {
      return [start];
    }

    const absDr = Math.abs(dr);
    const absDc = Math.abs(dc);

    let stepR = 0;
    let stepC = 0;
    let steps = 0;

    if (absDr < 0.45 * absDc) {
      // Horizontal
      stepR = 0;
      stepC = dc > 0 ? 1 : -1;
      steps = absDc;
    } else if (absDc < 0.45 * absDr) {
      // Vertical
      stepR = dr > 0 ? 1 : -1;
      stepC = 0;
      steps = absDr;
    } else {
      // Diagonal (45 degrees)
      stepR = dr > 0 ? 1 : -1;
      stepC = dc > 0 ? 1 : -1;
      steps = Math.min(absDr, absDc);
    }

    const path: CellPos[] = [];
    for (let i = 0; i <= steps; i++) {
      const r = start.row + i * stepR;
      const c = start.col + i * stepC;
      if (r >= 0 && r < size && c >= 0 && c < size) {
        path.push({ row: r, col: c });
      }
    }
    return path;
  }, [size]);

  // Translate client coordinates into grid row & col
  const getCellFromCoords = useCallback((clientX: number, clientY: number): CellPos | null => {
    if (!gridRef.current) return null;
    const rect = gridRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (x < 0 || x >= rect.width || y < 0 || y >= rect.height) {
      return null;
    }

    const col = Math.floor((x / rect.width) * size);
    const row = Math.floor((y / rect.height) * size);

    if (row >= 0 && row < size && col >= 0 && col < size) {
      return { row, col };
    }
    return null;
  }, [size]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

    const cell = getCellFromCoords(e.clientX, e.clientY);
    if (!cell) return;

    setIsDragging(true);
    setStartPos(cell);
    setCurrentPos(cell);
    const initialPath = [cell];
    setActivePath(initialPath);
    prevPathLenRef.current = 1;
    playLetterTick(soundEnabled, 0.4);
    triggerHaptic(hapticEnabled, 'light');
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !startPos) return;
    const cell = getCellFromCoords(e.clientX, e.clientY);
    if (!cell) return;

    if (!currentPos || currentPos.row !== cell.row || currentPos.col !== cell.col) {
      setCurrentPos(cell);
      const newPath = calculatePath(startPos, cell);
      setActivePath(newPath);

      if (newPath.length !== prevPathLenRef.current) {
        playLetterTick(soundEnabled, 0.3);
        triggerHaptic(hapticEnabled, 'light');
        prevPathLenRef.current = newPath.length;
      }
    }
  };

  const endDrag = () => {
    if (isDragging && activePath.length > 0) {
      let wordString = '';
      for (const pos of activePath) {
        wordString += puzzle.grid[pos.row][pos.col];
      }
      onAttemptWord(wordString, activePath);
    }
    setIsDragging(false);
    setStartPos(null);
    setCurrentPos(null);
    setActivePath([]);
    prevPathLenRef.current = 0;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault();
    endDrag();
  };

  const handlePointerCancel = () => {
    endDrag();
  };

  // Check which cells are relevant (belong to unfound words) for the "clear false letters" hint
  const relevantCellsSet = new Set<string>();
  if (dimIrrelevantLetters) {
    puzzle.words
      .filter(w => !w.found)
      .forEach(w => {
        w.path.forEach(p => relevantCellsSet.add(`${p.row},${p.col}`));
      });
  }

  // Active path set for quick lookup
  const activePathSet = new Set<string>(activePath.map(p => `${p.row},${p.col}`));

  // Font size classes
  const getLetterSizeClass = () => {
    if (fontSize === 'extralarge') {
      return size > 12 ? 'text-base font-bold' : 'text-xl font-bold';
    }
    if (fontSize === 'large') {
      return size > 12 ? 'text-sm font-bold' : 'text-lg font-bold';
    }
    // Normal
    return size > 12 ? 'text-xs font-semibold' : size > 10 ? 'text-sm font-bold' : 'text-base font-bold';
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 select-none">
      <div
        ref={gridRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className={`relative grid-touch-zone w-full max-w-[420px] aspect-square rounded-2xl p-2.5 shadow-2xl transition-all ${
          highContrast
            ? 'bg-black border-2 border-white'
            : 'bg-slate-900/90 border border-emerald-500/25 backdrop-blur-md shadow-emerald-950/40'
        }`}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
          gap: size > 12 ? '3px' : '5px'
        }}
      >
        {/* SVG Overlay for drawing permanent capsules over found words and active selection */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-10"
          viewBox={`0 0 ${size * 100} ${size * 100}`}
          preserveAspectRatio="none"
        >
          {/* Completed words highlighter lines */}
          {puzzle.words
            .filter(w => w.found && w.path.length > 0)
            .map((w, idx) => {
              const start = w.path[0];
              const end = w.path[w.path.length - 1];
              const x1 = start.col * 100 + 50;
              const y1 = start.row * 100 + 50;
              const x2 = end.col * 100 + 50;
              const y2 = end.row * 100 + 50;
              const color = w.color || '#10b981';

              return (
                <line
                  key={`found-line-${idx}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={color}
                  strokeWidth="76"
                  strokeLinecap="round"
                  opacity="0.48"
                  className="transition-opacity duration-300"
                />
              );
            })}

          {/* Active selection live stroke */}
          {isDragging && activePath.length > 1 && (
            <line
              x1={activePath[0].col * 100 + 50}
              y1={activePath[0].row * 100 + 50}
              x2={activePath[activePath.length - 1].col * 100 + 50}
              y2={activePath[activePath.length - 1].row * 100 + 50}
              stroke="#fbbf24"
              strokeWidth="78"
              strokeLinecap="round"
              opacity="0.55"
              className="animate-pulse"
            />
          )}
        </svg>

        {/* Cells */}
        {puzzle.grid.map((rowArr, r) =>
          rowArr.map((letter, c) => {
            const isSelected = activePathSet.has(`${r},${c}`);
            const isRelevant = !dimIrrelevantLetters || relevantCellsSet.has(`${r},${c}`);

            // Check if any unfound word with active hint starts here
            const hintWord = puzzle.words.find(
              w => !w.found && w.hintFirstRevealed && w.path[0]?.row === r && w.path[0]?.col === c
            );

            return (
              <div
                key={`${r}-${c}`}
                className={`relative flex items-center justify-center rounded-lg transition-all duration-150 font-mono ${getLetterSizeClass()} ${
                  highContrast
                    ? isSelected
                      ? 'bg-amber-400 text-black font-extrabold scale-105 z-20 shadow-md'
                      : 'bg-zinc-800 text-white border border-zinc-700'
                    : isSelected
                    ? 'bg-amber-400 text-slate-950 font-black scale-105 z-20 shadow-md ring-2 ring-amber-300'
                    : isRelevant
                    ? 'bg-white/5 hover:bg-white/10 text-white/90 border border-white/10'
                    : 'bg-white/2 text-white/20 border border-transparent'
                }`}
              >
                {/* Letter */}
                <span className="z-20 pointer-events-none select-none">{letter}</span>

                {/* Pulsing Hint Indicator */}
                {hintWord && (
                  <div className="absolute inset-0 rounded-lg ring-2 ring-amber-400 animate-pulse z-30 pointer-events-none flex items-center justify-center">
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
                    {hintWord.hintDirectionRevealed && hintWord.path.length > 1 && (
                      <span className="absolute -bottom-1 -right-1 text-[9px] bg-amber-500 text-slate-950 px-0.5 rounded font-black">
                        {hintWord.path[1].row > hintWord.path[0].row ? '↓' : hintWord.path[1].row < hintWord.path[0].row ? '↑' : ''}
                        {hintWord.path[1].col > hintWord.path[0].col ? '→' : hintWord.path[1].col < hintWord.path[0].col ? '←' : ''}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
