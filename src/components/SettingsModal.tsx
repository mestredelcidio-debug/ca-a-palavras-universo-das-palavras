import React, { useState } from 'react';
import { X, Volume2, Music, FileText, HelpCircle, Globe, Check, ArrowLeft } from 'lucide-react';
import { GameSettings, SupportedLanguage } from '../types/game';
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

  if (!isOpen) return null;

  const t = getTranslation(settings.language || 'pt');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-[340px] rounded-3xl bg-white text-slate-800 shadow-2xl overflow-hidden border border-white/40 flex flex-col animate-scaleUp">
        {/* Header matching Screenshot 3 */}
        <div className="relative bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-400 py-3.5 px-4 text-center shadow-md">
          {subView !== 'main' ? (
            <button
              onClick={() => setSubView('main')}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/30 text-white flex items-center justify-center active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : null}

          <h3 className="font-display font-black text-lg text-white tracking-wide uppercase drop-shadow-sm">
            {subView === 'language' ? 'IDIOMA' : subView === 'privacy' ? 'PRIVACIDADE' : subView === 'support' ? 'SUPORTE' : 'CONFIGURAÇÕES'}
          </h3>

          <button
            onClick={() => {
              setSubView('main');
              onClose();
            }}
            className="absolute -top-2.5 -right-2.5 w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-sky-400 text-white flex items-center justify-center shadow-lg border-2 border-white hover:scale-105 active:scale-95 transition-all"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Modal Body */}
        {subView === 'main' && (
          <div className="p-5 flex flex-col gap-3.5 bg-amber-50/20">
            {/* Som Toggle */}
            <div className="flex items-center justify-between px-3 py-1">
              <div className="flex items-center gap-3">
                <Volume2 className="w-6 h-6 text-slate-800" />
                <span className="font-display font-black text-sm tracking-wide text-slate-800">
                  SOM
                </span>
              </div>
              <button
                onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`w-13 h-7 rounded-full transition-colors relative p-0.5 shadow-inner ${
                  settings.soundEnabled ? 'bg-sky-400' : 'bg-slate-300'
                }`}
                style={{ width: '52px' }}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform transform ${
                    settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Música Toggle */}
            <div className="flex items-center justify-between px-3 py-1">
              <div className="flex items-center gap-3">
                <Music className="w-6 h-6 text-slate-800" />
                <span className="font-display font-black text-sm tracking-wide text-slate-800">
                  MÚSICA
                </span>
              </div>
              <button
                onClick={() => onUpdateSettings({ musicEnabled: !settings.musicEnabled })}
                className={`w-13 h-7 rounded-full transition-colors relative p-0.5 shadow-inner ${
                  settings.musicEnabled ? 'bg-sky-400' : 'bg-slate-300'
                }`}
                style={{ width: '52px' }}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform transform ${
                    settings.musicEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Política de Privacidade Button */}
            <button
              onClick={() => setSubView('privacy')}
              className="w-full h-11 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-500 hover:to-cyan-500 text-white font-display font-black text-xs tracking-wider flex items-center justify-center gap-2.5 shadow-md shadow-sky-400/30 active:scale-98 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>POLÍTICA DE PRIVACIDADE</span>
            </button>

            {/* Formulário de Suporte Button */}
            <button
              onClick={() => setSubView('support')}
              className="w-full h-11 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-500 hover:to-cyan-500 text-white font-display font-black text-xs tracking-wider flex items-center justify-center gap-2.5 shadow-md shadow-sky-400/30 active:scale-98 transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              <span>FORMULÁRIO DE SUPORTE</span>
            </button>

            {/* Idioma Button */}
            <button
              onClick={() => setSubView('language')}
              className="w-full h-11 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-500 hover:to-cyan-500 text-white font-display font-black text-xs tracking-wider flex items-center justify-center gap-2.5 shadow-md shadow-sky-400/30 active:scale-98 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>IDIOMA ({SUPPORTED_LANGUAGES.find(l => l.id === settings.language)?.nativeName || 'Português'})</span>
            </button>

            {/* Footer Version Info */}
            <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400 font-bold px-2">
              <span>E5356FA</span>
              <span>4.6.0</span>
            </div>
          </div>
        )}

        {/* SubView: Language Selection (10 Languages requested by user) */}
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
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all active:scale-98 ${
                    isSelected
                      ? 'bg-sky-50 border-sky-400 text-sky-700 shadow-sm'
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
              Este jogo valoriza a privacidade dos jogadores. Seus dados de progresso e níveis completados são mantidos com total segurança no seu próprio navegador através do armazenamento local (LocalStorage).
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
              Precisa de ajuda com alguma fase ou encontrou algum problema? Fale com a nossa equipe de suporte pelo email de atendimento.
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
