/**
 * ARQUITETURA DE SISTEMAS, MODOS E PROGRESSÃO MASSIVA
 * Caça-Palavras Brasil: Macroestrutura de Conteúdo
 * - 15 Modos de Desafio Únicos
 * - 30 Capítulos por Modo
 * - 60 Missões/Puzzles por Capítulo (27.000 fases geradas proceduralmente)
 */

export interface ChallengeModeConfig {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  coreMechanic: string;
  victoryCondition: string;
  defeatCondition: string;
  psychologicalTrigger: string;
  painPoint: string;
  monetizationItem: {
    name: string;
    description: string;
    avgPriceBRL: string;
    hardCurrencyCost: number;
  };
  gridRange: [number, number];
  wordCountRange: [number, number];
  hasTimer: boolean;
  baseTimeSeconds?: number;
  specialRules: string[];
}

export interface ChapterProgressionTier {
  chapterIndex: number; // 1 a 30
  tierName: string;
  gridMin: number;
  gridMax: number;
  wordCountMin: number;
  wordCountMax: number;
  allowDiagonals: boolean;
  allowReverse: boolean;
  hiddenLettersChance: number; // 0.0 a 1.0
  timeLimitFactor: number; // Multiplicador de rigidez do tempo
  coinRewardBase: number;
}

export interface GeneratedMissionParams {
  modeId: number;
  chapterId: number;
  missionId: number; // 1 a 60
  globalLevelIndex: number;
  gridSize: number;
  wordCount: number;
  allowDiagonals: boolean;
  allowReverse: boolean;
  timeLimitSeconds: number | null;
  hiddenLettersCount: number;
  lockedLettersCount: number;
  minWordLength: number;
  maxWordLength: number;
  coinReward: number;
  starThresholds: [number, number, number]; // segundos ou precisão
  specialModifier: string;
}

