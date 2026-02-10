
import React, { useEffect, useState } from 'react';
import HomeView from './components/HomeView';
import LoreView from './components/LoreView';
import ClassesView from './components/ClassesView';
import UniversityView from './components/UniversityView';
import UpdatesView from './components/UpdatesView';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import { Lock, LogOut, Settings, Edit3, Eye } from 'lucide-react';
import { User } from './types';

export type ViewTab = 'home' | 'lore' | 'classes' | 'university' | 'updates' | 'admin';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ViewTab>('home');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('pandora_logged_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    window.scrollTo(0, 0);

    return () => observer.disconnect();
  }, [activeTab]);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('pandora_logged_user', JSON.stringify(u));
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsEditMode(false);
    localStorage.removeItem('pandora_logged_user');
    setActiveTab('home');
  };

  const renderView = () => {
    switch (activeTab) {
      case 'lore': return <LoreView isEditMode={isEditMode} />;
      case 'classes': return <ClassesView isEditMode={isEditMode} />;
      case 'university': return <UniversityView isEditMode={isEditMode} />;
      case 'updates': return <UpdatesView user={user} />;
      case 'admin': return <AdminDashboard user={user} />;
      default: return <HomeView isEditMode={isEditMode} />;
    }
  };

  return (
    <div className={`min-h-screen bg-black overflow-x-hidden selection:bg-antique-gold selection:text-black ${isEditMode ? 'edit-active' : ''}`}>
      <nav className="fixed top-0 w-full z-[100] px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 bg-gradient-to-b from-black via-black/80 to-transparent backdrop-blur-sm border-b border-white/5">
        <div 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => setActiveTab('home')}
        >
          <div className="w-10 h-10 border-2 border-antique-gold rotate-45 flex items-center justify-center group-hover:bg-antique-gold transition-all duration-500">
            <span className="font-gothic text-antique-gold group-hover:text-black -rotate-45 font-black text-xl">P</span>
          </div>
          <div className="font-gothic font-black tracking-[0.2em] text-lg hidden sm:block text-white">
            PANDORA <span className="text-antique-gold">CITY</span>
          </div>
        </div>
        
        <div className="hidden lg:flex gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
          {['home', 'lore', 'classes', 'university', 'updates'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as ViewTab)} 
              className={`hover:text-antique-gold transition-all py-2 border-b-2 ${activeTab === tab ? 'border-antique-gold text-white' : 'border-transparent'}`}
            >
              {tab === 'home' ? 'DATABASE' : tab === 'classes' ? 'GENETICS' : tab === 'university' ? 'INSTITUTION' : tab.toUpperCase()}
            </button>
          ))}
          {user && (
            <button 
              onClick={() => setActiveTab('admin')}
              className={`text-antique-gold transition-all py-2 border-b-2 flex items-center gap-2 ${activeTab === 'admin' ? 'border-antique-gold' : 'border-transparent'}`}
            >
              <Settings size={14} /> PAINEL
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <button 
              onClick={() => setIsEditMode(!isEditMode)}
              className={`flex items-center gap-2 px-3 py-1.5 border transition-all text-[9px] font-tech uppercase tracking-widest rounded-sm ${isEditMode ? 'bg-antique-gold text-black border-antique-gold' : 'border-white/10 text-white/50 hover:text-white'}`}
            >
              {isEditMode ? <><Eye size={12} /> Visualizar</> : <><Edit3 size={12} /> Editar Textos</>}
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-tech text-gray-500 uppercase tracking-widest hidden sm:block">Welcome, {user.username}</span>
              <button onClick={handleLogout} className="p-2 text-red-500 hover:bg-red-500/10 transition-colors rounded-sm">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button className="px-6 py-2 border border-antique-gold text-antique-gold text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-antique-gold hover:text-black transition-all rounded-sm font-tech">
              CONNECT DISCORD
            </button>
          )}
        </div>
      </nav>

      <div className="relative z-10 pt-20">
        {renderView()}
      </div>
      
      <Footer setActiveTab={setActiveTab} />

      {/* Admin Login Padlock */}
      <div className="fixed bottom-6 left-6 z-[200]">
        {!user && (
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="p-3 bg-black/50 backdrop-blur-md border border-white/10 text-white/20 hover:text-antique-gold hover:border-antique-gold transition-all rounded-full shadow-2xl"
            title="Administração"
          >
            <Lock size={20} />
          </button>
        )}
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />

      <style>{`
        .cursor-edit { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gold" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>'), auto; }
        .edit-active .group-hover\\/editable:opacity-100 { pointer-events: auto; }
      `}</style>
    </div>
  );
};

export default App;
