export interface Mission {
  id: string;
  chapterId?: number;
  missionNumber?: number;
  title: string;
  description: string;
  category: 'words' | 'levels' | 'difficulty' | 'streak' | 'hints' | 'chapter';
  currentProgress: number;
  targetProgress: number;
  rewardCoins: number;
  tier: number;
  maxTier: number;
  isCompleted: boolean;
  isClaimed: boolean;
}

export const GLOBAL_MISSIONS: Mission[] = [
  {
    id: 'find_words_tier',
    title: 'Caçador de Palavras',
    description: 'Encontre palavras nas grades do Brasil',
    category: 'words',
    currentProgress: 0,
    targetProgress: 8,
    rewardCoins: 50,
    tier: 1,
    maxTier: 10,
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'solve_levels_tier',
    title: 'Explorador de Fases',
    description: 'Conclua fases da jornada brasileira',
    category: 'levels',
    currentProgress: 0,
    targetProgress: 2,
    rewardCoins: 60,
    tier: 1,
    maxTier: 10,
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'hard_mode_tier',
    title: 'Mestre do Desafio',
    description: 'Vença partidas no modo Difícil ou Mestre',
    category: 'difficulty',
    currentProgress: 0,
    targetProgress: 1,
    rewardCoins: 80,
    tier: 1,
    maxTier: 8,
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'daily_presence_tier',
    title: 'Fidelidade Diária',
    description: 'Resgate seus presentes diários de 7 dias',
    category: 'streak',
    currentProgress: 0,
    targetProgress: 1,
    rewardCoins: 40,
    tier: 1,
    maxTier: 7,
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'no_hint_master',
    title: 'Olho de Águia',
    description: 'Conclua uma fase sem utilizar nenhuma dica',
    category: 'hints',
    currentProgress: 0,
    targetProgress: 1,
    rewardCoins: 70,
    tier: 1,
    maxTier: 5,
    isCompleted: false,
    isClaimed: false
  }
];

/**
 * Generate 30 specific themed missions for a given chapter
 */
