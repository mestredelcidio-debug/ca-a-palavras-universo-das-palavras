export interface BackgroundOption {
  id: number;
  label: string;
  description: string;
  gradient: string;
  requiredStars: number;
}

export interface ChapterData {
  id: number;
  title: string;
  subtitle: string;
  biome: string;
  description: string;
  startLevel: number;
  endLevel: number;
  rewardCoins: number;
  themeCategory: string;
  bgGradient: string; // Default background
  bgOptions: BackgroundOption[]; // 3 options
  accentColor: string;
  iconName: string;
}

export interface ChapterBgPreset {
  name1: string;
  desc1: string;
  grad1: string;
  name2: string;
  desc2: string;
  grad2: string;
  name3: string;
  desc3: string;
  grad3: string;
}

export function getChapterBgOptions(id: number, subtitle?: string, defaultGrad?: string): BackgroundOption[] {
  return [
    {
      id: 1,
      label: `${subtitle || 'Cosmos'} (Luz Estelar)`,
      description: `O brilho radiante das estrelas e nebulosas em ${subtitle || 'órbita'}.`,
      gradient: defaultGrad || 'from-indigo-950 via-purple-950 to-black',
      requiredStars: 0
    },
    {
      id: 2,
      label: `${subtitle || 'Cosmos'} (Aurora Nebulosa)`,
      description: `Gases luminosos interestelares em tons elétricos de ${subtitle || 'profundo espaço'}.`,
      gradient: 'from-fuchsia-950 via-purple-950 to-slate-950',
      requiredStars: 30
    },
    {
      id: 3,
      label: `${subtitle || 'Cosmos'} (Espaço Profundo)`,
      description: `O silêncio majestoso do vácuo sideral pontilhado de constelações.`,
      gradient: 'from-slate-950 via-black to-black',
      requiredStars: 45
    }
  ];
}

