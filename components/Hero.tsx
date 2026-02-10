
import React, { useState, useEffect } from 'react';
import { ChevronDown, Play } from 'lucide-center';
import { cmsService, DEFAULT_CONTENT } from '../services/cmsService';
import EditableText from './EditableText';
import { SiteContent } from '../types';
import { ChevronDown as ChevronDownIcon, Play as PlayIcon } from 'lucide-react';

interface HeroProps {
  isEditMode?: boolean;
}

const Hero: React.FC<HeroProps> = ({ isEditMode = false }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await cmsService.getContent();
      setContent(data);
    };
    fetchContent();

    const updateCms = async () => {
      const data = await cmsService.getContent();
      setContent(data);
    };
    
    window.addEventListener('cms-update', updateCms);
    
    const calculateTime = () => {
      const target = new Date(content.bloodMoonDate).getTime();
      const now = new Date().getTime();
      const difference = Math.max(0, Math.floor((target - now) / 1000));
      setTimeLeft(difference);
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => {
      clearInterval(timer);
      window.removeEventListener('cms-update', updateCms);
    };
  }, [content.bloodMoonDate]);

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "EVENT ACTIVE";
    const d = Math.floor(seconds / (3600*24));
    const h = Math.floor((seconds % (3600*24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${d}d ${h}h ${m}m ${s}s`;
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img 
          src={content.heroImageUrl} 
          alt="Landing Background" 
          className="w-full h-full object-cover filter brightness-[0.4] contrast-125 scale-110 animate-slow-zoom"
        />
      </div>

      <div className="absolute bottom-32 right-12 z-40 hidden xl:flex flex-col items-end">
        <span className="text-[10px] font-tech text-antique-gold uppercase tracking-[0.5em] mb-2">Próximo Evento Pandora</span>
        <div className="text-3xl font-tech text-white font-black">{formatTime(timeLeft)}</div>
        <div className="h-[2px] w-24 bg-antique-gold/30 mt-2"></div>
      </div>

      <div className="relative z-30 text-center px-4 max-w-7xl">
        <div className="mb-6 mx-auto w-fit">
          <div className="typewriter font-mono-rp text-antique-gold text-lg md:text-2xl uppercase tracking-[0.2em]">
            [Incoming Encrypted Transmission_]
          </div>
        </div>
        
        <h1 className="text-7xl md:text-[10rem] lg:text-[12rem] font-gothic font-black leading-none tracking-tighter drop-shadow-2xl">
          <div className="glitch text-white inline-block" data-text={content.heroTitle}>
            <EditableText cmsKey="heroTitle" isEditMode={isEditMode} />
          </div>
          {content.heroTitleSuffix && (
            <>
              <br/>
              <div className="glitch text-antique-gold glow-text-gold inline-block" data-text={content.heroTitleSuffix}>
                <EditableText cmsKey="heroTitleSuffix" isEditMode={isEditMode} />
              </div>
            </>
          )}
        </h1>

        <div className="mt-6 text-gray-400 font-tech text-[10px] tracking-[0.4em] uppercase max-w-lg mx-auto">
          <EditableText cmsKey="heroSubtitle" isEditMode={isEditMode} multiline />
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
          <button className="px-12 py-5 bg-antique-gold text-black font-tech font-bold uppercase tracking-[0.3em] text-xs hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] rounded-sm">
            SOLICITAR WHITELIST
          </button>
          <button className="px-12 py-5 border border-white/20 font-tech text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-white hover:border-antique-gold transition-all group flex items-center gap-3 bg-black/40 backdrop-blur-sm">
            <PlayIcon size={12} className="group-hover:fill-current" /> DATABASE INTRO
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center gap-2 z-30 animate-bounce cursor-pointer opacity-30">
        <span className="text-[10px] font-tech tracking-[0.4em] text-antique-gold">Decifrar Sombras</span>
        <ChevronDownIcon size={20} className="text-antique-gold" />
      </div>

      <style>{`
        @keyframes slow-zoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .animate-slow-zoom { animation: slow-zoom 20s linear infinite alternate; }
      `}</style>
    </section>
  );
};

export default Hero;
