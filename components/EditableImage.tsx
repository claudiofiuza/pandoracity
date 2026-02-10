
import React, { useState, useEffect } from 'react';
import { cmsService, DEFAULT_CONTENT } from '../services/cmsService';
import { ImageIcon, Check, X, Wand2 } from 'lucide-react';
import { SiteContent } from '../types';
import NanoImage from './NanoImage';

interface EditableImageProps {
  cmsKey: string;
  isEditMode: boolean;
  className?: string;
  prompt?: string;
  overlay?: boolean;
}

const EditableImage: React.FC<EditableImageProps> = ({ cmsKey, isEditMode, className = "", prompt = "", overlay = false }) => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState("");

  const fetchData = async () => {
    const data = await cmsService.getContent();
    setContent(data);
  };

  useEffect(() => {
    fetchData();
    const updateCms = () => fetchData();
    window.addEventListener('cms-update', updateCms);
    return () => window.removeEventListener('cms-update', updateCms);
  }, []);

  const currentValue = content[cmsKey] || "";

  const handleStartEdit = (e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.stopPropagation();
    setTempValue(currentValue);
    setIsEditing(true);
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await cmsService.updateKey(cmsKey, tempValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`relative ${className} border-2 border-antique-gold bg-black/80 flex flex-col items-center justify-center p-4`}>
        <div className="w-full space-y-4">
          <div className="flex items-center gap-2 text-antique-gold font-tech text-[10px] uppercase">
             <ImageIcon size={14} /> URL da Imagem
          </div>
          <input
            autoFocus
            className="w-full bg-black border border-antique-gold/30 p-2 text-white text-xs outline-none"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            placeholder="Cole a URL da imagem aqui..."
          />
          <div className="flex gap-2 justify-end">
            <button onClick={handleSave} className="px-3 py-1 bg-green-600 text-white text-[10px] font-bold uppercase flex items-center gap-1">
              <Check size={12} /> Salvar
            </button>
            <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase flex items-center gap-1">
              <X size={12} /> Sair
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative group/editable-img transition-all ${isEditMode ? 'cursor-edit hover:ring-4 hover:ring-antique-gold/50' : ''} ${className}`}
      onClick={handleStartEdit}
    >
      {isEditMode && (
        <div className="absolute inset-0 z-50 bg-black/40 flex items-center justify-center opacity-0 group-hover/editable-img:opacity-100 transition-opacity pointer-events-none">
           <div className="bg-antique-gold text-black px-4 py-2 font-tech font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
              <ImageIcon size={14} /> Editar Imagem
           </div>
        </div>
      )}
      <NanoImage prompt={prompt} fallbackUrl={currentValue} className="w-full h-full" overlay={overlay} />
    </div>
  );
};

export default EditableImage;
