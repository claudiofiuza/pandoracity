
import React from 'react';
import { Check, Star, ShieldCheck, Crown } from 'lucide-react';

const VipSection: React.FC = () => {
  return (
    <section className="py-32 px-4 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <div className="grid grid-cols-12 h-full">
          {[...Array(12)].map((_, i) => <div key={i} className="border-r border-white/10 h-full"></div>)}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-8xl font-gothic font-black text-white mb-4">A LIGA DOS <span className="text-antique-gold">SOBERANOS</span></h2>
          <p className="font-tech text-xs tracking-[0.4em] text-gray-500">Upgrade your experience. Dominate the server.</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Tier 1 */}
          <div className="group bg-black border border-white/5 p-12 hover:border-antique-gold/30 transition-all duration-500 relative flex flex-col">
            <div className="absolute top-0 left-0 w-12 h-[2px] bg-white/20"></div>
            <div className="mb-10">
              <Star className="text-white/20 group-hover:text-white transition-colors mb-6" size={40} />
              <h3 className="text-2xl font-gothic font-bold text-white mb-2">PANDORA INITIATE</h3>
              <div className="text-antique-gold font-tech text-3xl font-black">R$ 29,90<span className="text-[10px] text-gray-600">/mês</span></div>
            </div>
            <ul className="space-y-4 mb-12 flex-1">
              <li className="flex items-center gap-3 text-gray-500 text-sm italic font-light">
                <Check size={14} className="text-antique-gold" /> +15% Salary Bonus
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm italic font-light">
                <Check size={14} className="text-antique-gold" /> 5 Garage Slots
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm italic font-light">
                <Check size={14} className="text-antique-gold" /> Initiate Discord Tag
              </li>
            </ul>
            <button className="w-full py-4 border border-white/10 font-tech text-[10px] font-black tracking-widest hover:bg-white hover:text-black transition-all">
              SELECT PACKAGE
            </button>
          </div>

          {/* Tier 2 (Featured) */}
          <div className="group bg-gradient-to-b from-[#1a1a1a] to-black border-2 border-antique-gold p-12 shadow-[0_0_50px_rgba(212,175,55,0.1)] relative scale-105 z-10 flex flex-col">
            <div className="absolute top-0 right-0 px-4 py-1 bg-antique-gold text-black font-tech font-black text-[10px] uppercase tracking-widest">
              Most Popular
            </div>
            <div className="mb-10">
              <ShieldCheck className="text-antique-gold mb-6" size={40} />
              <h3 className="text-2xl font-gothic font-bold text-white mb-2 uppercase">Elite Enforcer</h3>
              <div className="text-antique-gold font-tech text-3xl font-black">R$ 59,90<span className="text-[10px] text-gray-600">/mês</span></div>
            </div>
            <ul className="space-y-4 mb-12 flex-1">
              <li className="flex items-center gap-3 text-white text-sm italic font-bold">
                <Check size={14} className="text-antique-gold" /> +30% Salary Bonus
              </li>
              <li className="flex items-center gap-3 text-white text-sm italic font-bold">
                <Check size={14} className="text-antique-gold" /> 15 Garage Slots
              </li>
              <li className="flex items-center gap-3 text-white text-sm italic font-bold">
                <Check size={14} className="text-antique-gold" /> Basic Lore Items Pack
              </li>
              <li className="flex items-center gap-3 text-white text-sm italic font-bold">
                <Check size={14} className="text-antique-gold" /> Priority Queue (Level 2)
              </li>
            </ul>
            <button className="w-full py-5 bg-antique-gold text-black font-tech text-[10px] font-black tracking-widest hover:brightness-110 transition-all shadow-xl">
              BUY NOW
            </button>
          </div>

          {/* Tier 3 */}
          <div className="group bg-black border border-white/5 p-12 hover:border-antique-gold/30 transition-all duration-500 relative flex flex-col">
            <div className="absolute bottom-0 right-0 w-12 h-[2px] bg-white/20"></div>
            <div className="mb-10">
              <Crown className="text-white/20 group-hover:text-antique-gold transition-colors mb-6" size={40} />
              <h3 className="text-2xl font-gothic font-bold text-white mb-2">SOVEREIGN LEGEND</h3>
              <div className="text-antique-gold font-tech text-3xl font-black">R$ 99,90<span className="text-[10px] text-gray-600">/mês</span></div>
            </div>
            <ul className="space-y-4 mb-12 flex-1">
              <li className="flex items-center gap-3 text-gray-500 text-sm italic font-light">
                <Check size={14} className="text-antique-gold" /> +50% Salary Bonus
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm italic font-light">
                <Check size={14} className="text-antique-gold" /> Unlimited Garage Slots
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm italic font-light">
                <Check size={14} className="text-antique-gold" /> Custom Lore Items & Weapons
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm italic font-light">
                <Check size={14} className="text-antique-gold" /> Instant Server Access
              </li>
            </ul>
            <button className="w-full py-4 border border-white/10 font-tech text-[10px] font-black tracking-widest hover:bg-white hover:text-black transition-all">
              GO LEGEND
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VipSection;
