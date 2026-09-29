export interface InGamePowerup {
  id: string;
  name: string;
  shortName: string;
  iconName: 'Search' | 'Wand2' | 'Snowflake' | 'Sun' | 'Shield' | 'Compass';
  priceBRL: string;
  coinsCost: number;
  description: string;
  benefit: string;
  gradient: string;
  accentColor: string;
}

export const IN_GAME_POWERUPS: InGamePowerup[] = [
  {
    id: 'varinha_magica',
    name: 'Varinha Mágica Tropical',
    shortName: 'Varinha Mágica',
    iconName: 'Wand2',
    priceBRL: 'Anúncio',
    coinsCost: 55,
    description: 'Encontra e revela instantaneamente 1 palavra inteira no tabuleiro com festa tropical!',
    benefit: 'Resolve 1 palavra inteira na hora',
    gradient: 'from-fuchsia-500 to-purple-600',
    accentColor: '#a855f7'
  },
  {
    id: 'radar_letras',
    name: 'Super Radar de Letras',
    shortName: 'Radar',
    iconName: 'Search',
    priceBRL: 'Anúncio',
    coinsCost: 30,
    description: 'Destaca a primeira letra e o trajeto inicial da palavra mais próxima na grade.',
    benefit: 'Ilumina a primeira letra da palavra',
    gradient: 'from-amber-400 to-yellow-500',
    accentColor: '#eab308'
  },
  {
    id: 'congelador_tempo',
    name: 'Pausa Sagrada (+60s)',
    shortName: 'Congelador',
    iconName: 'Snowflake',
    priceBRL: 'Anúncio',
    coinsCost: 35,
    description: 'Adiciona +60 segundos ao cronômetro e recua o abismo ou perigo da fase.',
    benefit: '+60 segundos de respiro',
    gradient: 'from-sky-400 to-blue-600',
    accentColor: '#0284c7'
  },
  {
    id: 'visao_raiox',
    name: 'Lâmpada Solar (Raio-X)',
    shortName: 'Raio-X',
    iconName: 'Sun',
    priceBRL: 'Anúncio',
    coinsCost: 40,
    description: 'Ilumina as iniciais de todas as palavras restantes simultaneamente por 12 segundos.',
    benefit: 'Visão de todas as iniciais',
    gradient: 'from-orange-400 to-amber-500',
    accentColor: '#f97316'
  },
  {
    id: 'escudo_protecao',
    name: 'Escudo Protetor',
    shortName: 'Escudo',
    iconName: 'Shield',
    priceBRL: 'Anúncio',
    coinsCost: 35,
    description: 'Protege contra erros de seleção e restaura vidas no modo Sobrevivência.',
    benefit: 'Imunidade a erros & +Vidas',
    gradient: 'from-emerald-400 to-green-600',
    accentColor: '#10b981'
  },
  {
    id: 'bussola_direcao',
    name: 'Bússola de Direção',
    shortName: 'Bússola',
    iconName: 'Compass',
    priceBRL: 'Anúncio',
    coinsCost: 30,
    description: 'Mostra uma seta dourada com a direção exata da palavra selecionada no grid.',
    benefit: 'Mostra o rumo da palavra',
    gradient: 'from-indigo-500 to-teal-600',
    accentColor: '#14b8a6'
  }
];