export function generateChapterMissions(chapterId: number, chapterName: string): Mission[] {
  const missions: Mission[] = [];

  const missionTemplates = [
    { title: 'Primeiros Passos', desc: `Inicie e conclua a 1ª fase de ${chapterName}`, target: 1, reward: 30, cat: 'levels' as const },
    { title: 'Caçador Inicial', desc: `Encontre 5 palavras neste capítulo`, target: 5, reward: 35, cat: 'words' as const },
    { title: 'Olho Focado', desc: `Vença 1 fase sem usar dicas de lupa`, target: 1, reward: 40, cat: 'hints' as const },
    { title: 'Avanço na Trilha', desc: `Complete 3 fases de ${chapterName}`, target: 3, reward: 45, cat: 'levels' as const },
    { title: 'Explorador Atento', desc: `Encontre 12 palavras nas grades`, target: 12, reward: 50, cat: 'words' as const },
    { title: 'Desafio Médio', desc: `Vença 1 fase no modo Médio`, target: 1, reward: 50, cat: 'difficulty' as const },
    { title: 'Caminho Seguro', desc: `Conclua 5 fases deste capítulo`, target: 5, reward: 55, cat: 'levels' as const },
    { title: 'Vocabulário Vivo', desc: `Encontre 20 palavras brasileiras`, target: 20, reward: 60, cat: 'words' as const },
    { title: 'Mente Serena', desc: `Vença 2 fases sem usar dicas`, target: 2, reward: 60, cat: 'hints' as const },
    { title: 'Desafio Difícil', desc: `Vença 1 fase no modo Difícil (16 palavras)`, target: 1, reward: 70, cat: 'difficulty' as const },
    { title: 'Meio do Percurso', desc: `Chegue até a fase 10 do capítulo`, target: 10, reward: 75, cat: 'levels' as const },
    { title: 'Mestre da Grade', desc: `Encontre 35 palavras neste capítulo`, target: 35, reward: 80, cat: 'words' as const },
    { title: 'Perspicácia', desc: `Vença 3 fases consecutivas com 3 estrelas`, target: 3, reward: 80, cat: 'levels' as const },
    { title: 'Proeza Mestre', desc: `Vença 1 partida no modo Mestre (20 palavras)`, target: 1, reward: 90, cat: 'difficulty' as const },
    { title: 'Metade Conquistada', desc: `Conclua 15 fases de ${chapterName}`, target: 15, reward: 95, cat: 'levels' as const },
    { title: 'Enciclopédia Nativa', desc: `Encontre 50 palavras na região`, target: 50, reward: 100, cat: 'words' as const },
    { title: 'Precisão Cirúrgica', desc: `Vença 4 fases sem usar dicas`, target: 4, reward: 105, cat: 'hints' as const },
    { title: 'Ritmo Forte', desc: `Complete 18 fases deste percurso`, target: 18, reward: 110, cat: 'levels' as const },
    { title: 'Colecionador de Termos', desc: `Encontre 65 palavras no bioma`, target: 65, reward: 115, cat: 'words' as const },
    { title: 'Superando Desafios', desc: `Vença 3 partidas no modo Difícil`, target: 3, reward: 120, cat: 'difficulty' as const },
    { title: 'Reta Decisiva', desc: `Alcance 20 fases concluídas`, target: 20, reward: 125, cat: 'levels' as const },
    { title: 'Visão Panorâmica', desc: `Encontre 80 palavras no capítulo`, target: 80, reward: 130, cat: 'words' as const },
    { title: 'Gênio do Caça-Palavras', desc: `Vença 5 fases sem dicas`, target: 5, reward: 135, cat: 'hints' as const },
    { title: 'Quase no Fim', desc: `Conclua 24 fases de ${chapterName}`, target: 24, reward: 140, cat: 'levels' as const },
    { title: 'Mestre Vocabular', desc: `Encontre 100 palavras na região`, target: 100, reward: 150, cat: 'words' as const },
    { title: 'Glória dos Mestres', desc: `Vença 2 partidas no modo Mestre`, target: 2, reward: 160, cat: 'difficulty' as const },
    { title: 'Penúltimo Degrau', desc: `Conclua 27 fases deste capítulo`, target: 27, reward: 170, cat: 'levels' as const },
    { title: 'Gabarito Impecável', desc: `Encontre 120 palavras totais`, target: 120, reward: 180, cat: 'words' as const },
    { title: 'Perto da Coroa', desc: `Conclua 29 fases de ${chapterName}`, target: 29, reward: 190, cat: 'levels' as const },
    { title: 'Coroação do Capítulo', desc: `Complete as 30 fases de ${chapterName} e domine o bioma!`, target: 30, reward: 250, cat: 'chapter' as const }
  ];

  for (let i = 0; i < 30; i++) {
    const tmpl = missionTemplates[i];
    missions.push({
      id: `chap_${chapterId}_m_${i + 1}`,
      chapterId,
      missionNumber: i + 1,
      title: tmpl.title,
      description: tmpl.desc,
      category: tmpl.cat,
      currentProgress: 0,
      targetProgress: tmpl.target,
      rewardCoins: tmpl.reward,
      tier: 1,
      maxTier: 1,
      isCompleted: false,
      isClaimed: false
    });
  }

  return missions;
}

export function advanceMissionTier(mission: Mission): Mission {
  if (mission.tier >= mission.maxTier) {
    return {
      ...mission,
      isCompleted: true,
      isClaimed: true
    };
  }

  const nextTier = mission.tier + 1;
  let newTarget = mission.targetProgress;
  let newReward = mission.rewardCoins + 25 * nextTier;

  if (mission.category === 'words') {
    newTarget = nextTier * 12;
  } else if (mission.category === 'levels') {
    newTarget = nextTier * 3;
  } else if (mission.category === 'difficulty') {
    newTarget = nextTier * 2;
  } else if (mission.category === 'streak') {
    newTarget = nextTier;
  } else if (mission.category === 'hints') {
    newTarget = nextTier;
  }

  return {
    ...mission,
    tier: nextTier,
    targetProgress: newTarget,
    rewardCoins: newReward,
    isCompleted: mission.currentProgress >= newTarget,
    isClaimed: false
  };
}
