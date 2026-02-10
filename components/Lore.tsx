
import React, { useState, useEffect } from 'react';
import NanoImage from './NanoImage';
import { cmsService } from '../services/cmsService';
import EditableText from './EditableText';

interface LoreProps {
  isEditMode?: boolean;
}

const Lore: React.FC<LoreProps> = ({ isEditMode = false }) => {
  const [content, setContent] = useState(cmsService.getContent());

  useEffect(() => {
    const updateCms = () => setContent(cmsService.getContent());
    window.addEventListener('cms-update', updateCms);
    return () => window.removeEventListener('cms-update', updateCms);
  }, []);

  return (
    <section className="py-32 px-4 relative bg-black overflow-hidden">
      <div className="absolute -left-20 top-0 w-96 h-96 bg-night-purple/10 blur-[150px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 relative group order-2 lg:order-1">
            <div className="absolute -inset-2 bg-gradient-to-r from-antique-gold to-purple-600 opacity-20 blur-2xl group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl">
              <NanoImage 
                prompt="Cinematic dark university campus at night with purple neon windows, GTA RP style"
                fallbackUrl={content.loreImageUrl}
                className="w-full h-[600px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <h4 className="font-tech text-antique-gold text-xs tracking-widest uppercase mb-2">Internal File #1892</h4>
                <p className="text-white text-2xl font-gothic italic">"As salas de aula são apenas o começo da sua jornada."</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-antique-gold"></div>
              <span className="font-tech text-xs tracking-[0.5em] text-antique-gold uppercase">The Institution</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-gothic font-black text-white mb-8 leading-none uppercase">
              <EditableText cmsKey="loreTitle" isEditMode={isEditMode} />
            </h2>
            
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light">
              <div className="p-1">
                <EditableText cmsKey="loreText" isEditMode={isEditMode} multiline />
              </div>
              
              <div className="pt-8 grid grid-cols-2 gap-4">
                <div className="p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-sm">
                  <div className="text-antique-gold font-tech text-3xl mb-1">24/7</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Cidade Viva</div>
                </div>
                <div className="p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-sm">
                  <div className="text-antique-gold font-tech text-3xl mb-1">HARD</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Economy Style</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Lore;
