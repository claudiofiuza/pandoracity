
import React, { useEffect, useState } from 'react';
import HomeView from './components/HomeView';
import LoreView from './components/LoreView';
import ClassesView from './components/ClassesView';
import UniversityView from './components/UniversityView';
import Footer from './components/Footer';
import LoreKeeper from './components/LoreKeeper';

export type ViewTab = 'home' | 'lore' | 'classes' | 'university';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ViewTab>('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Scroll to top when tab changes
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [activeTab]);

  const renderView = () => {
    switch (activeTab) {
      case 'lore': return <LoreView />;
      case 'classes': return <ClassesView />;
      case 'university': return <UniversityView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden selection:bg-antique-gold selection:text-black">
      {/* Custom Cursor */}
      <div 
        className="fixed w-8 h-8 border border-antique-gold pointer-events-none z-[9999] rounded-sm transition-transform duration-75 mix-blend-difference flex items-center justify-center"
        style={{ transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)` }}
      >
        <div className="w-1 h-1 bg-antique-gold rounded-full"></div>
      </div>

      <nav className="fixed top-0 w-full z-[100] px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 bg-gradient-to-b from-black via-black/80 to-transparent backdrop-blur-sm border-b border-white/5">
        <div 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => setActiveTab('home')}
        >
          <div className="w-10 h-10 border-2 border-antique-gold rotate-45 flex items-center justify-center group-hover:bg-antique-gold transition-all duration-500">
            <span className="font-gothic text-antique-gold group-hover:text-black -rotate-45 font-black text-xl">P</span>
          </div>
          <div className="font-gothic font-black tracking-[0.2em] text-lg hidden sm:block">
            PANDORA <span className="text-antique-gold">CITY</span>
          </div>
        </div>
        
        <div className="hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`hover:text-antique-gold transition-all py-2 border-b-2 ${activeTab === 'home' ? 'border-antique-gold text-white' : 'border-transparent'}`}
          >
            DATABASE
          </button>
          <button 
            onClick={() => setActiveTab('lore')} 
            className={`hover:text-antique-gold transition-all py-2 border-b-2 ${activeTab === 'lore' ? 'border-antique-gold text-white' : 'border-transparent'}`}
          >
            CITY LORE
          </button>
          <button 
            onClick={() => setActiveTab('classes')} 
            className={`hover:text-antique-gold transition-all py-2 border-b-2 ${activeTab === 'classes' ? 'border-antique-gold text-white' : 'border-transparent'}`}
          >
            GENETICS
          </button>
          <button 
            onClick={() => setActiveTab('university')} 
            className={`hover:text-antique-gold transition-all py-2 border-b-2 ${activeTab === 'university' ? 'border-antique-gold text-white' : 'border-transparent'}`}
          >
            INSTITUTION
          </button>
        </div>

        <button className="px-6 py-2 border border-antique-gold text-antique-gold text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-antique-gold hover:text-black transition-all rounded-sm font-tech">
          CONNECT DISCORD
        </button>
      </nav>

      <div className="relative z-10 pt-20">
        {renderView()}
      </div>
      
      <Footer setActiveTab={setActiveTab} />
      <LoreKeeper />
    </div>
  );
};

export default App;