const BASE_CHAPTERS: Omit<ChapterData, 'bgOptions'>[] = [
  {
    id: 1,
    title: 'Capítulo 1',
    subtitle: 'Sistema Solar & Terra',
    biome: 'Órbitas Próximas & Sol',
    description: 'Comece sua jornada decifrando os segredos do nosso sistema planetário e da Terra.',
    startLevel: 1,
    endLevel: 30,
    rewardCoins: 500,
    themeCategory: 'sistema_solar',
    bgGradient: 'from-indigo-900 via-blue-950 to-slate-950',
    accentColor: '#38bdf8',
    iconName: 'Sun'
  },
  {
    id: 2,
    title: 'Capítulo 2',
    subtitle: 'A Lua & Satélites',
    biome: 'Mares de Regolito & Crateras',
    description: 'Descubra a face oculta da Lua, marés gravitacionais e crateras ancestrais.',
    startLevel: 31,
    endLevel: 60,
    rewardCoins: 550,
    themeCategory: 'lua',
    bgGradient: 'from-slate-800 via-zinc-900 to-black',
    accentColor: '#94a3b8',
    iconName: 'Moon'
  },
  {
    id: 3,
    title: 'Capítulo 3',
    subtitle: 'Marte & O Vales Marineris',
    biome: 'Planeta Vermelho & Desertos',
    description: 'Explore o Monte Olimpo, tempestades de poeira e vales gigantescos de Marte.',
    startLevel: 61,
    endLevel: 90,
    rewardCoins: 600,
    themeCategory: 'marte',
    bgGradient: 'from-red-900 via-rose-950 to-black',
    accentColor: '#ef4444',
    iconName: 'Flame'
  },
  {
    id: 4,
    title: 'Capítulo 4',
    subtitle: 'Cinturão de Asteroides',
    biome: 'Rochas Espaciais & Ceres',
    description: 'Navegue entre milhares de asteroides e cometas na fronteira do sistema interno.',
    startLevel: 91,
    endLevel: 120,
    rewardCoins: 650,
    themeCategory: 'asteroides',
    bgGradient: 'from-amber-900 via-stone-900 to-black',
    accentColor: '#f59e0b',
    iconName: 'Compass'
  },
  {
    id: 5,
    title: 'Capítulo 5',
    subtitle: 'Júpiter & Seus Ciclones',
    biome: 'O Gigante Gasoso & Auroras',
    description: 'A Grande Mancha Vermelha, ventos furiosos e luas fascinantes como Europa e Ganimedes.',
    startLevel: 121,
    endLevel: 150,
    rewardCoins: 700,
    themeCategory: 'jupiter',
    bgGradient: 'from-amber-800 via-yellow-950 to-slate-950',
    accentColor: '#eab308',
    iconName: 'Sparkles'
  },
  {
    id: 6,
    title: 'Capítulo 6',
    subtitle: 'Saturno & Anéis Dourados',
    biome: 'Gelo Cristalino & Titã',
    description: 'A majestade dos anéis de Saturno e os lagos de metano da misteriosa lua Titã.',
    startLevel: 151,
    endLevel: 180,
    rewardCoins: 750,
    themeCategory: 'saturno',
    bgGradient: 'from-yellow-700 via-amber-950 to-black',
    accentColor: '#fbbf24',
    iconName: 'Sparkles'
  },
  {
    id: 7,
    title: 'Capítulo 7',
    subtitle: 'Urano & Netuno de Gelo',
    biome: 'Ventos Furiosos & Metano',
    description: 'Os mundos azul-cobalto de gelo, diamantes sob pressão e frio absoluto.',
    startLevel: 181,
    endLevel: 210,
    rewardCoins: 800,
    themeCategory: 'gigantes_gelo',
    bgGradient: 'from-cyan-900 via-blue-950 to-black',
    accentColor: '#06b6d4',
    iconName: 'Waves'
  },
  {
    id: 8,
    title: 'Capítulo 8',
    subtitle: 'Cinturão de Kuiper & Plutão',
    biome: 'Coração de Gelo & Confins',
    description: 'Plutão, Caronte e objetos transnetunianos nos limites do calor solar.',
    startLevel: 211,
    endLevel: 240,
    rewardCoins: 850,
    themeCategory: 'kuiper',
    bgGradient: 'from-sky-950 via-indigo-950 to-black',
    accentColor: '#38bdf8',
    iconName: 'Compass'
  },
  {
    id: 9,
    title: 'Capítulo 9',
    subtitle: 'Constelação de Órion',
    biome: 'Betelgeuse & O Caçador',
    description: 'O caçador cósmico visível de toda a Terra com suas estrelas supergigantes.',
    startLevel: 241,
    endLevel: 270,
    rewardCoins: 900,
    themeCategory: 'orion',
    bgGradient: 'from-indigo-900 via-purple-950 to-black',
    accentColor: '#818cf8',
    iconName: 'Sparkles'
  },
  {
    id: 10,
    title: 'Capítulo 10',
    subtitle: 'Nebulosa M42 de Órion',
    biome: 'Berçário Estelar Radiante',
    description: 'Nuvens brilhantes de hidrogênio onde novas estrelas e sistemas planetários nascem.',
    startLevel: 271,
    endLevel: 300,
    rewardCoins: 950,
    themeCategory: 'nebulosa_orion',
    bgGradient: 'from-purple-900 via-fuchsia-950 to-black',
    accentColor: '#c084fc',
    iconName: 'Sparkles'
  },
  {
    id: 11,
    title: 'Capítulo 11',
    subtitle: 'Cruzeiro do Sul & Estrelas Guia',
    biome: 'Céus do Hemisfério Sul',
    description: 'A constelação guia dos navegadores ancestrais e a nebulosa escura Saco de Carvão.',
    startLevel: 301,
    endLevel: 330,
    rewardCoins: 1000,
    themeCategory: 'cruzeiro_sul',
    bgGradient: 'from-blue-900 via-indigo-950 to-black',
    accentColor: '#6366f1',
    iconName: 'Compass'
  },
  {
    id: 12,
    title: 'Capítulo 12',
    subtitle: 'Estrelas Supergigantes',
    biome: 'Fornalhas Nucleares Cósmicas',
    description: 'Monstros celestes como Betelgeuse, Rigel e Antares brilhando com a força de mil sóis.',
    startLevel: 331,
    endLevel: 360,
    rewardCoins: 1000,
    themeCategory: 'supergigantes',
    bgGradient: 'from-rose-900 via-red-950 to-black',
    accentColor: '#f43f5e',
    iconName: 'Flame'
  },
  {
    id: 13,
    title: 'Capítulo 13',
    subtitle: 'Supernovas & Clarões',
    biome: 'O Fim Radiante das Estrelas',
    description: 'Explosões monumentais que espalham ferro, ouro e carbono por todo o universo.',
    startLevel: 361,
    endLevel: 390,
    rewardCoins: 1000,
    themeCategory: 'supernovas',
    bgGradient: 'from-amber-600 via-purple-900 to-black',
    accentColor: '#fbbf24',
    iconName: 'Sparkles'
  },
  {
    id: 14,
    title: 'Capítulo 14',
    subtitle: 'Estrelas de Nêutrons & Pulsares',
    biome: 'Faróis Quânticos no Espaço',
    description: 'Núcleos ultra-densos girando centenas de vezes por segundo com campos magnéticos colossais.',
    startLevel: 391,
    endLevel: 420,
    rewardCoins: 1000,
    themeCategory: 'pulsares',
    bgGradient: 'from-teal-900 via-indigo-950 to-black',
    accentColor: '#14b8a6',
    iconName: 'Zap'
  },
  {
    id: 15,
    title: 'Capítulo 15',
    subtitle: 'Buracos Negros Estelares',
    biome: 'Horizonte de Eventos',
    description: 'Onde nem mesmo a luz escapa: espaço-tempo dobrado ao extremo pela gravidade infinita.',
    startLevel: 421,
    endLevel: 450,
    rewardCoins: 1000,
    themeCategory: 'buracos_negros',
    bgGradient: 'from-purple-950 via-slate-950 to-black',
    accentColor: '#a855f7',
    iconName: 'Moon'
  },
  {
    id: 16,
    title: 'Capítulo 16',
    subtitle: 'O Centro da Via Láctea',
    biome: 'Sagitário A* & Poeira',
    description: 'O coração da nossa galáxia, onde estrelas orbitam em velocidades inacreditáveis.',
    startLevel: 451,
    endLevel: 480,
    rewardCoins: 1000,
    themeCategory: 'via_lactea',
    bgGradient: 'from-yellow-900 via-purple-950 to-black',
    accentColor: '#eab308',
    iconName: 'Sparkles'
  },
  {
    id: 17,
    title: 'Capítulo 17',
    subtitle: 'Aglomerados Globulares',
    biome: 'Enxames de 1 Milhão de Estrelas',
    description: 'Aglomerados esféricos milenares que orbitam a galáxia como colmeias douradas.',
    startLevel: 481,
    endLevel: 510,
    rewardCoins: 1000,
    themeCategory: 'aglomerados',
    bgGradient: 'from-amber-800 via-indigo-950 to-black',
    accentColor: '#f59e0b',
    iconName: 'Sparkles'
  },
  {
    id: 18,
    title: 'Capítulo 18',
    subtitle: 'Nuvens de Magalhães',
    biome: 'Galáxias Satélites Vizinhas',
    description: 'A Pequena e a Grande Nuvem de Magalhães dançando em maré gravitacional.',
    startLevel: 511,
    endLevel: 540,
    rewardCoins: 1000,
    themeCategory: 'magalhaes',
    bgGradient: 'from-sky-900 via-violet-950 to-black',
    accentColor: '#38bdf8',
    iconName: 'Waves'
  },
  {
    id: 19,
    title: 'Capítulo 19',
    subtitle: 'Galáxia de Andrômeda',
    biome: 'Braços Espirais de 1 Trilhão de Sóis',
    description: 'A imensa galáxia vizinha M31 que se aproxima graciosamente da Via Láctea.',
    startLevel: 541,
    endLevel: 570,
    rewardCoins: 1000,
    themeCategory: 'andromeda',
    bgGradient: 'from-fuchsia-900 via-indigo-950 to-black',
    accentColor: '#e879f9',
    iconName: 'Sparkles'
  },
  {
    id: 20,
    title: 'Capítulo 20',
    subtitle: 'Galáxia do Sombrero (M104)',
    biome: 'O Chapéu Cósmico & Halo',
    description: 'Uma das mais fascinantes galáxias do universo com um aro de poeira espetacular.',
    startLevel: 571,
    endLevel: 600,
    rewardCoins: 1000,
    themeCategory: 'sombrero',
    bgGradient: 'from-amber-950 via-slate-900 to-black',
    accentColor: '#f59e0b',
    iconName: 'Moon'
  },
  {
    id: 21,
    title: 'Capítulo 21',
    subtitle: 'Pilares da Criação (M16)',
    biome: 'Esculturas de Hidrogênio',
    description: 'Torres colossais de poeira cósmica esculpidas pela luz ultravioleta de estrelas jovens.',
    startLevel: 601,
    endLevel: 630,
    rewardCoins: 1000,
    themeCategory: 'pilares_criacao',
    bgGradient: 'from-teal-900 via-purple-950 to-black',
    accentColor: '#2dd4bf',
    iconName: 'Sparkles'
  },
  {
    id: 22,
    title: 'Capítulo 22',
    subtitle: 'Exoplanetas Habitáveis',
    biome: 'Mundos Ricitos de Ouro',
    description: 'Planetas rochosos com oceanos e atmosferas em zonas habitáveis de estrelas distantes.',
    startLevel: 631,
    endLevel: 660,
    rewardCoins: 1000,
    themeCategory: 'exoplanetas',
    bgGradient: 'from-emerald-900 via-cyan-950 to-black',
    accentColor: '#10b981',
    iconName: 'Compass'
  },
  {
    id: 23,
    title: 'Capítulo 23',
    subtitle: 'Oceanos Subterrâneos de Europa',
    biome: 'Mundos Aquáticos Espaciais',
    description: 'Mares líquidos sob crostas de gelo aquecidos por forças de maré gravitacional.',
    startLevel: 661,
    endLevel: 690,
    rewardCoins: 1000,
    themeCategory: 'oceanos_espaciais',
    bgGradient: 'from-cyan-900 via-teal-950 to-black',
    accentColor: '#06b6d4',
    iconName: 'Waves'
  },
  {
    id: 24,
    title: 'Capítulo 24',
    subtitle: 'Quasares & Jatos de Plasma',
    biome: 'Faróis Energéticos do Infinito',
    description: 'Os objetos mais luminosos do universo emitindo radiação por bilhões de anos-luz.',
    startLevel: 691,
    endLevel: 720,
    rewardCoins: 1000,
    themeCategory: 'quasares',
    bgGradient: 'from-violet-900 via-rose-950 to-black',
    accentColor: '#a855f7',
    iconName: 'Zap'
  },
  {
    id: 25,
    title: 'Capítulo 25',
    subtitle: 'Lentes Gravitacionais',
    biome: 'A Curvatura da Luz Cósmica',
    description: 'A gravidade de aglomerados galácticos funcionando como lentes que ampliam o cosmos.',
    startLevel: 721,
    endLevel: 750,
    rewardCoins: 1200,
    themeCategory: 'lentes_gravitacionais',
    bgGradient: 'from-indigo-950 via-blue-950 to-black',
    accentColor: '#6366f1',
    iconName: 'Sparkles'
  },
  {
    id: 26,
    title: 'Capítulo 26',
    subtitle: 'A Teia de Matéria Escura',
    biome: 'O Esqueleto Invisível do Cosmos',
    description: 'Filamentos cósmicos invisíveis que sustentam todas as galáxias e estruturas do universo.',
    startLevel: 751,
    endLevel: 780,
    rewardCoins: 1300,
    themeCategory: 'materia_escura',
    bgGradient: 'from-slate-950 via-zinc-950 to-black',
    accentColor: '#94a3b8',
    iconName: 'Moon'
  },
  {
    id: 27,
    title: 'Capítulo 27',
    subtitle: 'Ondas Gravitacionais',
    biome: 'Ondulações no Espaço-Tempo',
    description: 'Vibrações no próprio tecido do universo causadas pela fusão de buracos negros.',
    startLevel: 781,
    endLevel: 810,
    rewardCoins: 1400,
    themeCategory: 'ondas_gravitacionais',
    bgGradient: 'from-cyan-950 via-indigo-950 to-black',
    accentColor: '#38bdf8',
    iconName: 'Waves'
  },
  {
    id: 28,
    title: 'Capítulo 28',
    subtitle: 'Superaglomerado Laniakea',
    biome: 'Céu Imensurável & Nosso Lar',
    description: 'O superaglomerado de 100 mil galáxias ao qual pertencemos fluindo rumo ao Grande Atrator.',
    startLevel: 811,
    endLevel: 840,
    rewardCoins: 1500,
    themeCategory: 'laniakea',
    bgGradient: 'from-purple-900 via-blue-950 to-black',
    accentColor: '#c084fc',
    iconName: 'Compass'
  },
  {
    id: 29,
    title: 'Capítulo 29',
    subtitle: 'O Eco do Big Bang',
    biome: 'Radiação Cósmica de Fundo',
    description: 'A primeira luz do universo emitida quando o cosmos tinha apenas 380 mil anos.',
    startLevel: 841,
    endLevel: 870,
    rewardCoins: 1600,
    themeCategory: 'big_bang',
    bgGradient: 'from-amber-900 via-rose-950 to-black',
    accentColor: '#f59e0b',
    iconName: 'Sun'
  },
  {
    id: 30,
    title: 'Capítulo 30',
    subtitle: 'O Horizonte Infinito das Palavras',
    biome: 'O Ápice do Cosmos & Sabedoria',
    description: 'O ápice da jornada cósmica: onde todas as palavras do universo se unem em harmonia estelar.',
    startLevel: 871,
    endLevel: 900,
    rewardCoins: 2500,
    themeCategory: 'universo_infinito',
    bgGradient: 'from-amber-600 via-purple-900 to-black',
    accentColor: '#fbbf24',
    iconName: 'Trophy'
  }
];

export const CHAPTERS: ChapterData[] = BASE_CHAPTERS.map(ch => ({
  ...ch,
  bgOptions: getChapterBgOptions(ch.id, ch.subtitle, ch.bgGradient)
}));

export function getChapterForLevel(level: number): ChapterData {
  const found = CHAPTERS.find(c => level >= c.startLevel && level <= c.endLevel);
  return found || CHAPTERS[CHAPTERS.length - 1];
}

export function getChapterById(id: number): ChapterData {
  return CHAPTERS.find(c => c.id === id) || CHAPTERS[0];
}
