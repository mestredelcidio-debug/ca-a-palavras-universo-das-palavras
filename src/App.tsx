import React, { useState, useEffect, useCallback } from 'react';
import { HomeView } from './components/HomeView';
import { GameView } from './components/GameView';
import { ChaptersView } from './components/ChaptersView';
import { ShopView } from './components/ShopView';
import { SettingsModal } from './components/SettingsModal';
import { DailyHubModal } from './components/DailyHubModal';
import { VictoryModal } from './components/VictoryModal';
import { UserProfile, GameSettings } from './types/game';
import { loadUserProfile, saveUserProfile, loadGameSettings, saveGameSettings } from './utils/storage';
import { playVictoryFanfare, playWordFoundChime } from './utils/audio';
import beachBg from './assets/images/beach_paradise_bg_1790595434475.jpg';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => loadUserProfile());
  const [settings, setSettings] = useState<GameSettings>(() => loadGameSettings());

  // Navigation tab: 'home' | 'game' | 'chapters' | 'shop'
  const [currentTab, setCurrentTab] = useState<'home' | 'game' | 'chapters' | 'shop'>('home');
  const [activeLevel, setActiveLevel] = useState<number>(profile.currentLevel || 2);

  // Modals
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showDaily, setShowDaily] = useState<boolean>(false);
  const [showVictory, setShowVictory] = useState<boolean>(false);
  const [victoryStats, setVictoryStats] = useState({
    level: 2,
    time: 0,
    words: 5,
    stars: 3,
    coins: 50
  });

  // Save changes
  useEffect(() => {
    saveUserProfile(profile);
  }, [profile]);

  useEffect(() => {
    saveGameSettings(settings);
  }, [settings]);

  // Audio effects
  const handlePlayLevel = (lvl?: number) => {
    const targetLvl = lvl ?? profile.currentLevel ?? 2;
    setActiveLevel(targetLvl);
    setCurrentTab('game');
  };

  const handleLevelComplete = (lvl: number, elapsedSeconds: number) => {
    playVictoryFanfare(settings.soundEnabled, settings.sfxVolume);

    const coinsEarned = 50;
    const nextLvl = lvl + 1;

    setProfile(prev => ({
      ...prev,
      coins: prev.coins + coinsEarned,
      currentLevel: Math.max(prev.currentLevel, nextLvl),
      completedLevels: {
        ...prev.completedLevels,
        [lvl]: { stars: 3, time: elapsedSeconds }
      }
    }));

    setVictoryStats({
      level: lvl,
      time: elapsedSeconds,
      words: 5,
      stars: 3,
      coins: coinsEarned
    });

    setShowVictory(true);
  };

  const handleNextLevelFromVictory = () => {
    setShowVictory(false);
    setActiveLevel(prev => prev + 1);
    setCurrentTab('game');
  };

  const handleClaimOffer = (amount: number) => {
    playWordFoundChime(settings.soundEnabled, settings.sfxVolume);
    setProfile(prev => ({
      ...prev,
      coins: prev.coins + amount
    }));
  };

  // Chapter progress calculations
  const totalLevelsInChapter = 3;
  const currentChapterLevelIndex = Math.min(Math.max(activeLevel, 1), 3);
  const progressPercent = Math.round((currentChapterLevelIndex / totalLevelsInChapter) * 100);

  return (
    <div className="relative w-full min-h-screen bg-slate-900 flex justify-center items-center overflow-hidden font-sans">
      {/* Mobile-proportioned App Container */}
      <div
        className="relative w-full max-w-[430px] h-[100dvh] max-h-[920px] shadow-2xl flex flex-col justify-between overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: currentTab === 'shop' ? 'none' : `url(${beachBg})`
        }}
      >
        {/* Soft tropical ambient overlay on beach view */}
        {currentTab !== 'shop' && (
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400/20 via-transparent to-amber-100/20 pointer-events-none z-0" />
        )}

        {/* VIEW 1: HOME SCREEN (Screenshot 1) */}
        {currentTab === 'home' && (
          <HomeView
            currentLevel={profile.currentLevel || 2}
            coins={profile.coins}
            chapterTitle="Mar: Capítulo 1"
            levelProgressText={`${Math.min(profile.currentLevel || 2, 3)}/3`}
            progressPercent={progressPercent}
            onOpenSettings={() => setShowSettings(true)}
            onOpenChapters={() => setCurrentTab('chapters')}
            onOpenShop={() => setCurrentTab('shop')}
            onOpenDaily={() => setShowDaily(true)}
            onPlayLevel={() => handlePlayLevel(profile.currentLevel || 2)}
          />
        )}

        {/* VIEW 2: GAMEPLAY SCREEN (Screenshot 2) */}
        {currentTab === 'game' && (
          <GameView
            levelNumber={activeLevel}
            coins={profile.coins}
            soundEnabled={settings.soundEnabled}
            onGoHome={() => setCurrentTab('home')}
            onOpenSettings={() => setShowSettings(true)}
            onOpenShop={() => setCurrentTab('shop')}
            onLevelComplete={handleLevelComplete}
            onUseHint={() => {
              if (profile.coins >= 25) {
                setProfile(p => ({ ...p, coins: p.coins - 25 }));
                playWordFoundChime(settings.soundEnabled, settings.sfxVolume);
              } else {
                setCurrentTab('shop');
              }
            }}
          />
        )}

        {/* VIEW 3: CHAPTERS / LEVELS MAP (Screenshot 4) */}
        {currentTab === 'chapters' && (
          <ChaptersView
            currentLevel={profile.currentLevel || 2}
            coins={profile.coins}
            onGoBack={() => setCurrentTab('home')}
            onOpenShop={() => setCurrentTab('shop')}
            onSelectLevel={lvl => handlePlayLevel(lvl)}
          />
        )}

        {/* VIEW 4: SHOP (Screenshot 5) */}
        {currentTab === 'shop' && (
          <ShopView
            coins={profile.coins}
            onGoBack={() => setCurrentTab('home')}
            onClaimOffer={handleClaimOffer}
          />
        )}
      </div>

      {/* MODAL 1: SETTINGS (Screenshot 3) */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onUpdateSettings={newSettings => setSettings(s => ({ ...s, ...newSettings }))}
      />

      {/* MODAL 2: DAILY ACTIVITIES */}
      <DailyHubModal
        isOpen={showDaily}
        onClose={() => setShowDaily(false)}
        lastClaimedDate={profile.lastClaimedGiftDate}
        currentStreakDay={profile.giftStreakDay}
        dailyStreak={profile.dailyStreak}
        completedDates={profile.completedDailyDates}
        language={settings.language}
        onClaimGift={(day, reward) => {
          setProfile(p => ({ ...p, coins: p.coins + reward }));
        }}
        onStartDailyChallenge={() => {
          setShowDaily(false);
          handlePlayLevel(2);
        }}
      />

      {/* MODAL 3: VICTORY CELEBRATION */}
      <VictoryModal
        isOpen={showVictory}
        levelNumber={victoryStats.level}
        categoryTitle="CELEBRAÇÃO"
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
    </div>
  );
}