// 1. LISTAGEM COMPLETA DOS 15 MODOS DE DESAFIO
export const CHALLENGE_MODES: ChallengeModeConfig[] = [
  {
    id: 1,
    slug: 'modo_abismo',
    name: 'Modo Abismo',
    subtitle: 'Fuga contra o Tempo & Maré Ascendente',
    coreMechanic: 'O grid começa a subir de baixo para cima (ou a tela vai escurecendo gradualmente). O jogador deve encontrar palavras rapidamente para limpar as linhas inferiores antes que o tempo acabe ou o tabuleiro seja devorado.',
    victoryCondition: 'Encontrar todas as palavras antes que o abismo consuma a grade.',
    defeatCondition: 'O grid sumir ou o cronômetro esgotar completamente.',
    psychologicalTrigger: 'Efeito de afogamento e urgência motora aguda: quando falta apenas 1 palavra e a tela está 90% engolida pelo abismo.',
    painPoint: 'Falta apenas uma palavra para salvar a fase antes que o abismo engula o tabuleiro.',
    monetizationItem: {
      name: 'Extintor de Abismo (+15s)',
      description: 'Pausa a subida por 15 segundos e recua o abismo em 2 linhas.',
      avgPriceBRL: 'R$ 2,90',
      hardCurrencyCost: 35
    },
    gridRange: [9, 14],
    wordCountRange: [8, 16],
    hasTimer: true,
    baseTimeSeconds: 90,
    specialRules: ['Linhas colapsando verticalmente', 'Escurecimento de perigo iminente']
  },
  {
    id: 2,
    slug: 'caca_cegas',
    name: 'Caça às Cegas',
    subtitle: 'Sem Dica de Palavras',
    coreMechanic: 'O jogo não mostra a lista de palavras que você precisa achar. Dá apenas o tema central (ex: "Partes do Carro"). O jogador caça no escuro. Se achar palavras válidas adicionais, ganha moedas bônus.',
    victoryCondition: 'Descobrir e marcar todas as palavras secretas do tema.',
    defeatCondition: 'Esgotar o limite de toques ou tentativas erradas.',
    psychologicalTrigger: 'Desejo de completar lacunas misteriosas e frustração de não saber o que procurar no tema.',
    painPoint: 'O jogador travou no tema e não sabe quais termos ainda faltam no tabuleiro.',
    monetizationItem: {
      name: 'Dicas de Primeiras Letras',
      description: 'Revela a letra inicial e o comprimento de 3 palavras misteriosas.',
      avgPriceBRL: 'R$ 3,50',
      hardCurrencyCost: 40
    },
    gridRange: [9, 13],
    wordCountRange: [6, 14],
    hasTimer: false,
    specialRules: ['Lista oculta de palavras', 'Bônus por vocabulário extra descoberto']
  },
  {
    id: 3,
    slug: 'modo_invertido',
    name: 'Modo Invertido',
    subtitle: 'Mundo Espelhado',
    coreMechanic: 'O grid inteiro está com as letras de cabeça para baixo, espelhadas ou escritas da direita para a esquerda (como refletidas num espelho). O cérebro do jogador dá um nó para processar a leitura reversa.',
    victoryCondition: 'Encontrar todas as palavras espelhadas da grade.',
    defeatCondition: 'Tempo esgotar ou limite de toques incorretos.',
    psychologicalTrigger: 'Cansaço visual cognitivo: os olhos tentam forçar o padrão normal e entram em estresse perceptivo.',
    painPoint: 'Cansaço visual severo tentando decodificar termos complexos refletidos.',
    monetizationItem: {
      name: 'Óculos Mágico (30s)',
      description: 'Normaliza o grid e desfaz o espelho por 30 segundos para dar um respiro.',
      avgPriceBRL: 'R$ 2,90',
      hardCurrencyCost: 35
    },
    gridRange: [9, 14],
    wordCountRange: [8, 16],
    hasTimer: true,
    baseTimeSeconds: 110,
    specialRules: ['Letras espelhadas horizontalmente', 'Leitura da direita para a esquerda']
  },
  {
    id: 4,
    slug: 'labirinto_letras',
    name: 'Labirinto de Letras',
    subtitle: 'Caminho Conectado em Zigue-Zague',
    coreMechanic: 'As letras das palavras não estão em linha reta ou diagonal simples. Elas fazem curvas em formato de "L" ou zigue-zague pelo grid, igual a um labirinto contínuo.',
    victoryCondition: 'Traçar o caminho sinuoso completo de todas as palavras em curva.',
    defeatCondition: 'Quebrar a cadeia com saltos ou direções proibidas.',
    psychologicalTrigger: 'Sensação de busca espacial complexa: o jogador acha o começo mas perde a curva crucial.',
    painPoint: 'O jogador encontrou o início da palavra, mas não consegue deduzir para onde a curva vira.',
    monetizationItem: {
      name: 'Bússola Guia',
      description: 'Revela a direção exata da próxima curva da palavra que está sendo caçada.',
      avgPriceBRL: 'R$ 3,50',
      hardCurrencyCost: 40
    },
    gridRange: [9, 13],
    wordCountRange: [6, 12],
    hasTimer: false,
    specialRules: ['Conexões ortogonais em L e zigue-zague', 'Caminhos poligonais']
  },
  {
    id: 5,
    slug: 'fome_de_letras',
    name: 'Modo Fome de Letras',
    subtitle: 'O Devorador & Cascata',
    coreMechanic: 'Cada vez que você acha uma palavra, as letras somem e as letras de cima caem (estilo Candy Crush). Um bloco bloqueado ou uma "bomba" aparece no meio e precisa ser destruído achando palavras ao redor dele.',
    victoryCondition: 'Destruir a bomba central e limpar a cota de palavras.',
    defeatCondition: 'O tabuleiro travar sem combinações ou o contador da bomba zerar.',
    psychologicalTrigger: 'Dopamina de cascatas físicas e medo de a bomba bloquear permanentemente o tabuleiro.',
    painPoint: 'O tabuleiro ficou travado sem opções e a bomba central está prestes a detonar.',
    monetizationItem: {
      name: 'Desarmador de Bombas / Reset',
      description: 'Elimina a bomba central imediatamente ou regenera as letras do grid.',
      avgPriceBRL: 'R$ 3,90',
      hardCurrencyCost: 45
    },
    gridRange: [9, 13],
    wordCountRange: [10, 18],
    hasTimer: false,
    specialRules: ['Gravidade de células em queda', 'Bombas destruídas por adjacência']
  },
  {
    id: 6,
    slug: 'alfabeto_sumido',
    name: 'Desafio do Alfabeto Sumido',
    subtitle: 'Sem Vogais Visíveis',
    coreMechanic: 'O grid só tem consoantes visíveis. As vogais (A, E, I, O, U) estão mascaradas ou ocultas. O jogador precisa adivinhar quais vogais completam as palavras escondidas para conseguir selecioná-las.',
    victoryCondition: 'Preencher mentalmente e circular todas as palavras da grade.',
    defeatCondition: 'Esgotar o limite de 5 erros de seleção.',
    psychologicalTrigger: 'Dificuldade de reconstrução morfológica e desejo de ver o esqueleto da palavra completo.',
    painPoint: 'O jogador empacou numa palavra difícil porque não sabe onde estão suas vogais.',
    monetizationItem: {
      name: 'Revelador de Vogais',
      description: 'Mostra imediatamente onde estão as vogais da palavra mais difícil.',
      avgPriceBRL: 'R$ 2,90',
      hardCurrencyCost: 35
    },
    gridRange: [9, 14],
    wordCountRange: [8, 15],
    hasTimer: false,
    specialRules: ['Vogais mascaradas', 'Dedução ortográfica pura']
  },
  {
    id: 7,
    slug: 'guerra_cliques',
    name: 'Guerra de Cliques',
    subtitle: 'Contrarrelógio Extremo',
    coreMechanic: 'Um modo rápido de 30 segundos. O app joga uma palavra na sua tela e você tem 3 segundos para achá-la no grid. Se errar ou demorar, perde pontos. Ganha quem achar mais em sequência (Combo).',
    victoryCondition: 'Alcançar a pontuação mínima ou combo alvo de acertos antes de o tempo zerar.',
    defeatCondition: 'O cronômetro global de 30s chegar a zero.',
    psychologicalTrigger: 'Frenesi competitivo e sede de quebrar o recorde pessoal quando o combo está alto.',
    painPoint: 'O tempo de 30s está nos últimos 3 segundos e o jogador está prestes a quebrar o recorde diário.',
    monetizationItem: {
      name: 'Tempo Extra por Fase (+15s)',
      description: 'Adiciona +15 segundos ao cronômetro frenético para manter o combo vivo.',
      avgPriceBRL: 'R$ 2,50',
      hardCurrencyCost: 30
    },
    gridRange: [8, 12],
    wordCountRange: [10, 20],
    hasTimer: true,
    baseTimeSeconds: 30,
    specialRules: ['Palavras relâmpago de 3 segundos', 'Multiplicador de combo contínuo']
  },
  {
    id: 8,
    slug: 'modo_historiador',
    name: 'Modo Historiador',
    subtitle: 'Enredo Oculto',
    coreMechanic: 'Cada palavra que você acha no caça-palavras vai preenchendo os espaços em branco de uma história de suspense ou aventura que está acontecendo na tela superior.',
    victoryCondition: 'Completar todas as palavras e revelar o desfecho da narrativa.',
    defeatCondition: 'Nenhuma derrota punitiva; foco em engajamento narrativo.',
    psychologicalTrigger: 'Curiosidade narrativa (Cliffhanger effect): a compulsão de saber "o que acontece a seguir".',
    painPoint: 'O jogador está no clímax do mistério e travou na palavra que revela o segredo.',
    monetizationItem: {
      name: 'Dica do Historiador',
      description: 'Preenche a palavra-chave faltante e desbloqueia o parágrafo da história.',
      avgPriceBRL: 'R$ 2,90',
      hardCurrencyCost: 35
    },
    gridRange: [9, 13],
    wordCountRange: [8, 14],
    hasTimer: false,
    specialRules: ['Narrativa dinâmica com lacunas', 'Desbloqueio progressivo de texto']
  },
  {
    id: 9,
    slug: 'modo_poliglota',
    name: 'Caça Palavras Poliglota',
    subtitle: 'Mistura de Idiomas',
    coreMechanic: 'O grid mistura termos em português, inglês e espanhol. A dica vem em um idioma (ex: "WATER") e você tem que achar a tradução correspondente no grid (ex: "ÁGUA").',
    victoryCondition: 'Traduzir e encontrar todos os pares de vocabulário internacional.',
    defeatCondition: 'Esgotar o tempo limite ou as chances de tradução errada.',
    psychologicalTrigger: 'Orgulho intelectual e aprendizado gamificado de idiomas em tempo real.',
    painPoint: 'O jogador não sabe a tradução exata do termo estrangeiro solicitado.',
    monetizationItem: {
      name: 'Dicionário Rápido',
      description: 'Traduz a dica instantaneamente e marca a primeira letra no tabuleiro.',
      avgPriceBRL: 'R$ 2,90',
      hardCurrencyCost: 35
    },
    gridRange: [9, 14],
    wordCountRange: [8, 16],
    hasTimer: true,
    baseTimeSeconds: 120,
    specialRules: ['Dicas em múltiplos idiomas (PT/EN/ES)', 'Busca por correspondência semântica']
  },
  {
    id: 10,
    slug: 'modo_sobrevivencia',
    name: 'Modo Sobrevivência com Vidas',
    subtitle: 'Errou, Perdeu!',
    coreMechanic: 'O jogador tem apenas 3 vidas. Se ele selecionar uma palavra errada que não existe no jogo, ele perde uma vida. O nível só acaba quando o grid estiver totalmente limpo.',
    victoryCondition: 'Limpar 100% das palavras do grid preservando pelo menos 1 vida.',
    defeatCondition: 'Perder as 3 vidas por toques ou seleções incorretas.',
    psychologicalTrigger: 'Pressão de risco real e aversão à perda (Loss Aversion): cada toque exige certeza absoluta.',
    painPoint: 'O jogador está na última palavra do grid, mas já perdeu 2 vidas e tem medo de errar.',
    monetizationItem: {
      name: 'Pacote de Vidas Extras (+3 Vidas)',
      description: 'Restaura imediatamente 3 corações e concede escudo contra o próximo erro.',
      avgPriceBRL: 'R$ 3,90',
      hardCurrencyCost: 45
    },
    gridRange: [10, 14],
    wordCountRange: [10, 18],
    hasTimer: false,
    specialRules: ['3 Corações de vida', 'Dano por seleção incorreta']
  },
  {
    id: 11,
    slug: 'o_detetive',
    name: 'O Detetive',
    subtitle: 'Crime no Caça-Palavras',
    coreMechanic: 'Há um assassino ou mistério no nível. Para descobrir quem é, você precisa achar as pistas espalhadas pelo grid na ordem correta (Arma -> Local -> Motivo -> Suspeito) antes que o tempo acabe.',
    victoryCondition: 'Desvendar todas as pistas na ordem investigativa e solucionar o caso.',
    defeatCondition: 'O tempo esgotar antes de identificar o culpado.',
    psychologicalTrigger: 'Fantasia de poder investigativo (Sherlock Holmes) e urgência criminal.',
    painPoint: 'Falta apenas a pista final do suspeito e o mandado de prisão vai expirar.',
    monetizationItem: {
      name: 'Pistas de Investigação',
      description: 'Interroga o cenário e revela a localização da pista na ordem exata.',
      avgPriceBRL: 'R$ 3,50',
      hardCurrencyCost: 40
    },
    gridRange: [10, 14],
    wordCountRange: [8, 14],
    hasTimer: true,
    baseTimeSeconds: 100,
    specialRules: ['Ordem sequencial de pistas obrigatória', 'Dossiê do crime']
  },
  {
    id: 12,
    slug: 'modo_caos',
    name: 'Modo Caos',
    subtitle: 'Letras que Mudam de Lugar',
    coreMechanic: 'A cada 10 segundos, o grid inteiro sofre um "terremoto" e algumas letras mudam de posição sozinhas, obrigando o jogador a memorizar rápido e correr contra o tempo.',
    victoryCondition: 'Concluir a busca de palavras antes que 8 terremotos ocorram.',
    defeatCondition: 'Exceder o número limite de abalos sísmicos no grid.',
    psychologicalTrigger: 'Sobrecarga de adaptação rápida: frustração hilária e estimulante de "quase peguei!".',
    painPoint: 'A palavra estava alinhada, mas o terremoto acabou de mexer as letras da coluna.',
    monetizationItem: {
      name: 'Estabilizador de Grid (20s)',
      description: 'Paralisa completamente o tabuleiro por 20 segundos sem terremotos.',
      avgPriceBRL: 'R$ 3,50',
      hardCurrencyCost: 40
    },
    gridRange: [9, 13],
    wordCountRange: [8, 15],
    hasTimer: true,
    baseTimeSeconds: 90,
    specialRules: ['Terremoto periódico a cada 10s', 'Troca de células aleatórias']
  },
  {
    id: 13,
    slug: 'conexao_em_cadeia',
    name: 'Conexão em Cadeia',
    subtitle: 'Palavras Encadeadas',
    coreMechanic: 'A última letra da palavra que você acabou de achar é obrigatoriamente a primeira letra da próxima palavra que você precisa caçar no grid. Se você achou "BRASIL", a próxima deve começar com "L".',
    victoryCondition: 'Formar a corrente perfeita e fechar o ciclo de palavras.',
    defeatCondition: 'Quebrar a cadeia de letras ou errar a sequência 3 vezes.',
    psychologicalTrigger: 'Foco hiper-restrito e satisfação mental de engrenagens se conectando perfeitamente.',
    painPoint: 'O jogador não consegue encontrar nenhuma palavra iniciada com a letra que sobrou.',
    monetizationItem: {
      name: 'Elo Perdido',
      description: 'Indica e ilumina qual é a próxima palavra correspondente da corrente.',
      avgPriceBRL: 'R$ 2,90',
      hardCurrencyCost: 35
    },
    gridRange: [9, 14],
    wordCountRange: [8, 16],
    hasTimer: false,
    specialRules: ['Encadeamento obrigatório (última letra = primeira)', 'Sequência contínua']
  },
  {
    id: 14,
    slug: 'modo_sombra',
    name: 'Modo Sombra',
    subtitle: 'Visão Noturna com Lanterna',
    coreMechanic: 'O grid fica quase totalmente escuro. O jogador tem apenas uma pequena "lanterna" (um círculo de luz que segue o dedo dele na tela) para iluminar e achar as palavras escondidas na penumbra.',
    victoryCondition: 'Varrer as trevas e encontrar todos os termos da escuridão.',
    defeatCondition: 'A bateria da lanterna esgotar com o passar dos segundos.',
    psychologicalTrigger: 'Exploração sensorial tátil e suspense imersivo de vasculhar no escuro.',
    painPoint: 'O feixe de luz é muito estreito e o tempo está acabando para cobrir o grid.',
    monetizationItem: {
      name: 'Lâmpada de Alta Potência',
      description: 'Amplia o raio de visão da lanterna em 300% durante toda a partida restante.',
      avgPriceBRL: 'R$ 4,90',
      hardCurrencyCost: 50
    },
    gridRange: [10, 15],
    wordCountRange: [8, 16],
    hasTimer: true,
    baseTimeSeconds: 100,
    specialRules: ['Máscara de escuridão radial', 'Lanterna dinâmica ao toque']
  },
  {
    id: 15,
    slug: 'batalha_de_chefes',
    name: 'Batalha de Chefes',
    subtitle: 'O Megagrid 20x20',
    coreMechanic: 'No final de cada capítulo, o jogador enfrenta um "Chefão": um grid gigantesco de 20x20 com 40 palavras escondidas, tempo curto e armadilhas visuais que confundem a vista.',
    victoryCondition: 'Esvaziar a barra de vida de 100% do Chefão encontrando todas as 40 palavras.',
    defeatCondition: 'O cronômetro esgotar antes de derrotar o chefão.',
    psychologicalTrigger: 'Ápice da frustração doce e triunfo heroico: o jogador está com o Boss em 5% de HP e precisa vencer a qualquer custo.',
    painPoint: 'O tempo acabou com o chefão em 95% derrotado, faltando apenas 1 ou 2 palavras.',
    monetizationItem: {
      name: '+30s Contra o Chefão',
      description: 'Adiciona +30 segundos vitais e desfere um golpe de 3 palavras automáticas no Boss.',
      avgPriceBRL: 'R$ 4,90',
      hardCurrencyCost: 60
    },
    gridRange: [15, 20],
    wordCountRange: [20, 40],
    hasTimer: true,
    baseTimeSeconds: 180,
    specialRules: ['Megagrid gigante 20x20', 'Barra de Vida do Boss', 'Armadilhas visuais']
  }
];

