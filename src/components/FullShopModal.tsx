import React from 'react';
import { X, Play, Coins, ShoppingBag, Zap, Target, Book, Lightbulb, Shield, Glasses, Compass, Scissors, Sun, Search, Sparkles, Snowflake, Award } from 'lucide-react';
import { IN_GAME_POWERUPS } from '../data/inGamePowerups';
import { GAME_MODES } from '../data/gameModes';

interface FullShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWatchAd: (reward: string) => void;
  onClaimWithCoins: (item: string) => void;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Zap': return Zap;
    case 'Target': return Target;
    case 'Book': return Book;
    case 'Lightbulb': return Lightbulb;
    case 'Shield': return Shield;
    case 'Glasses': return Glasses;
    case 'Compass': return Compass;
    case 'Scissors': return Scissors;
    case 'Sun': return Sun;
    case 'Search': return Search;
    case 'Sparkles': return Sparkles;
    case 'Snowflake': return Snowflake;
    case 'Award': return Award;
    default: return ShoppingBag;
  }
};

export const FullShopModal: React.FC<FullShopModalProps> = ({ isOpen, onClose, onWatchAd, onClaimWithCoins }) => {
  if (!isOpen) return null;

  const adRewards = [100, 150, 200, 300, 400, 500, 700, 1000, 1500, 2500];

  const allItems = [
    ...IN_GAME_POWERUPS.map((p, i) => ({ 
      ...p, 
      type: 'Consumível', 
      adReward: `+${(i + 1) * 2} unidades`,
      coinsCost: 20 + (i * 10) 
    })),
    ...GAME_MODES.flatMap(m => m.uniqueItems.map((u, i) => ({ 
      ...u, 
      type: `Modo: ${m.shortName}`, 
      adReward: `+${i + 1} unidade`,
      coinsCost: 25 + (i * 5) 
    }))),
    ...adRewards.map((reward, i) => ({
      name: `Pacote de Moedas ${i + 1}`,
      description: `Ganhe moedas grátis para usar na loja!`,
      type: 'Moedas',
      adReward: `+${reward} Moedas`,
      coinsCost: 0,
      iconName: 'Coins'
    }))
  ];

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-3xl w-full max-w-lg p-6 border-2 border-amber-500 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-3">
            <ShoppingBag className="text-amber-400" /> Loja Grátis
          </h2>
          <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"><X size={24}/></button>
        </div>
        
        <div className="overflow-y-auto space-y-4 pr-1">
          {allItems.map((item, idx) => {
            const Icon = getIcon(item.iconName);
            return (
              <div key={idx} className="bg-slate-800 p-4 rounded-2xl flex items-center gap-4 border border-white/10 shadow-inner">
                <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center border-2 border-amber-500/30 text-amber-400 shrink-0">
                  <Icon size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-white text-base">{item.name}</h3>
                  <p className="text-xs text-slate-300 mb-1">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">{item.type}</span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{item.adReward}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => onWatchAd(item.name)} className="bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-xl text-xs font-black text-white flex items-center gap-1.5 active:scale-95 transition-all">
                    <Play size={14} /> AD
                  </button>
                  {item.coinsCost > 0 && (
                    <button onClick={() => onClaimWithCoins(item.name)} className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-xl text-xs font-black text-white flex items-center gap-1.5 active:scale-95 transition-all">
                      <Coins size={14} /> {item.coinsCost}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
