
import React, { useState, useEffect } from 'react';
import { User, Permission, SiteContent } from '../types';
import { Users, Layout, Save, UserPlus, Trash2, Shield, Image as ImageIcon, Type, Settings as SettingsIcon, Link as LinkIcon, Calendar, FileWarning, Loader2 } from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { supabase } from '../supabaseClient';

interface AdminDashboardProps {
  user: User | null;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'content' | 'settings' | 'event'>('event');
  const [usersList, setUsersList] = useState<User[]>([]);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<Permission>('EDITOR');

  const isAdmin = user?.role === 'ADMIN';
  const isEditor = user?.role === 'EDITOR';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const cmsData = await cmsService.getContent();
      setContent(cmsData);
      
      if (isAdmin) {
        const { data: usersData, error: uError } = await supabase.from('staff_users').select('*');
        if (uError) console.error("Erro ao carregar usuários:", uError.message);
        if (usersData) setUsersList(usersData);
      }
      
      if (isAdmin) setActiveTab('content');
      else setActiveTab('event');
    } catch (e) {
      console.error("Erro ao carregar dados do dashboard:", e);
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading || !content) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-antique-gold font-tech animate-pulse uppercase tracking-[0.5em]">
        <Loader2 className="animate-spin" size={32} />
        Sincronizando Banco de Dados...
      </div>
    );
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('staff_users').insert({
      username: newUsername,
      password: newPassword,
      role: newRole
    });
    if (!error) {
      setNewUsername('');
      setNewPassword('');
      fetchData();
    } else {
      alert(`Erro ao criar usuário: ${error.message}`);
    }
  };

  const deleteUser = async (id: string) => {
    if (confirm('Deletar acesso permanentemente?')) {
      const { error } = await supabase.from('staff_users').delete().eq('id', id);
      if (!error) fetchData();
      else alert(`Erro ao deletar: ${error.message}`);
    }
  };

  const handleSaveContent = async () => {
    setSaving(true);
    const success = await cmsService.saveContent(content);
    setSaving(false);
    if (success) {
      alert('Alterações aplicadas com sucesso em Pandora.');
    }
  };

  return (
    <div className="min-h-screen animate-in fade-in duration-700 pb-24 px-6 max-w-7xl mx-auto pt-12">
      <div className="flex flex-wrap gap-4 mb-12 border-b border-white/5 pb-8">
        {(isAdmin || isEditor) && (
          <button 
            onClick={() => setActiveTab('event')}
            className={`flex items-center gap-3 px-8 py-3 font-tech text-[10px] tracking-widest uppercase transition-all ${activeTab === 'event' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'}`}
          >
            <Calendar size={16} /> Blood Moon
          </button>
        )}
        {isAdmin && (
          <button 
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-3 px-8 py-3 font-tech text-[10px] tracking-widest uppercase transition-all ${activeTab === 'content' ? 'bg-antique-gold text-black' : 'text-gray-500 hover:text-white'}`}
          >
            <Layout size={16} /> Editor de Site
          </button>
        )}
        {isAdmin && (
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-3 px-8 py-3 font-tech text-[10px] tracking-widest uppercase transition-all ${activeTab === 'users' ? 'bg-antique-gold text-black' : 'text-gray-500 hover:text-white'}`}
          >
            <Users size={16} /> Cargos
          </button>
        )}
        {isAdmin && (
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-8 py-3 font-tech text-[10px] tracking-widest uppercase transition-all ${activeTab === 'settings' ? 'bg-antique-gold text-black' : 'text-gray-500 hover:text-white'}`}
          >
            <SettingsIcon size={16} /> Webhook
          </button>
        )}
      </div>

      {activeTab === 'event' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-[#080808] border border-red-600/30 p-8 max-w-2xl">
            <h3 className="text-red-600 font-gothic text-xl flex items-center gap-3 uppercase mb-6"><Calendar size={18}/> Blood Moon Event</h3>
            <div className="space-y-4">
              <label className="text-[10px] font-tech text-gray-500 uppercase">Data e Hora do Evento</label>
              <input 
                type="datetime-local" 
                value={content.bloodMoonDate ? content.bloodMoonDate.substring(0, 16) : ""} 
                onChange={e => setContent({...content, bloodMoonDate: new Date(e.target.value).toISOString()})}
                className="w-full bg-black border border-white/10 p-4 text-white font-tech focus:border-red-600 outline-none"
              />
              <button 
                onClick={handleSaveContent} 
                disabled={saving}
                className="w-full py-4 bg-red-600 text-white font-tech text-xs font-black uppercase tracking-widest hover:brightness-110 disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                Atualizar Cronômetro Global
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'content' && isAdmin && (
        <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Seção Hero */}
            <div className="bg-white/[0.02] border border-white/5 p-8 space-y-4">
              <h4 className="text-antique-gold font-gothic flex items-center gap-2 uppercase"><ImageIcon size={14}/> Hero & Landing</h4>
              <div className="space-y-2">
                <label className="text-[9px] font-tech text-gray-600 uppercase">Título Principal</label>
                <input value={content.heroTitle} onChange={e => setContent({...content, heroTitle: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-tech text-gray-600 uppercase">Subtítulo</label>
                <textarea rows={2} value={content.heroSubtitle} onChange={e => setContent({...content, heroSubtitle: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-tech text-gray-600 uppercase">URL Imagem Fundo</label>
                <input value={content.heroImageUrl} onChange={e => setContent({...content, heroImageUrl: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" />
              </div>
            </div>

            {/* Seção Lore */}
            <div className="bg-white/[0.02] border border-white/5 p-8 space-y-4">
              <h4 className="text-antique-gold font-gothic flex items-center gap-2 uppercase"><Type size={14}/> Instituição & Lore</h4>
              <div className="space-y-2">
                <label className="text-[9px] font-tech text-gray-600 uppercase">Título da Lore</label>
                <input value={content.loreTitle} onChange={e => setContent({...content, loreTitle: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-tech text-gray-600 uppercase">Texto Principal</label>
                <textarea rows={4} value={content.loreText} onChange={e => setContent({...content, loreText: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-tech text-gray-600 uppercase">URL Imagem Campus</label>
                <input value={content.loreImageUrl} onChange={e => setContent({...content, loreImageUrl: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" />
              </div>
            </div>

            {/* Seção Sistemas (Lei) */}
            <div className="bg-white/[0.02] border border-white/5 p-8 space-y-4">
              <h4 className="text-blue-500 font-gothic flex items-center gap-2 uppercase"><Shield size={14}/> Sistema: A LEI (D.I.P)</h4>
              <input value={content.systemsLawTitle} onChange={e => setContent({...content, systemsLawTitle: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" />
              <textarea rows={2} value={content.systemsLawText} onChange={e => setContent({...content, systemsLawText: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" />
              <input value={content.systemsLawImageUrl} onChange={e => setContent({...content, systemsLawImageUrl: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="URL Foto Lei" />
            </div>

            {/* Seção Sistemas (Caos) */}
            <div className="bg-white/[0.02] border border-white/5 p-8 space-y-4">
              <h4 className="text-purple-500 font-gothic flex items-center gap-2 uppercase"><LinkIcon size={14}/> Sistema: O CAOS (Racers)</h4>
              <input value={content.systemsChaosTitle} onChange={e => setContent({...content, systemsChaosTitle: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" />
              <textarea rows={2} value={content.systemsChaosText} onChange={e => setContent({...content, systemsChaosText: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" />
              <input value={content.systemsChaosImageUrl} onChange={e => setContent({...content, systemsChaosImageUrl: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="URL Foto Caos" />
            </div>
          </div>
          <button 
            onClick={handleSaveContent} 
            disabled={saving}
            className="w-full py-5 bg-white text-black font-tech text-xs font-black tracking-[0.3em] uppercase hover:bg-antique-gold transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} 
            Publicar Todas as Alterações de Conteúdo
          </button>
        </div>
      )}

      {activeTab === 'users' && isAdmin && (
        <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
           <div className="bg-[#080808] border border-antique-gold/30 p-8 rounded-sm">
            <h3 className="text-antique-gold font-gothic text-xl flex items-center gap-3 uppercase mb-8"><UserPlus size={18}/> Novo Membro de Staff</h3>
            <form onSubmit={handleAddUser} className="grid md:grid-cols-4 gap-4 items-end">
              <input required value={newUsername} onChange={e => setNewUsername(e.target.value)} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp focus:border-antique-gold outline-none" placeholder="Username..." />
              <input required type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp focus:border-antique-gold outline-none" placeholder="Senha..." />
              <select value={newRole} onChange={e => setNewRole(e.target.value as Permission)} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp">
                <option value="EDITOR">EDITOR (Updates e Eventos)</option>
                <option value="ADMIN">ADMIN (Total)</option>
              </select>
              <button type="submit" className="bg-antique-gold text-black p-3.5 font-tech text-[10px] font-black uppercase tracking-widest hover:brightness-110">Cadastrar</button>
            </form>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-sm">
            <h4 className="text-gray-500 font-tech text-[10px] uppercase mb-4 px-4">Usuários com Acesso</h4>
            {usersList.map(u => (
              <div key={u.id} className="flex items-center justify-between p-4 bg-black/40 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-4">
                  <Shield size={14} className={u.role === 'ADMIN' ? 'text-red-500' : 'text-blue-500'} />
                  <span className="text-white font-mono-rp">{u.username}</span>
                  <span className="text-[9px] font-tech text-gray-600 uppercase">{u.role}</span>
                </div>
                {u.username !== 'Panda' && (
                  <button onClick={() => deleteUser(u.id!)} className="p-2 text-gray-600 hover:text-red-500"><Trash2 size={16} /></button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
