export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type GameMode = 'classic' | 'timed' | 'relax' | 'daily' | 'marathon';

export interface CellPos {
  row: number;
  col: number;
}

export interface PlacedWord {
  word: string;             // Original word with accents (e.g. "AÇAÍ", "PÃO DE QUEIJO")
  cleanDisplay: string;     // Display title
  normalized: string;       // Normalized uppercase (e.g. "ACAI", "PAODEQUEIJO")
  path: CellPos[];
  found: boolean;
  color?: string;
  hintFirstRevealed?: boolean;
  hintDirectionRevealed?: boolean;
}

export interface PuzzleData {
  id: string;
  name: string;
  category: string;
  categoryTitle: string;
  difficulty: Difficulty;
  size: number;
  grid: string[][];
  words: PlacedWord[];
  seed: number;
}

export interface ActiveSelection {
  start: CellPos;
  current: CellPos;
  path: CellPos[];
  wordString: string;
}

export interface UserStats {
  puzzlesSolved: number;
  wordsFound: number;
  hintsUsed: number;
  bestStreak: number;
  currentStreak: number;
  timePlayedSeconds: number;
}

export interface UserProfile {
  coins: number;
  stars: number;
  currentLevel: number;
  completedLevels: Record<number, { stars: number; time: number }>;
  lastDailyDate: string;
  dailyStreak: number;
  completedDailyDates: string[]; // YYYY-MM-DD
  lastClaimedGiftDate: string;   // YYYY-MM-DD for daily presents
  giftStreakDay: number;         // 1 to 7
  unlockedThemes: string[];
  currentTheme: string;
  unlockedHighlighters: string[];
  currentHighlighter: string;
  unlockedLetterStyles: string[];
  currentLetterStyle: string;
  unlockedAvatars: string[];
  currentAvatar: string;
  achievements: Record<string, boolean>;
  stats: UserStats;
}

export interface DailyGiftReward {
  day: number;
  coins: number;
  title: string;
  description: string;
  iconName: string;
  isSpecial?: boolean;
}

export type SupportedLanguage =
  | 'pt'
  | 'en'
  | 'fr'
  | 'es'
  | 'de'
  | 'it'
  | 'id'
  | 'ru'
  | 'pl'
  | 'tr';

export interface GameSettings {
  language: SupportedLanguage;
  soundEnabled: boolean;
  musicEnabled: boolean;
  sfxVolume: number;
  hapticEnabled: boolean;
  fontSize: 'normal' | 'large' | 'extralarge';
  highContrast: boolean;
  leftHanded: boolean;
  normalizeAccentsOnGrid: boolean;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  price: number;
  backgroundClass: string;
  gridBgClass: string;
  cellBgClass: string;
  cellTextClass: string;
  cardBgClass: string;
  accentClass: string;
  borderColorClass: string;
}
