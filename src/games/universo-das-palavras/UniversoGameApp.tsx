import React, { useState, useEffect, useCallback } from 'react';
import { HomeView } from '../../components/HomeView';
import { GameView } from '../../components/GameView';
import { ChaptersView } from '../../components/ChaptersView';
import { SettingsModal } from '../../components/SettingsModal';
import { DailyHubModal } from '../../components/DailyHubModal';
import { MissionsModal } from '../../components/MissionsModal';
import { ChapterRewardModal } from '../../components/ChapterRewardModal';
import { VictoryModal } from '../../components/VictoryModal';
import { RewardBoxesModal } from '../../components/RewardBoxesModal';
import { FullShopModal } from '../../components/FullShopModal';
import { BackgroundSelectorModal } from '../../components/BackgroundSelectorModal';
import { CHAPTERS, ChapterData, getChapterForLevel, getChapterById } from '../../data/chapters';
import { Difficulty, GameSettings, PuzzleData, UserProfile } from '../../types/game';
import { loadUserProfile, saveUserProfile, loadGameSettings, saveGameSettings } from '../../utils/storage';
import { generatePuzzle } from '../../utils/puzzleGenerator';
import { playVictoryFanfare, playWordFoundChime, playHintSparkle, toggleAmbientMusic } from '../../utils/audio';
import { GLOBAL_MISSIONS, Mission, advanceMissionTier, generateChapterMissions } from '../../data/missions';
import { isGiftAvailableToday } from '../../data/dailyGifts';
import { GAME_MODES, GameModeDefinition, ConsumableItem } from '../../data/gameModes';
import { GameModesModal } from '../../components/GameModesModal';
import { getNatureBackgroundById } from '../../data/natureBackgrounds';
import { ArrowLeft, Gamepad2, Home } from 'lucide-react';

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
  return [1];
}

interface UniversoGameAppProps {
  onBackToPortal: () => void;
}

