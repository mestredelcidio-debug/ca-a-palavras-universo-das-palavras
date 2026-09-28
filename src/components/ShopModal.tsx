import React, { useState } from 'react';
import { X, Palette, User, Gift, Coins, Check } from 'lucide-react';
import { THEMES, AVATARS } from '../data/themes';
import { UserProfile } from '../types/game';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSelectTheme: (themeId: string) => void;
  onBuyTheme: (themeId: string, price: number) => void;
  onSelectAvatar: (avatarId: string) => void;
  onBuyAvatar: (avatarId: string, price: number) => void;
  onClaimDailyReward: () => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSelectTheme,
  onBuyTheme,
  onSelectAvatar,
  onBuyAvatar,
  onClaimDailyReward
}) => {
  const [tab, setTab] = useState<'themes' | 'avatars' | 'coins'>('themes');
  const [freeRewardClaimed, setFreeRewardClaimed] = useState(false);

  if (!isOpen) return null;

  const handleClaim = () => {
    onClaimDailyReward();
    setFreeRewardClaimed(true);
    setTimeout(() => setFreeRewardClaimed(false), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-emerald-500/30 p-5 shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-400">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">Loja & Personalização</h3>
              <p className="text-[11px] text-amber-300 font-semibold flex items-center gap-1">
                Saldo: <span className="tabular-nums font-bold">{profile.coins}</span> moedas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl my-3 shrink-0">
          <button
            onClick={() => setTab('themes')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              tab === 'themes' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-white/60 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Temas</span>
          </button>
          <button
            onClick={() => setTab('avatars')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              tab === 'avatars' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-white/60 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Avatares</span>
          </button>
          <button
            onClick={() => setTab('coins')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              tab === 'coins' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-white/60 hover:text-white'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Moedas Grátis</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
          {tab === 'themes' && (
            <div className="space-y-2.5">
              {THEMES.map(theme => {
                const isUnlocked = profile.unlockedThemes.includes(theme.id);
                const isEquipped = profile.currentTheme === theme.id;
                const canAfford = profile.coins >= theme.price;

                return (
                  <div
                    key={theme.id}
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 hover:border-white/20 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{theme.name}</span>
                        {isEquipped && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Equipado
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/60 mt-0.5">{theme.description}</p>
                    </div>

                    <div className="shrink-0">
                      {isEquipped ? (
                        <button
                          disabled
                          className="px-3 py-1.5 rounded-xl bg-white/10 text-white/50 text-xs font-bold"
                        >
                          Ativo
                        </button>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => onSelectTheme(theme.id)}
                          className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold active:scale-95 transition-all"
                        >
                          Usar
                        </button>
                      ) : (
                        <button
                          onClick={() => onBuyTheme(theme.id, theme.price)}
                          disabled={!canAfford}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 active:scale-95 transition-all ${
                            canAfford
                              ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-400/20'
                              : 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed'
                          }`}
                        >
                          <Coins className="w-3.5 h-3.5" />
                          <span>{theme.price}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab === 'avatars' && (
            <div className="grid grid-cols-2 gap-2.5">
              {AVATARS.map(avatar => {
                const isUnlocked = profile.unlockedAvatars.includes(avatar.id);
                const isEquipped = profile.currentAvatar === avatar.id;
                const canAfford = profile.coins >= avatar.price;

                return (
                  <div
                    key={avatar.id}
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center gap-2 hover:border-white/20 transition-all"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white/10 flex items-center justify-center shadow-inner relative">
                      {avatar.imagePath ? (
                        <img
                          src={avatar.imagePath}
                          alt={avatar.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-3xl">{avatar.emoji}</span>
                      )}
                      {isEquipped && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="font-bold text-xs text-white">{avatar.name}</div>
                      <p className="text-[10px] text-white/50 leading-tight mt-0.5 line-clamp-1">
                        {avatar.description}
                      </p>
                    </div>

                    <div className="w-full mt-auto">
                      {isEquipped ? (
                        <button
                          disabled
                          className="w-full py-1 rounded-lg bg-white/10 text-white/40 text-[11px] font-bold"
                        >
                          Em uso
                        </button>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => onSelectAvatar(avatar.id)}
                          className="w-full py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold active:scale-95 transition-all"
                        >
                          Escolher
                        </button>
                      ) : (
                        <button
                          onClick={() => onBuyAvatar(avatar.id, avatar.price)}
                          disabled={!canAfford}
                          className={`w-full py-1 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-all ${
                            canAfford
                              ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                              : 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed'
                          }`}
                        >
                          <Coins className="w-3 h-3" />
                          <span>{avatar.price}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab === 'coins' && (
            <div className="space-y-3 p-1">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 text-center">
                <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-2">
                  <Gift className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">Recompensa Bônus</h4>
                <p className="text-xs text-white/70 mb-4">
                  Colete moedas gratuitas para usar em dicas durante os quebra-cabeças!
                </p>
                <button
                  onClick={handleClaim}
                  disabled={freeRewardClaimed}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    freeRewardClaimed
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-400/20 active:scale-98'
                  }`}
                >
                  {freeRewardClaimed ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>+50 Moedas Recebidas!</span>
                    </>
                  ) : (
                    <>
                      <Coins className="w-4 h-4" />
                      <span>Resgatar +50 Moedas Grátis</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-white/40 text-center px-4">
                Jogo 100% gratuito e sem cobranças reais. Todas as moedas são obtidas jogando e conquistando fases!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
