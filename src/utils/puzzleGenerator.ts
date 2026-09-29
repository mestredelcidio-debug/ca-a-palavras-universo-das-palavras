import { CATEGORIES, getCategoryById } from '../data/categories';
import { CellPos, Difficulty, PlacedWord, PuzzleData } from '../types/game';
import { getRandomFillerLetter, normalizePtBr } from './text';

// 8 Directions [dRow, dCol]
export const ALL_DIRECTIONS: [number, number][] = [
  [0, 1],   // Horizontal L -> R
  [1, 0],   // Vertical T -> B
  [1, 1],   // Diagonal Down-Right
  [-1, 1],  // Diagonal Up-Right
  [0, -1],  // Horizontal R -> L (Reverse)
  [-1, 0],  // Vertical B -> T (Reverse)
  [-1, -1], // Diagonal Up-Left (Reverse)
  [1, -1]   // Diagonal Down-Left (Reverse)
];

// Easy: only L->R and T->B
export const EASY_DIRECTIONS: [number, number][] = [
  [0, 1],
  [1, 0]
];

// Medium: Horizontal, Vertical, Diagonal (Forward + Reverse H & V)
export const MEDIUM_DIRECTIONS: [number, number][] = [
  [0, 1],
  [1, 0],
  [1, 1],
  [-1, 1],
  [0, -1],
  [-1, 0]
];

export const HIGHLIGHT_COLORS = [
  '#059669', // Emerald
  '#0284c7', // Sky Blue
  '#d97706', // Amber
  '#e11d48', // Rose
  '#7c3aed', // Violet
  '#ea580c', // Orange
  '#0d9488', // Teal
  '#4f46e5', // Indigo
  '#65a30d', // Lime
  '#db2777', // Pink
  '#0891b2', // Cyan
  '#b45309'  // Warm Ochre
];

// Mulberry32 deterministic pseudo-random generator
function createSeededRandom(seed: number) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getDifficultyConfig(_difficulty?: Difficulty): {
  size: number;
  wordCount: number;
  directions: [number, number][];
} {
  // Always fixed at 6 words per user specification
  return { size: 9, wordCount: 6, directions: MEDIUM_DIRECTIONS };
}

/**
 * Attempts to place words on the grid.
 * Retries if placement density is too high or words fail.
 * Always maintains exactly 6 words to be found.
 */
export function generatePuzzle(
  categoryId: string,
  difficulty: Difficulty = 'medium',
  seed: number = Math.floor(Math.random() * 1000000)
): PuzzleData {
  const category = getCategoryById(categoryId);
  const config = getDifficultyConfig(difficulty);
  const size = config.size;

  let currentSeed = seed;
  let attempts = 0;
  const maxGeneratorAttempts = 20;

  while (attempts < maxGeneratorAttempts) {
    attempts++;
    const rng = createSeededRandom(currentSeed);

    // Shuffle and pick words from category
    const shuffledPool = [...category.words].sort(() => rng() - 0.5);
    // Filter words that fit within grid bounds
    const eligibleWords = shuffledPool.filter(w => {
      const norm = normalizePtBr(w);
      return norm.length >= 3 && norm.length <= size;
    });

    // Strictly exactly 6 words as requested by the user
    const targetWords = eligibleWords.slice(0, 6);
    
    // Sort words by length descending for easier placement
    targetWords.sort((a, b) => normalizePtBr(b).length - normalizePtBr(a).length);

    // Initialize empty grid
    const grid: string[][] = Array.from({ length: size }, () => Array(size).fill(''));
    const placedWords: PlacedWord[] = [];
    let allPlaced = true;

    for (let i = 0; i < targetWords.length; i++) {
      const origWord = targetWords[i];
      const normWord = normalizePtBr(origWord);
      const placed = tryPlaceWord(grid, normWord, config.directions, size, rng);

      if (placed) {
        placedWords.push({
          word: origWord,
          cleanDisplay: origWord,
          normalized: normWord,
          path: placed.path,
          found: false,
          color: HIGHLIGHT_COLORS[placedWords.length % HIGHLIGHT_COLORS.length]
        });
      } else {
        allPlaced = false;
        break;
      }
    }

    if (allPlaced && placedWords.length >= Math.min(4, config.wordCount)) {
      // Fill empty spots with realistic Portuguese filler letters
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (!grid[r][c]) {
            grid[r][c] = getRandomFillerLetter(rng);
          }
        }
      }

      // Verify that all target words are indeed present along their declared paths
      let verified = true;
      for (const pw of placedWords) {
        let spelled = '';
        for (const pt of pw.path) {
          spelled += grid[pt.row][pt.col];
        }
        if (spelled !== pw.normalized) {
          verified = false;
          break;
        }
      }

      if (verified) {
        return {
          id: `puzzle_${categoryId}_${difficulty}_${seed}`,
          name: `${category.title} #${seed % 1000 + 1}`,
          category: category.id,
          categoryTitle: category.title,
          difficulty,
          size,
          grid,
          words: placedWords,
          seed
        };
      }
    }

    // Try next seed
    currentSeed += 9973;
  }

  // Fallback safety: place standard words horizontally if extreme density failed
  return generateSimpleFallbackPuzzle(category, difficulty, seed);
}