// 2. MATRIZ DE PROGRESSÃO DE DIFICULDADE (30 CAPÍTULOS)
export const CHAPTER_PROGRESSION_TIERS: ChapterProgressionTier[] = [
  // TIER 1: Onboarding e Conexão (Capítulos 1 a 5)
  ...[1, 2, 3, 4, 5].map(ch => ({
    chapterIndex: ch,
    tierName: 'Iniciação & Descoberta',
    gridMin: 8,
    gridMax: 9,
    wordCountMin: 6,
    wordCountMax: 8,
    allowDiagonals: false,
    allowReverse: false,
    hiddenLettersChance: 0.0,
    timeLimitFactor: 1.4, // 40% mais tempo que o padrão
    coinRewardBase: 40 + ch * 10
  })),

  // TIER 2: Expansão Diagonais Simples (Capítulos 6 a 10)
  ...[6, 7, 8, 9, 10].map(ch => ({
    chapterIndex: ch,
    tierName: 'Caminhos Cruzados',
    gridMin: 10,
    gridMax: 11,
    wordCountMin: 9,
    wordCountMax: 12,
    allowDiagonals: true,
    allowReverse: false,
    hiddenLettersChance: 0.05,
    timeLimitFactor: 1.2,
    coinRewardBase: 100 + (ch - 5) * 15
  })),

  // TIER 3: Palavras Invertidas e Densidade (Capítulos 11 a 18)
  ...[11, 12, 13, 14, 15, 16, 17, 18].map(ch => ({
    chapterIndex: ch,
    tierName: 'Labirinto das Raízes',
    gridMin: 12,
    gridMax: 13,
    wordCountMin: 12,
    wordCountMax: 15,
    allowDiagonals: true,
    allowReverse: true,
    hiddenLettersChance: 0.15,
    timeLimitFactor: 1.0,
    coinRewardBase: 180 + (ch - 10) * 20
  })),

  // TIER 4: Complexidade Alta e Letras Mascaradas (Capítulos 19 a 25)
  ...[19, 20, 21, 22, 23, 24, 25].map(ch => ({
    chapterIndex: ch,
    tierName: 'Desbravador Veterano',
    gridMin: 13,
    gridMax: 14,
    wordCountMin: 15,
    wordCountMax: 18,
    allowDiagonals: true,
    allowReverse: true,
    hiddenLettersChance: 0.25,
    timeLimitFactor: 0.85,
    coinRewardBase: 350 + (ch - 18) * 30
  })),

  // TIER 5: Domínio Mestre Extremo (Capítulos 26 a 30)
  ...[26, 27, 28, 29, 30].map(ch => ({
    chapterIndex: ch,
    tierName: 'Lenda Viva do Brasil',
    gridMin: 14,
    gridMax: 15,
    wordCountMin: 18,
    wordCountMax: 22,
    allowDiagonals: true,
    allowReverse: true,
    hiddenLettersChance: 0.35,
    timeLimitFactor: 0.75, // 25% menos tempo, exige reflexo relâmpago
    coinRewardBase: 600 + (ch - 25) * 50
  }))
];

