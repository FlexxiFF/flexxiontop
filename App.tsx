import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';
import SocialLinkCard from './components/SocialLinkCard';
import AdminPanel from './components/AdminPanel';
import { DEFAULT_LINKS, ICONS } from './constants';
import { UserProfile, SocialLink, ViewState } from './types';
import { generateAIBio } from './services/geminiService';
import { firebaseAuthService } from './services/firebaseAuthService';

const App: React.FC = () => {
  // Persistence Logic
  const getInitialProfile = (): UserProfile => {
    const saved = localStorage.getItem('lumina_profile');
    return saved ? JSON.parse(saved) : {
      name: 'XAVIER NOVA',
      username: 'SYSTEM_ARCHIVE_0X1',
      bio: 'SYTHESIZING DIGITAL DIMENSIONS THROUGH HIGH-FIDELITY ARCHIVECTURE.',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&h=400'
    };
  };

  const getInitialLinks = (): SocialLink[] => {
    const saved = localStorage.getItem('lumina_links');
    return saved ? JSON.parse(saved) : DEFAULT_LINKS;
  };

  // Check URL path to determine initial view state
  const getInitialView = (): ViewState => {
    const path = window.location.pathname;
    if (path.endsWith('/admin')) {
      // If trying to access admin directly, redirect to login
      return 'login';
    }
    return 'public';
  };

  const [view, setView] = useState<ViewState>(getInitialView());
  const [profile, setProfile] = useState<UserProfile>(getInitialProfile());
  const [links, setLinks] = useState<SocialLink[]>(getInitialLinks());
  
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [currentBio, setCurrentBio] = useState(profile.bio);
  const [isGenerating, setIsGenerating] = useState(false);
  const [traits, setTraits] = useState('');
  const [showRefiner, setShowRefiner] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    localStorage.setItem('lumina_profile', JSON.stringify(profile));
    setCurrentBio(profile.bio);
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('lumina_links', JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update URL when view changes
  useEffect(() => {
    if (view === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else if (view === 'public') {
      window.history.pushState({}, '', '/');
    } else if (view === 'login') {
      window.history.pushState({}, '', '/login');
    }
  }, [view]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Use default admin credentials for Firebase authentication
      // In a real implementation, you would use actual Firebase users
      // For now, we'll simulate authentication with a known admin user
      if (adminId === 'admin' && adminPass === 'admin') {
        setView('admin');
        setLoginError(false);
        window.history.pushState({}, '', '/admin');
        // Clear form fields after successful login
        setAdminId('');
        setAdminPass('');
        // Store auth state
        firebaseAuthService.setAuthenticated('admin-token');
      } else {
        setLoginError(true);
        setTimeout(() => setLoginError(false), 2000);
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  const handleRefineBio = async () => {
    if (!traits.trim()) return;
    setIsGenerating(true);
    const newBio = await generateAIBio(traits);
    const updatedBio = newBio.toUpperCase();
    setCurrentBio(updatedBio);
    setProfile(prev => ({ ...prev, bio: updatedBio }));
    setIsGenerating(false);
    setShowRefiner(false);
  };

  const activeLinks = links.filter(l => l.visible);

  return (
    <div className="min-h-screen selection:bg-cyan-500/30 overflow-hidden flex flex-col">
      <AnimatedBackground />

      {/* View Switcher Container */}
      <div className="flex-1 relative z-10 w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {view === 'public' && (
            <motion.div 
              key="public"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-[440px] w-full px-6 pt-20 pb-24 md:pt-32"
            >
              <section className="text-center mb-12">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative inline-block mb-10 group"
                >
                  <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl animate-pulse scale-110" />
                  <div className="relative p-1 rounded-full bg-gradient-to-tr from-cyan-500 via-white/10 to-purple-500 shadow-2xl overflow-hidden">
                    <img src={profile.avatar} alt={profile.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-[#010409] mix-blend-screen" />
                  </div>
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                  <h1 className="text-3xl md:text-4xl font-black tracking-[0.15em] text-white mb-2 text-glow">{profile.name}</h1>
                  <p className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase opacity-60 mb-6">{profile.username}</p>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed tracking-wider mb-8">"{currentBio}"</p>
                  
                  <div className="mt-8 flex justify-center">
                    <button onClick={() => setShowRefiner(!showRefiner)} className="relative group/btn px-6 py-2 rounded-lg glass border border-cyan-500/20 text-cyan-400 text-[10px] font-black tracking-[0.2em] uppercase hover:bg-cyan-500/10 transition-all">
                      <span className="flex items-center space-x-2">
                        <motion.span animate={showRefiner ? { rotate: 180 } : { rotate: 0 }}>{ICONS.sparkles}</motion.span>
                        <span>{showRefiner ? 'EXIT_PROTO' : 'REWRITE_SYSTEM'}</span>
                      </span>
                    </button>
                  </div>
                </motion.div>
              </section>

              <AnimatePresence>
                {showRefiner && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-12">
                    <div className="glass p-6 rounded-2xl border-cyan-500/30">
                      <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-cyan-500/70 mb-4 font-mono">&gt; TRAIT_INPUT</label>
                      <div className="flex flex-col space-y-4">
                        <input value={traits} onChange={e => setTraits(e.target.value)} placeholder="VIBE_INPUT..." className="w-full bg-black/60 border border-cyan-500/20 rounded-lg px-4 py-3 text-xs font-mono text-cyan-100" />
                        <button onClick={handleRefineBio} disabled={isGenerating || !traits.trim()} className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-black rounded-lg text-xs font-black tracking-[0.2em] uppercase transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                          {isGenerating ? 'PROCESSING...' : 'INITIALIZE'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 gap-4">
                {activeLinks.map((link, index) => <SocialLinkCard key={link.id} link={link} index={index} />)}
              </div>
            </motion.div>
          )}

          {view === 'login' && (
            <motion.div 
              key="login"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-[400px] w-full px-6 pt-40"
            >
              <div className={`glass p-8 rounded-3xl border-2 transition-colors ${loginError ? 'border-red-500/50' : 'border-cyan-500/20'}`}>
                <h2 className="text-xl font-black tracking-[0.3em] text-cyan-400 font-mono mb-8 text-center uppercase">System_Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="ACCESS_ID (try 'admin')" 
                      value={adminId}
                      onChange={e => setAdminId(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-4 text-xs font-mono text-cyan-100 focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>
                  <div>
                    <input 
                      type="password" 
                      placeholder="ACCESS_TOKEN (try 'admin')" 
                      value={adminPass}
                      onChange={e => setAdminPass(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-4 text-xs font-mono text-cyan-100 focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>
                  <button type="submit" className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-black rounded-xl text-xs font-black tracking-[0.3em] uppercase transition-all shadow-lg active:scale-95">
                    Execute_Auth
                  </button>
                  <button type="button" onClick={() => setView('public')} className="w-full py-2 text-[10px] text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
                    Abort_Access
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {view === 'admin' && (
            <motion.div key="admin" className="w-full px-6 pt-20">
              <AdminPanel 
                profile={profile} 
                links={links} 
                onUpdateProfile={(p) => setProfile(p)}
                onUpdateLinks={(l) => setLinks(l)}
                onLogout={async () => {
                  try {
                    await firebaseAuthService.signOut();
                    firebaseAuthService.setAuthenticated(null as any);
                    setView('public');
                    window.history.pushState({}, '', '/');
                  } catch (error) {
                    console.error('Logout error:', error);
                    // Even if logout fails, still redirect to public view
                    setView('public');
                    window.history.pushState({}, '', '/');
                  }
                }}
                onChangePassword={(newPassword) => {
                  // In a real Firebase implementation, you would update the password here
                  console.log('Password change attempted in Firebase auth system');
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer & Secret Access */}
      <footer className="relative z-10 mt-auto pb-10 pt-20 text-center">
        <div className="inline-block relative py-2 px-8">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <p className="text-slate-600 font-mono text-[9px] tracking-[0.5em] uppercase">Flexxi V.0</p>
        </div>
        <div className="mt-4 flex justify-center">
          <button 
            onClick={() => {
              if (view === 'admin') {
                setView('public');
                window.history.pushState({}, '', '/');
              } else {
                setView('login');
              }
            }}
            className="text-[8px] font-mono text-cyan-500/30 hover:text-cyan-500/80 transition-all tracking-[0.2em]"
          >
            {view === 'admin' ? '[DISCONNECT_UPLINK]' : '[REQUEST_ADMIN_UPLINK]'}
          </button>
        </div>
      </footer>

      {/* Holographic Floating Data */}
      <div className="fixed top-10 left-10 pointer-events-none opacity-20 hidden lg:block text-[10px] font-mono text-cyan-400 space-y-1">
        <p>X_COORD: {mousePos.x.toFixed(0)}</p>
        <p>Y_COORD: {mousePos.y.toFixed(0)}</p>
        <p>UPLINK: {view.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default App;
