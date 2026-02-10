
import React from 'react';
import { ViewTab } from '../App';

interface FooterProps {
  setActiveTab?: (tab: ViewTab) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-1 lg:grid-cols-6 gap-16 mb-20">
          
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => setActiveTab?.('home')}>
              <div className="w-8 h-8 border border-antique-gold rotate-45 flex items-center justify-center">
                <span className="font-gothic text-antique-gold -rotate-45 font-black text-sm">P</span>
              </div>
              <h2 className="text-3xl font-gothic font-black text-white tracking-widest uppercase">PANDORA <span className="text-antique-gold">CITY</span></h2>
            </div>
            <p className="text-gray-500 max-w-md mb-8 text-lg font-light leading-relaxed">
              Onde cada escolha molda a sua linhagem e cada rua esconde um segredo. A universidade não é apenas um lugar, é o seu destino manifesto.
            </p>
            <div className="flex gap-4">
               {['Discord', 'Instagram', 'X', 'YouTube'].map(social => (
                 <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-antique-gold hover:border-antique-gold transition-all">
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-current rounded-sm opacity-50"></div>
                 </a>
               ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <h4 className="font-gothic font-bold text-white mb-8 uppercase tracking-[0.2em] text-xs">Acesso</h4>
            <ul className="space-y-4 text-gray-500 text-sm uppercase tracking-widest font-bold">
              <li><button onClick={() => setActiveTab?.('home')} className="hover:text-antique-gold transition-colors">Início</button></li>
              <li><a href="#" className="hover:text-antique-gold transition-colors">Whitelist</a></li>
              <li><a href="#" className="hover:text-antique-gold transition-colors">Regras</a></li>
              <li><a href="#" className="hover:text-antique-gold transition-colors">Mapas</a></li>
            </ul>
          </div>
          
          <div className="lg:col-span-1">
            <h4 className="font-gothic font-bold text-white mb-8 uppercase tracking-[0.2em] text-xs">Explorar</h4>
            <ul className="space-y-4 text-gray-500 text-sm uppercase tracking-widest font-bold">
              <li><button onClick={() => setActiveTab?.('lore')} className="hover:text-antique-gold transition-colors">História</button></li>
              <li><button onClick={() => setActiveTab?.('classes')} className="hover:text-antique-gold transition-colors">Genética</button></li>
              <li><button onClick={() => setActiveTab?.('university')} className="hover:text-antique-gold transition-colors">Instituição</button></li>
              <li><a href="#" className="hover:text-antique-gold transition-colors">Anjos</a></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-gothic font-bold text-white mb-8 uppercase tracking-[0.2em] text-xs">Suporte</h4>
            <ul className="space-y-4 text-gray-500 text-sm uppercase tracking-widest font-bold">
              <li><a href="#" className="hover:text-antique-gold transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-antique-gold transition-colors">Denúncias</a></li>
              <li><a href="#" className="hover:text-antique-gold transition-colors">Loja</a></li>
              <li><a href="#" className="hover:text-antique-gold transition-colors">Staff</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-gray-600 text-[10px] uppercase tracking-[0.3em] font-bold gap-6">
          <p>© 2024 PANDORA CITY OFFICIAL • ALL SECRETS RESERVED</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <p>Servidor: <span className="text-white">Online & Estável</span></p>
          </div>
          <p className="text-antique-gold">Requisição: PD Aprovado pela Staff</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
