import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  ArrowLeft,
  Settings,
  Search,
  Star,
  Play,
  Sparkles,
  Waves,
  EyeOff,
  RotateCcw,
  Compass,
  Bomb,
  HelpCircle,
  Clock,
  BookOpen,
  Globe,
  Heart,
  Shuffle,
  Link,
  Moon,
  Trophy,
  Shield,
  Zap,
  Check,
  AlertTriangle,
  Flame,
  Volume2,
  Wand2,
  Snowflake,
  Sun
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CoinPill } from './CoinPill';
import { CellPos, Difficulty, PuzzleData } from '../types/game';
import { normalizePtBr } from '../utils/text';
import { GameModeDefinition, ConsumableItem } from '../data/gameModes';
import { IN_GAME_POWERUPS, InGamePowerup } from '../data/inGamePowerups';
import { TropicalPartyParticles, TropicalParticle } from './TropicalPartyParticles';
import { playWordFoundChime, playHintSparkle, playLetterTick } from '../utils/audio';

interface GameViewProps {
  levelNumber: number;
  difficulty: Difficulty;
  puzzle: PuzzleData;
  coins: number;
  soundEnabled: boolean;
  activeMode?: GameModeDefinition | null;
  onGoHome: () => void;
  onOpenSettings: () => void;
  onLevelComplete: (level: number, time: number) => void;
  onUseHint: () => void;
  onUseConsumable?: (item: ConsumableItem) => boolean;
}

