import React, { useState, useEffect } from 'react';
import { User, Permission, SiteContent, Lineage, Fraternity, VipPlan } from '../types';
import { 
  Users, Layout, Save, UserPlus, Trash2, Shield, 
  Image as ImageIcon, Type, Settings as SettingsIcon, 
  Calendar, Loader2, Plus, Sparkles, GraduationCap, 
  Crown, Bell, Zap, Home, Book, Dna, History, Palette,
  Info, Check, X
} from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { supabase } from '../supabaseClient';

interface AdminDashboardProps {
  user: User | null;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'content' | 'lineages' | 'fraternities' | 'vip' | 'event' | 'settings'>('event');
  const [contentTab, setContentTab] = useState<'home' | 'lore' | 'classes' | 'uni'>('home');
  const [usersList, setUsersList] = useState<User[]>([]);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<Permission>('EDITOR');

  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const cmsData = await cmsService.getContent();
    setContent(cmsData);
    if (isAdmin) {
      const { data } = await supabase.from('staff_users').select('*');
      if (data) setUsersList(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    const success = await cmsService.saveContent(content);
    setSaving(false);
    if (success) alert('Sincronização concluída. A realidade de Pandora foi reescrita.');
  };

  const updateList = (key: keyof SiteContent, newList: any[]) => {
    if (!content) return;
    setContent({ ...content, [key]: JSON.stringify(newList) });
  };

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
      alert(`Erro no protocolo: ${error.message}`);
    }
  };

  const deleteUser = async (id: string) => {
    if (confirm('Revogar acesso permanente deste membro da staff?')) {
      const { error } = await supabase.from('staff_users').delete().eq('id', id);
      if (!error) fetchData();
    }
  };

  if (loading || !content) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-antique-gold font-tech animate-pulse uppercase tracking-[0.5em]">
        <Loader2 className="animate-spin" size={32} />
        Acessando Arquivos Restritos...
      </div>
    );
  }

  const lineages: Lineage[] = JSON.parse(content.lineages || '[]');
  const fraternities: Fraternity[] = JSON.parse(content.fraternities || '[]');
  const vipPlans: VipPlan[] = JSON.parse(content.vipPlans || '[]');

  const getTabStyle = (tab: string, colorClass: string, glowClass: string) => {
    const isActive = activeTab === tab;
    return `flex items-center gap-2 px-6 py-3 font-tech text-[10px] tracking-widest uppercase transition-all border ${
      isActive 
        ? `bg-black border-${colorClass} text-white ${glowClass}` 
        : `border-white/5 text-gray-500 hover:text-white hover:border-white/20`
    }`;
  };

  return (
    <div className="min-h-screen animate-in fade-in duration-700 pb-32 px-6 max-w-7xl mx-auto pt-12">
      {/* Menu Principal */}
      <div className="flex flex-wrap gap-3 mb-12 border-b border-white/5 pb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <button onClick={() => setActiveTab('event')} className={getTabStyle('event', 'red-600', 'shadow-[0_0_15px_rgba(220,38,38,0.4)] border-red-600')}>
          <Calendar size={14} /> Eventos
        </button>
        {isAdmin && (
          <>
            <button onClick={() => setActiveTab('content')} className={getTabStyle('content', 'antique-gold', 'shadow-[0_0_15px_rgba(212,175,55,0.3)] border-antique-gold')}>
              <Layout size={14} /> Identidade & Textos
            </button>
            <button onClick={() => setActiveTab('lineages')} className={getTabStyle('lineages', 'purple-600', 'shadow-[0_0_15px_rgba(147,51,234,0.4)] border-purple-600')}>
              <Sparkles size={14} /> Linhagens
            </button>
            <button onClick={() => setActiveTab('fraternities')} className={getTabStyle('fraternities', 'blue-600', 'shadow-[0_0_15px_rgba(37,99,235,0.4)] border-blue-600')}>
              <GraduationCap size={14} /> Fraternidades
            </button>
            <button onClick={() => setActiveTab('vip')} className={getTabStyle('vip', 'antique-gold', 'shadow-[0_0_15px_rgba(212,175,55,0.3)] border-antique-gold')}>
              <Crown size={14} /> Planos VIP
            </button>
            <button onClick={() => setActiveTab('users')} className={getTabStyle('users', 'white', 'shadow-[0_0_15px_rgba(255,255,255,0.2)] border-white')}>
              <Users size={14} /> Staff
            </button>
            <button onClick={() => setActiveTab('settings')} className={getTabStyle('settings', 'gray-400', 'shadow-[0_0_15px_rgba(156,163,175,0.2)] border-gray-400')}>
              <SettingsIcon size={14} /> Config
            </button>
          </>
        )}
      </div>

      <div className="animate-in slide-in-from-bottom-4 duration-500 mb-20">
        {/* SEÇÃO: EVENTOS */}
        {activeTab === 'event' && (
          <div className="bg-[#080808] border border-red-600/20 p-10 max-w-2xl space-y-8 shadow-2xl">
            <div className="flex items-center gap-4 text-red-600">
               <Calendar size={24}/>
               <h3 className="font-gothic text-2xl uppercase font-black text-white">Próximo Evento Sazonal</h3>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-tech text-gray-500 uppercase tracking-widest">Cronômetro de Contagem Regressiva (Data Alvo)</label>
              <input 
                type="datetime-local" 
                value={content.bloodMoonDate ? content.bloodMoonDate.substring(0, 16) : ""} 
                onChange={e => setContent({...content, bloodMoonDate: new Date(e.target.value).toISOString()})}
                className="w-full bg-black border border-white/10 p-5 text-white font-tech focus:border-red-600 outline-none text-xl"
              />
            </div>
          </div>
        )}

        {/* SEÇÃO: TEXTOS & IDENTIDADE */}
        {activeTab === 'content' && (
          <div className="space-y-12">
            <div className="flex flex-wrap gap-4 border-b border-white/5 pb-6">
               <button onClick={() => setContentTab('home')} className={`px-6 py-2 text-[10px] font-tech border transition-all ${contentTab === 'home' ? 'bg-antique-gold/10 text-antique-gold border-antique-gold shadow-[0_0_10px_rgba(212,175,55,0.2)]' : 'text-gray-500 border-white/5 hover:text-white'}`}>IDENTIDADE & HOME</button>
               <button onClick={() => setContentTab('lore')} className={`px-6 py-2 text-[10px] font-tech border transition-all ${contentTab === 'lore' ? 'bg-antique-gold/10 text-antique-gold border-antique-gold shadow-[0_0_10px_rgba(212,175,55,0.2)]' : 'text-gray-500 border-white/5 hover:text-white'}`}>LORE (CHRONICLES)</button>
               <button onClick={() => setContentTab('uni')} className={`px-6 py-2 text-[10px] font-tech border transition-all ${contentTab === 'uni' ? 'bg-antique-gold/10 text-antique-gold border-antique-gold shadow-[0_0_10px_rgba(212,175,55,0.2)]' : 'text-gray-500 border-white/5 hover:text-white'}`}>INSTITUTION (CAMPUS)</button>
            </div>

            {contentTab === 'home' && (
              <div className="grid lg:grid-cols-2 gap-8 animate-in fade-in duration-300">
                <div className="bg-[#080808] border border-white/5 p-8 space-y-6">
                  <h4 className="text-antique-gold font-gothic flex items-center gap-2 uppercase text-lg"><Home size={18}/> Identidade Visual</h4>
                  <div className="space-y-4">
                    <label className="text-[10px] font-tech text-gray-500 uppercase tracking-widest">Nome do Site (Navbar)</label>
                    <input value={content.navName} onChange={e => setContent({...content, navName: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white text-lg" placeholder="PANDORA CITY" />
                    <label className="text-[10px] font-tech text-gray-500 uppercase tracking-widest">URL do Logo (Substitui o diamante)</label>
                    <input value={content.logoUrl} onChange={e => setContent({...content, logoUrl: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white text-xs font-mono" placeholder="https://..." />
                  </div>
                </div>
                <div className="bg-[#080808] border border-white/5 p-8 space-y-6">
                  <h4 className="text-antique-gold font-gothic flex items-center gap-2 uppercase text-lg"><Type size={18}/> Hero Section</h4>
                  <div className="space-y-4">
                    <input value={content.heroTitle} onChange={e => setContent({...content, heroTitle: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white text-xl" placeholder="Título Principal" />
                    <input value={content.heroTitleSuffix} onChange={e => setContent({...content, heroTitleSuffix: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-antique-gold text-xl" placeholder="Sufixo Dourado" />
                    <textarea value={content.heroSubtitle} onChange={e => setContent({...content, heroSubtitle: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-gray-400 text-sm h-24" placeholder="Subtítulo" />
                  </div>
                </div>
              </div>
            )}
            
            {/* Outros painéis de conteúdo mantidos de forma resumida... */}
            {contentTab === 'lore' && (
              <div className="bg-[#080808] border border-white/5 p-8 space-y-6">
                <h4 className="text-antique-gold font-gothic flex items-center gap-2 uppercase text-lg"><Book size={18}/> Textos da Lore</h4>
                <div className="grid gap-4">
                  <input value={content.lorePageHeaderTitle} onChange={e => setContent({...content, lorePageHeaderTitle: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-white" placeholder="Título da Página" />
                  <textarea value={content.lorePageHeaderSubtitle} onChange={e => setContent({...content, lorePageHeaderSubtitle: e.target.value})} className="w-full bg-black border border-white/10 p-3 text-gray-400 text-xs h-20" placeholder="Subtítulo" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* SEÇÃO: LINHAGENS (RESTAURADA) */}
        {activeTab === 'lineages' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-4xl font-gothic text-white uppercase tracking-tighter">Bio-Matriz Genética</h2>
              <button onClick={() => updateList('lineages', [...lineages, { id: Date.now().toString(), name: 'Nova Linhagem', description: '', icon: 'Zap', color: '#ffffff', stats: { influence: 50, potency: 50, survival: 50 } }])} className="px-8 py-4 bg-purple-600 text-white font-tech text-xs font-black tracking-widest hover:bg-purple-500 transition-all flex items-center gap-2 shadow-lg"><Plus size={16}/> INJETAR AMOSTRA</button>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {lineages.map((line, idx) => (
                <div key={line.id} className="bg-[#080808] border border-white/5 p-10 space-y-6 group hover:border-purple-600/30 transition-all">
                  <div className="flex justify-between items-start">
                    <input className="bg-transparent text-2xl font-gothic text-white border-b border-white/10 outline-none w-full mr-6 focus:border-purple-600" value={line.name} onChange={e => {
                      const newList = [...lineages];
                      newList[idx].name = e.target.value;
                      updateList('lineages', newList);
                    }} />
                    <button onClick={() => updateList('lineages', lineages.filter(l => l.id !== line.id))} className="text-red-500 p-2 hover:bg-red-500/10 rounded-full transition-all"><Trash2 size={20}/></button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-tech text-gray-500 uppercase flex items-center gap-2"><Palette size={12}/> Aura (Cor)</label>
                      <input type="color" className="w-full h-10 bg-black border border-white/10 p-1 rounded-sm" value={line.color} onChange={e => {
                        const newList = [...lineages];
                        newList[idx].color = e.target.value;
                        updateList('lineages', newList);
                      }} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-tech text-gray-500 uppercase flex items-center gap-2"><Zap size={12}/> Ícone (Lucide)</label>
                      <input className="w-full bg-black border border-white/10 p-2 text-white text-xs" value={line.icon} placeholder="Ex: Sparkles, Moon, Zap" onChange={e => {
                        const newList = [...lineages];
                        newList[idx].icon = e.target.value;
                        updateList('lineages', newList);
                      }} />
                    </div>
                  </div>

                  <textarea className="w-full bg-black border border-white/10 p-4 text-sm text-gray-300 h-28 focus:border-purple-600 outline-none" value={line.description} onChange={e => {
                    const newList = [...lineages];
                    newList[idx].description = e.target.value;
                    updateList('lineages', newList);
                  }} />
                  
                  <div className="grid grid-cols-3 gap-4">
                    {['influence', 'potency', 'survival'].map(stat => (
                      <div key={stat}>
                        <label className="text-[8px] text-gray-600 uppercase font-tech mb-1 block">{stat}</label>
                        <input type="number" max="100" min="0" className="w-full bg-black border border-white/10 p-2 text-white text-xs" value={(line.stats as any)[stat]} onChange={e => {
                          const newList = [...lineages];
                          (newList[idx].stats as any)[stat] = parseInt(e.target.value);
                          updateList('lineages', newList);
                        }} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEÇÃO: FRATERNIDADES */}
        {activeTab === 'fraternities' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-4xl font-gothic text-blue-500 uppercase tracking-tighter">Sociedades Secretas</h2>
              <button onClick={() => updateList('fraternities', [...fraternities, { id: Date.now().toString(), name: 'Nova', example: 'Sociedade...', facade: '...', imageUrl: '' }])} className="px-8 py-4 bg-blue-600 text-white font-tech text-xs font-black tracking-widest hover:bg-blue-500 transition-all flex items-center gap-2"><Plus size={16}/> NOVA SOCIEDADE</button>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {fraternities.map((frat, idx) => (
                <div key={frat.id} className="bg-[#080808] border border-blue-900/20 p-10 space-y-6">
                  <div className="flex justify-between items-center">
                    <input className="bg-transparent text-2xl font-gothic text-blue-400 border-b border-white/10 outline-none w-full mr-6" value={frat.name} onChange={e => {
                      const newList = [...fraternities];
                      newList[idx].name = e.target.value;
                      updateList('fraternities', newList);
                    }} />
                    <button onClick={() => updateList('fraternities', fraternities.filter(f => f.id !== frat.id))} className="text-red-500 p-2 hover:bg-red-500/10 transition-all rounded-full"><Trash2 size={20}/></button>
                  </div>
                  <input className="w-full bg-black border border-white/10 p-3 text-white text-sm" placeholder="Nome da Fraternidade" value={frat.example} onChange={e => {
                    const newList = [...fraternities];
                    newList[idx].example = e.target.value;
                    updateList('fraternities', newList);
                  }} />
                  <textarea className="w-full bg-black border border-white/10 p-3 text-white text-xs h-20" placeholder="Fachada oficial..." value={frat.facade} onChange={e => {
                    const newList = [...fraternities];
                    newList[idx].facade = e.target.value;
                    updateList('fraternities', newList);
                  }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEÇÃO: VIP */}
        {activeTab === 'vip' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-4xl font-gothic text-white uppercase tracking-tighter text-antique-gold font-bold">Planos de Apoio</h2>
              <button onClick={() => updateList('vipPlans', [...vipPlans, { id: Date.now().toString(), name: 'Novo Plano', price: '0,00', icon: 'Crown', benefits: ['Benefício 1'] }])} className="px-8 py-4 bg-antique-gold text-black font-tech text-xs font-black tracking-widest hover:brightness-110 transition-all flex items-center gap-2">
                <Plus size={16}/> NOVO PLANO
              </button>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {vipPlans.map((plan, idx) => (
                <div key={plan.id} className="bg-white/[0.02] border border-antique-gold/10 p-10 space-y-6">
                  <div className="flex justify-between items-start">
                    <input className="bg-transparent font-gothic text-white border-b border-white/5 outline-none text-2xl w-full mr-4" value={plan.name} onChange={e => {
                      const newList = [...vipPlans];
                      newList[idx].name = e.target.value;
                      updateList('vipPlans', newList);
                    }} />
                    <button onClick={() => updateList('vipPlans', vipPlans.filter(p => p.id !== plan.id))} className="text-red-500 p-2 hover:bg-red-500/10 transition-all rounded-full"><Trash2 size={16}/></button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-antique-gold font-tech font-black text-xl">R$</span>
                    <input className="bg-black border border-white/10 p-4 text-white font-tech text-2xl w-full" value={plan.price} onChange={e => {
                      const newList = [...vipPlans];
                      newList[idx].price = e.target.value;
                      updateList('vipPlans', newList);
                    }} />
                  </div>
                  <textarea className="w-full bg-black border border-white/10 p-5 text-xs text-gray-400 h-48 focus:border-antique-gold outline-none leading-relaxed" value={plan.benefits.join('\n')} onChange={e => {
                    const newList = [...vipPlans];
                    newList[idx].benefits = e.target.value.split('\n');
                    updateList('vipPlans', newList);
                  }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEÇÃO: STAFF */}
        {activeTab === 'users' && isAdmin && (
          <div className="space-y-10 animate-in fade-in">
             <div className="bg-[#080808] border border-white/5 p-10 shadow-2xl max-w-4xl">
                <h3 className="text-white font-gothic uppercase flex items-center gap-3 mb-8 text-xl"><UserPlus size={22}/> Adicionar Staff</h3>
                <form onSubmit={handleAddUser} className="grid md:grid-cols-4 gap-6 items-end">
                  <input required value={newUsername} onChange={e => setNewUsername(e.target.value)} className="w-full bg-black border border-white/10 p-4 text-white text-sm" placeholder="Login" />
                  <input required type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-black border border-white/10 p-4 text-white text-sm" placeholder="Senha" />
                  <select value={newRole} onChange={e => setNewRole(e.target.value as Permission)} className="w-full bg-black border border-white/10 p-4 text-white text-xs">
                    <option value="EDITOR">EDITOR</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                  <button type="submit" className="bg-white text-black py-4.5 font-tech text-xs font-black uppercase tracking-widest hover:bg-antique-gold transition-all">AUTORIZAR</button>
                </form>
             </div>
             <div className="grid gap-3">
                {usersList.map(u => (
                  <div key={u.id} className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-6">
                    <div className="flex items-center gap-6">
                      <Shield size={20} className={u.role === 'ADMIN' ? 'text-red-600' : 'text-blue-500'} />
                      <div className="text-white font-mono-rp text-2xl tracking-widest">{u.username}</div>
                    </div>
                    {u.username !== 'Panda' && (
                      <button onClick={() => deleteUser(u.id!)} className="text-red-500 p-2 hover:bg-red-500/10 rounded-full transition-all"><Trash2 size={24}/></button>
                    )}
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* SEÇÃO: CONFIG */}
        {activeTab === 'settings' && isAdmin && (
          <div className="bg-[#080808] border border-white/10 p-12 max-w-2xl space-y-8 animate-in slide-in-from-right-4">
            <h3 className="text-white font-gothic uppercase flex items-center gap-3 text-2xl"><Bell size={24}/> Webhooks do Discord</h3>
            <div className="space-y-3">
              <label className="text-[10px] font-tech text-gray-500 uppercase tracking-[0.3em]">URL do Webhook</label>
              <input 
                value={content.webhookUrl || ""} 
                onChange={e => setContent({...content, webhookUrl: e.target.value})}
                className="w-full bg-black border border-white/10 p-5 text-white font-mono-rp focus:border-antique-gold outline-none text-lg"
                placeholder="https://discord.com/api/webhooks/..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Botão Global de Sincronização */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200]">
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="group relative flex items-center gap-8 px-24 py-8 bg-black border-2 border-white text-white font-tech font-black uppercase tracking-[0.8em] shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-700 disabled:opacity-50"
        >
          <div className="relative z-10 flex items-center gap-4 text-sm">
            {saving ? <Loader2 className="animate-spin" /> : <Save size={24} />} 
            SINCRONIZAR DATABASE
          </div>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;