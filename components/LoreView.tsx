
import React from 'react';
import NanoImage from './NanoImage';
import { History, MapPin, Search } from 'lucide-react';

// Added interface to support isEditMode prop
interface LoreViewProps {
  isEditMode?: boolean;
}

const LoreView: React.FC<LoreViewProps> = ({ isEditMode = false }) => {
  return (
    <div className="min-h-screen animate-in fade-in duration-700">
      {/* Header Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <NanoImage 
            prompt="Old 1892 map of a gothic coastal city with supernatural sigils, dark parchment texture"
            fallbackUrl="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full opacity-40 grayscale contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-gothic text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">
            THE PANDORA <span className="text-antique-gold">CHRONICLES</span>
          </h1>
          <p className="font-tech text-gray-400 text-xs tracking-[0.5em] uppercase">Historical Archive #000 - Restricted</p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="p-4 bg-antique-gold/10 border border-antique-gold/20 rounded-sm">
                <History className="text-antique-gold" size={32} />
              </div>
              <div>
                <h3 className="font-gothic text-2xl text-white mb-4">1892: O Despertar</h3>
                <p className="text-gray-400 leading-relaxed font-light">
                  A cidade foi erguida sobre um ponto de convergência abissal. O que começou como um assentamento universitário isolado logo se tornou o epicentro de fenômenos inexplicáveis. O primeiro reitor, Silas Thorne, desapareceu misteriosamente após a inauguração da biblioteca subterrânea.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-sm">
                <MapPin className="text-red-500" size={32} />
              </div>
              <div>
                <h3 className="font-gothic text-2xl text-white mb-4">A Fenda do Nevoeiro</h3>
                <p className="text-gray-400 leading-relaxed font-light">
                  Localizada nos limites ao norte da cidade, a fenda é onde o mundo físico encontra o plano etéreo. Relatos de "sombras que caminham" e "luzes sem fonte" são comuns. A polícia de Pandora (D.I.P) mantém o local sob vigília constante.
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-antique-gold/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative border border-white/10 rounded-sm overflow-hidden p-2 bg-white/[0.02]">
              <NanoImage 
                prompt="Gothic architecture alleyway at night, thick purple fog, mysterious glowing eyes in the shadows"
                fallbackUrl="https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1200"
                className="w-full aspect-[4/5]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Secret Section */}
      <section className="py-32 bg-white/[0.01] border-y border-white/5 relative">
        <div className="max-w-4xl mx-auto text-center px-6">
          <Search className="mx-auto text-antique-gold mb-8 animate-pulse" size={48} />
          <h2 className="font-gothic text-4xl text-white mb-6 uppercase">O Segredo das Sete Chaves</h2>
          <p className="text-gray-400 text-lg italic mb-12">
            "Para cada segredo revelado, dois se escondem sob as lajes da universidade. Aqueles que buscam a verdade absoluta em Pandora geralmente não vivem para contá-la."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-tech text-[10px] tracking-[0.3em] uppercase">
            <div className="p-6 border border-white/5 hover:border-antique-gold/30 transition-all cursor-crosshair">A Cripta de Thorne</div>
            <div className="p-6 border border-white/5 hover:border-antique-gold/30 transition-all cursor-crosshair">O Códice de Sangue</div>
            <div className="p-6 border border-white/5 hover:border-antique-gold/30 transition-all cursor-crosshair">O Eco de 1944</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoreView;
