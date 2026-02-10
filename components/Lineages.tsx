
import React, { useState, useEffect } from 'react';
import { cmsService } from '../services/cmsService';
import { Lineage } from '../types';
import * as Icons from 'lucide-react';
import NanoImage from './NanoImage';

const Lineages: React.FC = () => {
  const [lineages, setLineages] = useState<Lineage[]>([]);

  useEffect(() => {
    const load = async () => {
      const content = await cmsService.getContent();
      setLineages(JSON.parse(content.lineages || '[]'));
    };
    load();
    window.addEventListener('cms-update', load);
    return () => window.removeEventListener('cms-update', load);
  }, []);

  return (
    <section id="linhagens" className="py-32 px-4 relative bg-[#050505] overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/10 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-8xl font-gothic font-black text-white mb-6 uppercase tracking-tight reveal">
            GENETIC <span className="text-antique-gold italic">DATABASE</span>
          </h2>
          <p className="text-gray-500 font-tech text-[10px] tracking-[0.5em] uppercase">Selection process initiated. Access restricted.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {lineages.map((lineage) => {
            const IconComponent = (Icons as any)[lineage.icon] || Icons.Zap;
            return (
              <div key={lineage.id} className="card-3d h-[550px] w-full">
                <div className="card-inner w-full h-full">
                  <div className="card-front absolute inset-0 group overflow-hidden rounded-sm border border-white/10 bg-black flex flex-col justify-end">
                    <div className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-700">
                      <NanoImage 
                        prompt={`Shadowy cinematic silhouette of a ${lineage.name} in a dark urban environment, GTA RP style`}
                        fallbackUrl="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e"
                        className="w-full h-full"
                        overlay={true}
                      />
                    </div>
                    
                    <div className="relative z-20 p-8">
                      <div className="mb-6 w-14 h-14 flex items-center justify-center rounded-sm bg-black/80 border border-white/10" style={{ color: lineage.color }}>
                        <IconComponent size={28} />
                      </div>
                      <h3 className="text-4xl font-gothic font-black mb-4 text-white tracking-widest leading-none">
                        {lineage.name.toUpperCase()}
                      </h3>
                      <div className="h-[2px] w-12 bg-antique-gold mb-4"></div>
                      <div className="text-[10px] font-tech text-gray-400 uppercase tracking-[0.3em]">Hover to decrypt details</div>
                    </div>
                    <div className="absolute top-8 right-6 vertical-text font-tech text-[10px] text-white/10 group-hover:text-antique-gold/40 tracking-[0.5em] transition-colors">
                      DATABASE_REF: {lineage.name.toUpperCase()}
                    </div>
                  </div>

                  <div className="card-back absolute inset-0 p-10 flex flex-col justify-start border-2 border-antique-gold bg-[#080808] rounded-sm shadow-[inset_0_0_50px_rgba(212,175,55,0.05)]">
                    <div className="flex items-center gap-3 mb-8">
                       <div className="w-2 h-2 rounded-full bg-antique-gold animate-pulse"></div>
                       <h4 className="font-tech text-antique-gold text-[10px] tracking-[0.4em] uppercase">Genotype Analysis</h4>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-gray-300 text-base leading-relaxed italic font-serif-italic mb-10 border-l border-antique-gold/30 pl-4 py-2">
                        "{lineage.description}"
                      </p>
                      <div className="space-y-8">
                        {Object.entries(lineage.stats).map(([key, val]) => (
                          <div key={key} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-tech text-gray-500 uppercase tracking-widest">{key}</span>
                              <span className="text-[10px] font-tech text-antique-gold">{val}%</span>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-antique-gold shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all duration-1000" style={{ width: `${val}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-10 pt-6 border-t border-white/5 text-center">
                       <div className="text-[9px] font-tech text-gray-600 uppercase tracking-[0.2em]">Pandora Genetic Research Group</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`.vertical-text { writing-mode: vertical-rl; transform: rotate(180deg); }`}</style>
    </section>
  );
};

export default Lineages;
