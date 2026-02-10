
import React, { useState, useEffect } from 'react';
import { cmsService, DEFAULT_CONTENT } from '../services/cmsService';
import { Edit2, Check, X } from 'lucide-react';
import { SiteContent } from '../types';

interface EditableTextProps {
  cmsKey: string;
  isEditMode: boolean;
  className?: string;
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({ cmsKey, isEditMode, className = "", multiline = false }) => {
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

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`relative inline-block w-full ${className}`}>
        {multiline ? (
          <textarea
            autoFocus
            className="w-full bg-black/80 border border-antique-gold p-2 text-white font-inherit outline-none rounded-sm resize-none"
            value={tempValue}
            rows={4}
            onChange={(e) => setTempValue(e.target.value)}
          />
        ) : (
          <input
            autoFocus
            className="w-full bg-black/80 border border-antique-gold p-2 text-white font-inherit outline-none rounded-sm"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          />
        )}
        <div className="absolute top-full right-0 mt-1 flex gap-1 z-[150]">
          <button onClick={handleSave} className="p-1 bg-green-600 text-white rounded-sm hover:bg-green-700">
            <Check size={14} />
          </button>
          <button onClick={handleCancel} className="p-1 bg-red-600 text-white rounded-sm hover:bg-red-700">
            <X size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative group/editable transition-all ${isEditMode ? 'cursor-edit hover:outline hover:outline-1 hover:outline-antique-gold/50 p-1 -m-1' : ''} ${className}`}
      onClick={handleStartEdit}
    >
      {isEditMode && (
        <div className="absolute -top-6 -right-2 opacity-0 group-hover/editable:opacity-100 transition-opacity bg-antique-gold text-black px-1 py-0.5 text-[8px] font-bold uppercase rounded-t-sm flex items-center gap-1">
          <Edit2 size={8} /> Click to Edit
        </div>
      )}
      {currentValue}
    </div>
  );
};

export default EditableText;
