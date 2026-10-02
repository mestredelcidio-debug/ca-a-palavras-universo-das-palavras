/**
 * Google H5 Games Ads Manager
 * Handles Rewarded and Interstitial ads using the adBreak/adConfig SDK.
 */

interface AdBreakOptions {
  type: 'reward' | 'interstitial' | 'preroll' | 'next';
  name: string;
  beforeAd?: () => void;
  afterAd?: () => void;
  adBreakDone?: (placementInfo: any) => void;
  beforeReward?: (showAdFn: () => void) => void;
  adDismissed?: () => void;
  adViewed?: () => void;
}

declare global {
  interface Window {
    adBreak: (o: AdBreakOptions) => void;
    adConfig: (o: any) => void;
    adsbygoogle: any[];
  }
}

/**
 * Triggers a Rewarded Ad.
 * @param rewardName Name of the placement/reward
 * @param onReward Callback triggered when user completes the ad
 * @param onClosed Callback triggered when ad is closed (regardless of completion)
 */
export function showRewardedAd(
  rewardName: string,
  onReward: () => void,
  onClosed?: () => void
) {
  if (typeof window.adBreak !== 'function') {
    console.warn('Google AdBreak SDK not loaded. Simulating reward for development.');
    onReward();
    return;
  }

  window.adBreak({
    type: 'reward',
    name: rewardName,
    beforeAd: () => {
      // Pause game and audio
      console.log('Ad starting: pausing game...');
      document.dispatchEvent(new CustomEvent('app:pause_audio'));
    },
    afterAd: () => {
      // Resume game and audio
      console.log('Ad finished: resuming game...');
      document.dispatchEvent(new CustomEvent('app:resume_audio'));
      if (onClosed) onClosed();
    },
    beforeReward: (showAdFn) => {
      // User triggered the reward, now show the ad
      showAdFn();
    },
    adViewed: () => {
      // User successfully viewed the ad
      console.log('Ad viewed successfully: granting reward.');
      onReward();
    },
    adDismissed: () => {
      console.log('Ad dismissed by user.');
    },
    adBreakDone: (placementInfo) => {
      console.log('Ad break done:', placementInfo);
    }
  });
}

/**
 * Triggers an Interstitial Ad (for level transitions, etc.)
 */
export function showInterstitialAd(placementName: string, onDone?: () => void) {
  if (typeof window.adBreak !== 'function') {
    console.warn('Google AdBreak SDK not loaded. Skipping interstitial.');
    if (onDone) onDone();
    return;
  }

  window.adBreak({
    type: 'next',
    name: placementName,
    beforeAd: () => {
      document.dispatchEvent(new CustomEvent('app:pause_audio'));
    },
    afterAd: () => {
      document.dispatchEvent(new CustomEvent('app:resume_audio'));
      if (onDone) onDone();
    }
  });
}
