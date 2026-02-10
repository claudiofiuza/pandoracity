
import React, { useState, useEffect } from 'react';
import { User, Permission, SiteContent, Lineage, Fraternity, VipPlan } from '../types';
import { Users, Layout, Save, UserPlus, Trash2, Shield, Image as ImageIcon, Type, Settings as SettingsIcon, Link as LinkIcon, Calendar, FileWarning, Loader2, Plus, Sparkles, GraduationCap, Crown } from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { supabase } from '../supabaseClient';

interface AdminDashboardProps {
  user: User | null;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'content' | 'lineages' | 'fraternities' | 'vip' | 'event'>('event');
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
    await cmsService.saveContent(content);
    setSaving(false);
    alert('Sistema Pandora atualizado com sucesso.');
  };

  // List management helpers
  const updateList = (key: keyof SiteContent, newList: any[]) => {
    if (!content) return;
    setContent({ ...content, [key]: JSON.stringify(newList) });
  };

  if (!content) return null;

  const lineages: Lineage[] = JSON.parse(content.lineages || '[]');
  const fraternities: Fraternity[] = JSON.parse(content.fraternities || '[]');
  const vipPlans: VipPlan[] = JSON.parse(content.vipPlans || '[]');

  return (
    <div className="min-h-screen animate-in fade-in duration-700 pb-24 px-6 max-w-7xl mx-auto pt-12">
      <div className="flex flex-wrap gap-2 mb-12 border-b border-white/5 pb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <button onClick={() => setActiveTab('event')} className={`flex items-center gap-2 px-6 py-3 font-tech text-[9px] tracking-widest uppercase transition-all ${activeTab === 'event' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'}`}>
          <Calendar size={14} /> Evento
        </button>
        {isAdmin && (
          <>
            <button onClick={() => setActiveTab('lineages')} className={`flex items-center gap-2 px-6 py-3 font-tech text-[9px] tracking-widest uppercase transition-all ${activeTab === 'lineages' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-white'}`}>
              <Sparkles size={14} /> Linhagens
            </button>
            <button onClick={() => setActiveTab('fraternities')} className={`flex items-center gap-2 px-6 py-3 font-tech text-[9px] tracking-widest uppercase transition-all ${activeTab === 'fraternities' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-white'}`}>
              <GraduationCap size={14} /> Fraternidades
            </button>
            <button onClick={() => setActiveTab('vip')} className={`flex items-center gap-2 px-6 py-3 font-tech text-[9px] tracking-widest uppercase transition-all ${activeTab === 'vip' ? 'bg-antique-gold text-black font-black' : 'text-gray-500 hover:text-white'}`}>
              <Crown size={14} /> Planos VIP
            </button>
            <button onClick={() => setActiveTab('content')} className={`flex items-center gap-2 px-6 py-3 font-tech text-[9px] tracking-widest uppercase transition-all ${activeTab === 'content' ? 'bg-white text-black font-black' : 'text-gray-500 hover:text-white'}`}>
              <Layout size={14} /> Textos Gerais
            </button>
            <button onClick={() => setActiveTab('users')} className={`flex items-center gap-2 px-6 py-3 font-tech text-[9px] tracking-widest uppercase transition-all ${activeTab === 'users' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-white'}`}>
              <Users size={14} /> Staff
            </button>
          </>
        )}
      </div>

      <div className="animate-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'lineages' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-gothic text-white">GESTÃO DE LINHAGENS</h2>
              <button onClick={() => updateList('lineages', [...lineages, { id: Date.now().toString(), name: 'Nova Linhagem', description: '', icon: 'Zap', color: '#ffffff', stats: { influence: 50, potency: 50, survival: 50 } }])} className="px-4 py-2 bg-purple-600 text-white font-tech text-[10px] flex items-center gap-2"><Plus size={14}/> ADICIONAR</button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {lineages.map((line, idx) => (
                <div key={line.id} className="bg-white/[0.02] border border-white/5 p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <input className="bg-transparent text-xl font-gothic text-antique-gold border-b border-white/10 outline-none w-2/3" value={line.name} onChange={e => {
                      const newList = [...lineages];
                      newList[idx].name = e.target.value;
                      updateList('lineages', newList);
                    }} />
                    <button onClick={() => updateList('lineages', lineages.filter(l => l.id !== line.id))} className="text-red-500 p-2 hover:bg-red-500/10 rounded-full transition-all"><Trash2 size={16}/></button>
                  </div>
                  <textarea className="w-full bg-black/40 border border-white/5 p-3 text-sm text-gray-400 outline-none min-h-[80px]" value={line.description} onChange={e => {
                    const newList = [...lineages];
                    newList[idx].description = e.target.value;
                    updateList('lineages', newList);
                  }} />
                  <div className="grid grid-cols-3 gap-4">
                    {['influence', 'potency', 'survival'].map((stat) => (
                      <div key={stat}>
                        <label className="text-[9px] font-tech text-gray-600 uppercase">{stat}</label>
                        <input type="number" className="w-full bg-black p-2 border border-white/5 text-white" value={(line.stats as any)[stat]} onChange={e => {
                          const newList = [...lineages];
                          (newList[idx].stats as any)[stat] = parseInt(e.target.value);
                          updateList('lineages', newList);
                        }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-[9px] font-tech text-gray-600 uppercase">Ícone Lucide</label>
                      <input className="w-full bg-black p-2 border border-white/5 text-xs text-white" value={line.icon} onChange={e => {
                        const newList = [...lineages];
                        newList[idx].icon = e.target.value;
                        updateList('lineages', newList);
                      }} />
                    </div>
                    <div className="w-24">
                      <label className="text-[9px] font-tech text-gray-600 uppercase">Cor</label>
                      <input type="color" className="w-full h-8 bg-transparent" value={line.color} onChange={e => {
                        const newList = [...lineages];
                        newList[idx].color = e.target.value;
                        updateList('lineages', newList);
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'fraternities' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-gothic text-white">GESTÃO DE FRATERNIDADES</h2>
              <button onClick={() => updateList('fraternities', [...fraternities, { id: Date.now().toString(), name: 'Nova Raça', example: 'Fraternidade...', facade: 'Fachada...', imageUrl: '' }])} className="px-4 py-2 bg-blue-600 text-white font-tech text-[10px] flex items-center gap-2"><Plus size={14}/> ADICIONAR</button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {fraternities.map((frat, idx) => (
                <div key={frat.id} className="bg-white/[0.02] border border-white/5 p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <input className="bg-transparent text-xl font-gothic text-blue-400 border-b border-white/10 outline-none w-2/3" value={frat.name} onChange={e => {
                      const newList = [...fraternities];
                      newList[idx].name = e.target.value;
                      updateList('fraternities', newList);
                    }} />
                    <button onClick={() => updateList('fraternities', fraternities.filter(f => f.id !== frat.id))} className="text-red-500 p-2 hover:bg-red-500/10 rounded-full transition-all"><Trash2 size={16}/></button>
                  </div>
                  <input className="w-full bg-black p-2 border border-white/5 text-sm" value={frat.example} placeholder="Nome da Fraternidade" onChange={e => {
                    const newList = [...fraternities];
                    newList[idx].example = e.target.value;
                    updateList('fraternities', newList);
                  }} />
                  <input className="w-full bg-black p-2 border border-white/5 text-sm" value={frat.facade} placeholder="Fachada no Campus" onChange={e => {
                    const newList = [...fraternities];
                    newList[idx].facade = e.target.value;
                    updateList('fraternities', newList);
                  }} />
                  <input className="w-full bg-black p-2 border border-white/5 text-xs font-tech" value={frat.imageUrl} placeholder="URL da Imagem" onChange={e => {
                    const newList = [...fraternities];
                    newList[idx].imageUrl = e.target.value;
                    updateList('fraternities', newList);
                  }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'vip' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-gothic text-white">PLANOS SOBERANOS</h2>
              <button onClick={() => updateList('vipPlans', [...vipPlans, { id: Date.now().toString(), name: 'Novo Plano', price: '0,00', icon: 'Star', benefits: ['Benefício 1'] }])} className="px-4 py-2 bg-antique-gold text-black font-tech font-bold text-[10px] flex items-center gap-2"><Plus size={14}/> NOVO TIER</button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {vipPlans.map((plan, idx) => (
                <div key={plan.id} className={`bg-white/[0.02] border p-6 space-y-4 ${plan.isPopular ? 'border-antique-gold shadow-lg' : 'border-white/5'}`}>
                  <div className="flex justify-between">
                    <input className="bg-transparent font-gothic text-white border-b border-white/5 outline-none text-lg" value={plan.name} onChange={e => {
                      const newList = [...vipPlans];
                      newList[idx].name = e.target.value;
                      updateList('vipPlans', newList);
                    }} />
                    <button onClick={() => updateList('vipPlans', vipPlans.filter(p => p.id !== plan.id))} className="text-red-500"><Trash2 size={14}/></button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-antique-gold font-tech">R$</span>
                    <input className="bg-black p-2 text-white border border-white/5 w-24" value={plan.price} onChange={e => {
                      const newList = [...vipPlans];
                      newList[idx].price = e.target.value;
                      updateList('vipPlans', newList);
                    }} />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={plan.isPopular} onChange={e => {
                      const newList = [...vipPlans];
                      newList[idx].isPopular = e.target.checked;
                      updateList('vipPlans', newList);
                    }} />
                    <label className="text-[10px] font-tech text-gray-500 uppercase">Destaque Popular</label>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-tech text-gray-600 uppercase">Benefícios (Um por linha)</label>
                    <textarea className="w-full bg-black p-3 text-xs text-gray-400 border border-white/5 min-h-[120px]" value={plan.benefits.join('\n')} onChange={e => {
                      const newList = [...vipPlans];
                      newList[idx].benefits = e.target.value.split('\n');
                      updateList('vipPlans', newList);
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Tabs Content... */}
        
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200]">
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="flex items-center gap-4 px-12 py-5 bg-white text-black font-tech font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-antique-gold transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save />} PUBLICAR ALTERAÇÕES
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
