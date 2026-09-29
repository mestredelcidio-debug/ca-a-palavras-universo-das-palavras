import { GameSettings, UserProfile } from '../types/game';

const STORAGE_KEY_PROFILE = 'caca_palavras_profile_v1';
const STORAGE_KEY_SETTINGS = 'caca_palavras_settings_v1';

export const DEFAULT_PROFILE: UserProfile = {
  coins: 200, // Starting bonus for hints & fun
  stars: 0,
  currentLevel: 1,
  completedLevels: {},
  chapterBackgrounds: {},
  bgMode: 'nature',
  activeNatureBg: 'floresta',
  lastDailyDate: '',
  dailyStreak: 0,
  completedDailyDates: [],
  lastClaimedGiftDate: '',
  giftStreakDay: 1,
  unlockedThemes: ['tropical'],
  currentTheme: 'tropical',
  unlockedHighlighters: ['default'],
  currentHighlighter: 'default',
  unlockedLetterStyles: ['rounded'],
  currentLetterStyle: 'rounded',
  unlockedAvatars: ['capivara'],
  currentAvatar: 'capivara',
  achievements: {},
  stats: {
    puzzlesSolved: 0,
    wordsFound: 0,
    hintsUsed: 0,
    bestStreak: 0,
    currentStreak: 0,
    timePlayedSeconds: 0
  }
};

export const DEFAULT_SETTINGS: GameSettings = {
  language: 'pt',
  soundEnabled: true,
  musicEnabled: true,
  sfxVolume: 0.6,
  hapticEnabled: true,
  fontSize: 'normal',
  highContrast: false,
  leftHanded: false,
  normalizeAccentsOnGrid: true
};

export function loadUserProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_PROFILE,
        ...parsed,
        chapterBackgrounds: parsed.chapterBackgrounds || {},
        bgMode: parsed.bgMode || 'nature',
        activeNatureBg: parsed.activeNatureBg || 'floresta',
        stats: { ...DEFAULT_PROFILE.stats, ...(parsed.stats || {}) }
      };
    }
  } catch (err) {
    console.error('Error loading user profile:', err);
  }
  return DEFAULT_PROFILE;
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  } catch (err) {
    console.error('Error saving user profile:', err);
  }
}

export function loadGameSettings(): GameSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.error('Error loading game settings:', err);
  }
  return DEFAULT_SETTINGS;
}

export function saveGameSettings(settings: GameSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error('Error saving game settings:', err);
  }
}