function tryPlaceWord(
  grid: string[][],
  word: string,
  directions: [number, number][],
  size: number,
  rng: () => number
): { path: CellPos[] } | null {
  const len = word.length;
  // Try up to 120 random placement coordinates and orientations
  const maxTries = 120;
  const shuffledDirs = [...directions].sort(() => rng() - 0.5);

  for (let t = 0; t < maxTries; t++) {
    const dir = shuffledDirs[Math.floor(rng() * shuffledDirs.length)];
    const [dRow, dCol] = dir;

    // Calculate valid starting bounds
    const minRow = dRow < 0 ? len - 1 : 0;
    const maxRow = dRow > 0 ? size - len : size - 1;
    const minCol = dCol < 0 ? len - 1 : 0;
    const maxCol = dCol > 0 ? size - len : size - 1;

    if (maxRow < minRow || maxCol < minCol) continue;

    const startRow = Math.floor(rng() * (maxRow - minRow + 1)) + minRow;
    const startCol = Math.floor(rng() * (maxCol - minCol + 1)) + minCol;

    let canPlace = true;
    const path: CellPos[] = [];

    for (let k = 0; k < len; k++) {
      const r = startRow + k * dRow;
      const c = startCol + k * dCol;

      if (r < 0 || r >= size || c < 0 || c >= size) {
        canPlace = false;
        break;
      }

      const existing = grid[r][c];
      const char = word[k];

      if (existing !== '' && existing !== char) {
        canPlace = false;
        break;
      }

      path.push({ row: r, col: c });
    }

    if (canPlace) {
      // Commit placement to grid
      for (let k = 0; k < len; k++) {
        const { row, col } = path[k];
        grid[row][col] = word[k];
      }
      return { path };
    }
  }

  return null;
}

function generateSimpleFallbackPuzzle(
  category: ReturnType<typeof getCategoryById>,
  difficulty: Difficulty,
  seed: number
): PuzzleData {
  const config = getDifficultyConfig(difficulty);
  const size = config.size;
  const rng = createSeededRandom(seed);
  const grid: string[][] = Array.from({ length: size }, () => Array(size).fill(''));
  const placedWords: PlacedWord[] = [];

  const words = category.words
    .map(w => ({ orig: w, norm: normalizePtBr(w) }))
    .filter(w => w.norm.length <= size)
    .slice(0, Math.min(size, config.wordCount));

  words.forEach((w, rowIdx) => {
    if (rowIdx < size) {
      const colStart = 0;
      const path: CellPos[] = [];
      for (let i = 0; i < w.norm.length; i++) {
        grid[rowIdx][colStart + i] = w.norm[i];
        path.push({ row: rowIdx, col: colStart + i });
      }
      placedWords.push({
        word: w.orig,
        cleanDisplay: w.orig,
        normalized: w.norm,
        path,
        found: false,
        color: HIGHLIGHT_COLORS[placedWords.length % HIGHLIGHT_COLORS.length]
      });
    }
  });

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) {
        grid[r][c] = getRandomFillerLetter(rng);
      }
    }
  }

  return {
    id: `puzzle_fallback_${category.id}_${seed}`,
    name: `${category.title} #${seed % 1000 + 1}`,
    category: category.id,
    categoryTitle: category.title,
    difficulty,
    size,
    grid,
    words: placedWords,
    seed
  };
}
