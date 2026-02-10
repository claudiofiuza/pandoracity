
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Loader2, Radio } from 'lucide-react';
import { askLoreKeeper } from '../services/geminiService';

const LoreKeeper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'keeper'; text: string }[]>([
    { role: 'keeper', text: 'TERMINAL CONNECTED. Ask your questions about Pandora, initiate.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await askLoreKeeper(userMsg);
    setChat(prev => [...prev, { role: 'keeper', text: response }]);
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-50 p-5 bg-black border-2 border-antique-gold text-antique-gold rounded-sm glow-gold transition-all duration-300 hover:scale-110 flex items-center gap-3 font-tech text-[10px] tracking-widest ${isOpen ? 'opacity-0 scale-0' : 'opacity-100'}`}
      >
        <Radio size={18} className="animate-pulse" /> OPEN COMMS
      </button>

      <div className={`fixed bottom-8 right-8 z-50 w-80 md:w-96 bg-black border-2 border-white/10 rounded-sm overflow-hidden shadow-2xl transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-antique-gold rounded-full animate-pulse shadow-[0_0_10px_#D4AF37]"></div>
            <h3 className="font-tech text-white text-[10px] tracking-widest uppercase">Lore Keeper V.1.0</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/30 hover:text-white">
            <X size={16} />
          </button>
        </div>

        <div ref={scrollRef} className="h-80 overflow-y-auto p-6 space-y-6 bg-[#050505]">
          {chat.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`text-[10px] font-tech uppercase mb-1 ${msg.role === 'user' ? 'text-white/40' : 'text-antique-gold'}`}>
                {msg.role === 'user' ? 'You' : 'System'}
              </div>
              <div className={`p-4 text-xs font-mono leading-relaxed ${msg.role === 'user' ? 'bg-white/5 text-white border-r-2 border-white' : 'bg-antique-gold/10 text-gray-300 border-l-2 border-antique-gold italic'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="text-[10px] font-tech text-gray-600 animate-pulse uppercase tracking-widest">
                Decrypting shadows...
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-black border-t border-white/10 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="TYPE MESSAGE..."
            className="flex-1 bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-[10px] font-tech focus:outline-none focus:border-antique-gold transition-colors text-white uppercase"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="p-3 bg-antique-gold text-black rounded-sm hover:brightness-110 transition-colors disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default LoreKeeper;
