
import React, { useState } from 'react';
import { X, ShieldCheck, Lock, User as UserIcon, Loader2 } from 'lucide-react';
import { User } from '../types';
import { supabase } from '../supabaseClient';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Hardcoded master login just in case
    if (username === 'Panda' && password === '12345') {
       onLogin({ id: 'master', username: 'Panda', role: 'ADMIN' });
       setLoading(false);
       return;
    }

    const { data, error: sbError } = await supabase
      .from('staff_users')
      .select('*')
      .eq('username', username)
      .eq('password', password) // Idealmente usar hash aqui
      .single();
    
    if (sbError || !data) {
      setError('Acesso negado. Credenciais não encontradas no banco de dados.');
    } else {
      onLogin(data);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-[#050505] border border-antique-gold/20 p-8 md:p-12 animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-antique-gold rotate-45 flex items-center justify-center mx-auto mb-8 bg-antique-gold/10">
            <ShieldCheck className="text-antique-gold -rotate-45" size={32} />
          </div>
          <h2 className="font-gothic text-3xl text-white font-bold uppercase tracking-widest">Infiltrar Sistema</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="font-tech text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <UserIcon size={12} /> Identificação
            </label>
            <input required type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-black border border-white/10 p-4 font-mono-rp text-white focus:border-antique-gold outline-none" />
          </div>
          <div className="space-y-2">
            <label className="font-tech text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Lock size={12} /> Criptografia
            </label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-black border border-white/10 p-4 font-mono-rp text-white focus:border-antique-gold outline-none" />
          </div>
          {error && <div className="text-red-500 font-mono-rp text-xs text-center border border-red-500/20 p-2 bg-red-500/5">{error}</div>}
          <button type="submit" disabled={loading} className="w-full py-4 bg-antique-gold text-black font-tech text-xs font-black uppercase flex justify-center items-center gap-3">
            {loading ? <Loader2 className="animate-spin" size={16} /> : 'Autenticar Acesso'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
