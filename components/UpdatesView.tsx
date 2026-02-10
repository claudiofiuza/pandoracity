
import React, { useState, useEffect } from 'react';
import { Bell, Plus, Send, Trash2, ShieldAlert, Zap, Book, Dna, Server, Lock } from 'lucide-react';
import { UpdateEntry, User } from '../types';
import { sendUpdateToDiscord } from '../services/webhookService';

interface UpdatesViewProps {
  user?: User | null;
}

const UpdatesView: React.FC<UpdatesViewProps> = ({ user }) => {
  const [updates, setUpdates] = useState<UpdateEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Server' as UpdateEntry['category'],
    author: user?.username || 'Staff Pandora'
  });

  // Staff members can publish and delete
  const isStaff = user?.role === 'ADMIN' || user?.role === 'EDITOR';
  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    const saved = localStorage.getItem('pandora_updates');
    if (saved) {
      setUpdates(JSON.parse(saved));
    } else {
      const initial: UpdateEntry[] = [
        {
          id: '1',
          date: new Date().toLocaleDateString(),
          title: 'Implementação do Sistema de Genética V2',
          description: 'Aprimoramos os cálculos de mutação para lobos e bruxas. Agora as transformações consomem menos energia espiritual.',
          category: 'Genetic',
          author: 'Admin_Thorne'
        },
        {
          id: '2',
          date: '10/05/2024',
          title: 'Expansão dos Túneis da Universidade',
          description: 'Três novos níveis subterrâneos foram descobertos. Acesso restrito para alunos de nível 4.',
          category: 'University',
          author: 'Staff'
        }
      ];
      setUpdates(initial);
      localStorage.setItem('pandora_updates', JSON.stringify(initial));
    }
  }, []);

  const saveUpdates = (newUpdates: UpdateEntry[]) => {
    setUpdates(newUpdates);
    localStorage.setItem('pandora_updates', JSON.stringify(newUpdates));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUpdate: UpdateEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      ...formData,
      author: user?.username || formData.author
    };

    const updatedList = [newUpdate, ...updates];
    saveUpdates(updatedList);
    
    // Enviar para o Discord usando a URL configurada no CMS
    const ok = await sendUpdateToDiscord(newUpdate);
    if (!ok) {
      alert("Aviso: A atualização foi salva no site, mas não pôde ser enviada ao Discord. Verifique a URL do Webhook no Painel Administrativo.");
    }
    
    setFormData({ title: '', description: '', category: 'Server', author: user?.username || 'Staff Pandora' });
    setShowForm(false);
  };

  const deleteUpdate = (id: string) => {
    if (window.confirm("Deseja deletar este registro permanentemente?")) {
      saveUpdates(updates.filter(u => u.id !== id));
    }
  };

  const getCategoryIcon = (cat: UpdateEntry['category']) => {
    switch(cat) {
      case 'Lore': return <Book size={16} />;
      case 'System': return <Zap size={16} />;
      case 'University': return <ShieldAlert size={16} />;
      case 'Genetic': return <Dna size={16} />;
      default: return <Server size={16} />;
    }
  };

  const getCategoryColor = (cat: UpdateEntry['category']) => {
    switch(cat) {
      case 'Lore': return 'text-antique-gold border-antique-gold/20 bg-antique-gold/5';
      case 'System': return 'text-red-500 border-red-500/20 bg-red-500/5';
      case 'University': return 'text-purple-500 border-purple-500/20 bg-purple-500/5';
      case 'Genetic': return 'text-blue-500 border-blue-500/20 bg-blue-500/5';
      default: return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5';
    }
  };

  return (
    <div className="min-h-screen animate-in fade-in duration-700 pb-24">
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b border-white/5 pb-12">
          <div>
            <div className="flex items-center gap-4 mb-4 text-antique-gold">
              <Bell className="animate-bounce" size={24} />
              <span className="font-tech text-xs tracking-[0.5em] uppercase">Communication Channel</span>
            </div>
            <h1 className="font-gothic text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">
              PATCH <span className="text-antique-gold">RECORDS</span>
            </h1>
          </div>
          
          {isStaff && (
            <div className="flex items-center gap-2 text-[10px] font-tech text-antique-gold uppercase tracking-widest bg-antique-gold/5 px-4 py-2 border border-antique-gold/20">
              <Lock size={12} /> Staff Access Level: {user?.role}
            </div>
          )}
        </div>

        {isStaff && (
          <div className="mb-16">
            {!showForm ? (
              <button 
                onClick={() => setShowForm(true)}
                className="w-full py-8 border-2 border-dashed border-white/10 hover:border-antique-gold/50 hover:bg-white/[0.02] transition-all flex flex-col items-center gap-4 text-gray-500 hover:text-antique-gold group"
              >
                <Plus size={32} className="group-hover:scale-110 transition-transform" />
                <span className="font-tech text-xs tracking-[0.3em] uppercase">Emitir Nova Atualização Global</span>
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#080808] border border-antique-gold/30 p-8 rounded-sm animate-in slide-in-from-top-4 duration-300">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="font-tech text-[10px] text-gray-500 uppercase tracking-widest">Título do Registro</label>
                    <input 
                      required
                      className="w-full bg-black border border-white/10 p-4 font-mono-rp text-white focus:border-antique-gold outline-none"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      placeholder="Ex: Novo sistema de inventário..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-tech text-[10px] text-gray-500 uppercase tracking-widest">Categoria</label>
                    <select 
                      className="w-full bg-black border border-white/10 p-4 font-mono-rp text-white focus:border-antique-gold outline-none"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value as any})}
                    >
                      <option value="Server">Server</option>
                      <option value="System">System</option>
                      <option value="Lore">Lore</option>
                      <option value="University">University</option>
                      <option value="Genetic">Genetic</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2 mb-8">
                  <label className="font-tech text-[10px] text-gray-500 uppercase tracking-widest">Descrição Detalhada (Markdown aceito no Discord)</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full bg-black border border-white/10 p-4 font-mono-rp text-white focus:border-antique-gold outline-none"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="Descreva as mudanças..."
                  />
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="flex-1 bg-antique-gold text-black py-4 font-tech text-xs font-black tracking-widest flex items-center justify-center gap-3 hover:brightness-110 transition-all uppercase">
                    <Send size={16} /> Publicar no Site & Discord
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-8 border border-white/10 text-gray-500 hover:text-white font-tech text-xs tracking-widest uppercase">
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="space-y-6">
          {updates.length === 0 ? (
            <div className="text-center py-20 text-gray-600 font-mono-rp text-xl italic">
              Nenhum registro encontrado no banco de dados.
            </div>
          ) : (
            updates.map((update) => (
              <div key={update.id} className="group bg-[#050505] border border-white/5 p-8 hover:border-white/20 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  {isStaff && (
                    <button onClick={() => deleteUpdate(update.id)} className="p-2 text-red-500/50 hover:text-red-500 bg-red-500/10 rounded-sm">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="text-antique-gold font-tech text-sm tracking-widest mb-2">{update.date}</div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 border text-[10px] font-tech uppercase tracking-widest rounded-full ${getCategoryColor(update.category)}`}>
                      {getCategoryIcon(update.category)}
                      {update.category}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-gothic font-bold text-white mb-4 group-hover:text-antique-gold transition-colors uppercase tracking-wider">{update.title}</h3>
                    <p className="text-gray-400 font-light leading-relaxed mb-6 text-lg">{update.description}</p>
                    <div className="flex items-center gap-2 text-[10px] font-tech text-gray-600 uppercase tracking-widest">
                      <span>Authored By:</span>
                      <span className="text-white">{update.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default UpdatesView;
