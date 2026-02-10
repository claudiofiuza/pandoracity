
import React, { useState, useEffect } from 'react';
import { cmsService } from '../services/cmsService';
import { Fraternity } from '../types';
import NanoImage from './NanoImage';

const FraternitiesSection: React.FC = () => {
  const [fraternities, setFraternities] = useState<Fraternity[]>([]);

  useEffect(() => {
    const load = async () => {
      const content = await cmsService.getContent();
      setFraternities(JSON.parse(content.fraternities || '[]'));
    };
    load();
    window.addEventListener('cms-update', load);
    return () => window.removeEventListener('cms-update', load);
  }, []);

  return (
    <section className="py-32 px-4 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-gothic font-black text-white mb-4 uppercase">SOCIEDADES <span className="text-blue-500">SECRETAS</span></h2>
          <div className="h-1 w-32 bg-blue-600"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden">
          {fraternities.map((frat) => (
            <div key={frat.id} className="group relative h-[500px] overflow-hidden bg-[#080808] p-10 flex flex-col justify-end">
              <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-all duration-700 scale-105 group-hover:scale-110">
                <NanoImage prompt={`Gothic university fraternity interior for ${frat.name}`} fallbackUrl={frat.imageUrl} className="w-full h-full" />
              </div>
              <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-4">
                <div className="text-blue-500 font-tech text-[10px] tracking-[0.5em] mb-4 uppercase">Raça: {frat.name}</div>
                <h3 className="text-3xl font-gothic text-white mb-6 uppercase tracking-widest">{frat.example}</h3>
                <div className="p-4 bg-black/60 border-l-2 border-blue-600 backdrop-blur-sm">
                   <p className="text-gray-400 font-mono-rp text-lg">{frat.facade}</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="text-white/20 font-tech text-[40px] font-black italic">#{frat.id.slice(-2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FraternitiesSection;
