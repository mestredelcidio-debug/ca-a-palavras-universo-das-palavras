import { ThemeConfig } from '../types/game';
import astronautImg from '../assets/images/avatar_astronauta_1790823383121.jpg';

export const THEMES: ThemeConfig[] = [
  {
    id: 'tropical', // keeping ID for saved settings compatibility
    name: 'Cosmos Infinito',
    description: 'Violeta estelar, ciano nebular e poeira cósmica luminosa',
    price: 0,
    backgroundClass: 'bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-indigo-50',
    gridBgClass: 'bg-indigo-950/70 border-indigo-700/40 shadow-indigo-950/50',
    cellBgClass: 'bg-indigo-900/40 hover:bg-indigo-800/60 active:bg-indigo-700/80 border-indigo-700/30 text-indigo-100',
    cellTextClass: 'text-indigo-100',
    cardBgClass: 'bg-indigo-900/50 border-indigo-800/40',
    accentClass: 'bg-amber-400 text-slate-950 hover:bg-amber-300',
    borderColorClass: 'border-indigo-700/40'
  },
  {
    id: 'praia',
    name: 'Nebulosa Mística',
    description: 'Azul ciano profundo, gases interestelares e estrelas cadentes',
    price: 150,
    backgroundClass: 'bg-gradient-to-br from-sky-950 via-cyan-950 to-slate-950 text-cyan-50',
    gridBgClass: 'bg-sky-950/70 border-cyan-700/40 shadow-sky-950/50',
    cellBgClass: 'bg-cyan-900/40 hover:bg-cyan-800/60 active:bg-cyan-700/80 border-cyan-700/30 text-cyan-100',
    cellTextClass: 'text-cyan-100',
    cardBgClass: 'bg-cyan-900/50 border-cyan-800/40',
    accentClass: 'bg-cyan-400 text-slate-950 hover:bg-cyan-300',
    borderColorClass: 'border-cyan-700/40'
  },
  {
    id: 'sunset',
    name: 'Clarão de Supernova',
    description: 'Tons dourados e âmbar de explosões estelares majestosas',
    price: 250,
    backgroundClass: 'bg-gradient-to-br from-amber-950 via-orange-950 to-purple-950 text-amber-50',
    gridBgClass: 'bg-amber-950/70 border-amber-700/40 shadow-amber-950/50',
    cellBgClass: 'bg-amber-900/40 hover:bg-amber-800/60 active:bg-amber-700/80 border-amber-700/30 text-amber-100',
    cellTextClass: 'text-amber-100',
    cardBgClass: 'bg-amber-900/50 border-amber-800/40',
    accentClass: 'bg-amber-400 text-slate-950 hover:bg-amber-300',
    borderColorClass: 'border-amber-700/40'
  },
  {
    id: 'carnaval',
    name: 'Galáxia de Andrômeda',
    description: 'Púrpura sideral, aglomerados estelares e auroras cósmicas',
    price: 350,
    backgroundClass: 'bg-gradient-to-br from-fuchsia-950 via-purple-950 to-slate-950 text-fuchsia-50',
    gridBgClass: 'bg-purple-950/70 border-fuchsia-700/40 shadow-fuchsia-950/50',
    cellBgClass: 'bg-fuchsia-900/40 hover:bg-fuchsia-800/60 active:bg-fuchsia-700/80 border-fuchsia-700/30 text-fuchsia-100',
    cellTextClass: 'text-fuchsia-100',
    cardBgClass: 'bg-fuchsia-900/50 border-fuchsia-800/40',
    accentClass: 'bg-fuchsia-400 text-slate-950 hover:bg-fuchsia-300',
    borderColorClass: 'border-fuchsia-700/40'
  },
  {
    id: 'dark',
    name: 'Vácuo Espacial Profundo',
    description: 'Preto cósmico absoluto com estrelas prateadas de alto foco',
    price: 200,
    backgroundClass: 'bg-slate-950 text-slate-100',
    gridBgClass: 'bg-slate-900/80 border-slate-800 shadow-black/80',
    cellBgClass: 'bg-slate-800/60 hover:bg-slate-700/70 active:bg-slate-600 border-slate-700 text-slate-100',
    cellTextClass: 'text-slate-100',
    cardBgClass: 'bg-slate-900 border-slate-800',
    accentClass: 'bg-indigo-500 text-white hover:bg-indigo-400',
    borderColorClass: 'border-slate-800'
  }
];

export interface AvatarOption {
  id: string;
  name: string;
  description: string;
  emoji: string;
  imagePath?: string;
  price: number;
}

export const AVATARS: AvatarOption[] = [
  {
    id: 'capivara', // mapped to astronaut for compatibility
    name: 'Astronauta Estelar VIP',
    description: 'O comandante supremo na exploração do Universo das Palavras',
    emoji: '👨‍🚀',
    imagePath: astronautImg,
    price: 0
  },
  {
    id: 'tucano',
    name: 'Alienígena Amigável',
    description: 'Viajante intergaláctico decifrador de idiomas estelares',
    emoji: '👽',
    price: 100
  },
  {
    id: 'arara',
    name: 'Sonda Espacial IA',
    description: 'Sensores quânticos de altíssima precisão para caça de palavras',
    emoji: '🤖',
    price: 150
  },
  {
    id: 'onca',
    name: 'Cometa Cintilante',
    description: 'Velocidade da luz através das constelações',
    emoji: '☄️',
    price: 250
  },
  {
    id: 'boto',
    name: 'Telescópio Orbital',
    description: 'Capaz de enxergar galáxias distantes e palavras ocultas',
    emoji: '🔭',
    price: 300
  },
  {
    id: 'preguica',
    name: 'Gatinho Cósmico',
    description: 'Flutuando tranquilamente em gravidade zero',
    emoji: '🐱‍🚀',
    price: 150
  }
];

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  rewardCoins: number;
  icon: string;
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'first_word',
    title: 'Primeira Estrela',
    description: 'Encontre sua primeira palavra no cosmos',
    rewardCoins: 50,
    icon: 'Target'
  },
  {
    id: 'words_25',
    title: 'Olho de Telescópio',
    description: 'Encontre 25 palavras cósmicas no total',
    rewardCoins: 120,
    icon: 'Eye'
  },
  {
    id: 'words_100',
    title: 'Dicionário do Universo',
    description: 'Encontre 100 palavras no total',
    rewardCoins: 300,
    icon: 'BookOpen'
  },
  {
    id: 'levels_5',
    title: 'Navegador Galáctico',
    description: 'Complete 5 fases de exploração estelar',
    rewardCoins: 150,
    icon: 'Compass'
  },
  {
    id: 'daily_first',
    title: 'Missão Orbital Diária',
    description: 'Complete com sucesso um Desafio Diário Estelar',
    rewardCoins: 200,
    icon: 'CalendarCheck'
  },
  {
    id: 'streak_3',
    title: 'Órbita Perfeita',
    description: 'Mantenha 3 dias consecutivos de expedição espacial',
    rewardCoins: 400,
    icon: 'Flame'
  },
  {
    id: 'hard_puzzle',
    title: 'Mestre da Gravidade',
    description: 'Vença uma partida no nível Difícil ou Especialista',
    rewardCoins: 250,
    icon: 'Award'
  },
  {
    id: 'no_hints',
    title: 'Gênio Cósmico',
    description: 'Vença qualquer partida sem usar nenhum instrumento de apoio',
    rewardCoins: 200,
    icon: 'Zap'
  }
];
