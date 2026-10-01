import React, { useState } from 'react';
import { X, Mail, Lock, User, LogIn, UserPlus, Sparkles, ShieldCheck, Globe } from 'lucide-react';
import { 
  auth, 
  db, 
  googleProvider, 
  handleFirestoreError, 
  OperationType 
} from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  updateProfile 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserProfile } from '../types/game';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profile: UserProfile, username: string, email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        if (!username.trim()) {
          setError('Por favor, informe seu nome de usuário.');
          setLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: username });

        // Create initial user profile in Firestore
        const path = `users/${user.uid}`;
        const initialProfile: UserProfile & { uid: string; username: string; email: string; updatedAt: string } = {
          uid: user.uid,
          username,
          email: user.email || email,
          coins: 200,
          stars: 0,
          currentLevel: 1,
          completedLevels: {},
          chapterBackgrounds: {},
          bgMode: 'nature',
          activeNatureBg: 'floresta',
          lastDailyDate: '',
          dailyStreak: 0,
          completedDailyDates: [],
          lastClaimedGiftDate: '',
          giftStreakDay: 1,
          unlockedThemes: ['classic'],
          currentTheme: 'classic',
          unlockedHighlighters: ['amber'],
          currentHighlighter: 'amber',
          unlockedLetterStyles: ['standard'],
          currentLetterStyle: 'standard',
          unlockedAvatars: ['default'],
          currentAvatar: 'default',
          achievements: {},
          stats: {
            puzzlesSolved: 0,
            wordsFound: 0,
            hintsUsed: 0,
            bestStreak: 0,
            currentStreak: 0,
            timePlayedSeconds: 0
          },
          updatedAt: new Date().toISOString()
        };

        try {
          await setDoc(doc(db, 'users', user.uid), initialProfile);
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, path);
        }

        onLoginSuccess(initialProfile, username, user.email || email);
        onClose();
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const path = `users/${user.uid}`;
        let userProfile: UserProfile | null = null;
        let fetchedUsername = user.displayName || username || 'Jogador';
        let fetchedEmail = user.email || email;

        try {
          const docSnap = await getDoc(doc(db, 'users', user.uid));
          if (docSnap.exists()) {
            const data = docSnap.data() as any;
            userProfile = data as UserProfile;
            if (data.username) fetchedUsername = data.username;
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, path);
        }

        if (!userProfile) {
          // If profile document doesn't exist yet, create default
          userProfile = {
            coins: 200,
            stars: 0,
            currentLevel: 1,
            completedLevels: {},
            chapterBackgrounds: {},
            bgMode: 'nature',
            activeNatureBg: 'floresta',
            lastDailyDate: '',
            dailyStreak: 0,
            completedDailyDates: [],
            lastClaimedGiftDate: '',
            giftStreakDay: 1,
            unlockedThemes: ['classic'],
            currentTheme: 'classic',
            unlockedHighlighters: ['amber'],
            currentHighlighter: 'amber',
            unlockedLetterStyles: ['standard'],
            currentLetterStyle: 'standard',
            unlockedAvatars: ['default'],
            currentAvatar: 'default',
            achievements: {},
            stats: {
              puzzlesSolved: 0,
              wordsFound: 0,
              hintsUsed: 0,
              bestStreak: 0,
              currentStreak: 0,
              timePlayedSeconds: 0
            }
          };
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            username: fetchedUsername,
            email: fetchedEmail,
            ...userProfile,
            updatedAt: new Date().toISOString()
          });
        }

        onLoginSuccess(userProfile, fetchedUsername, fetchedEmail);
        onClose();
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      let msg = err.message || 'Ocorreu um erro na autenticação.';
      if (msg.includes('invalid-credential') || msg.includes('user-not-found') || msg.includes('wrong-password')) {
        msg = 'Email ou senha incorretos.';
      } else if (msg.includes('email-already-in-use')) {
        msg = 'Este email já está cadastrado.';
      } else if (msg.includes('weak-password')) {
        msg = 'A senha deve ter pelo menos 6 caracteres.';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const fetchedUsername = user.displayName || 'Jogador Google';
      const fetchedEmail = user.email || '';

      const path = `users/${user.uid}`;
      let userProfile: UserProfile | null = null;

      try {
        const docSnap = await getDoc(doc(db, 'users', user.uid));
        if (docSnap.exists()) {
          userProfile = docSnap.data() as UserProfile;
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, path);
      }

      if (!userProfile) {
        userProfile = {
          coins: 250,
          stars: 0,
          currentLevel: 1,
          completedLevels: {},
          chapterBackgrounds: {},
          bgMode: 'nature',
          activeNatureBg: 'floresta',
          lastDailyDate: '',
          dailyStreak: 0,
          completedDailyDates: [],
          lastClaimedGiftDate: '',
          giftStreakDay: 1,
          unlockedThemes: ['classic'],
          currentTheme: 'classic',
          unlockedHighlighters: ['amber'],
          currentHighlighter: 'amber',
          unlockedLetterStyles: ['standard'],
          currentLetterStyle: 'standard',
          unlockedAvatars: ['default'],
          currentAvatar: 'default',
          achievements: {},
          stats: {
            puzzlesSolved: 0,
            wordsFound: 0,
            hintsUsed: 0,
            bestStreak: 0,
            currentStreak: 0,
            timePlayedSeconds: 0
          }
        };
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          username: fetchedUsername,
          email: fetchedEmail,
          ...userProfile,
          updatedAt: new Date().toISOString()
        });
      }

      onLoginSuccess(userProfile, fetchedUsername, fetchedEmail);
      onClose();
    } catch (err: any) {
      console.error('Google Auth error:', err);
      setError('Erro ao entrar com Google. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn select-none">
      <div className="bg-slate-900 border-2 border-amber-500/80 rounded-3xl w-full max-w-sm flex flex-col shadow-2xl overflow-hidden text-white">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 flex items-center justify-between text-slate-950">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-base uppercase tracking-wide text-white">
                {isRegister ? 'Criar Nova Conta' : 'Entrar na Conta'}
              </h3>
              <p className="text-[11px] text-amber-100 font-medium">
                {isRegister ? 'Salve seu progresso na nuvem' : 'Sua pontuação e moedas seguras'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-medium text-center animate-shake">
              {error}
            </div>
          )}

          {isRegister && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                Nome de Usuário
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Ex: MestreDasPalavras"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Senha
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-display font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50 transition-all active:scale-98 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : isRegister ? (
              <>
                <UserPlus className="w-4 h-4 stroke-[2.5]" />
                <span>Cadastrar Conta</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 stroke-[2.5]" />
                <span>Entrar</span>
              </>
            )}
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-[10px] uppercase font-bold tracking-wider">ou</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-display font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
          >
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Continuar com Google</span>
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-amber-400 hover:underline font-medium cursor-pointer"
            >
              {isRegister ? 'Já tem uma conta? Entre aqui' : 'Não tem conta? Cadastre-se grátis'}
            </button>
          </div>
        </form>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-white/10 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Seus dados salvos em segurança na nuvem do Google Firebase</span>
        </div>
      </div>
    </div>
  );
};
