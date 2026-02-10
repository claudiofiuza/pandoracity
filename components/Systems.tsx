
import React, { useState, useEffect } from 'react';
import { Shield, Zap, Trophy, Car } from 'lucide-react';
import NanoImage from './NanoImage';
import { cmsService } from '../services/cmsService';
import EditableText from './EditableText';

interface SystemsProps {
  isEditMode?: boolean;
}

const Systems: React.FC<SystemsProps> = ({ isEditMode = false }) => {
  const [content, setContent] = useState(cmsService.getContent());

  useEffect(() => {
    const updateCms = () => setContent(cmsService.getContent());
    window.addEventListener('cms-update', updateCms);
    return () => window.removeEventListener('cms-update', updateCms);
  }, []);

  return (
    <section id="sistemas" className="bg-black relative overflow-hidden py-32">
      <div className="max-w-7xl mx-auto px-4 mb-24">
         <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-xl">
               <h2 className="text-6xl md:text-8xl font-gothic font-black text-white leading-tight uppercase">LIVE <span className="text-antique-gold">DASHBOARD</span></h2>
               <p className="text-gray-500 font-tech text-[10px] tracking-[0.5em] mt-4 uppercase">Real-time telemetry and criminal records.</p>
            </div>
            <div className="flex gap-4">
               <div className="px-6 py-4 bg-white/5 border border-white/10 flex items-center gap-4">
                  <Trophy className="text-antique-gold" size={24} />
                  <div>
                     <div className="text-[9px] font-tech text-gray-500 uppercase">Season 4 Leader</div>
                     <div className="text-sm font-tech text-white">X_VAMPIRE_01</div>
                  </div>
               </div>
               <div className="px-6 py-4 bg-white/5 border border-white/10 flex items-center gap-4">
                  <Car className="text-purple-500" size={24} />
                  <div>
                     <div className="text-[9px] font-tech text-gray-500 uppercase">Fastest Lap</div>
                     <div className="text-sm font-tech text-white">00:54.21</div>
                  </div>
               </div>
            </div>
         </div>

         <div className="grid lg:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden shadow-2xl">
            {/* Law Side */}
            <div className="relative group overflow-hidden p-12 lg:p-20 bg-black">
               <div className="absolute inset-0 z-0 opacity-30 transition-all duration-700 group-hover:opacity-50">
                  <NanoImage 
                    prompt="Cinematic GTA RP police cruiser at night"
                    fallbackUrl={content.systemsLawImageUrl}
                    className="w-full h-full"
                  />
               </div>
               <div className="relative z-10">
                  <Shield size={40} className="text-blue-500 mb-6 drop-shadow-[0_0_15px_#2563eb]" />
                  <h3 className="text-5xl font-gothic font-black text-white mb-4 uppercase">
                    <EditableText cmsKey="systemsLawTitle" isEditMode={isEditMode} />
                  </h3>
                  <div className="text-gray-400 font-mono-rp mb-10 text-lg">
                    <EditableText cmsKey="systemsLawText" isEditMode={isEditMode} multiline />
                  </div>
                  <ul className="space-y-3 mb-10 font-mono-rp text-sm">
                     <li className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-gray-600 uppercase">Most Wanted:</span>
                        <span className="text-red-500">DriftKing_99</span>
                     </li>
                     <li className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-gray-600 uppercase">Active Officers:</span>
                        <span className="text-white">12 Personnel</span>
                     </li>
                  </ul>
                  <button className="px-8 py-3 bg-blue-600/10 border border-blue-600/30 text-blue-500 font-tech text-[10px] tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all">ALISTAR-SE AGORA</button>
               </div>
            </div>

            {/* Chaos Side */}
            <div className="relative group overflow-hidden p-12 lg:p-20 bg-[#080808]">
               <div className="absolute inset-0 z-0 opacity-20 transition-all duration-700 group-hover:opacity-40">
                  <NanoImage 
                    prompt="Neon racing sports cars"
                    fallbackUrl={content.systemsChaosImageUrl}
                    className="w-full h-full"
                  />
               </div>
               <div className="relative z-10 text-right flex flex-col items-end">
                  <Zap size={40} className="text-purple-500 mb-6 drop-shadow-[0_0_15px_#a855f7]" />
                  <h3 className="text-5xl font-gothic font-black text-white mb-4 uppercase">
                    <EditableText cmsKey="systemsChaosTitle" isEditMode={isEditMode} />
                  </h3>
                  <div className="text-gray-400 font-mono-rp mb-10 text-lg">
                    <EditableText cmsKey="systemsChaosText" isEditMode={isEditMode} multiline />
                  </div>
                  <ul className="space-y-3 mb-10 font-mono-rp text-sm w-full">
                     <li className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-white">Midnight Outlaws</span>
                        <span className="text-gray-600 uppercase">Active Crew:</span>
                     </li>
                     <li className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-white">68 MPH avg.</span>
                        <span className="text-gray-600 uppercase">Nightly Avg Speed:</span>
                     </li>
                  </ul>
                  <button className="px-8 py-3 bg-purple-600/10 border border-purple-600/30 text-purple-500 font-tech text-[10px] tracking-[0.2em] hover:bg-purple-600 hover:text-white transition-all">ENTRAR PRO COLETIVO</button>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
};

export default Systems;
