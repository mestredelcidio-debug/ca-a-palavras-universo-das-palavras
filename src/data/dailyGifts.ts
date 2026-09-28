import { DailyGiftReward } from '../types/game';

export const DAILY_GIFTS: DailyGiftReward[] = [
  {
    day: 1,
    coins: 50,
    title: 'Boas-Vindas',
    description: 'Início da sua jornada diária',
    iconName: 'Coins'
  },
  {
    day: 2,
    coins: 75,
    title: 'Olho de Águia',
    description: 'Moedas + bônus de perspicácia',
    iconName: 'Lightbulb'
  },
  {
    day: 3,
    coins: 100,
    title: 'Ritmo Tropical',
    description: 'Recompensa de perseverança',
    iconName: 'Coins'
  },
  {
    day: 4,
    coins: 130,
    title: 'Bússola Dourada',
    description: 'Moedas para revelar caminhos',
    iconName: 'Compass'
  },
  {
    day: 5,
    coins: 160,
    title: 'Caçador Focado',
    description: 'Grande impulso de moedas',
    iconName: 'Coins'
  },
  {
    day: 6,
    coins: 200,
    title: 'Mestre da Fauna',
    description: 'Prêmio de alta sequência',
    iconName: 'Sparkles'
  },
  {
    day: 7,
    coins: 350,
    title: 'Super Baú Brasil',
    description: 'Prêmio Supremo da semana: 350 moedas + 3 estrelas!',
    iconName: 'Gift',
    isSpecial: true
  }
];

export function isGiftAvailableToday(lastClaimedDate: string): boolean {
  if (!lastClaimedDate) return true;
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  return lastClaimedDate !== todayStr;
}

export function getTimeUntilNextGift(): string {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const diffMs = tomorrow.getTime() - now.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${diffHours}h ${diffMins}m`;
}
