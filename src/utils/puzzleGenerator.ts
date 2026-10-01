import { CATEGORIES, getCategoryById } from '../data/categories';
import { getWordsForLevel } from '../data/universeWordBank';
import { GAME_MODES } from '../data/gameModes';
import { CellPos, Difficulty, PlacedWord, PuzzleData } from '../types/game';
import { getRandomFillerLetter, normalizePtBr, getWordLetters, normalizePtBrChar } from './text';

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
 * Attempts to place words on the grid preserving Portuguese accents.
 * Retries if placement density is too high or words fail.
 * Always maintains exactly 6 fresh, non-repeating words per level.
 */
export function generatePuzzle(
  categoryId: string,
  difficulty: Difficulty = 'medium',
  seed: number = Math.floor(Math.random() * 1000000),
  levelNumber?: number,
  specialModeId?: number
): PuzzleData {
  const category = getCategoryById(categoryId);
  const config = getDifficultyConfig(difficulty);
  const size = config.size;

  // Extrai o nível real para selecionar palavras 100% exclusivas
  const effectiveLevel =
    levelNumber ?? Math.max(1, Math.floor((seed - 1000) / 47) || Math.floor((seed % 900) + 1));

  const modeDef = specialModeId ? GAME_MODES.find(m => m.id === specialModeId) : null;
  const displayTitle = modeDef ? modeDef.name : category.title;

  // Obtém 6 palavras exclusivas do banco massivo sem repetições
  const freshWords = getWordsForLevel(categoryId, effectiveLevel, 6, specialModeId);

  let currentSeed = seed;
  let attempts = 0;
  const maxGeneratorAttempts = 35;

  while (attempts < maxGeneratorAttempts) {
    attempts++;
    const rng = createSeededRandom(currentSeed);

    // Se tentativas iniciais falharem por colisão geométrica, busca variação do banco
    let candidateWords = [...freshWords];
    if (attempts > 12) {
      candidateWords = getWordsForLevel(categoryId, effectiveLevel + attempts * 3, 6, specialModeId);
    }

    // Filtra palavras que cabem dentro do grid de 9x9 (tamanho 3 a 8 letras)
    const eligibleWords = candidateWords.filter(w => {
      const norm = normalizePtBr(w);
      return norm.length >= 3 && norm.length <= size;
    });

    const targetWords = eligibleWords.slice(0, 6);

    // Ordena do maior para o menor para facilitar encaixe
    targetWords.sort((a, b) => normalizePtBr(b).length - normalizePtBr(a).length);

    // Grid vazio 9x9
    const grid: string[][] = Array.from({ length: size }, () => Array(size).fill(''));
    const placedWords: PlacedWord[] = [];
    let allPlaced = true;

    for (let i = 0; i < targetWords.length; i++) {
      const origWord = targetWords[i];
      const wordLetters = getWordLetters(origWord);
      const placed = tryPlaceWord(grid, wordLetters, config.directions, size, rng);

      if (placed) {
        placedWords.push({
          word: origWord,
          cleanDisplay: origWord,
          normalized: normalizePtBr(origWord),
          path: placed.path,
          found: false,
          color: HIGHLIGHT_COLORS[placedWords.length % HIGHLIGHT_COLORS.length]
        });
      } else {
        allPlaced = false;
        break;
      }
    }

    if (allPlaced && placedWords.length === 6) {
      // Preenche os espaços vazios com letras naturais do português
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (!grid[r][c]) {
            grid[r][c] = getRandomFillerLetter(rng);
          }
        }
      }

      // Verificação de integridade das palavras no tabuleiro
      let verified = true;
      for (const pw of placedWords) {
        let spelled = '';
        for (const pt of pw.path) {
          spelled += normalizePtBrChar(grid[pt.row][pt.col]);
        }
        if (spelled !== pw.normalized) {
          verified = false;
          break;
        }
      }

      if (verified) {
        return {
          id: `puzzle_${specialModeId ? `mode_${specialModeId}` : categoryId}_${difficulty}_${effectiveLevel}_${seed}`,
          name: `${displayTitle} #${effectiveLevel}`,
          category: specialModeId ? `mode_${specialModeId}` : category.id,
          categoryTitle: displayTitle,
          difficulty,
          size,
          grid,
          words: placedWords,
          seed
        };
      }
    }

    // Próxima semente para novo layout
    currentSeed += 9973;
  }

  // Fallback seguro usando as próprias palavras exclusivas da fase
  return generateSimpleFallbackPuzzle(category, difficulty, seed, freshWords, effectiveLevel, displayTitle);
}

function tryPlaceWord(
  grid: string[][],
  wordLetters: string[],
  directions: [number, number][],
  size: number,
  rng: () => number
): { path: CellPos[] } | null {
  const len = wordLetters.length;
  const maxTries = 150;
  const shuffledDirs = [...directions].sort(() => rng() - 0.5);

  for (let t = 0; t < maxTries; t++) {
    const dir = shuffledDirs[Math.floor(rng() * shuffledDirs.length)];
    const [dRow, dCol] = dir;

    // Calcula os limites de início no grid 9x9
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
      const char = wordLetters[k];

      if (existing !== '' && normalizePtBrChar(existing) !== normalizePtBrChar(char)) {
        canPlace = false;
        break;
      }

      path.push({ row: r, col: c });
    }

    if (canPlace) {
      for (let k = 0; k < len; k++) {
        const pt = path[k];
        if (grid[pt.row][pt.col] === '') {
          grid[pt.row][pt.col] = wordLetters[k];
        }
      }
      return { path };
    }
  }

  return null;
}

function generateSimpleFallbackPuzzle(
  category: ReturnType<typeof getCategoryById>,
  difficulty: Difficulty,
  seed: number,
  wordsPool: string[],
  levelNumber: number,
  customTitle?: string
): PuzzleData {
  const config = getDifficultyConfig(difficulty);
  const size = config.size;
  const rng = createSeededRandom(seed);
  const grid: string[][] = Array.from({ length: size }, () => Array(size).fill(''));
  const placedWords: PlacedWord[] = [];

  const words = wordsPool
    .map(w => ({ orig: w, norm: normalizePtBr(w), letters: getWordLetters(w) }))
    .filter(w => w.norm.length <= size)
    .slice(0, 6);

  words.forEach((w, rowIdx) => {
    if (rowIdx < size) {
      const colStart = 0;
      const path: CellPos[] = [];
      for (let i = 0; i < w.letters.length; i++) {
        grid[rowIdx][colStart + i] = w.letters[i];
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

  const title = customTitle || category.title;
  return {
    id: `puzzle_fallback_${category.id}_${levelNumber}_${seed}`,
    name: `${title} #${levelNumber}`,
    category: category.id,
    categoryTitle: title,
    difficulty,
    size,
    grid,
    words: placedWords,
    seed
  };
}
