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
    name: 'Varinha Cósmica Estelar',
    shortName: 'Varinha Cósmica',
    iconName: 'Wand2',
    priceBRL: 'Anúncio',
    coinsCost: 55,
    description: 'Encontra e revela instantaneamente 1 palavra inteira no tabuleiro com chuva de poeira estelar!',
    benefit: 'Resolve 1 palavra inteira na hora',
    gradient: 'from-fuchsia-500 to-indigo-600',
    accentColor: '#a855f7'
  },
  {
    id: 'radar_letras',
    name: 'Telescópio Orbital de Letras',
    shortName: 'Telescópio',
    iconName: 'Search',
    priceBRL: 'Anúncio',
    coinsCost: 30,
    description: 'Sintoniza a primeira letra e a trajetória inicial da palavra mais próxima na grade.',
    benefit: 'Ilumina a primeira letra estelar',
    gradient: 'from-amber-400 to-yellow-500',
    accentColor: '#eab308'
  },
  {
    id: 'congelador_tempo',
    name: 'Distorção Temporal Cósmica (+60s)',
    shortName: 'Distorção',
    iconName: 'Snowflake',
    priceBRL: 'Anúncio',
    coinsCost: 35,
    description: 'Dobra o tecido do espaço-tempo adicionando +60 segundos de respiro ao cronômetro.',
    benefit: '+60 segundos de respiro cósmico',
    gradient: 'from-sky-400 to-blue-600',
    accentColor: '#0284c7'
  },
  {
    id: 'visao_raiox',
    name: 'Clarão de Supernova (Raio-X)',
    shortName: 'Supernova',
    iconName: 'Sun',
    priceBRL: 'Anúncio',
    coinsCost: 40,
    description: 'Emite um pulso estelar que ilumina as iniciais de todas as palavras restantes por 12 segundos.',
    benefit: 'Visão de todas as iniciais',
    gradient: 'from-orange-400 to-amber-500',
    accentColor: '#f97316'
  },
  {
    id: 'escudo_protecao',
    name: 'Escudo Gravitacional',
    shortName: 'Escudo',
    iconName: 'Shield',
    priceBRL: 'Anúncio',
    coinsCost: 35,
    description: 'Gera uma barreira de plasma que absorve erros e restaura vidas na exploração espacial.',
    benefit: 'Imunidade a erros & +Vidas',
    gradient: 'from-emerald-400 to-cyan-600',
    accentColor: '#10b981'
  },
  {
    id: 'bussola_direcao',
    name: 'Navegador Astral',
    shortName: 'Navegador',
    iconName: 'Compass',
    priceBRL: 'Anúncio',
    coinsCost: 30,
    description: 'Mapeia as coordenadas celestes e aponta a direção exata da palavra selecionada no grid.',
    benefit: 'Mostra o vetor cósmico da palavra',
    gradient: 'from-indigo-500 to-purple-600',
    accentColor: '#818cf8'
  }
];
