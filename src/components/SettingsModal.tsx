import React, { useState, useEffect } from 'react';
import { X, Volume2, Music, FileText, HelpCircle, Globe, Check, ArrowLeft, LogOut } from 'lucide-react';
import { GameSettings } from '../types/game';
import { SUPPORTED_LANGUAGES, getTranslation } from '../data/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  const [subView, setSubView] = useState<'main' | 'language' | 'privacy' | 'support'>('main');

  const handleClose = () => {
    setSubView('main');
    onClose();
  };

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const t = getTranslation(settings.language || 'pt');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-[370px] rounded-3xl bg-white text-slate-800 shadow-2xl overflow-hidden border-2 border-white/80 flex flex-col animate-scaleUp relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with High-Contrast, Ultra-Visible Close Button */}
        <div className="relative bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-600 py-3.5 px-4 text-center shadow-md flex items-center justify-between">
          {/* Back button when inside subviews */}
          {subView !== 'main' ? (
            <button
              onClick={() => setSubView('main')}
              className="w-9 h-9 rounded-full bg-white/25 hover:bg-white/40 text-white flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
            </button>
          ) : (
            <div className="w-9" />
          )}

          <h3 className="font-display font-black text-base sm:text-lg text-white tracking-widest uppercase drop-shadow-sm flex-1 text-center">
            {subView === 'language'
              ? 'IDIOMA'
              : subView === 'privacy'
              ? 'PRIVACIDADE'
              : subView === 'support'
              ? 'SUPORTE'
              : 'CONFIGURAÇÕES'}
          </h3>

          {/* Super Prominent, Red/Amber Close Button with strong border and drop-shadow */}
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-90 text-white flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-rose-300 transition-all cursor-pointer"
            aria-label="Fechar Configurações"
            title="Fechar Configurações"
          >
            <X className="w-5 h-5 stroke-[3.5]" />
          </button>
        </div>

        {/* Modal Body */}
        {subView === 'main' && (
          <div className="p-5 flex flex-col gap-3.5 bg-amber-50/20">
            {/* Som Toggle */}
            <div className="flex items-center justify-between px-3 py-1 bg-white/80 rounded-2xl p-2 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                  <Volume2 className="w-5 h-5" />
                </div>
                <span className="font-display font-black text-xs sm:text-sm tracking-wide text-slate-800">
                  EFEITOS SONOROS
                </span>
              </div>
              <button
                onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`w-13 h-7 rounded-full transition-colors relative p-0.5 shadow-inner cursor-pointer ${
                  settings.soundEnabled ? 'bg-sky-500' : 'bg-slate-300'
                }`}
                style={{ width: '52px' }}
                aria-label={settings.soundEnabled ? 'Desativar som' : 'Ativar som'}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform transform ${
                    settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Música Toggle */}
            <div className="flex items-center justify-between px-3 py-1 bg-white/80 rounded-2xl p-2 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Music className="w-5 h-5" />
                </div>
                <span className="font-display font-black text-xs sm:text-sm tracking-wide text-slate-800">
                  MÚSICA AMBIENTE
                </span>
              </div>
              <button
                onClick={() => onUpdateSettings({ musicEnabled: !settings.musicEnabled })}
                className={`w-13 h-7 rounded-full transition-colors relative p-0.5 shadow-inner cursor-pointer ${
                  settings.musicEnabled ? 'bg-sky-500' : 'bg-slate-300'
                }`}
                style={{ width: '52px' }}
                aria-label={settings.musicEnabled ? 'Desativar música' : 'Ativar música'}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform transform ${
                    settings.musicEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Idioma Button */}
            <button
              onClick={() => setSubView('language')}
              className="w-full h-11 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-display font-black text-xs tracking-wider flex items-center justify-center gap-2.5 shadow-md shadow-sky-500/25 active:scale-98 transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>IDIOMA ({SUPPORTED_LANGUAGES.find(l => l.id === settings.language)?.nativeName || 'Português'})</span>
            </button>

            {/* Política de Privacidade Button */}
            <button
              onClick={() => setSubView('privacy')}
              className="w-full h-11 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-display font-black text-xs tracking-wider flex items-center justify-center gap-2.5 shadow-md shadow-sky-500/25 active:scale-98 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>POLÍTICA DE PRIVACIDADE</span>
            </button>

            {/* Formulário de Suporte Button */}
            <button
              onClick={() => setSubView('support')}
              className="w-full h-11 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-display font-black text-xs tracking-wider flex items-center justify-center gap-2.5 shadow-md shadow-sky-500/25 active:scale-98 transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>FORMULÁRIO DE SUPORTE</span>
            </button>

            {/* Prominent Footer Close Button - Impossible to miss! */}
            <button
              onClick={handleClose}
              className="w-full h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-display font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all cursor-pointer mt-1"
            >
              <LogOut className="w-4 h-4 text-rose-400 rotate-180" />
              <span>FECHAR CONFIGURAÇÕES</span>
            </button>

            {/* Footer Version Info */}
            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 font-bold px-2">
              <span>CAÇA-PALAVRAS BRASIL</span>
              <span>v4.8.0</span>
            </div>
          </div>
        )}

        {/* SubView: Language Selection */}
        {subView === 'language' && (
          <div className="p-4 max-h-[380px] overflow-y-auto space-y-1.5">
            {SUPPORTED_LANGUAGES.map(lang => {
              const isSelected = settings.language === lang.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => {
                    onUpdateSettings({ language: lang.id });
                    setSubView('main');
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all active:scale-98 cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50 border-sky-400 text-sky-700 shadow-sm ring-1 ring-sky-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{lang.flag}</span>
                    <div className="text-left">
                      <div className="font-bold">{lang.nativeName}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{lang.name}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-sky-500 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        )}

        {/* SubView: Privacy Policy */}
        {subView === 'privacy' && (
          <div className="p-4 text-xs text-slate-600 space-y-2 max-h-[320px] overflow-y-auto">
            <h4 className="font-bold text-slate-800 text-sm">Política de Privacidade</h4>
            <p>
              Este jogo valoriza a privacidade dos jogadores. Seus dados de progresso e níveis completados são mantidos com total segurança no seu próprio dispositivo através do armazenamento local.
            </p>
            <p>
              Não coletamos informações pessoais identificáveis sem seu consentimento expresso.
            </p>
          </div>
        )}

        {/* SubView: Support */}
        {subView === 'support' && (
          <div className="p-4 text-xs text-slate-600 space-y-2.5 text-center">
            <HelpCircle className="w-8 h-8 text-sky-500 mx-auto" />
            <h4 className="font-bold text-slate-800 text-sm">Central de Ajuda</h4>
            <p>
              Precisa de ajuda com alguma fase ou tem alguma sugestão para o jogo? Fale conosco!
            </p>
            <div className="p-2.5 rounded-xl bg-sky-50 text-sky-700 font-mono text-[11px] font-bold">
              suporte@cacapalavrasbrasil.com
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
