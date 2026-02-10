
import React from 'react';
import { LINEAGES } from '../constants';
import * as Icons from 'lucide-react';
import NanoImage from './NanoImage';

// Added interface to support isEditMode prop
interface ClassesViewProps {
  isEditMode?: boolean;
}

const ClassesView: React.FC<ClassesViewProps> = ({ isEditMode = false }) => {
  return (
    <div className="min-h-screen animate-in fade-in duration-700 bg-[#020202]">
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="font-gothic text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter">
            GENETIC <span className="text-antique-gold">MATRIX</span>
          </h1>
          <div className="h-px w-32 bg-antique-gold mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-500 text-sm font-tech tracking-[0.4em] uppercase leading-relaxed">
            Accessing phenotypic data for known lineages in the Pandora sector. Identity verification required.
          </p>
        </div>

        <div className="space-y-32">
          {LINEAGES.map((lineage, index) => {
            const IconComponent = (Icons as any)[lineage.icon];
            const isEven = index % 2 === 0;
            return (
              <div key={lineage.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
                <div className="lg:w-1/2 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent opacity-20 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative border border-white/10 p-2 bg-black overflow-hidden">
                    <NanoImage 
                      prompt={`A cinematic portrait of a ${lineage.name} character in a dark university setting, powerful and mysterious atmosphere, high contrast`}
                      fallbackUrl={`https://images.unsplash.com/photo-1514467950401-643a60a71f00?auto=format&fit=crop&q=80&w=800`}
                      className="w-full aspect-video lg:aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-6 left-6 flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-black/80 backdrop-blur border border-white/20" style={{ color: lineage.color }}>
                        {IconComponent && <IconComponent size={24} />}
                      </div>
                      <span className="font-tech text-white text-[10px] tracking-[0.5em] uppercase">Ref: {lineage.id}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 space-y-8">
                  <h2 className="font-gothic text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter" style={{ textShadow: `0 0 20px ${lineage.color}33` }}>
                    {lineage.name}
                  </h2>
                  <div className="p-8 border border-white/5 bg-white/[0.02] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: lineage.color }}></div>
                    <p className="text-gray-400 text-xl font-light leading-relaxed italic mb-8">
                      "{lineage.description}"
                    </p>
                    <div className="space-y-4 font-tech text-[10px] tracking-widest text-gray-500 uppercase">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Genetic Stability</span>
                        <span className="text-white">Variable</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Occult Potential</span>
                        <span className="text-white">Class AAA</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Societal Influence</span>
                        <span className="text-white">High Priority</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-10 py-4 bg-white text-black font-tech text-[10px] font-black uppercase tracking-[0.3em] hover:bg-antique-gold transition-colors">
                    Access Ability Tree
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ClassesView;
