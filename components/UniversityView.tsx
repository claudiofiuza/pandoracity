
import React from 'react';
import NanoImage from './NanoImage';
import { BookOpen, GraduationCap, Microscope, Shield } from 'lucide-react';

const UniversityView: React.FC = () => {
  return (
    <div className="min-h-screen animate-in fade-in duration-700">
      {/* Hero Sub-section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="font-gothic text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase">
            PANDORA <span className="text-antique-gold">UNIVERSITY</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-500 text-lg font-light leading-relaxed">
            Fundada em 1892, a nossa instituição não é apenas um monumento ao conhecimento humano, mas uma sentinela protegendo as fronteiras do que é possível.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          <div className="p-12 lg:p-20 bg-black group overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-all duration-700">
              <NanoImage prompt="Huge dark gothic library with thousands of books and green lamps" fallbackUrl="" className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <BookOpen className="text-antique-gold mb-8" size={48} />
              <h3 className="font-gothic text-4xl text-white mb-4">A Biblioteca das Almas</h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                Contendo o maior acervo de grimórios e textos proibidos do hemisfério ocidental. A entrada é permitida apenas para alunos do curso de Ocultismo Avançado.
              </p>
              <div className="font-tech text-[10px] text-antique-gold tracking-widest uppercase border-l border-antique-gold pl-4">Restricted Access Required</div>
            </div>
          </div>

          <div className="p-12 lg:p-20 bg-[#080808] group overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-all duration-700">
              <NanoImage prompt="Futuristic bio-laboratory with purple liquid in tubes, dark lighting" fallbackUrl="" className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <Microscope className="text-purple-500 mb-8" size={48} />
              <h3 className="font-gothic text-4xl text-white mb-4">Laboratórios de Biogenética</h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                Onde a ciência encontra o sobrenatural. Pesquisas sobre o genoma licantropo e regeneração vampiresca são conduzidas sob estrito sigilo governamental.
              </p>
              <div className="font-tech text-[10px] text-purple-500 tracking-widest uppercase border-l border-purple-500 pl-4">Security Level 4 Clearances</div>
            </div>
          </div>
          
          <div className="p-12 lg:p-20 bg-[#080808] group overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-all duration-700">
              <NanoImage prompt="University dorm rooms with gothic decor and neon racing posters" fallbackUrl="" className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <GraduationCap className="text-white/40 mb-8" size={48} />
              <h3 className="font-gothic text-4xl text-white mb-4">Dormitórios das Fraternidades</h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                As fraternidades Alpha Wolf e Sigma Fang não são apenas casas estudantis. São clãs que governam a política interna do campus com punho de ferro.
              </p>
              <div className="font-tech text-[10px] text-white/40 tracking-widest uppercase border-l border-white/20 pl-4">Invitation Only</div>
            </div>
          </div>

          <div className="p-12 lg:p-20 bg-black group overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-all duration-700">
              <NanoImage prompt="Underground police bunker for supernatural crimes, monitors and dark equipment" fallbackUrl="" className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <Shield className="text-blue-500 mb-8" size={48} />
              <h3 className="font-gothic text-4xl text-white mb-4">O Bunker do D.I.P</h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                A Polícia de Investigação de Pandora opera diretamente das entranhas da universidade, monitorando cada desvio metafísico no campus.
              </p>
              <div className="font-tech text-[10px] text-blue-500 tracking-widest uppercase border-l border-blue-500 pl-4">Law Enforcement Zone</div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Map Section */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-gothic text-6xl text-white mb-8">O CAMPUS <br/><span className="text-antique-gold italic">SUBTERRÂNEO</span></h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
              Muitos acreditam que a universidade termina nos jardins da superfície. No entanto, os verdadeiros centros de poder estão nos quatro níveis abaixo do solo, conectados por túneis que datam da fundação da cidade.
            </p>
            <div className="space-y-4">
              <div className="p-4 border border-white/5 bg-white/[0.02] flex justify-between items-center font-tech text-xs">
                <span className="text-antique-gold">Nível 1</span>
                <span className="text-gray-500">Administração de Elite</span>
              </div>
              <div className="p-4 border border-white/5 bg-white/[0.02] flex justify-between items-center font-tech text-xs">
                <span className="text-antique-gold">Nível 2</span>
                <span className="text-gray-500">Laboratórios Genéticos</span>
              </div>
              <div className="p-4 border border-white/5 bg-white/[0.02] flex justify-between items-center font-tech text-xs">
                <span className="text-antique-gold">Nível 3</span>
                <span className="text-gray-500">Câmaras de Iniciação</span>
              </div>
              <div className="p-4 border border-white/5 bg-white/[0.02] flex justify-between items-center font-tech text-xs">
                <span className="text-red-600 animate-pulse">Nível 4</span>
                <span className="text-red-900">[PROTOCOLO ÔMEGA ATIVO]</span>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-antique-gold/20 blur-2xl"></div>
            <div className="relative border border-white/10 p-4 bg-black">
              <NanoImage prompt="Blueprint of a massive underground university facility, glowing blue lines on dark digital display" fallbackUrl="" className="w-full aspect-square" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UniversityView;
