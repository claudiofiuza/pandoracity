
import React, { useState, useEffect } from 'react';
import { Bell, Plus, Send, Trash2, ShieldAlert, Zap, Book, Dna, Server, Lock, Loader2 } from 'lucide-react';
import { UpdateEntry, User } from '../types';
import { sendUpdateToDiscord } from '../services/webhookService';
import { supabase } from '../supabaseClient';

interface UpdatesViewProps {
  user?: User | null;
}

const UpdatesView: React.FC<UpdatesViewProps> = ({ user }) => {
  const [updates, setUpdates] = useState<UpdateEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Server' as UpdateEntry['category'],
  });

  const isStaff = !!user;

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('updates').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setUpdates(data.map((u: any) => ({
        ...u,
        date: new Date(u.created_at).toLocaleDateString()
      })));
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUpdate = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      author: user?.username || 'Staff'
    };

    const { data, error } = await supabase.from('updates').insert(newUpdate).select().single();
    
    if (!error) {
      await sendUpdateToDiscord({ ...newUpdate, id: data.id, date: new Date().toLocaleDateString() });
      setShowForm(false);
      setFormData({ title: '', description: '', category: 'Server' });
      fetchUpdates();
    }
  };

  const deleteUpdate = async (id: string) => {
    if (confirm("Deletar registro?")) {
      await supabase.from('updates').delete().eq('id', id);
      fetchUpdates();
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

  return (
    <div className="min-h-screen animate-in fade-in duration-700 pb-24">
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b border-white/5 pb-12">
          <div>
            <div className="flex items-center gap-4 mb-4 text-antique-gold">
              <Bell className="animate-bounce" size={24} />
              <span className="font-tech text-xs tracking-[0.5em] uppercase">Updates Hub</span>
            </div>
            <h1 className="font-gothic text-6xl md:text-8xl font-black text-white uppercase">RECORDS</h1>
          </div>
          {isStaff && <div className="text-[10px] font-tech text-antique-gold border border-antique-gold/20 px-4 py-2 uppercase">Staff Mode: {user?.role}</div>}
        </div>

        {isStaff && (
          <div className="mb-12">
            {!showForm ? (
              <button onClick={() => setShowForm(true)} className="w-full py-8 border-2 border-dashed border-white/10 text-gray-500 hover:text-antique-gold hover:border-antique-gold transition-all uppercase font-tech text-xs">
                + Nova Atualização
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#080808] border border-antique-gold/30 p-8 space-y-4 animate-in slide-in-from-top-2">
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black border border-white/10 p-4 text-white font-mono-rp" placeholder="Título..." />
                <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/10 p-4 text-white font-mono-rp" placeholder="Descrição..." />
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})} className="w-full bg-black border border-white/10 p-4 text-white">
                  <option value="Server">Server</option>
                  <option value="Lore">Lore</option>
                  <option value="System">System</option>
                  <option value="Genetic">Genetic</option>
                </select>
                <div className="flex gap-4">
                   <button type="submit" className="flex-1 bg-antique-gold text-black py-4 font-black uppercase">Publicar</button>
                   <button onClick={() => setShowForm(false)} className="px-8 border border-white/10 text-white">Cancelar</button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="space-y-6">
          {loading ? <Loader2 className="animate-spin mx-auto text-antique-gold" size={40} /> : 
            updates.map(u => (
              <div key={u.id} className="bg-white/[0.02] border border-white/5 p-8 group relative transition-all hover:bg-white/[0.04]">
                {isStaff && <button onClick={() => deleteUpdate(u.id)} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-red-500 transition-opacity"><Trash2 size={16} /></button>}
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-32">
                    <div className="text-antique-gold font-tech text-[10px] mb-2">{u.date}</div>
                    <div className="flex items-center gap-2 text-[9px] font-tech text-gray-500 uppercase">{getCategoryIcon(u.category)} {u.category}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-gothic text-white mb-2 uppercase">{u.title}</h3>
                    <p className="text-gray-400 font-light leading-relaxed mb-4">{u.description}</p>
                    <div className="text-[10px] font-tech text-gray-600">BY: {u.author}</div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </div>
  );
};

export default UpdatesView;