/**
 * ALGORITMO GERADOR DETERMINÍSTICO DE PARÂMETROS POR ID DE MISSÃO
 * Fórmula matemática reproduzível para qualquer combinação de:
 * Modo (1 a 15), Capítulo (1 a 30) e Missão (1 a 60).
 */
export function generateMissionParameters(
  modeId: number,
  chapterId: number,
  missionId: number
): GeneratedMissionParams {
  // Validações e contenções de limites
  const safeMode = Math.max(1, Math.min(15, modeId));
  const safeChapter = Math.max(1, Math.min(30, chapterId));
  const safeMission = Math.max(1, Math.min(60, missionId));

  // Índice global contínuo (de 1 até 27.000)
  const globalLevelIndex = ((safeMode - 1) * 30 + (safeChapter - 1)) * 60 + safeMission;

  // Obter perfil do modo e tier do capítulo
  const mode = CHALLENGE_MODES[safeMode - 1];
  const tier = CHAPTER_PROGRESSION_TIERS[safeChapter - 1];

  // Curva de progresso intra-capítulo (a cada 60 missões, da mais fácil à fase Boss 60)
  const missionRatio = (safeMission - 1) / 59; // 0.0 na missão 1, 1.0 na missão 60

  // 1. TAMANHO DO GRID (Interpolado entre limites do tier e do modo)
  const baseMin = Math.max(mode.gridRange[0], tier.gridMin);
  const baseMax = Math.min(mode.gridRange[1], tier.gridMax);
  const calculatedGridSize = Math.round(baseMin + (baseMax - baseMin) * missionRatio);

  // 2. QUANTIDADE DE PALAVRAS
  const wordMin = Math.max(mode.wordCountRange[0], tier.wordCountMin);
  const wordMax = Math.min(mode.wordCountRange[1], tier.wordCountMax);
  const calculatedWordCount = Math.round(wordMin + (wordMax - wordMin) * missionRatio);

  // 3. DIAGONAIS E REVERSAS
  // No capítulo 1-5, missões normais não têm diagonais, exceto a fase Boss (missão 60)
  const isBossMission = safeMission === 60;
  const allowDiagonals = tier.allowDiagonals || (isBossMission && safeChapter >= 3);
  const allowReverse = tier.allowReverse || (isBossMission && safeChapter >= 8);

  // 4. TEMPO LIMITE (Se aplicável ao modo)
  let timeLimitSeconds: number | null = null;
  if (mode.hasTimer && mode.baseTimeSeconds) {
    // Fórmulas de tempo adaptativas à quantidade de palavras e ao grid
    const rawTime = (calculatedWordCount * 11 + calculatedGridSize * 3) * tier.timeLimitFactor;
    // Diminui conforme a missão avança dentro do capítulo
    const missionTimeDeduction = missionRatio * 15;
    timeLimitSeconds = Math.max(45, Math.round(rawTime - missionTimeDeduction));
  }

  // 5. RESTRIÇÕES ESPECIAIS (Letras ocultas, bloqueios)
  const hiddenLettersCount = Math.round(
    calculatedWordCount * tier.hiddenLettersChance * (0.5 + missionRatio * 0.5)
  );

  const lockedLettersCount = safeMode === 13 ? Math.round(3 + missionRatio * 8) : 0;

  // 6. COMPRIMENTO DAS PALAVRAS
  const minWordLength = Math.max(3, Math.min(5, Math.floor(calculatedGridSize * 0.35)));
  const maxWordLength = calculatedGridSize;

  // 7. RECOMPENSA DE MOEDAS
  const coinReward = Math.round(
    (tier.coinRewardBase + safeMission * 3) * (isBossMission ? 2.5 : 1.0)
  );

  // Modificador especial de nome
  let specialModifier = 'Padrão';
  if (isBossMission) specialModifier = '👑 Desafio Boss do Capítulo';
  else if (safeMission % 15 === 0) specialModifier = '⭐ Checkpoint Dourado';
  else if (safeMission % 10 === 0) specialModifier = '⚡ Mini-Desafio Veloz';

  return {
    modeId: safeMode,
    chapterId: safeChapter,
    missionId: safeMission,
    globalLevelIndex,
    gridSize: calculatedGridSize,
    wordCount: calculatedWordCount,
    allowDiagonals,
    allowReverse,
    timeLimitSeconds,
    hiddenLettersCount,
    lockedLettersCount,
    minWordLength,
    maxWordLength,
    coinReward,
    starThresholds: [
      timeLimitSeconds ? Math.round(timeLimitSeconds * 0.5) : 3,
      timeLimitSeconds ? Math.round(timeLimitSeconds * 0.75) : 2,
      timeLimitSeconds ? timeLimitSeconds : 1
    ],
    specialModifier
  };
}