export const UniversoGameApp: React.FC<UniversoGameAppProps> = ({ onBackToPortal }) => {
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
    const lvl = profile.currentLevel || 1;
    const chap = getChapterForLevel(lvl);
    const seed = 1000 + lvl * 47;
    return generatePuzzle(chap.themeCategory, 'medium', seed, lvl);
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
    words: 0,
    stars: 3,
    coins: 50
  });

  // Save chapter missions map when updated
  useEffect(() => {
    try {
      localStorage.setItem(CHAPTER_MISSIONS_KEY, JSON.stringify(chapterMissionsMap));
    } catch (e) {
      console.error(e);
    }
  }, [chapterMissionsMap]);

  // Save global missions when updated
  useEffect(() => {
    try {
      localStorage.setItem(GLOBAL_MISSIONS_KEY, JSON.stringify(globalMissions));
    } catch (e) {
      console.error(e);
    }
  }, [globalMissions]);

  // Save claimed chapters
  useEffect(() => {
    try {
      localStorage.setItem(CLAIMED_CHAPTERS_KEY, JSON.stringify(claimedChapters));
    } catch (e) {
      console.error(e);
    }
  }, [claimedChapters]);

  // Update chapter whenever active selected level changes
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

      const newPuzzle = generatePuzzle(chap.themeCategory, diff, seed, lvl);

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
      const lvl = profile.currentLevel || 1;
      const chap = getChapterForLevel(lvl);
      const seed = 1000 + lvl * 47;
      const newPuzzle = generatePuzzle(chap.themeCategory, 'medium', seed, lvl);

      setActiveLevel(lvl);
      setActiveSelectedLevel(lvl);
      setCurrentChapter(chap);
      setPuzzle(newPuzzle);
      setCurrentLevelHintsUsed(0);
      setCurrentTab('game');
    },
    [profile.currentLevel]
  );

  // Choose a game mode from the 15 modes modal
  const handleSelectGameMode = (mode: GameModeDefinition) => {
    setSelectedGameMode(mode);
    setShowGameModesModal(false);
  };

  // Change cosmic wallpaper
  const handleSelectNatureBg = (bgId: string) => {
    setProfile(prev => ({
      ...prev,
      activeNatureBg: bgId,
      bgMode: 'nature'
    }));
  };

  // Level completed victory logic
  const handleLevelComplete = useCallback(
    (level: number, timeSpent: number) => {
      const earnedCoins = 30 + Math.floor(Math.random() * 20);
      const earnedStars = timeSpent < 90 ? 3 : timeSpent < 160 ? 2 : 1;

      // Update chapter discovery bonus check
      const nextLvl = level + 1;
      const nextChap = getChapterForLevel(nextLvl);
      const isNewChapterUnlocked =
        nextChap.id !== currentChapter.id && !claimedChapters.includes(nextChap.id);

      setProfile(prev => {
        const updatedLevels = {
          ...(prev.completedLevels || {}),
          [level]: {
            stars: Math.max(prev.completedLevels?.[level]?.stars || 0, earnedStars),
            time: timeSpent
          }
        };

        const newLvl = Math.max(prev.currentLevel || 1, nextLvl);

        return {
          ...prev,
          coins: prev.coins + earnedCoins,
          currentLevel: newLvl,
          completedLevels: updatedLevels,
          stats: {
            ...prev.stats,
            puzzlesSolved: (prev.stats?.puzzlesSolved || 0) + 1,
            wordsFound: (prev.stats?.wordsFound || 0) + puzzle.words.length,
            timePlayedSeconds: (prev.stats?.timePlayedSeconds || 0) + timeSpent
          }
        };
      });

      // Advance chapter missions for current chapter
      setChapterMissionsMap(prevMap => {
        const cMissions =
          prevMap[currentChapter.id] ||
          generateChapterMissions(currentChapter.id, currentChapter.subtitle);

        const updated = cMissions.map(m => {
          let add = 0;
          if (m.category === 'chapter' || m.category === 'levels') add = 1;
          if (m.category === 'words') add = puzzle.words.length;
          if (m.category === 'hints' && currentLevelHintsUsed === 0) add = 1;

          if (add > 0) {
            const nextP = m.currentProgress + add;
            return {
              ...m,
              currentProgress: nextP,
              isCompleted: nextP >= m.targetProgress
            };
          }
          return m;
        });

        return { ...prevMap, [currentChapter.id]: updated };
      });

      // Advance global missions
      setGlobalMissions(prevMissions =>
        prevMissions.map(m => {
          let add = 0;
          if (m.category === 'levels') add = 1;
          if (m.category === 'words') add = puzzle.words.length;

          if (add > 0) {
            const nextP = m.currentProgress + add;
            return {
              ...m,
              currentProgress: nextP,
              isCompleted: nextP >= m.targetProgress
            };
          }
          return m;
        })
      );

      setVictoryStats({
        level,
        time: timeSpent,
        words: puzzle.words.length,
        stars: earnedStars,
        coins: earnedCoins
      });

      setShowVictory(true);

      // Check if new chapter unlock bounty modal should show
      if (isNewChapterUnlocked) {
        setTimeout(() => {
          setNewChapterRewardModal(nextChap);
        }, 1200);
      }
    },
    [currentChapter, claimedChapters, currentLevelHintsUsed, puzzle.words.length]
  );

  // Transition from victory to next level
  const handleNextLevelFromVictory = () => {
    setShowVictory(false);
    const next = activeLevel + 1;
    handlePlayLevel(next);
  };

  // Consume in-game item or powerup
  const handleUseConsumable = (item: ConsumableItem): boolean => {
    if (profile.coins < item.coinsCost) {
      setShowFullShop(true);
      return false;
    }
    setProfile(prev => ({
      ...prev,
      coins: prev.coins - item.coinsCost
    }));
    return true;
  };

  // Claim Mission Reward (Chapter or Global) with High Coin Rewards
  const handleClaimMission = (missionId: string, isChapter: boolean) => {
    if (isChapter) {
      const cMissions = chapterMissionsMap[currentChapter.id] || [];
      const target = cMissions.find(m => m.id === missionId);
      if (!target) return;

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

  // Dynamic Background: Nature Photo or Classic Theme
  const activeBg = getNatureBackgroundById(profile.activeNatureBg || 'floresta');

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-slate-950 font-body">
      {/* Dynamic Cosmic / Nature Photo Background with subtle overlay */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: `url(${activeBg.image})`,
          filter: 'brightness(0.72) saturate(1.15)'
        }}
      />

      {/* Ambient gradient overlay */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none transition-colors duration-700"
        style={{
          background: `radial-gradient(circle at 50% 15%, transparent 15%, rgba(10, 15, 30, 0.75) 85%)`
        }}
      />

      {/* TOP PORTAL NAVIGATION BAR (Allows returning to DECIX GAMES portal at any time) */}
      <div className="relative z-30 w-full bg-slate-950/80 backdrop-blur-md border-b border-white/10 px-4 py-2 flex items-center justify-between">
        <button
          onClick={onBackToPortal}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Portal DECIX</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-white uppercase tracking-wider hidden sm:inline">
            DECIX GAMES · Caça-Palavras
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-mono">
            Nível {profile.currentLevel || 1}
          </span>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 w-full max-w-md flex-1 flex flex-col items-center justify-between p-2 sm:p-4">
        {/* VIEW 1: HOME VIEW (Dashboard, Missions, 15 Exclusive Modes & Fast Play) */}
        {currentTab === 'home' && (
          <HomeView
            currentLevel={profile.currentLevel || 1}
            activeSelectedLevel={activeSelectedLevel}
            coins={profile.coins}
            chapter={currentChapter}
            completedLevels={profile.completedLevels || {}}
            difficulty={selectedDifficulty}
            selectedMode={selectedGameMode}
            activeMission={activeMission}
            hasUnclaimedMissions={hasUnclaimedMissions}
            hasDailyGiftReady={isDailyGiftReady}
            onSelectDifficulty={setSelectedDifficulty}
            onSelectMode={setSelectedGameMode}
            onOpenModesModal={() => setShowGameModesModal(true)}
            onSelectLevelNode={(lvl) => handlePlayLevel(lvl)}
            onOpenSettings={() => setShowSettings(true)}
            onOpenChapters={() => setCurrentTab('chapters')}
            onOpenDaily={() => setShowDaily(true)}
            onOpenMissions={() => setShowMissions(true)}
            onOpenRewardBoxes={() => setShowRewardBoxes(true)}
            onOpenFullShop={() => setShowFullShop(true)}
            onOpenBackgroundSelector={() => setShowBackgroundSelector(true)}
            onPlayLevel={() => handlePlayLevel()}
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

      {/* MODAL 1: SETTINGS */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onUpdateSettings={newSettings => setSettings(s => ({ ...s, ...newSettings }))}
      />

      {/* MODAL 2: MISSIONS */}
      <MissionsModal
        isOpen={showMissions}
        onClose={() => setShowMissions(false)}
        globalMissions={globalMissions}
        chapterMissions={currentChapterMissions}
        currentChapter={currentChapter}
        onClaimMission={(missionId: string, isChapter?: boolean) => handleClaimMission(missionId, !!isChapter)}
      />

      {/* MODAL 2.5: 15 EXCLUSIVE GAME MODES SELECTION */}
      <GameModesModal
        isOpen={showGameModesModal}
        onClose={() => setShowGameModesModal(false)}
        selectedModeId={selectedGameMode.id}
        onSelectMode={handleSelectGameMode}
      />

      {/* MODAL 3: NEW CHAPTER UNLOCKED BOUNTY */}
      {newChapterRewardModal && (
        <ChapterRewardModal
          isOpen={true}
          chapter={newChapterRewardModal}
          onClaim={() => handleClaimChapterReward(newChapterRewardModal)}
        />
      )}

      {/* MODAL 4: DAILY ACTIVITIES */}
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

      {/* MODAL 6: 5 CAIXAS DE RECOMPENSA */}
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
};
