import { ThemeConfig } from '../types/game';

export const THEMES: ThemeConfig[] = [
  {
    id: 'tropical',
    name: 'Tropical Brasil',
    description: 'Verde esmeralda, amarelo canário e frescor tropical',
    price: 0,
    backgroundClass: 'bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 text-emerald-50',
    gridBgClass: 'bg-emerald-950/70 border-emerald-700/40 shadow-emerald-950/50',
    cellBgClass: 'bg-emerald-900/40 hover:bg-emerald-800/60 active:bg-emerald-700/80 border-emerald-700/30 text-emerald-100',
    cellTextClass: 'text-emerald-100',
    cardBgClass: 'bg-emerald-900/50 border-emerald-800/40',
    accentClass: 'bg-amber-400 text-slate-950 hover:bg-amber-300',
    borderColorClass: 'border-emerald-700/40'
  },
  {
    id: 'praia',
    name: 'Praia de Copacabana',
    description: 'Azul oceano, brisa do mar e areia dourada',
    price: 150,
    backgroundClass: 'bg-gradient-to-br from-sky-950 via-cyan-900 to-slate-950 text-cyan-50',
    gridBgClass: 'bg-sky-950/70 border-cyan-700/40 shadow-sky-950/50',
    cellBgClass: 'bg-cyan-900/40 hover:bg-cyan-800/60 active:bg-cyan-700/80 border-cyan-700/30 text-cyan-100',
    cellTextClass: 'text-cyan-100',
    cardBgClass: 'bg-cyan-900/50 border-cyan-800/40',
    accentClass: 'bg-cyan-400 text-slate-950 hover:bg-cyan-300',
    borderColorClass: 'border-cyan-700/40'
  },
  {
    id: 'sunset',
    name: 'Pôr do Sol no Arpoador',
    description: 'Tons alaranjados, lilás e calor do crepúsculo carioca',
    price: 250,
    backgroundClass: 'bg-gradient-to-br from-purple-950 via-rose-950 to-amber-950 text-rose-50',
    gridBgClass: 'bg-purple-950/70 border-rose-700/40 shadow-rose-950/50',
    cellBgClass: 'bg-rose-900/40 hover:bg-rose-800/60 active:bg-rose-700/80 border-rose-700/30 text-rose-100',
    cellTextClass: 'text-rose-100',
    cardBgClass: 'bg-rose-900/50 border-rose-800/40',
    accentClass: 'bg-amber-400 text-slate-950 hover:bg-amber-300',
    borderColorClass: 'border-rose-700/40'
  },
  {
    id: 'carnaval',
    name: 'Carnaval Carioca',
    description: 'Púrpura vibrante, serpentinas e euforia carnavalesca',
    price: 350,
    backgroundClass: 'bg-gradient-to-br from-violet-950 via-fuchsia-950 to-slate-950 text-fuchsia-50',
    gridBgClass: 'bg-violet-950/70 border-fuchsia-700/40 shadow-fuchsia-950/50',
    cellBgClass: 'bg-fuchsia-900/40 hover:bg-fuchsia-800/60 active:bg-fuchsia-700/80 border-fuchsia-700/30 text-fuchsia-100',
    cellTextClass: 'text-fuchsia-100',
    cardBgClass: 'bg-fuchsia-900/50 border-fuchsia-800/40',
    accentClass: 'bg-fuchsia-400 text-slate-950 hover:bg-fuchsia-300',
    borderColorClass: 'border-fuchsia-700/40'
  },
  {
    id: 'dark',
    name: 'Modo Escuro Noturno',
    description: 'Minimalista moderno com preto profundo e alto foco',
    price: 200,
    backgroundClass: 'bg-slate-950 text-slate-100',
    gridBgClass: 'bg-slate-900/80 border-slate-800 shadow-black/80',
    cellBgClass: 'bg-slate-800/60 hover:bg-slate-700/70 active:bg-slate-600 border-slate-700 text-slate-100',
    cellTextClass: 'text-slate-100',
    cardBgClass: 'bg-slate-900 border-slate-800',
    accentClass: 'bg-emerald-500 text-white hover:bg-emerald-400',
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
    id: 'capivara',
    name: 'Capivara VIP',
    description: 'A rainha da simpatia e tranquilidade brasileira',
    emoji: '🦫',
    imagePath: '/src/assets/images/avatar_capivara_game_1790558555313.jpg',
    price: 0
  },
  {
    id: 'tucano',
    name: 'Tucano Toco',
    description: 'O bico mais colorido do cerrado',
    emoji: '🦜',
    price: 100
  },
  {
    id: 'arara',
    name: 'Arara Azul',
    description: 'A majestade dos céus do Pantanal',
    emoji: '🪶',
    price: 150
  },
  {
    id: 'onca',
    name: 'Onça Pintada',
    description: 'A fera mais veloz e ágil na caça das palavras',
    emoji: '🐆',
    price: 250
  },
  {
    id: 'boto',
    name: 'Boto Rosa',
    description: 'Encanto lendário das águas amazônicas',
    emoji: '🐬',
    price: 300
  },
  {
    id: 'preguica',
    name: 'Bicho Preguiça',
    description: 'Para quem adora resolver no modo mais relaxante',
    emoji: '🦥',
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
    title: 'Primeiro Achado',
    description: 'Encontre sua primeira palavra no caça-palavras',
    rewardCoins: 50,
    icon: 'Target'
  },
  {
    id: 'words_25',
    title: 'Olho de Lince',
    description: 'Encontre 25 palavras brasileiras no total',
    rewardCoins: 120,
    icon: 'Eye'
  },
  {
    id: 'words_100',
    title: 'Dicionário Vivo',
    description: 'Encontre 100 palavras no total',
    rewardCoins: 300,
    icon: 'BookOpen'
  },
  {
    id: 'levels_5',
    title: 'Explorador Nacional',
    description: 'Complete 5 fases de caça-palavras',
    rewardCoins: 150,
    icon: 'Compass'
  },
  {
    id: 'daily_first',
    title: 'Desafiante Diário',
    description: 'Complete com sucesso um Desafio Diário',
    rewardCoins: 200,
    icon: 'CalendarCheck'
  },
  {
    id: 'streak_3',
    title: 'Sequência de Ouro',
    description: 'Mantenha 3 dias consecutivos de Desafio Diário',
    rewardCoins: 400,
    icon: 'Flame'
  },
  {
    id: 'hard_puzzle',
    title: 'Mestre da Dificuldade',
    description: 'Vença uma partida no nível Difícil ou Especialista',
    rewardCoins: 250,
    icon: 'Award'
  },
  {
    id: 'no_hints',
    title: 'Gênio Indômito',
    description: 'Vença qualquer partida sem usar nenhuma dica',
    rewardCoins: 200,
    icon: 'Zap'
  }
];
