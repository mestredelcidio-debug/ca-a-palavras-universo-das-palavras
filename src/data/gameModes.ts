export interface ConsumableItem {
  id: string;
  name: string;
  description: string;
  priceBRL: string;
  coinsCost: number;
  iconName: string;
}

export interface UniqueItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface GameModeDefinition {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  subtitle: string;
  badge: string;
  iconName: string;
  colorGradient: string;
  accentColor: string;
  howItWorks: string;
  coreMechanic: string;
  victoryCondition: string;
  defeatCondition: string;
  psychologicalTrigger: string;
  purchaseTriggerText: string;
  consumableItem: ConsumableItem;
  uniqueItems: UniqueItem[];
  gridSize: number;
  wordCount: number;
  hasTimer: boolean;
  timeSeconds: number | null;
  allowDiagonals: boolean;
  allowReverse: boolean;
  rules: string[];
}

export const GAME_MODES: GameModeDefinition[] = [
  {
    id: 1,
    slug: 'modo_abismo',
    name: 'Modo Abismo',
    shortName: 'Abismo',
    subtitle: 'Fuga contra o Tempo',
    badge: '⏳ TEMPO & ESCURIDÃO',
    iconName: 'Waves',
    colorGradient: 'from-blue-600 to-indigo-900',
    accentColor: '#2563eb',
    howItWorks: 'O grid começa a "subir" de baixo para cima (ou a tela vai escurecendo). O jogador tem que encontrar palavras rapidamente para limpar as linhas de baixo antes que o tempo acabe ou o grid suma.',
    coreMechanic: 'Linhas inferiores do grid colapsam ou tela escurece progressivamente conforme o tempo corre.',
    victoryCondition: 'Encontrar todas as palavras antes que o abismo consuma a grade.',
    defeatCondition: 'O grid sumir ou o tempo esgotar completamente.',
    psychologicalTrigger: 'Efeito de afogamento e urgência motora: quando falta apenas 1 palavra e a tela está 90% engolida.',
    purchaseTriggerText: 'Falta apenas uma palavra para salvar a fase antes do abismo!',
    consumableItem: {
      id: 'extintor_abismo',
      name: 'Extintor de Abismo (+15s)',
      description: 'Pausa a subida por 15 segundos e recua o abismo em 2 linhas.',
      priceBRL: 'Anúncio',
      coinsCost: 35,
      iconName: 'Shield'
    },
    uniqueItems: [],
    gridSize: 11,
    wordCount: 10,
    hasTimer: true,
    timeSeconds: 90,
    allowDiagonals: true,
    allowReverse: false,
    rules: [
      'A tela sobe/escurece gradualmente',
      'Limpe as palavras para afastar o abismo',
      'Pausa de 15s disponível na loja de emergência'
    ]
  },
  {
    id: 2,
    slug: 'caca_cegas',
    name: 'Caça às Cegas',
    shortName: 'Às Cegas',
    subtitle: 'Sem Dica de Palavras',
    badge: '❓ MISTÉRIO TOTAL',
    iconName: 'EyeOff',
    colorGradient: 'from-purple-700 to-slate-900',
    accentColor: '#7c3aed',
    howItWorks: 'O jogo não mostra a lista de palavras que você precisa achar. Ele dá apenas o tema central (ex: "Partes do Carro"). O jogador tem que ir caçando e descobrindo as palavras no escuro. Se achar uma palavra válida que não estava na lista principal, ganha bônus.',
    coreMechanic: 'Lista oculta com apenas tema e contagem de termos. Descoberta cega com bônus para palavras extras válidas.',
    victoryCondition: 'Descobrir e marcar todas as palavras secretas do tema.',
    defeatCondition: 'Esgotar as tentativas ou limite de toques sem acertos.',
    psychologicalTrigger: 'Desejo de completar lacunas misteriosas e frustração de não saber o que procurar.',
    purchaseTriggerText: 'Travou no tema? Revele as primeiras letras cruciais para desbloquear o enigma!',
    consumableItem: {
      id: 'dica_primeiras_letras',
      name: 'Dicas de Primeiras Letras',
      description: 'Revela a letra inicial e o tamanho de 3 palavras misteriosas.',
      priceBRL: 'Anúncio',
      coinsCost: 40,
      iconName: 'Lightbulb'
    },
    uniqueItems: [],
    gridSize: 10,
    wordCount: 8,
    hasTimer: false,
    timeSeconds: null,
    allowDiagonals: true,
    allowReverse: true,
    rules: [
      'Apenas o tema é revelado',
      'Ache palavras válidas para bônus extras',
      'Sem lista de texto aparente'
    ]
  },
  {
    id: 3,
    slug: 'modo_invertido',
    name: 'Modo Invertido',
    shortName: 'Espelho',
    subtitle: 'Refletido no Espelho',
    badge: '🪞 ESPELHO',
    iconName: 'RotateCcw',
    colorGradient: 'from-pink-600 to-rose-900',
    accentColor: '#e11d48',
    howItWorks: 'O grid inteiro está com as letras de cabeça para baixo, espelhadas ou escritas da direita para a esquerda (como se estivessem refletidas num espelho). O cérebro do jogador dá um nó para processar a leitura.',
    coreMechanic: 'Letras invertidas horizontalmente e verticalmente; palavras escritas estritamente em sentido inverso.',
    victoryCondition: 'Encontrar todas as palavras espelhadas da grade.',
    defeatCondition: 'Tempo esgotar ou limite de toques incorretos.',
    psychologicalTrigger: 'Cansaço visual cognitivo: os olhos tentam forçar o padrão normal e entram em estresse.',
    purchaseTriggerText: 'Dê um respiro à sua mente! Normalize o tabuleiro com visão limpa.',
    consumableItem: {
      id: 'oculos_magico',
      name: 'Óculos Mágico (60s)',
      description: 'Normaliza o grid e desfaz o espelho por 60 segundos inteiros.',
      priceBRL: 'Anúncio',
      coinsCost: 35,
      iconName: 'Glasses'
    },
    uniqueItems: [],
    gridSize: 11,
    wordCount: 12,
    hasTimer: true,
    timeSeconds: 100,
    allowDiagonals: true,
    allowReverse: true,
    rules: [
      'Letras espelhadas e invertidas',
      'Leitura da direita para a esquerda',
      'Óculos Mágico normaliza temporariamente'
    ]
  },
  {
    id: 4,
    slug: 'labirinto_letras',
    name: 'Labirinto de Letras',
    shortName: 'Labirinto',
    subtitle: 'Caminho Conectado em Curvas',
    badge: '🧭 ZIGUE-ZAGUE',
    iconName: 'Compass',
    colorGradient: 'from-amber-600 to-emerald-800',
    accentColor: '#d97706',
    howItWorks: 'As letras das palavras não estão em linha reta ou diagonal simples. Elas fazem curvas em formato de "L" ou zigue-zague pelo grid, igual a um labirinto.',
    coreMechanic: 'Seleção poligonal livre contínua em 90 graus (caminho em L, S ou zigue-zague).',
    victoryCondition: 'Traçar o caminho completo de todas as palavras em curva.',
    defeatCondition: 'Quebrar o caminho da palavra com direções proibidas.',
    psychologicalTrigger: 'Sensação de busca espacial complexa: o jogador acha o começo mas perde a curva.',
    purchaseTriggerText: 'Perdeu a curva da palavra? Aponte a bússola para o caminho certo!',
    consumableItem: {
      id: 'bussola_curvas',
      name: 'Bússola Guia',
      description: 'Revela a direção exata da próxima curva da palavra que você está caçando.',
      priceBRL: 'Anúncio',
      coinsCost: 40,
      iconName: 'Compass'
    },
    uniqueItems: [],
    gridSize: 10,
    wordCount: 8,
    hasTimer: false,
    timeSeconds: null,
    allowDiagonals: false,
    allowReverse: false,
    rules: [
      'Palavras fazem curvas em "L" e zigue-zague',
      'Conexão célula por célula adjacente',
      'Bússola indica a próxima curva'
    ]
  },
  {
    id: 5,
    slug: 'fome_de_letras',
    name: 'Modo Fome de Letras',
    shortName: 'O Devorador',
    subtitle: 'Cascata & Bombas no Grid',
    badge: '💥 DEVORADOR',
    iconName: 'Bomb',
    colorGradient: 'from-red-600 to-rose-950',
    accentColor: '#dc2626',
    howItWorks: 'Cada vez que você acha uma palavra, as letras dela somem e as letras de cima caem (estilo Candy Crush). Um bloco bloqueado ou uma "bomba" aparece no meio e precisa ser destruído achando palavras ao redor dele.',
    coreMechanic: 'Gravidade de letras em cascata e blocos com bombas no centro destruídos por adjacência.',
    victoryCondition: 'Destruir a bomba central e limpar a meta de palavras.',
    defeatCondition: 'O tabuleiro travar sem combinações ou a bomba detonar.',
    psychologicalTrigger: 'Efeito dopamina de cascatas e medo da bomba bloquear o tabuleiro.',
    purchaseTriggerText: 'Tabuleiro travado sem opções? Desarme a bomba e resete a grade!',
    consumableItem: {
      id: 'desarmador_bombas',
      name: 'Desarmador de Bombas / Reset',
      description: 'Elimina a bomba central imediatamente ou regenera as letras do grid.',
      priceBRL: 'Anúncio',
      coinsCost: 45,
      iconName: 'Scissors'
    },
    uniqueItems: [],
    gridSize: 11,
    wordCount: 12,
    hasTimer: false,
    timeSeconds: null,
    allowDiagonals: false,
    allowReverse: false,
    rules: [
      'Letras achadas somem do grid',
      'Novas letras desabam do topo',
      'Bombas exigem palavras vizinhas para sumir'
    ]
  },
  {
    id: 6,
    slug: 'alfabeto_sumido',
    name: 'Alfabeto Sumido',
    shortName: 'Sem Vogais',
    subtitle: 'Apenas Consoantes Visíveis',
    badge: '🚫 SEM VOGAIS',
    iconName: 'HelpCircle',
    colorGradient: 'from-amber-700 to-orange-950',
    accentColor: '#b45309',
    howItWorks: 'O grid só tem consoantes visíveis, e o jogador precisa adivinhar quais vogais completam as palavras escondidas para conseguir selecioná-las.',
    coreMechanic: 'Vogais ocultas como células cinzas ou invisíveis; dedução ortográfica pelo esqueleto consonantal.',
    victoryCondition: 'Preencher mentalmente e circular todas as palavras.',
    defeatCondition: 'Esgotar o limite de 5 tentativas erradas.',
    psychologicalTrigger: 'Dificuldade de reconstrução morfológica e desejo de ver o termo completo.',
    purchaseTriggerText: 'Empacou na palavra difícil? Revele todas as vogais escondidas!',
    consumableItem: {
      id: 'revelador_vogais',
      name: 'Revelador de Vogais',
      description: 'Mostra imediatamente onde estão as vogais da palavra mais difícil.',
      priceBRL: 'Anúncio',
      coinsCost: 35,
      iconName: 'Sun'
    },
    uniqueItems: [
      { id: 'lupa_magica', name: 'Lupa Mágica', description: 'Revela 1 consoante', iconName: 'Search' },
      { id: 'dicionario_simplificado', name: 'Dicionário Simplificado', description: 'Mostra dicas de vogais', iconName: 'Book' },
      { id: 'guia_consoante', name: 'Guia de Consoante', description: 'Destaca uma consoante', iconName: 'Target' }
    ],
    gridSize: 11,
    wordCount: 10,
    hasTimer: false,
    timeSeconds: null,
    allowDiagonals: true,
    allowReverse: false,
    rules: [
      'Apenas consoantes no tabuleiro',
      'Vogais devem ser deduzidas',
      'Dica revela posições das vogais'
    ]
  },
  {
    id: 7,
    slug: 'guerra_de_cliques',
    name: 'Guerra de Cliques',
    shortName: 'Contrarrelógio Extremo',
    subtitle: '3 Segundos por Palavra',
    badge: '⚡ 3 SEGUNDOS',
    iconName: 'Timer',
    colorGradient: 'from-yellow-500 to-red-600',
    accentColor: '#ea580c',
    howItWorks: 'Um modo rápido de 30 segundos. O app joga uma palavra na sua tela e você tem 3 segundos para achá-la no grid. Se errar ou demorar, perde pontos. Ganha quem achar mais em sequência (Combo).',
    coreMechanic: 'Blitz de 3 segundos por palavra sequencial; teste de reflexo visual com combos.',
    victoryCondition: 'Atingir um combo mínimo de 8 palavras consecutivas.',
    defeatCondition: 'Deixar o tempo de 3s esgotar 3 vezes.',
    psychologicalTrigger: 'Picos de adrenalina rápidos e competitividade no ranking diário mundial.',
    purchaseTriggerText: 'Bata o recorde mundial do ranking diário com tempo extra!',
    consumableItem: {
      id: 'tempo_extra_fase',
      name: 'Tempo Extra por Fase (+15s)',
      description: 'Adiciona +15s ao tempo total e +2s por palavra para bater o recorde.',
      priceBRL: 'Anúncio',
      coinsCost: 30,
      iconName: 'Clock'
    },
    uniqueItems: [
      { id: 'combo_dobro', name: 'Combo Dobro', description: 'Multiplicador de combo', iconName: 'Zap' },
      { id: 'desacelerador', name: 'Desacelerador', description: 'Adiciona +1s por palavra', iconName: 'Clock' },
      { id: 'refletor_erro', name: 'Refletor de Erro', description: 'Anula 1 erro', iconName: 'Shield' }
    ],
    gridSize: 10,
    wordCount: 15,
    hasTimer: true,
    timeSeconds: 30,
    allowDiagonals: false,
    allowReverse: false,
    rules: [
      '30s no relógio geral',
      'Apenas 3s para achar a palavra ativa',
      'Sequência de combos multiplica pontos'
    ]
  },
  {
    id: 8,
    slug: 'modo_historiador',
    name: 'Modo Historiador',
    shortName: 'Enredo Oculto',
    subtitle: 'Complete a Narrativa de Suspense',
    badge: '📜 HISTÓRIA',
    iconName: 'BookOpen',
    colorGradient: 'from-emerald-700 to-slate-900',
    accentColor: '#059669',
    howItWorks: 'Cada palavra que você acha no caça-palavras vai preenchendo os espaços em branco de uma história de suspense ou aventura que está acontecendo na tela superior.',
    coreMechanic: 'Narrativa interativa dividida em lacunas preenchidas conforme os termos são achados na grade.',
    victoryCondition: 'Revelar o capítulo completo da história e descobrir o desfecho.',
    defeatCondition: 'Nenhum tempo; retenção pura pela curiosidade narrativa.',
    psychologicalTrigger: 'Curiosidade insaciável sobre o desfecho da trama (Cliffhanger).',
    purchaseTriggerText: 'Curioso para saber o final da história? Revele as pistas e não fique preso!',
    consumableItem: {
      id: 'dica_enredo',
      name: 'Pena do Escritor (Dica de Enredo)',
      description: 'Preenche a próxima lacuna da história e marca o termo na grade.',
      priceBRL: 'Anúncio',
      coinsCost: 30,
      iconName: 'Feather'
    },
    uniqueItems: [
      { id: 'pista_narrativa', name: 'Pista Narrativa', description: 'Revela 1 parágrafo', iconName: 'Book' },
      { id: 'revelador_personagem', name: 'Revelador de Personagem', description: 'Mostra quem é o culpado', iconName: 'Search' },
      { id: 'marco_historia', name: 'Marco da História', description: 'Salta 1 página', iconName: 'Flag' }
    ],
    gridSize: 11,
    wordCount: 10,
    hasTimer: false,
    timeSeconds: null,
    allowDiagonals: true,
    allowReverse: false,
    rules: [
      'História com lacunas no topo da tela',
      'Palavras desvendam o enredo',
      'Final com revelação surpreendente'
    ]
  },
  {
    id: 9,
    slug: 'poliglota_mix',
    name: 'Caça-Palavras Poliglota',
    shortName: 'Poliglota',
    subtitle: 'Português, Inglês e Espanhol',
    badge: '🌍 MULTILÍNGUE',
    iconName: 'Globe',
    colorGradient: 'from-teal-600 to-blue-900',
    accentColor: '#0d9488',
    howItWorks: 'O grid mistura palavras em português, inglês e espanhol. A dica vem em um idioma e você tem que achar a tradução correspondente no grid.',
    coreMechanic: 'Dicas e termos cruzados em três idiomas (PT / EN / ES); tradução ativa na grade.',
    victoryCondition: 'Encontrar todas as traduções corretas dos três idiomas.',
    defeatCondition: 'Limite de seleções erradas de falsos cognatos.',
    psychologicalTrigger: 'Estímulo de aprendizado de idiomas associado ao desafio de vocabulário.',
    purchaseTriggerText: 'Dúvida na tradução do idioma? Use o Dicionário Rápido!',
    consumableItem: {
      id: 'dicionario_rapido',
      name: 'Dicionário Rápido',
      description: 'Traduz a dica instantaneamente e destaca a primeira letra na grade.',
      priceBRL: 'Anúncio',
      coinsCost: 30,
      iconName: 'Book'
    },
    uniqueItems: [
      { id: 'tradutor_automatico', name: 'Tradutor Automático', description: 'Tradução 1 palavra', iconName: 'Globe' },
      { id: 'dicionario_visual', name: 'Dicionário Visual', description: 'Imagem da palavra', iconName: 'Image' },
      { id: 'guia_gramatical', name: 'Guia Gramatical', description: 'Regra de tradução', iconName: 'Book' }
    ],
    gridSize: 12,
    wordCount: 12,
    hasTimer: false,
    timeSeconds: null,
    allowDiagonals: true,
    allowReverse: true,
    rules: [
      'Grade multilíngue (PT, EN, ES)',
      'Dica em uma língua, resposta em outra',
      'Cuidado com falsos cognatos'
    ]
  },
  {
    id: 10,
    slug: 'sobrevivencia_vidas',
    name: 'Modo Sobrevivência',
    shortName: '3 Vidas',
    subtitle: 'Errou, Perdeu!',
    badge: '❤️ 3 VIDAS',
    iconName: 'Heart',
    colorGradient: 'from-red-600 to-rose-900',
    accentColor: '#e11d48',
    howItWorks: 'O jogador tem apenas 3 vidas. Se ele selecionar uma palavra errada que não existe no jogo, ele perde uma vida. O nível só acaba quando o grid estiver totalmente limpo.',
    coreMechanic: 'Gestão de risco absoluto com 3 corações; seleções erradas causam dano.',
    victoryCondition: 'Limpar todas as palavras preservando ao menos 1 vida.',
    defeatCondition: 'Perder todos os 3 corações de vida.',
    psychologicalTrigger: 'Tensão tátil a cada arrasto do dedo: medo de errar e ter que reiniciar.',
    purchaseTriggerText: 'Restando apenas 1 coração? Recupere suas vidas e ative o escudo!',
    consumableItem: {
      id: 'escudo_vidas_extras',
      name: 'Vidas Extras + Escudo Protetor',
      description: 'Restaura 3 vidas completas e concede 1 escudo contra o próximo erro.',
      priceBRL: 'Anúncio',
      coinsCost: 45,
      iconName: 'Shield'
    },
    uniqueItems: [
      { id: 'coracao_extra', name: 'Coração Extra', description: 'Recupera 1 vida', iconName: 'Heart' },
      { id: 'imunidade_temporaria', name: 'Imunidade Temporária', description: '5s de imunidade', iconName: 'Shield' },
      { id: 'curativo', name: 'Curativo', description: 'Repara dano', iconName: 'Heart' }
    ],
    gridSize: 11,
    wordCount: 12,
    hasTimer: false,
    timeSeconds: null,
    allowDiagonals: true,
    allowReverse: true,
    rules: [
      '3 Vidas de coração',
      'Arrastar incorreto consome 1 vida',
      'Escudo protege contra falhas'
    ]
  },
  {
    id: 11,
    slug: 'o_detetive_crime',
    name: 'O Detetive',
    shortName: 'Detetive',
    subtitle: 'Crime no Caça-Palavras',
    badge: '🕵️ CASO POLICIAL',
    iconName: 'Search',
    colorGradient: 'from-slate-800 to-zinc-950',
    accentColor: '#475569',
    howItWorks: 'Há um "assassino" ou mistério no nível. Para descobrir quem é, você precisa achar as pistas espalhadas pelo grid na ordem correta antes que o tempo acabe.',
    coreMechanic: 'Desvendar suspeitos e armas do crime através de pistas encontradas em sequência cronológica.',
    victoryCondition: 'Encontrar todas as pistas e apontar o culpado.',
    defeatCondition: 'O criminoso fugir quando o tempo de investigação esgotar.',
    psychologicalTrigger: 'Sentimento de dedução e justiça; sensação de ser o Sherlock Holmes da partida.',
    purchaseTriggerText: 'O suspeito está fugindo! Adquira pistas de investigação imediatas.',
    consumableItem: {
      id: 'pista_investigacao',
      name: 'Pistas de Investigação',
      description: 'Revela a localização exata da próxima pista do crime no tabuleiro.',
      priceBRL: 'Anúncio',
      coinsCost: 40,
      iconName: 'Search'
    },
    uniqueItems: [
      { id: 'lupa_detetive', name: 'Lupa do Detetive', description: 'Revela 1 suspeito', iconName: 'Search' },
      { id: 'prova_crime', name: 'Prova do Crime', description: 'Mostra 1 pista', iconName: 'Target' },
      { id: 'relatorio_policial', name: 'Relatório Policial', description: 'Resumo da investigação', iconName: 'Book' }
    ],
    gridSize: 12,
    wordCount: 10,
    hasTimer: true,
    timeSeconds: 120,
    allowDiagonals: true,
    allowReverse: true,
    rules: [
      'Pistas em ordem de investigação',
      'Tempo de fuga do criminoso',
      'Dedução final do culpado'
    ]
  },
  {
    id: 12,
    slug: 'modo_caos_terremoto',
    name: 'Modo Caos',
    shortName: 'Terremoto',
    subtitle: 'Letras que Mudam de Lugar',
    badge: '🌪️ TERREMOTO',
    iconName: 'Shuffle',
    colorGradient: 'from-amber-600 to-red-800',
    accentColor: '#d97706',
    howItWorks: 'A cada 10 segundos, o grid inteiro sofre um "terremoto" e algumas letras mudam de posição sozinhas, obrigando o jogador a memorizar rápido e correr contra o tempo.',
    coreMechanic: 'Embaralhamento periódico das células neutras e reorganização espacial a cada 10s.',
    victoryCondition: 'Circular todas as palavras antes que o caos desestruture a grade.',
    defeatCondition: 'Exceder o tempo máximo sob instabilidade.',
    psychologicalTrigger: 'Frustração cômica e pressa: "eu tinha acabado de ver aquela palavra!".',
    purchaseTriggerText: 'Grid tremendo demais? Estabilize o tabuleiro por 20 segundos!',
    consumableItem: {
      id: 'estabilizador_grid',
      name: 'Estabilizador de Grid (20s)',
      description: 'Paralisa completamente o tabuleiro e impede novos terremotos por 20 segundos.',
      priceBRL: 'Anúncio',
      coinsCost: 40,
      iconName: 'Lock'
    },
    uniqueItems: [
      { id: 'amortecedor', name: 'Amortecedor', description: 'Reduz terremoto', iconName: 'Shuffle' },
      { id: 'ancora_letra', name: 'Âncora de Letra', description: 'Fixa 1 palavra', iconName: 'Lock' },
      { id: 'sensor_geologico', name: 'Sensor Geológico', description: 'Prevê terremoto', iconName: 'Zap' }
    ],
    gridSize: 11,
    wordCount: 12,
    hasTimer: true,
    timeSeconds: 90,
    allowDiagonals: true,
    allowReverse: true,
    rules: [
      'Terremoto a cada 10 segundos',
      'Letras mudam de coordenadas',
      'Estabilizador congela o tabuleiro'
    ]
  },
  {
    id: 13,
    slug: 'conexao_em_cadeia',
    name: 'Conexão em Cadeia',
    shortName: 'Cadeia',
    subtitle: 'Palavras Encadeadas Ponta a Ponta',
    badge: '⛓️ CORRENTE',
    iconName: 'Link',
    colorGradient: 'from-cyan-700 to-blue-900',
    accentColor: '#0891b2',
    howItWorks: 'A última letra da palavra que você acabou de achar é obrigatoriamente a primeira letra da próxima palavra que você precisa caçar no grid.',
    coreMechanic: 'Intersecção obrigatória sequencial: última letra vira primeira do próximo termo.',
    victoryCondition: 'Concluir toda a cadeia sem quebrar o elo.',
    defeatCondition: 'Tentar circular palavras fora da ordem da corrente.',
    psychologicalTrigger: 'Atenção focada na letra final como âncora; quebra de hábitos tradicionais.',
    purchaseTriggerText: 'Não encontra a palavra que começa com essa letra? Revele o Elo Perdido!',
    consumableItem: {
      id: 'elo_perdido',
      name: 'Elo Perdido',
      description: 'Mostra qual é a próxima palavra da corrente e onde ela começa.',
      priceBRL: 'Anúncio',
      coinsCost: 35,
      iconName: 'Zap'
    },
    uniqueItems: [
      { id: 'chave_corrente', name: 'Chave da Corrente', description: 'Desbloqueia elo', iconName: 'Link' },
      { id: 'elo_mestre', name: 'Elo Mestre', description: 'Pula elo difícil', iconName: 'Zap' },
      { id: 'detector_conexoes', name: 'Detector de Conexões', description: 'Destaca próxima', iconName: 'Search' }
    ],
    gridSize: 11,
    wordCount: 12,
    hasTimer: false,
    timeSeconds: null,
    allowDiagonals: true,
    allowReverse: false,
    rules: [
      'Última letra conecta na primeira da próxima',
      'Ordem da corrente obrigatória',
      'Elo Perdido indica o próximo passo'
    ]
  },
  {
    id: 14,
    slug: 'modo_sombra_noturno',
    name: 'Modo Sombra',
    shortName: 'Visão Noturna',
    subtitle: 'Lanterna Tátil no Escuro',
    badge: '🔦 LANTERNA',
    iconName: 'Moon',
    colorGradient: 'from-slate-900 to-black',
    accentColor: '#334155',
    howItWorks: 'O grid fica quase totalmente escuro. O jogador tem apenas uma pequena "lanterna" (um círculo de luz que segue o dedo dele na tela) para iluminar e achar as palavras.',
    coreMechanic: 'Máscara radial de sombra dinâmica que segue as coordenadas de toque na tela.',
    victoryCondition: 'Varrer o tabuleiro e encontrar todos os termos escondidos na penumbra.',
    defeatCondition: 'Tempo limite na escuridão.',
    psychologicalTrigger: 'Imersão sensorial total: transformar a busca passiva numa exploração tátil íntima.',
    purchaseTriggerText: 'Campo de visão muito estreito? Acenda a Lâmpada de Alta Potência!',
    consumableItem: {
      id: 'lampada_alta_potencia',
      name: 'Lâmpada de Alta Potência',
      description: 'Expande o círculo de luz em 300% durante a partida inteira.',
      priceBRL: 'Anúncio',
      coinsCost: 50,
      iconName: 'Sun'
    },
    uniqueItems: [
      { id: 'lanterna_extra', name: 'Lanterna Extra', description: 'Aumenta raio luz', iconName: 'Moon' },
      { id: 'bateria_lanterna', name: 'Bateria de Lanterna', description: 'Tempo lanterna', iconName: 'Zap' },
      { id: 'visao_noturna', name: 'Visão Noturna', description: 'Aclara grid', iconName: 'Sun' }
    ],
    gridSize: 12,
    wordCount: 14,
    hasTimer: true,
    timeSeconds: 120,
    allowDiagonals: true,
    allowReverse: true,
    rules: [
      'Grade em penumbra quase total',
      'Feixe de luz acompanha o dedo',
      'Lâmpada de Alta Potência amplia a visão'
    ]
  },
  {
    id: 15,
    slug: 'batalha_chefes_megagrid',
    name: 'Batalha de Chefes',
    shortName: 'Megagrid 20x20',
    subtitle: 'O Megagrid com 40 Palavras!',
    badge: '👑 CHEFÃO 20x20',
    iconName: 'Trophy',
    colorGradient: 'from-amber-500 via-orange-600 to-red-700',
    accentColor: '#f59e0b',
    howItWorks: 'No final de cada capítulo, o jogador enfrenta um "Chefão": um grid gigantesco de 20x20 com 40 palavras escondidas, tempo curto e armadilhas visuais que confundem a vista.',
    coreMechanic: 'Megagrid épico 20x20 com 40 termos, alta densidade, todas as direções e pressão do chefão.',
    victoryCondition: 'Derrotar o Chefão encontrando todas as 40 palavras antes do gongo final.',
    defeatCondition: 'O tempo do chefão esgotar.',
    psychologicalTrigger: 'O ápice da "frustração doce": o jogador fez 38 de 40 palavras, o tempo acaba e ele gasta com gosto a microtransação.',
    purchaseTriggerText: 'Faltam só 2 palavras para derrubar o Chefão! Compre +30 Segundos e vença!',
    consumableItem: {
      id: 'bonus_chefao_30s',
      name: '+30s Contra o Chefão',
      description: 'Adiciona +30 segundos imediatos e revela 2 palavras difíceis do chefão.',
      priceBRL: 'Anúncio',
      coinsCost: 60,
      iconName: 'Award'
    },
    uniqueItems: [
      { id: 'escudo_chefao', name: 'Escudo Chefão', description: 'Bloqueia armadilha', iconName: 'Shield' },
      { id: 'bateria_chefao', name: 'Bateria Chefão', description: 'Pausa cronômetro', iconName: 'Zap' },
      { id: 'lupa_chefao', name: 'Lupa Chefão', description: 'Revela 5 palavras', iconName: 'Search' }
    ],
    gridSize: 20,
    wordCount: 40,
    hasTimer: true,
    timeSeconds: 180,
    allowDiagonals: true,
    allowReverse: true,
    rules: [
      'Grid monumental 20x20',
      '40 Palavras simultâneas',
      'Armadilhas visuais e tempo estrito do chefão'
    ]
  }
];

export function getGameModeById(id: number): GameModeDefinition {
  return GAME_MODES.find(m => m.id === id) || GAME_MODES[0];
}

export function getGameModeBySlug(slug: string): GameModeDefinition {
  return GAME_MODES.find(m => m.slug === slug) || GAME_MODES[0];
}
