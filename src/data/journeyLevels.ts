export interface JourneyLevelConfig {
  levelNumber: number;
  chapterId: string;
  chapterTitle: string;
  categoryTitle: string;
  gridSize: number;
  words: string[];
  fixedGrid?: string[][];
}

export interface ChapterInfo {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  headerBg: string;
  bannerColor: string;
  levels: number[];
  postcards: {
    id: number;
    unlockedAtLevel: number;
    image?: string;
  }[];
}

export const JOURNEY_CHAPTERS: ChapterInfo[] = [
  {
    id: 'mar',
    name: 'MAR',
    subtitle: 'Capítulo 1',
    color: '#0284c7',
    headerBg: 'bg-blue-600',
    bannerColor: 'from-blue-600 to-sky-500',
    levels: [1, 2, 3],
    postcards: [
      { id: 1, unlockedAtLevel: 1 },
      { id: 2, unlockedAtLevel: 2 },
      { id: 3, unlockedAtLevel: 3 }
    ]
  },
  {
    id: 'floresta',
    name: 'FLORESTA',
    subtitle: 'Capítulo 2',
    color: '#16a34a',
    headerBg: 'bg-emerald-600',
    bannerColor: 'from-emerald-600 to-green-500',
    levels: [4, 5, 6, 7, 8],
    postcards: [
      { id: 4, unlockedAtLevel: 4 },
      { id: 5, unlockedAtLevel: 5 },
      { id: 6, unlockedAtLevel: 6 },
      { id: 7, unlockedAtLevel: 7 },
      { id: 8, unlockedAtLevel: 8 }
    ]
  },
  {
    id: 'deserto',
    name: 'DESERTO',
    subtitle: 'Capítulo 3',
    color: '#d97706',
    headerBg: 'bg-amber-500',
    bannerColor: 'from-amber-500 to-yellow-500',
    levels: [9, 10, 11, 12, 13],
    postcards: [
      { id: 9, unlockedAtLevel: 9 },
      { id: 10, unlockedAtLevel: 10 },
      { id: 11, unlockedAtLevel: 11 },
      { id: 12, unlockedAtLevel: 12 },
      { id: 13, unlockedAtLevel: 13 }
    ]
  }
];

// Presets matching screenshot 2 exactly for level 2!
export const PRESET_LEVELS: Record<number, JourneyLevelConfig> = {
  1: {
    levelNumber: 1,
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
  },
  2: {
    levelNumber: 2,
    chapterId: 'mar',
    chapterTitle: 'Mar: Capítulo 1',
    categoryTitle: 'CELEBRAÇÃO',
    gridSize: 5,
    words: ['AMOR', 'RISO', 'VIVA', 'FESTA', 'BOLO'],
    // Exactly as seen in Screenshot 2!
    fixedGrid: [
      ['R', 'I', 'S', 'O', 'B'],
      ['A', 'V', 'I', 'V', 'O'],
      ['A', 'M', 'O', 'R', 'L'],
      ['A', 'I', 'V', 'E', 'O'],
      ['F', 'E', 'S', 'T', 'A']
    ]
  },
  3: {
    levelNumber: 3,
    chapterId: 'mar',
    chapterTitle: 'Mar: Capítulo 1',
    categoryTitle: 'PRAIA',
    gridSize: 5,
    words: ['ONDA', 'AREIA', 'SOL', 'VENTO', 'MAR'],
    fixedGrid: [
      ['O', 'N', 'D', 'A', 'S'],
      ['A', 'R', 'E', 'I', 'A'],
      ['S', 'O', 'L', 'M', 'V'],
      ['V', 'E', 'N', 'T', 'O'],
      ['M', 'A', 'R', 'E', 'S']
    ]
  }
};
