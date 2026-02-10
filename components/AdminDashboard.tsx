
import React, { useState, useEffect } from 'react';
import { User, Permission, SiteContent } from '../types';
import { Users, Layout, Save, UserPlus, Trash2, Shield, Image as ImageIcon, Type, Settings as SettingsIcon, Link as LinkIcon, Calendar, FileWarning } from 'lucide-react';
import { cmsService } from '../services/cmsService';

interface AdminDashboardProps {
  user: User | null;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'content' | 'settings' | 'event'>('content');
  const [users, setUsers] = useState<User[]>([]);
  const [content, setContent] = useState<SiteContent>(cmsService.getContent());
  
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<Permission>('EDITOR');

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('pandora_users') || '[]');
    setUsers(savedUsers);
    
    // Editor starts on event/content if restricted
    if (user?.role === 'EDITOR') {
       setActiveTab('event');
    }
  }, [user]);

  if (!user) return null;

  const isAdmin = user.role === 'ADMIN';
  const isEditor = user.role === 'EDITOR';

  const saveUsers = (uList: User[]) => {
    setUsers(uList);
    localStorage.setItem('pandora_users', JSON.stringify(uList));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Date.now().toString(),
      username: newUsername,
      password: newPassword,
      role: newRole
    };
    saveUsers([...users, newUser]);
    setNewUsername('');
    setNewPassword('');
  };

  const deleteUser = (id: string) => {
    if (confirm('Deletar este acesso permanentemente?')) {
      saveUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSaveContent = () => {
    cmsService.saveContent(content);
    alert('Base de dados Pandora sincronizada.');
  };

  return (
    <div className="min-h-screen animate-in fade-in duration-700 pb-24 px-6 max-w-7xl mx-auto pt-12">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 mb-12 border-b border-white/5 pb-8">
        {(isAdmin || isEditor) && (
          <button 
            onClick={() => setActiveTab('event')}
            className={`flex items-center gap-3 px-8 py-3 font-tech text-[10px] tracking-widest uppercase transition-all ${activeTab === 'event' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'}`}
          >
            <Calendar size={16} /> Blood Moon Event
          </button>
        )}
        {isAdmin && (
          <button 
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-3 px-8 py-3 font-tech text-[10px] tracking-widest uppercase transition-all ${activeTab === 'content' ? 'bg-antique-gold text-black' : 'text-gray-500 hover:text-white'}`}
          >
            <Layout size={16} /> Editor de Conteúdo
          </button>
        )}
        {isAdmin && (
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-3 px-8 py-3 font-tech text-[10px] tracking-widest uppercase transition-all ${activeTab === 'users' ? 'bg-antique-gold text-black' : 'text-gray-500 hover:text-white'}`}
          >
            <Users size={16} /> Gestão de Cargos
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

      {/* EVENT EDITOR (Admin & Editor) */}
      {activeTab === 'event' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-[#080808] border border-red-600/30 p-8 max-w-2xl">
            <h3 className="text-red-600 font-gothic text-xl flex items-center gap-3 uppercase mb-6"><Calendar size={18}/> Agendar Próximo Blood Moon</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed font-mono-rp">
              Defina a data e hora do próximo evento global. O cronômetro na página inicial atualizará automaticamente para todos os iniciados.
            </p>
            <div className="space-y-4">
              <input 
                type="datetime-local" 
                value={content.bloodMoonDate.substring(0, 16)} 
                onChange={e => setContent({...content, bloodMoonDate: new Date(e.target.value).toISOString()})}
                className="w-full bg-black border border-white/10 p-4 text-white font-tech focus:border-red-600 outline-none"
              />
              <button onClick={handleSaveContent} className="w-full py-4 bg-red-600 text-white font-tech text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all">
                Atualizar Cronômetro Global
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT EDITOR (Admin Only) */}
      {activeTab === 'content' && isAdmin && (
        <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* HERO */}
            <div className="bg-white/[0.02] border border-white/5 p-8 space-y-4">
              <h4 className="text-antique-gold font-gothic flex items-center gap-2 uppercase"><ImageIcon size={14}/> Sessão: Hero Landing</h4>
              <input value={content.heroTitle} onChange={e => setContent({...content, heroTitle: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="Título Hero" />
              <textarea rows={2} value={content.heroSubtitle} onChange={e => setContent({...content, heroSubtitle: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="Subtítulo Hero" />
              <input value={content.heroImageUrl} onChange={e => setContent({...content, heroImageUrl: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="URL Imagem Hero" />
            </div>

            {/* LORE */}
            <div className="bg-white/[0.02] border border-white/5 p-8 space-y-4">
              <h4 className="text-antique-gold font-gothic flex items-center gap-2 uppercase"><Type size={14}/> Sessão: Lore</h4>
              <input value={content.loreTitle} onChange={e => setContent({...content, loreTitle: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="Título Lore" />
              <textarea rows={2} value={content.loreText} onChange={e => setContent({...content, loreText: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="Texto Lore" />
              <input value={content.loreImageUrl} onChange={e => setContent({...content, loreImageUrl: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="URL Imagem Lore" />
            </div>

            {/* SYSTEMS LAW */}
            <div className="bg-white/[0.02] border border-white/5 p-8 space-y-4">
              <h4 className="text-blue-500 font-gothic flex items-center gap-2 uppercase"><Shield size={14}/> Sessão: Sistemas (A Lei)</h4>
              <input value={content.systemsLawTitle} onChange={e => setContent({...content, systemsLawTitle: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="Título Law" />
              <textarea rows={2} value={content.systemsLawText} onChange={e => setContent({...content, systemsLawText: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="Texto Law" />
              <input value={content.systemsLawImageUrl} onChange={e => setContent({...content, systemsLawImageUrl: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="URL Imagem Law" />
            </div>

            {/* SYSTEMS CHAOS */}
            <div className="bg-white/[0.02] border border-white/5 p-8 space-y-4">
              <h4 className="text-purple-500 font-gothic flex items-center gap-2 uppercase"><LinkIcon size={14}/> Sessão: Sistemas (O Caos)</h4>
              <input value={content.systemsChaosTitle} onChange={e => setContent({...content, systemsChaosTitle: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="Título Chaos" />
              <textarea rows={2} value={content.systemsChaosText} onChange={e => setContent({...content, systemsChaosText: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="Texto Chaos" />
              <input value={content.systemsChaosImageUrl} onChange={e => setContent({...content, systemsChaosImageUrl: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="URL Imagem Chaos" />
            </div>

            {/* CONFIDENTIAL */}
            <div className="bg-white/[0.02] border border-white/5 p-8 space-y-4 lg:col-span-2">
              <h4 className="text-red-600 font-gothic flex items-center gap-2 uppercase"><FileWarning size={14}/> Sessão: Arquivos Confidenciais</h4>
              <input value={content.confidentialTitle} onChange={e => setContent({...content, confidentialTitle: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="Título Confidencial" />
              <textarea rows={3} value={content.confidentialText} onChange={e => setContent({...content, confidentialText: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="Texto Confidencial" />
            </div>
          </div>
          
          <button onClick={handleSaveContent} className="w-full py-5 bg-white text-black font-tech text-xs font-black tracking-[0.3em] uppercase hover:bg-antique-gold transition-colors flex items-center justify-center gap-3">
            <Save size={18} /> Salvar Painel de Conteúdo
          </button>
        </div>
      )}

      {/* USERS (Admin Only) */}
      {activeTab === 'users' && isAdmin && (
        <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
           <div className="bg-[#080808] border border-antique-gold/30 p-8 rounded-sm">
            <h3 className="text-antique-gold font-gothic text-xl flex items-center gap-3 uppercase mb-8"><UserPlus size={18}/> Novo Acesso de Staff</h3>
            <form onSubmit={handleAddUser} className="grid md:grid-cols-4 gap-4 items-end">
              <input required value={newUsername} onChange={e => setNewUsername(e.target.value)} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="Username..." />
              <input required type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp" placeholder="Senha..." />
              <select value={newRole} onChange={e => setNewRole(e.target.value as Permission)} className="w-full bg-black border border-white/10 p-3 text-white font-mono-rp">
                <option value="EDITOR">EDITOR (Apenas Updates e Eventos)</option>
                <option value="ADMIN">ADMIN (Controle Total)</option>
              </select>
              <button type="submit" className="bg-antique-gold text-black p-3.5 font-tech text-[10px] font-black uppercase tracking-widest hover:brightness-110">Cadastrar</button>
            </form>
          </div>
          <div className="space-y-4">
              {users.map(u => (
                <div key={u.id} className="flex items-center justify-between p-4 bg-black border border-white/5">
                  <div className="flex items-center gap-6">
                    <Shield size={16} className={u.role === 'ADMIN' ? 'text-red-500' : 'text-blue-500'} />
                    <span className="text-white font-mono-rp">{u.username} ({u.role})</span>
                  </div>
                  {u.username !== 'Panda' && (
                    <button onClick={() => deleteUser(u.id)} className="p-2 text-gray-600 hover:text-red-500"><Trash2 size={16} /></button>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* WEBHOOK (Admin Only) */}
      {activeTab === 'settings' && isAdmin && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-[#080808] border border-white/5 p-8 max-w-2xl">
            <h3 className="text-antique-gold font-gothic text-xl flex items-center gap-3 uppercase mb-6"><LinkIcon size={18}/> Discord Webhook</h3>
            <input 
              type="text"
              value={content.webhookUrl || ""}
              onChange={e => setContent({...content, webhookUrl: e.target.value})}
              placeholder="https://discord.com/api/webhooks/..."
              className="w-full bg-black border border-white/10 p-4 text-white font-mono-rp focus:border-antique-gold outline-none mb-4"
            />
            <button onClick={handleSaveContent} className="px-8 py-3 bg-antique-gold text-black font-tech text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all">
              Salvar Configuração
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
