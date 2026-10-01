import React, { useState, useEffect, useCallback } from 'react';
import { HomeView } from './components/HomeView';
import { GameView } from './components/GameView';
import { ChaptersView } from './components/ChaptersView';
import { SettingsModal } from './components/SettingsModal';
import { DailyHubModal } from './components/DailyHubModal';
import { MissionsModal } from './components/MissionsModal';
import { ChapterRewardModal } from './components/ChapterRewardModal';
import { VictoryModal } from './components/VictoryModal';
import { RewardBoxesModal } from './components/RewardBoxesModal';
import { FullShopModal } from './components/FullShopModal';
import { BackgroundSelectorModal } from './components/BackgroundSelectorModal';
import { CHAPTERS, ChapterData, getChapterForLevel, getChapterById } from './data/chapters';
import { Difficulty, GameSettings, PuzzleData, UserProfile } from './types/game';
import { loadUserProfile, saveUserProfile, loadGameSettings, saveGameSettings } from './utils/storage';
import { generatePuzzle } from './utils/puzzleGenerator';
import { playVictoryFanfare, playWordFoundChime, playHintSparkle, toggleAmbientMusic } from './utils/audio';
import { GLOBAL_MISSIONS, Mission, advanceMissionTier, generateChapterMissions } from './data/missions';
import { isGiftAvailableToday } from './data/dailyGifts';
import { GAME_MODES, GameModeDefinition, ConsumableItem } from './data/gameModes';
import { GameModesModal } from './components/GameModesModal';
import { getNatureBackgroundById } from './data/natureBackgrounds';

const GLOBAL_MISSIONS_KEY = 'caca_palavras_global_missions_v2';
const CHAPTER_MISSIONS_KEY = 'caca_palavras_chapter_missions_v2';
const CLAIMED_CHAPTERS_KEY = 'caca_palavras_claimed_chapters_v2';

