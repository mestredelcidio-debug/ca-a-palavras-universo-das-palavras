/**
 * Brazilian Portuguese text normalization and utilities for Caça-Palavras
 */

// Normalizes Brazilian Portuguese characters: removes accents, hyphens, and spaces
export function normalizePtBr(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/Ç/gi, 'C')
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase();
}

// Letter frequency in Brazilian Portuguese for natural and enjoyable word search filler letters
// Source: Brazilian Portuguese linguistic corpus
const PT_BR_LETTER_POOL = [
  'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',
  'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
  'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
  'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S',
  'R', 'R', 'R', 'R', 'R', 'R',
  'I', 'I', 'I', 'I', 'I', 'I',
  'N', 'N', 'N', 'N', 'N',
  'D', 'D', 'D', 'D', 'D',
  'M', 'M', 'M', 'M',
  'U', 'U', 'U', 'U',
  'T', 'T', 'T', 'T',
  'C', 'C', 'C', 'C',
  'L', 'L', 'L',
  'P', 'P', 'P',
  'V', 'V',
  'G', 'G',
  'B', 'B',
  'F', 'F',
  'Z',
  'J',
  'H',
  'Q',
  'X'
];

export function getRandomFillerLetter(randomFn: () => number = Math.random): string {
  const index = Math.floor(randomFn() * PT_BR_LETTER_POOL.length);
  return PT_BR_LETTER_POOL[index] || 'A';
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
