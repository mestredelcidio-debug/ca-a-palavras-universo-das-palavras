export interface RewardBox {
  id: number;
  title: string;
  subtitle: string;
  coinsReward: number;
  iconType: 'wood' | 'bronze' | 'silver' | 'gold' | 'legendary';
  gradient: string;
  border: string;
  badge: string;
  accentColor: string;
}

export const REWARD_BOXES: RewardBox[] = [
  {
    id: 1,
    title: 'Caixa de Madeira',
    subtitle: 'Assista a 1 vídeo rápido',
    coinsReward: 50,
    iconType: 'wood',
    gradient: 'from-amber-800 to-amber-950',
    border: 'border-amber-600',
    badge: '📦 +50',
    accentColor: '#b45309'
  },
  {
    id: 2,
    title: 'Caixa de Bronze',
    subtitle: 'Assista a 1 vídeo rápido',
    coinsReward: 100,
    iconType: 'bronze',
    gradient: 'from-orange-700 to-amber-900',
    border: 'border-orange-500',
    badge: '🎁 +100',
    accentColor: '#ea580c'
  },
  {
    id: 3,
    title: 'Caixa de Prata',
    subtitle: 'Assista a 1 vídeo rápido',
    coinsReward: 200,
    iconType: 'silver',
    gradient: 'from-slate-600 to-slate-900',
    border: 'border-cyan-400',
    badge: '💎 +200',
    accentColor: '#0ea5e9'
  },
  {
    id: 4,
    title: 'Caixa de Ouro',
    subtitle: 'Assista a 1 vídeo rápido',
    coinsReward: 350,
    iconType: 'gold',
    gradient: 'from-amber-500 to-yellow-600',
    border: 'border-yellow-300',
    badge: '🌟 +350',
    accentColor: '#eab308'
  },
  {
    id: 5,
    title: 'Baú Lendário Imperial',
    subtitle: 'Assista a 1 vídeo rápido',
    coinsReward: 600,
    iconType: 'legendary',
    gradient: 'from-fuchsia-600 via-purple-700 to-indigo-900',
    border: 'border-amber-400',
    badge: '👑 +600',
    accentColor: '#a855f7'
  }
];