function loadSavedGlobalMissions(): Mission[] {
  try {
    const raw = localStorage.getItem(GLOBAL_MISSIONS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return GLOBAL_MISSIONS;
}

function loadSavedChapterMissionsMap(): Record<number, Mission[]> {
  try {
    const raw = localStorage.getItem(CHAPTER_MISSIONS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return {};
}

function loadClaimedChapters(): number[] {
  try {
    const raw = localStorage.getItem(CLAIMED_CHAPTERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return [1]; // Chapter 1 starting bonus already granted or claimable
}

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => loadUserProfile());
  const [settings, setSettings] = useState<GameSettings>(() => loadGameSettings());
  const [globalMissions, setGlobalMissions] = useState<Mission[]>(() => loadSavedGlobalMissions());
  const [chapterMissionsMap, setChapterMissionsMap] = useState<Record<number, Mission[]>>(() =>
    loadSavedChapterMissionsMap()
  );
  const [claimedChapters, setClaimedChapters] = useState<number[]>(() => loadClaimedChapters());

  // Navigation tab: 'home' | 'game' | 'chapters' | 'shop'
  const [currentTab, setCurrentTab] = useState<'home' | 'game' | 'chapters' | 'shop'>('home');
  const [activeLevel, setActiveLevel] = useState<number>(profile.currentLevel || 1);
  const [activeSelectedLevel, setActiveSelectedLevel] = useState<number>(profile.currentLevel || 1);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');
  const [selectedGameMode, setSelectedGameMode] = useState<GameModeDefinition>(() => GAME_MODES[0]);
  const [activeGameMode, setActiveGameMode] = useState<GameModeDefinition | null>(null);

  // Active chapter based on active selected level
  const [currentChapter, setCurrentChapter] = useState<ChapterData>(() =>
    getChapterForLevel(profile.currentLevel || 1)
  );

  // Active puzzle state
  const [puzzle, setPuzzle] = useState<PuzzleData>(() => {
    const chap = getChapterForLevel(profile.currentLevel || 1);
    const seed = 1000 + (profile.currentLevel || 1) * 37;
    return generatePuzzle(chap.themeCategory, 'medium', seed);
  });

  // Hints used in current game
  const [currentLevelHintsUsed, setCurrentLevelHintsUsed] = useState<number>(0);

  // Modals state
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showDaily, setShowDaily] = useState<boolean>(false);
  const [showMissions, setShowMissions] = useState<boolean>(false);
  const [showGameModesModal, setShowGameModesModal] = useState<boolean>(false);
  const [showVictory, setShowVictory] = useState<boolean>(false);
  const [showRewardBoxes, setShowRewardBoxes] = useState<boolean>(false);
  const [showFullShop, setShowFullShop] = useState<boolean>(false);
  const [showBackgroundSelector, setShowBackgroundSelector] = useState<boolean>(false);
  const [newChapterRewardModal, setNewChapterRewardModal] = useState<ChapterData | null>(null);

  // Save profile and manage ambient music
  useEffect(() => {
    saveUserProfile(profile);
  }, [profile]);

  useEffect(() => {
    toggleAmbientMusic(settings.musicEnabled, settings.sfxVolume);
  }, [settings.musicEnabled, settings.sfxVolume]);

  const handleClaimRewardCoins = (amountOrItem: number | string) => {
    const addCoins = typeof amountOrItem === 'number' ? amountOrItem : 100;
    setProfile(p => ({ ...p, coins: p.coins + addCoins }));
    setShowRewardBoxes(false);
    setShowFullShop(false);
  };

  const [victoryStats, setVictoryStats] = useState({
    level: 1,
    time: 0,
    words: 8,
    stars: 3,
    coins: 50
  });

  // Ensure current chapter missions exist (30 missions per chapter!)
  useEffect(() => {
    if (!chapterMissionsMap[currentChapter.id]) {
      const generated = generateChapterMissions(currentChapter.id, currentChapter.subtitle);
      setChapterMissionsMap(prev => ({
        ...prev,
        [currentChapter.id]: generated
      }));
    }
  }, [currentChapter.id, currentChapter.subtitle, chapterMissionsMap]);

  // Sync storage on state change
  useEffect(() => {
    saveUserProfile(profile);
  }, [profile]);

  useEffect(() => {
    saveGameSettings(settings);
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(GLOBAL_MISSIONS_KEY, JSON.stringify(globalMissions));
  }, [globalMissions]);

  useEffect(() => {
    localStorage.setItem(CHAPTER_MISSIONS_KEY, JSON.stringify(chapterMissionsMap));
  }, [chapterMissionsMap]);

  useEffect(() => {
    localStorage.setItem(CLAIMED_CHAPTERS_KEY, JSON.stringify(claimedChapters));
  }, [claimedChapters]);

  // Keep current chapter in sync with active selected level
  useEffect(() => {
    const chap = getChapterForLevel(activeSelectedLevel);
    setCurrentChapter(chap);
  }, [activeSelectedLevel]);

  // Start or change a level with dynamic puzzle generation
  const handlePlayLevel = useCallback(
    (targetLvl?: number, diffOverride?: Difficulty) => {
      const lvl = targetLvl ?? activeSelectedLevel ?? profile.currentLevel ?? 1;
      const diff = diffOverride ?? selectedDifficulty;
      const chap = getChapterForLevel(lvl);
      const seed = 1000 + lvl * 47;

      const newPuzzle = generatePuzzle(chap.themeCategory, diff, seed);

      setActiveGameMode(null); // Standard Campaign mode without constraints
      setActiveLevel(lvl);
      setActiveSelectedLevel(lvl);
      setCurrentChapter(chap);
      setPuzzle(newPuzzle);
      setCurrentLevelHintsUsed(0);
      setCurrentTab('game');
    },
    [activeSelectedLevel, profile.currentLevel, selectedDifficulty]
  );

  // Start a special game mode from the 15 Challenge Modes Arena
  const handlePlaySpecialMode = useCallback(
    (mode: GameModeDefinition) => {
      setActiveGameMode(mode);
      setSelectedGameMode(mode);
      const diff: Difficulty = mode.id >= 10 ? 'expert' : mode.id >= 5 ? 'hard' : 'medium';
      const chap = getChapterForLevel(activeSelectedLevel);
      const seed = 3000 + mode.id * 100 + activeSelectedLevel * 31;
      const newPuzzle = generatePuzzle(chap.themeCategory, diff, seed);

      setActiveLevel(activeSelectedLevel);
      setCurrentChapter(chap);
      setPuzzle(newPuzzle);
      setCurrentLevelHintsUsed(0);
      setCurrentTab('game');
    },
    [activeSelectedLevel]
  );

  // Handle in-game consumable usage for active game mode
  const handleUseConsumable = useCallback(
    (item: ConsumableItem): boolean => {
      // Logic to trigger ad here
      console.log('Triggering ad for', item.name);
      return true;
    },
    []
  );

  // Advance missions helper (both Global and Chapter's 30 missions!)
  const advanceMissionsOnAction = useCallback(
    (wordsFound: number, isHardOrExpert: boolean, hintsUsed: number, chapterId: number) => {
      // 1. Advance Global Missions
      setGlobalMissions(prevMissions =>
        prevMissions.map(m => {
          let added = 0;
          if (m.category === 'words') added = wordsFound;
          else if (m.category === 'levels') added = 1;
          else if (m.category === 'difficulty' && isHardOrExpert) added = 1;
          else if (m.category === 'hints' && hintsUsed === 0) added = 1;

          if (added > 0) {
            const newProg = m.currentProgress + added;
            return {
              ...m,
              currentProgress: newProg,
              isCompleted: newProg >= m.targetProgress
            };
          }
          return m;
        })
      );

      // 2. Advance the 30 Missions for current chapter
      setChapterMissionsMap(prevMap => {
        const currentList = prevMap[chapterId] || generateChapterMissions(chapterId, currentChapter.subtitle);
        const updatedList = currentList.map(m => {
          let added = 0;
          if (m.category === 'words') added = wordsFound;
          else if (m.category === 'levels') added = 1;
          else if (m.category === 'chapter') added = 1;
          else if (m.category === 'difficulty' && isHardOrExpert) added = 1;
          else if (m.category === 'hints' && hintsUsed === 0) added = 1;

          if (added > 0) {
            const newProg = m.currentProgress + added;
            return {
              ...m,
              currentProgress: newProg,
              isCompleted: newProg >= m.targetProgress
            };
          }
          return m;
        });

        return {
          ...prevMap,
          [chapterId]: updatedList
        };
      });
    },
    [currentChapter.subtitle]
  );

  // Level Complete & Chapter Bounty Check
  const handleLevelComplete = (lvl: number, elapsedSeconds: number) => {
    playVictoryFanfare(settings.soundEnabled, settings.sfxVolume);

    const coinsEarned =
      selectedDifficulty === 'expert'
        ? 100
        : selectedDifficulty === 'hard'
        ? 80
        : selectedDifficulty === 'medium'
        ? 60
        : 45;
    const nextLvl = lvl + 1;

    // Advance 30 chapter missions and global missions
    advanceMissionsOnAction(
      puzzle.words.length,
      selectedDifficulty === 'hard' || selectedDifficulty === 'expert',
      currentLevelHintsUsed,
      currentChapter.id
    );

    setProfile(prev => {
      const updatedLevels = {
        ...prev.completedLevels,
        [lvl]: { stars: 3, time: elapsedSeconds }
      };

      const newStats = {
        ...prev.stats,
        puzzlesSolved: prev.stats.puzzlesSolved + 1,
        wordsFound: prev.stats.wordsFound + puzzle.words.length,
        timePlayedSeconds: prev.stats.timePlayedSeconds + elapsedSeconds
      };

      return {
        ...prev,
        coins: prev.coins + coinsEarned,
        currentLevel: Math.max(prev.currentLevel, nextLvl),
        completedLevels: updatedLevels,
        stats: newStats
      };
    });

    setActiveSelectedLevel(nextLvl);

    // Check if next level unlocked a brand new chapter with high coin bounty!
    const nextChapter = getChapterForLevel(nextLvl);
    if (nextChapter.id !== currentChapter.id && !claimedChapters.includes(nextChapter.id)) {
      setTimeout(() => {
        setNewChapterRewardModal(nextChapter);
      }, 1000);
    }

    setVictoryStats({
      level: lvl,
      time: elapsedSeconds,
      words: puzzle.words.length,
      stars: 3,
      coins: coinsEarned
    });

    setShowVictory(true);
  };

  const handleNextLevelFromVictory = () => {
    setShowVictory(false);
    const nextLvl = activeLevel + 1;
    handlePlayLevel(nextLvl);
  };

  // Select Game Mode from the 15 modes
  const handleSelectGameMode = (mode: GameModeDefinition) => {
    setSelectedGameMode(mode);
    const modeDiff: Difficulty = mode.id >= 10 ? 'expert' : mode.id >= 5 ? 'hard' : 'medium';
    setSelectedDifficulty(modeDiff);
  };

  // Claim Mission reward
  const handleClaimMission = (missionId: string, isChapterMission?: boolean) => {
    if (isChapterMission) {
      const currentList = chapterMissionsMap[currentChapter.id] || [];
      const target = currentList.find(m => m.id === missionId);
      if (!target || target.isClaimed) return;

      playVictoryFanfare(settings.soundEnabled, settings.sfxVolume);

      setProfile(prev => ({
        ...prev,
        coins: prev.coins + target.rewardCoins
      }));

      setChapterMissionsMap(prevMap => ({
        ...prevMap,
        [currentChapter.id]: prevMap[currentChapter.id].map(m =>
          m.id === missionId ? { ...m, isClaimed: true, isCompleted: true } : m
        )
      }));
    } else {
      const target = globalMissions.find(m => m.id === missionId);
      if (!target) return;

      playVictoryFanfare(settings.soundEnabled, settings.sfxVolume);

      setProfile(prev => ({
        ...prev,
        coins: prev.coins + target.rewardCoins
      }));

      setGlobalMissions(prevMissions =>
        prevMissions.map(m => (m.id === missionId ? advanceMissionTier(m) : m))
      );
    }
  };

  // Claim New Chapter Discovery High Coin Reward (+500 to +1500 coins!)
  const handleClaimChapterReward = (chapter: ChapterData) => {
    playVictoryFanfare(settings.soundEnabled, settings.sfxVolume);
    setProfile(prev => ({
      ...prev,
      coins: prev.coins + chapter.rewardCoins
    }));

    setClaimedChapters(prev => [...prev, chapter.id]);
    setNewChapterRewardModal(null);
  };


  // Hint powerup in game
  const handleUseHint = () => {
    // Logic to trigger ad for hint here
    console.log('Triggering ad for hint');
    setCurrentLevelHintsUsed(c => c + 1);
    playHintSparkle(settings.soundEnabled, settings.sfxVolume);
  };

  // Active mission to show in HomeView
  const currentChapterMissions =
    chapterMissionsMap[currentChapter.id] || generateChapterMissions(currentChapter.id, currentChapter.subtitle);

  const activeMission =
    currentChapterMissions.find(m => !m.isClaimed) ||
    globalMissions.find(m => !m.isCompleted || !m.isClaimed) ||
    currentChapterMissions[0];

  const hasUnclaimedMissions =
    currentChapterMissions.some(m => m.currentProgress >= m.targetProgress && !m.isClaimed) ||
    globalMissions.some(m => m.currentProgress >= m.targetProgress && !m.isClaimed);

  const isDailyGiftReady = isGiftAvailableToday(profile.lastClaimedGiftDate);

  // Total stars calculated across completed levels
  const totalStars = Object.values(profile.completedLevels || {}).reduce(
    (sum, lvl) => sum + (lvl?.stars || 0),
    0
  );

  // Chapter stars helper
  const getChapterStars = useCallback(
    (chapterId: number): number => {
      const chap = CHAPTERS.find(c => c.id === chapterId);
      if (!chap) return 0;
      let stars = 0;
      for (let lvl = chap.startLevel; lvl <= chap.endLevel; lvl++) {
        if (profile.completedLevels && profile.completedLevels[lvl]) {
          stars += profile.completedLevels[lvl].stars || 0;
        }
      }
      return stars;
    },
    [profile.completedLevels]
  );

  const activeNatureBg = getNatureBackgroundById(profile.activeNatureBg || 'floresta');

  const handleSelectNatureBg = useCallback((natureBgId: string) => {
    setProfile(p => ({
      ...p,
      activeNatureBg: natureBgId
    }));
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-slate-900 flex justify-center items-center overflow-hidden font-sans">
      {/* Mobile-proportioned App Viewport */}
      <div
        className="relative w-full max-w-[430px] h-[100dvh] max-h-[920px] shadow-2xl flex flex-col justify-between overflow-hidden bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: currentTab === 'shop' ? 'none' : `url(${activeNatureBg.image})`
        }}
      >
        {/* Natural atmospheric ambient overlay */}
        {currentTab !== 'shop' && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none z-0" />
        )}

        {/* VIEW 1: HOME SCREEN (Chapter em cima, 30 Fases, 30 Missões do Capítulo, Dificuldades, 15 Modos, Botão Grande) */}
        {currentTab === 'home' && (
          <HomeView
            currentLevel={profile.currentLevel || 1}
            activeSelectedLevel={activeSelectedLevel}
            coins={profile.coins}
            chapter={currentChapter}
            completedLevels={profile.completedLevels}
            difficulty={selectedDifficulty}
            selectedMode={selectedGameMode}
            activeMission={activeMission}
            hasUnclaimedMissions={hasUnclaimedMissions}
            hasDailyGiftReady={isDailyGiftReady}
            onSelectDifficulty={diff => setSelectedDifficulty(diff)}
            onSelectMode={handleSelectGameMode}
            onOpenModesModal={() => setShowGameModesModal(true)}
            onSelectLevelNode={lvl => setActiveSelectedLevel(lvl)}
            onOpenSettings={() => setShowSettings(true)}
            onOpenChapters={() => setCurrentTab('chapters')}
            onOpenRewardBoxes={() => setShowRewardBoxes(true)}
            onOpenFullShop={() => setShowFullShop(true)}
            onOpenBackgroundSelector={() => setShowBackgroundSelector(true)}
            onOpenDaily={() => setShowDaily(true)}
            onOpenMissions={() => setShowMissions(true)}
            onPlayLevel={() => handlePlayLevel(activeSelectedLevel)}
            onPlaySpecialMode={handlePlaySpecialMode}
          />
        )}

        {/* VIEW 2: GAMEPLAY SCREEN (Dynamic Brazilian Words & Multi-Difficulty Grid) */}
        {currentTab === 'game' && (
          <GameView
            levelNumber={activeLevel}
            difficulty={selectedDifficulty}
            puzzle={puzzle}
            coins={profile.coins}
            soundEnabled={settings.soundEnabled}
            activeMode={activeGameMode}
            onGoHome={() => setCurrentTab('home')}
            onOpenSettings={() => setShowSettings(true)}
            onLevelComplete={handleLevelComplete}
            onUseHint={handleUseHint}
            onUseConsumable={handleUseConsumable}
          />
        )}

        {/* VIEW 3: CHAPTERS / LEVELS MAP (25 Brazilian Chapters with 30 Levels each & High Coin Rewards) */}
        {currentTab === 'chapters' && (
          <ChaptersView
            currentLevel={profile.currentLevel || 1}
            completedLevels={profile.completedLevels}
            coins={profile.coins}
            onGoBack={() => setCurrentTab('home')}
            onSelectLevel={lvl => {
              setActiveSelectedLevel(lvl);
              handlePlayLevel(lvl);
            }}
            onOpenBackgroundSelector={() => setShowBackgroundSelector(true)}
          />
        )}
      </div>

      {/* MODAL 1: SETTINGS (Ultra-Prominent Close X + Footer Button) */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onUpdateSettings={newSettings => setSettings(s => ({ ...s, ...newSettings }))}
      />

      {/* MODAL 2: MISSIONS (30 Chapter Missions + Global Missions with High Coin Rewards) */}
      <MissionsModal
        isOpen={showMissions}
        onClose={() => setShowMissions(false)}
        globalMissions={globalMissions}
        chapterMissions={currentChapterMissions}
        currentChapter={currentChapter}
        onClaimMission={handleClaimMission}
      />

      {/* MODAL 2.5: 15 EXCLUSIVE GAME MODES SELECTION */}
      <GameModesModal
        isOpen={showGameModesModal}
        onClose={() => setShowGameModesModal(false)}
        selectedModeId={selectedGameMode.id}
        onSelectMode={handleSelectGameMode}
      />

      {/* MODAL 3: NEW CHAPTER UNLOCKED BOUNTY (High Coin Bonus: +500 to +1500 Moedas!) */}
      {newChapterRewardModal && (
        <ChapterRewardModal
          isOpen={true}
          chapter={newChapterRewardModal}
          onClaim={() => handleClaimChapterReward(newChapterRewardModal)}
        />
      )}

      {/* MODAL 4: DAILY ACTIVITIES (7-Day Gifts + Daily Challenge) */}
      <DailyHubModal
        isOpen={showDaily}
        onClose={() => setShowDaily(false)}
        lastClaimedDate={profile.lastClaimedGiftDate}
        currentStreakDay={profile.giftStreakDay}
        dailyStreak={profile.dailyStreak}
        completedDates={profile.completedDailyDates}
        language={settings.language}
        onClaimGift={(day, reward) => {
          setProfile(p => ({
            ...p,
            coins: p.coins + reward,
            lastClaimedGiftDate: new Date().toISOString().split('T')[0],
            giftStreakDay: (p.giftStreakDay % 7) + 1
          }));

          // Advance daily presence mission
          setGlobalMissions(prevMissions =>
            prevMissions.map(m => {
              if (m.category === 'streak') {
                const newP = m.currentProgress + 1;
                return { ...m, currentProgress: newP, isCompleted: newP >= m.targetProgress };
              }
              return m;
            })
          );
        }}
        onStartDailyChallenge={() => {
          setShowDaily(false);
          handlePlayLevel(profile.currentLevel || 1, 'hard');
        }}
      />

      {/* MODAL 5: VICTORY CELEBRATION */}
      <VictoryModal
        isOpen={showVictory}
        levelNumber={victoryStats.level}
        categoryTitle={puzzle.categoryTitle}
        completionTimeSeconds={victoryStats.time}
        wordsFoundCount={victoryStats.words}
        starsEarned={victoryStats.stars}
        coinsEarned={victoryStats.coins}
        language={settings.language}
        onNextLevel={handleNextLevelFromVictory}
        onReplay={() => {
          setShowVictory(false);
          handlePlayLevel(activeLevel);
        }}
      />

      {/* MODAL 6: 5 CAIXAS DE RECOMPENSA POR ANÚNCIOS (MOEDAS GRÁTIS CRESCENTES) */}
      <RewardBoxesModal
        isOpen={showRewardBoxes}
        onClose={() => setShowRewardBoxes(false)}
        onClaimCoins={handleClaimRewardCoins}
      />

      <FullShopModal
        isOpen={showFullShop}
        onClose={() => setShowFullShop(false)}
        onWatchAd={handleClaimRewardCoins}
        onClaimWithCoins={handleClaimRewardCoins}
      />

      <BackgroundSelectorModal
        isOpen={showBackgroundSelector}
        onClose={() => setShowBackgroundSelector(false)}
        totalStars={totalStars}
        activeNatureBgId={profile.activeNatureBg || 'floresta'}
        onSelectNatureBg={handleSelectNatureBg}
      />
    </div>
  );
}
