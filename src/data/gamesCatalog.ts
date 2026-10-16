export type GameCategory = 'all' | 'palavras' | 'logica' | 'arcade' | 'casual';

export type GameStatus = 'available' | 'coming_soon' | 'in_development';

export interface GameItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  category: GameCategory;
  categoryLabel: string;
  thumbnailUrl: string;
  bannerUrl: string;
  status: GameStatus;
  statusLabel: string;
  route: string;
  isFeatured: boolean;
  tags: string[];
  rating: number;
  playersCount: string;
  releaseYear: number;
  developer: string;
  features: string[];
}

export const GAMES_CATALOG: GameItem[] = [
  {
    id: 'universo-das-palavras',
    slug: 'universo-das-palavras',
    title: 'Caça-Palavras: Universo das Palavras',
    subtitle: 'Aventura Cósmica de Vocabulário & Puzzles',
    shortDescription: 'Embarque em uma jornada cósmica por constelações e galáxias decifrando palavras em centenas de níveis temáticos com belos cenários espaciais.',
    fullDescription: 'Caça-Palavras: Universo das Palavras é o primeiro lançamento oficial da DECIX GAMES. Explore mais de 25 capítulos com centenas de desafios cuidadosamente elaborados em português do Brasil, trilha relaxante, missões diárias, sistema de estrelas, personalização de planos de fundo espaciais e modos desafiadores.',
    category: 'palavras',
    categoryLabel: 'Palavras & Puzzle',
    thumbnailUrl: '/src/assets/images/universo_banner_1790823371795.jpg',
    bannerUrl: '/src/assets/images/caca_palavras_banner_1790558545106.jpg',
    status: 'available',
    statusLabel: 'Disponível para Jogar',
    route: '/jogos/universo-das-palavras',
    isFeatured: true,
    tags: ['Caça-Palavras', 'Cósmico', 'Relaxante', 'Português', 'Mobile & Desktop'],
    rating: 4.9,
    playersCount: '+10.000',
    releaseYear: 2026,
    developer: 'DECIX GAMES',
    features: [
      '25 Capítulos temáticos com progressão estelar',
      'Mais de 750 fases dinâmicas geradas com vocabulário rico',
      'Modos especiais de desafio (Às Cegas, Contrarrelógio, Megagrid)',
      'Missões diárias, recompensas e caixas de bônus',
      'Planos de fundo astronômicos e temas personalizáveis',
      'Totalmente jogável no navegador e preparado para Android'
    ]
  },
  {
    id: 'classificacao-das-cores',
    slug: 'classificacao-das-cores',
    title: 'Classificação das Cores',
    subtitle: 'Color Sort & Raciocínio Lógico',
    shortDescription: 'Organize e verta líquidos coloridos em frascos de laboratório até que cada tubo contenha apenas uma cor harmoniosa.',
    fullDescription: 'Um clássico moderno de raciocínio espacial e concentração desenvolvido pela DECIX GAMES. Despeje líquidos com física suave, resolva quebra-cabeças progressivamente mais intrincados com frascos extras e desbloqueie paletas cromáticas exclusivas.',
    category: 'logica',
    categoryLabel: 'Puzzle & Lógica',
    thumbnailUrl: '/src/assets/images/game_color_sort_1792169029265.jpg',
    bannerUrl: '/src/assets/images/game_color_sort_1792169029265.jpg',
    status: 'coming_soon',
    statusLabel: 'Em Breve',
    route: '/jogos/classificacao-das-cores',
    isFeatured: false,
    tags: ['Cores', 'Ordenação', 'Raciocínio', 'Relaxante', 'Física de Fluidos'],
    rating: 4.8,
    playersCount: 'Em preparação',
    releaseYear: 2026,
    developer: 'DECIX GAMES',
    features: [
      'Dezenas de frascos com física de líquidos fluida e suave',
      'Múltiplos níveis de dificuldade para exercitar o raciocínio',
      'Paletas de cores vibrantes com alto contraste e acessibilidade',
      'Botões de desfazer jogadas e frasco adicional estratégico',
      'Integração futura oficial ao portal DECIX GAMES'
    ]
  },
  {
    id: 'block-puzzle',
    slug: 'block-puzzle',
    title: 'Block Puzzle Desafio',
    subtitle: 'Encaixe Estratégico de Blocos em Grade',
    shortDescription: 'Posicione peças geométricas brilhantes no tabuleiro para completar e explodir linhas e colunas inteiras, acumulando combos épicos.',
    fullDescription: 'O viciante jogo de blocos da DECIX GAMES combina reflexos, antecipação espacial e explosões visuais satisfatórias. Sem limite de tempo estressante: apenas você, sua estratégia e o objetivo de quebrar seu recorde pessoal.',
    category: 'arcade',
    categoryLabel: 'Arcade & Blocos',
    thumbnailUrl: '/src/assets/images/game_block_puzzle_1792169029290.jpg',
    bannerUrl: '/src/assets/images/game_block_puzzle_1792169029290.jpg',
    status: 'coming_soon',
    statusLabel: 'Em Breve',
    route: '/jogos/block-puzzle',
    isFeatured: false,
    tags: ['Blocos', 'Arcade', 'Combos', 'Estratégia', 'Score Attack'],
    rating: 4.9,
    playersCount: 'Em preparação',
    releaseYear: 2026,
    developer: 'DECIX GAMES',
    features: [
      'Grade 8x8 e 10x10 com peças poliominós brilhantes',
      'Sistema de combos em cadeia com efeitos visuais cintilantes',
      'Salvamento de melhor pontuação pessoal local',
      'Controles táteis responsivos e ágeis para celular e mouse',
      'Integração futura oficial ao portal DECIX GAMES'
    ]
  }
];

export const PORTAL_CATEGORIES: { id: GameCategory; label: string; count: number }[] = [
  { id: 'all', label: 'Todos os Jogos', count: 3 },
  { id: 'palavras', label: 'Palavras & Vocabulário', count: 1 },
  { id: 'logica', label: 'Puzzle & Lógica', count: 1 },
  { id: 'arcade', label: 'Arcade & Blocos', count: 1 }
];

export function getGameBySlug(slug: string): GameItem | undefined {
  return GAMES_CATALOG.find(g => g.slug === slug || g.route.endsWith(slug));
}

export function getGameById(id: string): GameItem | undefined {
  return GAMES_CATALOG.find(g => g.id === id);
}
