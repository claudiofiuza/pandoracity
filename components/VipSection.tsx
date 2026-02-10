
import React, { useState, useEffect } from 'react';
import { cmsService } from '../services/cmsService';
import { VipPlan } from '../types';
import * as Icons from 'lucide-react';

const VipSection: React.FC = () => {
  const [plans, setPlans] = useState<VipPlan[]>([]);

  useEffect(() => {
    const load = async () => {
      const content = await cmsService.getContent();
      setPlans(JSON.parse(content.vipPlans || '[]'));
    };
    load();
    window.addEventListener('cms-update', load);
    return () => window.removeEventListener('cms-update', load);
  }, []);

  return (
    <section className="py-32 px-4 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <div className="grid grid-cols-12 h-full">
          {[...Array(12)].map((_, i) => <div key={i} className="border-r border-white/10 h-full"></div>)}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-8xl font-gothic font-black text-white mb-4 uppercase">A LIGA DOS <span className="text-antique-gold">SOBERANOS</span></h2>
          <p className="font-tech text-xs tracking-[0.4em] text-gray-500 uppercase">Upgrade your experience. Dominate the server.</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const IconComponent = (Icons as any)[plan.icon] || Icons.Star;
            return (
              <div key={plan.id} className={`group bg-black border p-12 transition-all duration-500 relative flex flex-col ${plan.isPopular ? 'border-antique-gold scale-105 z-10 shadow-[0_0_50px_rgba(212,175,55,0.1)]' : 'border-white/5 hover:border-antique-gold/30'}`}>
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 px-4 py-1 bg-antique-gold text-black font-tech font-black text-[10px] uppercase tracking-widest">MOST POPULAR</div>
                )}
                <div className="mb-10">
                  <IconComponent className={`mb-6 transition-colors ${plan.isPopular ? 'text-antique-gold' : 'text-white/20 group-hover:text-white'}`} size={40} />
                  <h3 className="text-2xl font-gothic font-bold text-white mb-2 uppercase">{plan.name}</h3>
                  <div className="text-antique-gold font-tech text-3xl font-black">R$ {plan.price}<span className="text-[10px] text-gray-600">/mês</span></div>
                </div>
                <ul className="space-y-4 mb-12 flex-1">
                  {plan.benefits.filter(b => b.trim() !== '').map((benefit, bidx) => (
                    <li key={bidx} className={`flex items-center gap-3 text-sm italic ${plan.isPopular ? 'text-white font-bold' : 'text-gray-500 font-light'}`}>
                      <Icons.Check size={14} className="text-antique-gold shrink-0" /> {benefit}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 font-tech text-[10px] font-black tracking-widest transition-all ${plan.isPopular ? 'bg-antique-gold text-black shadow-xl hover:brightness-110' : 'border border-white/10 text-white hover:bg-white hover:text-black'}`}>
                  {plan.isPopular ? 'BUY NOW' : 'SELECT PACKAGE'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VipSection;
