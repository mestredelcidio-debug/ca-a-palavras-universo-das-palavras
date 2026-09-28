export interface ChapterData {
  id: number;
  title: string;
  subtitle: string;
  biome: string;
  description: string;
  startLevel: number;
  endLevel: number;
  themeCategory: string;
  bgGradient: string;
  accentColor: string;
  iconName: string;
}

export const CHAPTERS: ChapterData[] = [
  {
    id: 1,
    title: 'Capítulo 1',
    subtitle: 'Mata Atlântica',
    biome: 'Floresta Tropical',
    description: 'Explore a fauna e os frutos exóticos da mata atlântica brasileira.',
    startLevel: 1,
    endLevel: 10,
    themeCategory: 'frutas',
    bgGradient: 'from-emerald-800 via-teal-900 to-slate-950',
    accentColor: '#10b981',
    iconName: 'Trees'
  },
  {
    id: 2,
    title: 'Capítulo 2',
    subtitle: 'Pantanal & Cerrado',
    biome: 'Águas e Chapadas',
    description: 'Onças, tuiuiús, jacarés e o encanto das águas pantaneiras.',
    startLevel: 11,
    endLevel: 20,
    themeCategory: 'animais',
    bgGradient: 'from-amber-800 via-orange-900 to-slate-950',
    accentColor: '#f59e0b',
    iconName: 'Compass'
  },
  {
    id: 3,
    title: 'Capítulo 3',
    subtitle: 'Amazônia Exuberante',
    biome: 'Bacia Amazônica',
    description: 'Misteriosos igarapés, vitória-régia, botos e lendas ancestrais.',
    startLevel: 21,
    endLevel: 30,
    themeCategory: 'natureza',
    bgGradient: 'from-teal-800 via-emerald-950 to-slate-950',
    accentColor: '#14b8a6',
    iconName: 'Waves'
  },
  {
    id: 4,
    title: 'Capítulo 4',
    subtitle: 'Litoral & Praias',
    biome: 'Costa Brasileira',
    description: 'Areia dourada, brisa do mar, água de coco e calçadões famosos.',
    startLevel: 31,
    endLevel: 40,
    themeCategory: 'praia',
    bgGradient: 'from-sky-800 via-cyan-900 to-slate-950',
    accentColor: '#0ea5e9',
    iconName: 'Sun'
  },
  {
    id: 5,
    title: 'Capítulo 5',
    subtitle: 'Sertão & Raízes',
    biome: 'Caatinga e Agreste',
    description: 'Cordel, forró pé-de-serra, baião e o calor da cultura sertaneja.',
    startLevel: 41,
    endLevel: 50,
    themeCategory: 'cultura_brasileira',
    bgGradient: 'from-orange-800 via-rose-950 to-slate-950',
    accentColor: '#f97316',
    iconName: 'Flame'
  },
  {
    id: 6,
    title: 'Capítulo 6',
    subtitle: 'Cidades Históricas',
    biome: 'Patrimônio Colonial',
    description: 'Casarios coloniais, ladeiras de pedra, sino de igrejas e culinária típica.',
    startLevel: 51,
    endLevel: 60,
    themeCategory: 'cidades',
    bgGradient: 'from-amber-900 via-yellow-950 to-slate-950',
    accentColor: '#eab308',
    iconName: 'Landmark'
  },
  {
    id: 7,
    title: 'Capítulo 7',
    subtitle: 'Carnaval & Samba',
    biome: 'Euforia e Ritmos',
    description: 'Bateria, serpentinas, mestre-sala, porta-bandeira e alegria pura.',
    startLevel: 61,
    endLevel: 70,
    themeCategory: 'carnaval',
    bgGradient: 'from-purple-800 via-fuchsia-950 to-slate-950',
    accentColor: '#a855f7',
    iconName: 'Sparkles'
  }
];

export function getChapterForLevel(level: number): ChapterData {
  const found = CHAPTERS.find(c => level >= c.startLevel && level <= c.endLevel);
  return found || CHAPTERS[0];
}