export const GameView: React.FC<GameViewProps> = ({
  levelNumber,
  difficulty,
  puzzle,
  coins,
  soundEnabled,
  activeMode = null,
  onGoHome,
  onOpenSettings,
  onLevelComplete,
  onUseHint,
  onUseConsumable
}) => {
  const gridSize = puzzle.grid.length;
  const gridData = puzzle.grid;

  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [foundPaths, setFoundPaths] = useState<{ word: string; path: CellPos[]; color: string }[]>([]);

  // Drag selection state
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState<CellPos | null>(null);
  const [selectedPath, setSelectedPath] = useState<CellPos[]>([]);
  const [currentWordSpelled, setCurrentWordSpelled] = useState<string>('');

  const gridRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(Date.now());

  // ==========================================
  // TROPICAL PARTY PARTICLES SYSTEM
  // ==========================================
  const [celebratingWord, setCelebratingWord] = useState<string | null>(null);
  const [tropicalParticles, setTropicalParticles] = useState<TropicalParticle[]>([]);

  // ==========================================
  // IN-GAME POWERUPS / FACILITIES
  // ==========================================
  const [rayXActive, setRayXActive] = useState<boolean>(false);
  const [compassClue, setCompassClue] = useState<string | null>(null);
  const [shieldActive, setShieldActive] = useState<boolean>(false);
  const [radarHighlightedCell, setRadarHighlightedCell] = useState<CellPos | null>(null);

  // ==========================================
  // 15 SPECIAL GAME MODES SPECIFIC STATES
  // ==========================================
  // Mode 1: Abismo
  const [abyssPercent, setAbyssPercent] = useState<number>(10);
  const [timeRemaining, setTimeRemaining] = useState<number>(() => {
    if (activeMode?.id === 1) return 85;
    if (activeMode?.id === 7) return 30; // Guerra de cliques
    if (activeMode?.id === 15) return 120; // Megagrid Chefes
    if (activeMode?.hasTimer && activeMode?.timeSeconds) return activeMode.timeSeconds;
    return 100;
  });

  // Mode 2: Caça às Cegas
  const [revealedFirstLetters, setRevealedFirstLetters] = useState<boolean>(false);

  // Mode 3: Modo Invertido
  const [glassesActive, setGlassesActive] = useState<boolean>(false);

  // Mode 5: Fome de Letras
  const [bombDisarmed, setBombDisarmed] = useState<boolean>(false);
  const [bombTicker, setBombTicker] = useState<number>(35);

  // Mode 6: Sem Vogais
  const [vowelsRevealed, setVowelsRevealed] = useState<boolean>(false);

  // Mode 7: Guerra de Cliques
  const [rapidCombo, setRapidCombo] = useState<number>(0);
  const [targetWordIndex, setTargetWordIndex] = useState<number>(0);

  // Mode 9: Poliglota
  const [dictionaryActive, setDictionaryActive] = useState<boolean>(false);

  // Mode 10: Sobrevivência
  const [lives, setLives] = useState<number>(3);
  const [isDamageFlashing, setIsDamageFlashing] = useState<boolean>(false);

  // Mode 11: Detetive
  const [detectiveClueStep, setDetectiveClueStep] = useState<number>(1);

  // Mode 12: Modo Caos
  const [chaosCountdown, setChaosCountdown] = useState<number>(10);
  const [isEarthquakeShaking, setIsEarthquakeShaking] = useState<boolean>(false);
  const [isStabilized, setIsStabilized] = useState<boolean>(false);

  // Mode 13: Conexão em Cadeia
  const [requiredChainLetter, setRequiredChainLetter] = useState<string | null>(null);

  // Mode 14: Modo Sombra
  const [flashlightPosition, setFlashlightPosition] = useState<{ x: number; y: number }>({ x: 180, y: 180 });
  const [flashlightBoosted, setFlashlightBoosted] = useState<boolean>(false);

  // Defeat / Emergency Buy Modal
  const [defeatModalOpen, setDefeatModalOpen] = useState<boolean>(false);
  const [defeatReason, setDefeatReason] = useState<string>('');

  // Reset when puzzle changes
  useEffect(() => {
    setFoundWords(new Set());
    setFoundPaths([]);
    setSelectedPath([]);
    setStartCell(null);
    setCurrentWordSpelled('');
    startTimeRef.current = Date.now();
    setAbyssPercent(10);
    setRevealedFirstLetters(false);
    setGlassesActive(false);
    setBombDisarmed(false);
    setBombTicker(35);
    setVowelsRevealed(false);
    setRapidCombo(0);
    setTargetWordIndex(0);
    setDictionaryActive(false);
    setLives(3);
    setDetectiveClueStep(1);
    setChaosCountdown(10);
    setIsStabilized(false);
    setRequiredChainLetter(null);
    setFlashlightBoosted(false);
    setDefeatModalOpen(false);
    setRayXActive(false);
    setCompassClue(null);
    setShieldActive(false);
    setRadarHighlightedCell(null);
    setCelebratingWord(null);
    setTropicalParticles([]);

    if (activeMode?.id === 1) setTimeRemaining(85);
    else if (activeMode?.id === 7) setTimeRemaining(30);
    else if (activeMode?.id === 15) setTimeRemaining(120);
    else if (activeMode?.hasTimer && activeMode?.timeSeconds) setTimeRemaining(activeMode.timeSeconds);
  }, [puzzle, activeMode]);

  // Main Timer / Abyss / Chaos Tick
  useEffect(() => {
    if (defeatModalOpen) return;

    const timer = setInterval(() => {
      // Timer-based modes
      if (activeMode?.hasTimer || activeMode?.id === 1 || activeMode?.id === 7 || activeMode?.id === 15) {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setDefeatReason('O tempo esgotou completamente antes de achar todas as palavras!');
            setDefeatModalOpen(true);
            return 0;
          }
          return prev - 1;
        });
      }

      // Mode 1: Abismo subindo
      if (activeMode?.id === 1) {
        setAbyssPercent(prev => {
          const next = prev + 1.2;
          if (next >= 98) {
            setDefeatReason('O abismo escuro subiu e engoliu o tabuleiro!');
            setDefeatModalOpen(true);
            return 100;
          }
          return next;
        });
      }

      // Mode 5: Bomba central contando
      if (activeMode?.id === 5 && !bombDisarmed) {
        setBombTicker(prev => {
          if (prev <= 1) {
            setDefeatReason('A bomba central detonou e bloqueou o grid!');
            setDefeatModalOpen(true);
            return 0;
          }
          return prev - 1;
        });
      }

      // Mode 12: Terremoto do Caos a cada 10s
      if (activeMode?.id === 12 && !isStabilized) {
        setChaosCountdown(prev => {
          if (prev <= 1) {
            setIsEarthquakeShaking(true);
            setTimeout(() => setIsEarthquakeShaking(false), 900);
            return 10;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activeMode, bombDisarmed, isStabilized, defeatModalOpen]);

  // Vibrant palette for word highlights
  const highlightColors = [
    'rgba(56, 189, 248, 0.65)',  // Cyan
    'rgba(250, 204, 21, 0.65)',  // Yellow
    'rgba(244, 114, 182, 0.65)', // Pink
    'rgba(74, 222, 128, 0.65)',  // Green
    'rgba(251, 146, 60, 0.65)',  // Orange
    'rgba(168, 85, 247, 0.65)',  // Purple
    'rgba(20, 184, 166, 0.65)',  // Teal
    'rgba(244, 63, 94, 0.65)',   // Rose
    'rgba(132, 204, 22, 0.65)',  // Lime
    'rgba(99, 102, 241, 0.65)',  // Indigo
    'rgba(234, 179, 8, 0.65)',   // Amber
    'rgba(14, 165, 233, 0.65)'   // Sky
  ];

  // Spawn Tropical Party Particle explosion
  const triggerTropicalParty = (wordName: string) => {
    setCelebratingWord(wordName);

    // Emojis for tropical party effect
    const tropicalEmojis = ['🌴', '🍍', '🥥', '🦜', '🌺', '✨', '🍉', '🥭', '⭐', '🍌', '🎉'];
    const generatedParticles: TropicalParticle[] = [];

    const rect = gridRef.current?.getBoundingClientRect();
    const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    for (let i = 0; i < 16; i++) {
      generatedParticles.push({
        id: `tp-${Date.now()}-${i}`,
        emoji: tropicalEmojis[i % tropicalEmojis.length],
        x: centerX + (Math.random() * 40 - 20),
        y: centerY + (Math.random() * 40 - 20),
        angle: (i / 16) * 360 + (Math.random() * 20 - 10),
        distance: 90 + Math.random() * 120,
        rotation: Math.random() * 360 - 180,
        scale: 0.8 + Math.random() * 0.7
      });
    }

    setTropicalParticles(generatedParticles);

    setTimeout(() => {
      setCelebratingWord(null);
    }, 1800);
  };

  // Calculate straight line path in any direction
  const calculateLinePath = useCallback((start: CellPos, end: CellPos): CellPos[] => {
    const dr = end.row - start.row;
    const dc = end.col - start.col;
    const absR = Math.abs(dr);
    const absC = Math.abs(dc);

    const path: CellPos[] = [];

    // Horizontal
    if (absR === 0) {
      const step = dc >= 0 ? 1 : -1;
      for (let c = start.col; c !== end.col + step; c += step) {
        path.push({ row: start.row, col: c });
      }
    }
    // Vertical
    else if (absC === 0) {
      const step = dr >= 0 ? 1 : -1;
      for (let r = start.row; r !== end.row + step; r += step) {
        path.push({ row: r, col: start.col });
      }
    }
    // Diagonal
    else if (absR === absC) {
      const stepR = dr >= 0 ? 1 : -1;
      const stepC = dc >= 0 ? 1 : -1;
      let r = start.row;
      let c = start.col;
      for (let i = 0; i <= absR; i++) {
        path.push({ row: r, col: c });
        r += stepR;
        c += stepC;
      }
    } else {
      // Snap to closest straight direction
      if (absR > absC * 2) {
        const step = dr >= 0 ? 1 : -1;
        for (let r = start.row; r !== end.row + step; r += step) {
          path.push({ row: r, col: start.col });
        }
      } else if (absC > absR * 2) {
        const step = dc >= 0 ? 1 : -1;
        for (let c = start.col; c !== end.col + step; c += step) {
          path.push({ row: start.row, col: c });
        }
      } else {
        const stepR = dr >= 0 ? 1 : -1;
        const stepC = dc >= 0 ? 1 : -1;
        const count = Math.min(absR, absC);
        let r = start.row;
        let c = start.col;
        for (let i = 0; i <= count; i++) {
          path.push({ row: r, col: c });
          r += stepR;
          c += stepC;
        }
      }
    }

    return path;
  }, []);

  const getCellFromCoordinates = (clientX: number, clientY: number): CellPos | null => {
    if (!gridRef.current) return null;
    const rect = gridRef.current.getBoundingClientRect();
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      return null;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Track flashlight for Modo Sombra
    if (activeMode?.id === 14) {
      setFlashlightPosition({ x, y });
    }

    const cellWidth = rect.width / gridSize;
    const cellHeight = rect.height / gridSize;

    let col = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellHeight);

    // In Mode 3 (Invertido) without glasses, mirror the touched column
    if (activeMode?.id === 3 && !glassesActive) {
      col = gridSize - 1 - col;
    }

    if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
      return { row, col };
    }
    return null;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const cell = getCellFromCoordinates(e.clientX, e.clientY);
    if (!cell) return;

    setIsSelecting(true);
    setStartCell(cell);
    setSelectedPath([cell]);
    setCurrentWordSpelled(gridData[cell.row][cell.col]);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isSelecting || !startCell) return;
    const cell = getCellFromCoordinates(e.clientX, e.clientY);
    if (!cell) return;

    const path = calculateLinePath(startCell, cell);
    if (path.length !== selectedPath.length) {
      playLetterTick(soundEnabled, 0.35);
    }
    setSelectedPath(path);

    let spelled = '';
    path.forEach(p => {
      spelled += gridData[p.row][p.col];
    });
    setCurrentWordSpelled(spelled);
  };

  const handlePointerUp = () => {
    if (!isSelecting) return;
    setIsSelecting(false);

    if (selectedPath.length > 0) {
      let forwardStr = '';
      selectedPath.forEach(p => {
        forwardStr += gridData[p.row][p.col];
      });
      const reversedStr = forwardStr.split('').reverse().join('');

      const normalizedForward = normalizePtBr(forwardStr);
      const normalizedReversed = normalizePtBr(reversedStr);

      const matchedWord = puzzle.words.find(w => {
        const norm = w.normalized;
        return !foundWords.has(w.cleanDisplay) && (norm === normalizedForward || norm === normalizedReversed);
      });

      if (matchedWord) {
        // Mode 13: Conexão em Cadeia validation
        if (activeMode?.id === 13 && requiredChainLetter) {
          const firstChar = matchedWord.cleanDisplay.charAt(0).toUpperCase();
          if (firstChar !== requiredChainLetter.toUpperCase()) {
            setIsDamageFlashing(true);
            setTimeout(() => setIsDamageFlashing(false), 500);
            setSelectedPath([]);
            setStartCell(null);
            setCurrentWordSpelled('');
            return;
          }
        }

        const updatedSet = new Set(foundWords);
        updatedSet.add(matchedWord.cleanDisplay);
        setFoundWords(updatedSet);

        const color = highlightColors[foundPaths.length % highlightColors.length];
        setFoundPaths(prev => [...prev, { word: matchedWord.cleanDisplay, path: selectedPath, color }]);

        playWordFoundChime(soundEnabled, 0.7);

        // MODE 1 ABISMO: Push back abyss by 18%
        if (activeMode?.id === 1) {
          setAbyssPercent(prev => Math.max(5, prev - 18));
          setTimeRemaining(prev => prev + 5);
        }

        // MODE 7 GUERRA DE CLIQUES: Combo up & add time
        if (activeMode?.id === 7) {
          setRapidCombo(c => c + 1);
          setTimeRemaining(prev => Math.min(prev + 5, 45));
          setTargetWordIndex(prev => (prev + 1) % puzzle.words.length);
        }

        // MODE 11 DETETIVE: Advance clue
        if (activeMode?.id === 11) {
          setDetectiveClueStep(s => s + 1);
        }

        // MODE 13 CONEXÃO EM CADEIA: Update chain letter
        if (activeMode?.id === 13) {
          const lastChar = matchedWord.cleanDisplay.slice(-1).toUpperCase();
          setRequiredChainLetter(lastChar);
        }

        // Check if all words completed
        if (updatedSet.size === puzzle.words.length) {
          const elapsedSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
          setTimeout(() => {
            onLevelComplete(levelNumber, elapsedSeconds);
          }, 800);
        }
      } else {
        // Selection did not match any valid remaining word!
        if (shieldActive) {
          setShieldActive(false); // Shield consumed protecting against mistake
        } else if (activeMode?.id === 10 && selectedPath.length >= 2) {
          setIsDamageFlashing(true);
          setTimeout(() => setIsDamageFlashing(false), 450);
          setLives(prev => {
            const next = prev - 1;
            if (next <= 0) {
              setDefeatReason('Você perdeu todos os 3 corações com seleções incorretas!');
              setDefeatModalOpen(true);
              return 0;
            }
            return next;
          });
        }
      }
    }

    setSelectedPath([]);
    setStartCell(null);
    setCurrentWordSpelled('');
  };

  // Consume Mode Power-Up Action
  const handleUseModeConsumable = () => {
    if (!activeMode) return;
    const item = activeMode.consumableItem;

    // Trigger ad logic here
    const adWatched = true;
    if (!adWatched) return;

    playHintSparkle(soundEnabled, 0.8);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });

    switch (activeMode.id) {
      case 1:
        setAbyssPercent(prev => Math.max(0, prev - 35));
        setTimeRemaining(prev => prev + 15);
        setDefeatModalOpen(false);
        break;
      case 2:
        setRevealedFirstLetters(true);
        break;
      case 3:
        setGlassesActive(true);
        setTimeout(() => setGlassesActive(false), 30000);
        break;
      case 5:
        setBombDisarmed(true);
        setDefeatModalOpen(false);
        break;
      case 6:
        setVowelsRevealed(true);
        break;
      case 7:
        setTimeRemaining(prev => prev + 15);
        setDefeatModalOpen(false);
        break;
      case 9:
        setDictionaryActive(true);
        onUseHint();
        break;
      case 10:
        setLives(3);
        setDefeatModalOpen(false);
        break;
      case 12:
        setIsStabilized(true);
        setTimeout(() => setIsStabilized(false), 20000);
        break;
      case 14:
        setFlashlightBoosted(true);
        break;
      case 15:
        setTimeRemaining(prev => prev + 30);
        setDefeatModalOpen(false);
        break;
      default:
        onUseHint();
    }
  };

  // Use an In-Game Facility Powerup (Watch ad instead of spending coins)
  const handleUseFacilityPowerup = (powerup: InGamePowerup) => {
    // TRIGGER AD WATCHER HERE (Assume a function onWatchAd exists in App/GameView props)
    // For now, simulating ad completion:
    const adWatched = true; 

    if (adWatched) {
      playHintSparkle(soundEnabled, 0.85);

      // Apply facility effect
      switch (powerup.id) {
        case 'varinha_magica': {
          // Automatically finds and solves 1 uncompleted word!
          const uncompleted = puzzle.words.find(w => !foundWords.has(w.cleanDisplay));
          if (uncompleted) {
            const updatedSet = new Set(foundWords);
            updatedSet.add(uncompleted.cleanDisplay);
            setFoundWords(updatedSet);

            const color = highlightColors[foundPaths.length % highlightColors.length];
            setFoundPaths(prev => [...prev, { word: uncompleted.cleanDisplay, path: uncompleted.path, color }]);

            if (updatedSet.size === puzzle.words.length) {
              const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
              setTimeout(() => onLevelComplete(levelNumber, elapsed), 800);
            }
          }
          break;
        }
        case 'radar_letras': {
          const uncompleted = puzzle.words.find(w => !foundWords.has(w.cleanDisplay));
          if (uncompleted && uncompleted.path.length > 0) {
            setRadarHighlightedCell(uncompleted.path[0]);
            setTimeout(() => setRadarHighlightedCell(null), 8000);
          }
          break;
        }
        case 'congelador_tempo': {
          setTimeRemaining(prev => prev + 30);
          setAbyssPercent(prev => Math.max(0, prev - 25));
          setDefeatModalOpen(false);
          break;
        }
        case 'visao_raiox': {
          setRayXActive(true);
          setTimeout(() => setRayXActive(false), 12000);
          break;
        }
        case 'escudo_protecao': {
          setShieldActive(true);
          setLives(3);
          setDefeatModalOpen(false);
          break;
        }
        case 'bussola_direcao': {
          const uncompleted = puzzle.words.find(w => !foundWords.has(w.cleanDisplay));
          if (uncompleted) {
            setCompassClue(uncompleted.cleanDisplay);
            setTimeout(() => setCompassClue(null), 8000);
          }
          break;
        }
      }
    }
  };

  const selectedCellsSet = new Set(selectedPath.map(p => `${p.row},${p.col}`));

  const isVowelChar = (char: string) => {
    return ['A', 'E', 'I', 'O', 'U', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ã', 'Õ', 'Â', 'Ê'].includes(char.toUpperCase());
  };

  const bossHpPercent = Math.round(
    ((puzzle.words.length - foundWords.size) / Math.max(puzzle.words.length, 1)) * 100
  );

  return (
    <div
      className={`relative w-full h-full min-h-screen flex flex-col justify-between overflow-hidden select-none pb-6 sm:pb-8 transition-colors ${
        isDamageFlashing ? 'bg-red-950/80' : ''
      }`}
    >
      {/* TROPICAL PARTY PARTICLES OVERLAY */}
      <TropicalPartyParticles activeWord={celebratingWord} particles={tropicalParticles} />

      {/* 1. TOP HEADER */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between px-3 pt-2.5 z-30 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onGoHome}
            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg border border-white/40 active:scale-95 transition-transform cursor-pointer"
            title="Voltar ao Início"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={onOpenSettings}
            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg border border-white/40 active:scale-95 transition-transform cursor-pointer"
            title="Configurações"
          >
            <Settings className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Center: Title / Level Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-blue-900 font-display font-black text-xs sm:text-sm tracking-wide shadow-md border-2 border-blue-400 max-w-[210px] truncate">
          {activeMode ? (
            <span
              className="px-2 py-0.5 rounded-full text-[10px] text-white font-black uppercase truncate"
              style={{ backgroundColor: activeMode.accentColor }}
            >
              #{activeMode.id} {activeMode.shortName}
            </span>
          ) : (
            <span>Nível {levelNumber}</span>
          )}
        </div>

        <CoinPill coins={coins} onOpenRewardBoxes={() => {}} />
      </header>

      {/* SPECIAL MODE HUD (Se ativo) */}
      {activeMode && (
        <div className="w-full max-w-[370px] mx-auto px-2 mt-1 z-30">
          <div className="w-full rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-850/90 to-slate-900/90 backdrop-blur-md border border-amber-400/40 p-2 shadow-xl flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {activeMode.id === 1 && (
                <div className="flex items-center gap-1.5 text-xs text-sky-200">
                  <Waves className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span className="font-mono font-bold text-amber-300">
                    ⏱️ {timeRemaining}s
                  </span>
                  <span className="text-[10px] text-white/70">
                    · Abismo: {Math.round(abyssPercent)}%
                  </span>
                </div>
              )}

              {activeMode.id === 10 && (
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map(heartIndex => (
                    <Heart
                      key={heartIndex}
                      className={`w-4 h-4 ${
                        heartIndex <= lives
                          ? 'fill-rose-500 text-rose-500 animate-bounce'
                          : 'fill-slate-600 text-slate-700'
                      }`}
                    />
                  ))}
                  <span className="text-[10px] font-bold text-white ml-1">
                    {lives > 0 ? `${lives} Vidas` : 'Zero Vidas!'}
                  </span>
                </div>
              )}

              {activeMode.id === 7 && (
                <div className="flex items-center gap-1.5 text-xs">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span className="font-mono font-bold text-amber-300">
                    ⏱️ {timeRemaining}s
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase">
                    COMBO x{rapidCombo}
                  </span>
                </div>
              )}

              {activeMode.id === 15 && (
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1 text-[10px] font-black uppercase text-amber-300 truncate">
                    <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>CHEFÃO 20x20 · HP: {bossHpPercent}%</span>
                  </div>
                  <div className="w-28 h-1.5 rounded-full bg-slate-800 overflow-hidden border border-white/20 mt-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300"
                      style={{ width: `${bossHpPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {activeMode.id === 13 && (
                <div className="flex items-center gap-1 text-[11px] text-white">
                  <Link className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    Próxima letra:{' '}
                    <strong className="text-amber-300 text-xs font-mono">
                      "{requiredChainLetter || 'Livre'}"
                    </strong>
                  </span>
                </div>
              )}

              {activeMode.id === 12 && (
                <div className="flex items-center gap-1 text-[11px] text-white">
                  <Shuffle className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    Terremoto em:{' '}
                    <strong className="text-amber-300 font-mono">
                      {isStabilized ? 'Congelado ❄️' : `${chaosCountdown}s`}
                    </strong>
                  </span>
                </div>
              )}

              {![1, 10, 7, 15, 13, 12].includes(activeMode.id) && activeMode.hasTimer && (
                <div className="flex items-center gap-1 text-xs text-sky-200">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-mono font-bold text-amber-300">
                    ⏱️ {timeRemaining}s
                  </span>
                </div>
              )}

              {![1, 10, 7, 15, 13, 12].includes(activeMode.id) && !activeMode.hasTimer && (
                <div className="flex items-center gap-1 text-[10px] text-sky-200 font-bold truncate max-w-[170px]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{activeMode.badge}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleUseModeConsumable}
              className="py-1 px-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-display font-black text-[10px] uppercase tracking-wide shadow-md active:scale-95 transition-all flex items-center gap-1 shrink-0 cursor-pointer"
              title={`Usar ${activeMode.consumableItem.name} (${activeMode.consumableItem.coinsCost} moedas)`}
            >
              <Zap className="w-3 h-3 fill-slate-950" />
              <span className="truncate max-w-[110px]">
                {activeMode.consumableItem.name}
              </span>
              <span className="text-[9px] font-mono opacity-80">
                ({activeMode.consumableItem.coinsCost}🪙)
              </span>
            </button>
          </div>
        </div>
      )}

      {/* 2. CATEGORY & WORDS LIST CARD (BARRA COM AS PALAVRAS A SEREM PROCURADAS) */}
      <div className="w-full max-w-[360px] mx-auto px-2 mt-1 z-20">
        <div className="w-full rounded-2xl shadow-xl overflow-hidden border border-white/40">
          <div className="bg-[#1c56b8] px-3.5 py-1.5 flex items-center justify-center relative">
            <div className="absolute left-2.5 flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-300 drop-shadow" />
              <div className="w-10 h-2 bg-blue-950 rounded-full overflow-hidden border border-blue-400/40">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${(foundWords.size / Math.max(puzzle.words.length, 1)) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="font-display font-black text-xs sm:text-sm text-white tracking-widest uppercase drop-shadow-sm truncate max-w-[180px]">
              {activeMode?.id === 2 ? `TEMA: ${puzzle.categoryTitle}` : puzzle.categoryTitle}
            </h3>

            <div className="absolute right-3 text-xs font-black text-amber-300 tabular-nums">
              {foundWords.size}/{puzzle.words.length}
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm p-1.5 max-h-[75px] overflow-y-auto flex flex-wrap justify-center gap-1 text-center scrollbar-thin">
            {puzzle.words.map((w, index) => {
              const isFound = foundWords.has(w.cleanDisplay);

              let displayLabel = w.cleanDisplay;
              if (activeMode?.id === 2 && !isFound) {
                if (revealedFirstLetters) {
                  displayLabel = `${w.cleanDisplay.charAt(0)}${'_'.repeat(w.cleanDisplay.length - 1)}`;
                } else {
                  displayLabel = `??? (${w.cleanDisplay.length}L)`;
                }
              }

              if (activeMode?.id === 9 && !isFound && dictionaryActive) {
                displayLabel = `🇺🇸 ${w.cleanDisplay}`;
              }

              return (
                <span
                  key={w.cleanDisplay}
                  className={`px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-display font-black tracking-wider uppercase transition-all duration-300 ${
                    isFound
                      ? 'bg-emerald-100 text-emerald-700 line-through opacity-50 scale-95 border border-emerald-300/40'
                      : compassClue === w.cleanDisplay
                      ? 'bg-amber-300 text-slate-950 ring-2 ring-amber-500 animate-pulse'
                      : 'bg-slate-100 text-slate-800 border border-slate-200'
                  }`}
                >
                  {displayLabel}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. FORMAÇÃO DAS PALAVRAS ENTRE A BARRA DE PALAVRAS E O PAINEL DE BUSCA */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[360px] mx-auto px-2 my-1 z-30">
        <div
          className={`w-full h-11 rounded-2xl border-2 flex items-center justify-center transition-all duration-200 shadow-md ${
            currentWordSpelled.length > 0
              ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 border-amber-500 scale-[1.02] shadow-amber-500/40'
              : 'bg-white/85 border-white/70 backdrop-blur-sm'
          }`}
        >
          {currentWordSpelled.length > 0 ? (
            <div className="flex items-center gap-1.5 px-3">
              <span className="text-base animate-bounce">✨</span>
              <span className="font-display font-black text-lg text-slate-950 tracking-[0.25em] uppercase drop-shadow-sm">
                {currentWordSpelled.split('').join(' ')}
              </span>
              <span className="text-base animate-bounce">✨</span>
            </div>
          ) : (
            <span className="text-[11px] font-bold text-slate-600 tracking-wider uppercase flex items-center gap-1.5">
              <span>👆</span>
              <span>Passe o dedo nas letras para formar a palavra</span>
            </span>
          )}
        </div>
      </div>

      {/* 4. PAINEL/GRID DE LETRAS */}
      <div className="w-full max-w-[360px] mx-auto px-2 my-auto z-20 flex flex-col items-center relative">
        {/* Mode 1 Abismo: Dark rising water overlay */}
        {activeMode?.id === 1 && (
          <div
            className="absolute inset-x-2 bottom-0 bg-gradient-to-t from-blue-950/90 via-indigo-900/60 to-transparent rounded-b-3xl pointer-events-none transition-all duration-500 z-30 flex items-center justify-center"
            style={{ height: `${abyssPercent}%` }}
          >
            {abyssPercent > 50 && (
              <span className="text-[10px] font-black uppercase text-amber-300 bg-black/60 px-2 py-0.5 rounded-full border border-amber-400 animate-pulse">
                ⚠️ Abismo Subindo ({Math.round(abyssPercent)}%)
              </span>
            )}
          </div>
        )}

        {/* Mode 14 Sombra: Flashlight radial spotlight */}
        {activeMode?.id === 14 && (
          <div
            className="absolute inset-2 rounded-3xl pointer-events-none z-30 transition-all"
            style={{
              background: `radial-gradient(circle ${
                flashlightBoosted ? '190px' : '90px'
              } at ${flashlightPosition.x}px ${flashlightPosition.y}px, transparent 30%, rgba(3, 7, 18, 0.96) 80%)`
            }}
          />
        )}

        <div
          ref={gridRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`w-full aspect-square bg-white/95 rounded-3xl p-2 shadow-2xl border-2 border-white grid touch-none select-none relative transition-transform ${
            activeMode?.id === 3 && !glassesActive ? 'scale-x-[-1]' : ''
          } ${isEarthquakeShaking ? 'animate-shake' : ''}`}
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
            gap: gridSize >= 12 ? '1px' : '2px'
          }}
        >
          {gridData.map((row, r) =>
            row.map((letter, c) => {
              const isSelected = selectedCellsSet.has(`${r},${c}`);
              const foundMatch = foundPaths.find(fp =>
                fp.path.some(p => p.row === r && p.col === c)
              );

              // Mode 6: Sem Vogais
              let displayLetter = letter;
              if (activeMode?.id === 6 && !vowelsRevealed && isVowelChar(letter)) {
                displayLetter = '·';
              }

              // Mode 5: Center Bomb Indicator
              const isCenterBombCell =
                activeMode?.id === 5 &&
                !bombDisarmed &&
                r === Math.floor(gridSize / 2) &&
                c === Math.floor(gridSize / 2);

              // Radar highlighted cell
              const isRadarCell =
                radarHighlightedCell &&
                radarHighlightedCell.row === r &&
                radarHighlightedCell.col === c;

              // Ray-X highlighting initials of words
              const isRayXInitial =
                rayXActive &&
                puzzle.words.some(
                  w => !foundWords.has(w.cleanDisplay) && w.path[0]?.row === r && w.path[0]?.col === c
                );

              return (
                <div
                  key={`${r}-${c}`}
                  className={`flex items-center justify-center relative font-display font-black text-slate-900 rounded-md transition-all ${
                    gridSize <= 8
                      ? 'text-xl sm:text-2xl'
                      : gridSize <= 10
                      ? 'text-base sm:text-lg'
                      : gridSize <= 12
                      ? 'text-sm sm:text-base'
                      : 'text-xs sm:text-sm'
                  } ${isRadarCell || isRayXInitial ? 'ring-2 ring-amber-400 bg-amber-200 animate-pulse' : ''}`}
                  style={{
                    backgroundColor: isSelected
                      ? '#38bdf8'
                      : foundMatch
                      ? foundMatch.color
                      : isCenterBombCell
                      ? '#ef4444'
                      : isRadarCell || isRayXInitial
                      ? '#fef08a'
                      : 'transparent',
                    color: isSelected || isCenterBombCell ? '#ffffff' : '#0f172a'
                  }}
                >
                  <span className="relative z-10">
                    {isCenterBombCell ? '💣' : displayLetter}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. ARSENAL DE FACILIDADES & ITENS DE COMPRA (R$ 2,50 a R$ 4,90) */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[370px] mx-auto px-2 z-30 flex flex-col gap-1.5 mt-auto mb-4 sm:mb-6">
        {/* Status Pills */}
        <div className="flex items-center justify-between text-[10px] text-white/90 font-bold px-1">
          <span className="uppercase tracking-wider text-amber-300">
            Facilidades em Jogo:
          </span>
          {shieldActive && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/80 text-white font-mono text-[9px] font-black">
              🛡️ Escudo Ativo
            </span>
          )}
          {rayXActive && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/80 text-slate-950 font-mono text-[9px] font-black animate-pulse">
              ☀️ Raio-X Ativo (Iniciais)
            </span>
          )}
        </div>

        {/* Toolbar of 6 In-Game Facility Powerups (R$ 2,50 a R$ 4,90) */}
        <div className="w-full p-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-between gap-1">
          {IN_GAME_POWERUPS.map(item => {
            const canAfford = coins >= item.coinsCost;

            return (
              <button
                key={item.id}
                onClick={() => handleUseFacilityPowerup(item)}
                className={`flex-1 py-1 px-1 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer relative group ${
                  canAfford
                    ? `bg-gradient-to-b ${item.gradient} text-white shadow-md active:scale-90 hover:brightness-110`
                    : 'bg-white/10 text-white/60 hover:bg-white/15'
                }`}
                title={`${item.name} (${item.priceBRL} ou ${item.coinsCost} moedas): ${item.description}`}
              >
                {item.id === 'varinha_magica' && <Wand2 className="w-4 h-4" />}
                {item.id === 'radar_letras' && <Search className="w-4 h-4" />}
                {item.id === 'congelador_tempo' && <Snowflake className="w-4 h-4" />}
                {item.id === 'visao_raiox' && <Sun className="w-4 h-4" />}
                {item.id === 'escudo_protecao' && <Shield className="w-4 h-4" />}
                {item.id === 'bussola_direcao' && <Compass className="w-4 h-4" />}

                <span className="text-[8px] font-display font-black uppercase truncate max-w-[50px] leading-none">
                  {item.shortName}
                </span>

                <span className="text-[7.5px] font-mono font-bold text-amber-200 leading-none">
                  🎁 Grátis
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DEFEAT / EMERGENCY MONETIZATION MODAL */}
      {defeatModalOpen && activeMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-[350px] rounded-3xl bg-slate-900 border-2 border-rose-500 p-5 shadow-2xl flex flex-col items-center text-center text-white relative animate-scaleUp">
            <div className="w-14 h-14 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-lg mb-3">
              <AlertTriangle className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="font-display font-black text-lg text-white mb-1">
              FIM DE JOGO NO MODO!
            </h3>
            <p className="text-xs text-rose-200 mb-4 leading-relaxed">
              {defeatReason}
            </p>

             <div className="w-full p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 mb-4 flex flex-col gap-1 text-left">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                ⚡ Salvar a Partida Imediatamente:
              </span>
              <span className="font-display font-black text-sm text-white">
                {activeMode.consumableItem.name}
              </span>
              <p className="text-[10px] text-white/70">
                {activeMode.consumableItem.description}
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-white/10 mt-1">
                <span className="text-xs font-mono font-black text-emerald-300">
                  🎁 Assista ao vídeo para resgatar
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <button
                onClick={handleUseModeConsumable}
                className="w-full h-11 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-display font-black text-xs uppercase tracking-wide flex items-center justify-center gap-1 shadow-lg active:scale-95 transition-transform cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Salvar & Continuar Fase</span>
              </button>

              <button
                onClick={() => {
                  setDefeatModalOpen(false);
                  onGoHome();
                }}
                className="w-full h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs uppercase tracking-wide flex items-center justify-center transition-all cursor-pointer"
              >
                Voltar ao Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
