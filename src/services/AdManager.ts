import { registerPlugin } from '@capacitor/core';

export interface StartIoPluginBridge {
  showRewarded(): Promise<{ rewarded: boolean }>;
  showInterstitial(): Promise<{ success: boolean }>;
  loadBanner(): Promise<{ success: boolean }>;
  hideBanner(): Promise<{ success: boolean }>;
}

const StartIoAds = registerPlugin<StartIoPluginBridge>('StartIoPlugin');

export class AdManager {
  private static instance: AdManager;
  private isNative: boolean = false;

  private constructor() {
    this.isNative = typeof window !== 'undefined' && !!(window as any).Capacitor && (window as any).Capacitor.isNativePlatform();
  }

  public static getInstance(): AdManager {
    if (!AdManager.instance) {
      AdManager.instance = new AdManager();
    }
    return AdManager.instance;
  }

  public async showRewarded(placement: 'rewarded_coins' | 'rewarded_powerup' | 'rewarded_revive' = 'rewarded_coins'): Promise<{ rewarded: boolean }> {
    try {
      if (this.isNative) {
        const result = await StartIoAds.showRewarded();
        return { rewarded: !!(result && result.rewarded) };
      } else {
        console.log(`[Start.io Web Preview] Simulação de vídeo recompensado (${placement}) - App ID: 209408840`);
        const confirmed = window.confirm('[Start.io Web Simulation] Assistir ao vídeo recompensado para resgatar sua recompensa?');
        return { rewarded: confirmed };
      }
    } catch (err) {
      console.error('Erro ao exibir anúncio recompensado Start.io:', err);
      return { rewarded: false };
    }
  }

  public async showInterstitial(placement: 'level_transition' | 'defeat' = 'level_transition'): Promise<boolean> {
    try {
      if (this.isNative) {
        const res = await StartIoAds.showInterstitial();
        return !!(res && res.success);
      } else {
        console.log(`[Start.io Web Preview] Interstitial (${placement})`);
        return true;
      }
    } catch (err) {
      console.error('Erro ao exibir interstitial Start.io:', err);
      return false;
    }
  }

  public async loadBanner(): Promise<void> {
    try {
      if (this.isNative) {
        await StartIoAds.loadBanner();
      }
    } catch (err) {
      console.error('Erro ao carregar banner Start.io:', err);
    }
  }

  public async hideBanner(): Promise<void> {
    try {
      if (this.isNative) {
        await StartIoAds.hideBanner();
      }
    } catch (err) {
      console.error('Erro ao ocultar banner Start.io:', err);
    }
  }
}
