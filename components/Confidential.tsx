
import React, { useState, useEffect } from 'react';
import { FileWarning, Lock, Eye } from 'lucide-react';
import { cmsService, DEFAULT_CONTENT } from '../services/cmsService';
import EditableText from './EditableText';
import { SiteContent } from '../types';

interface ConfidentialProps {
  isEditMode?: boolean;
}

const Confidential: React.FC<ConfidentialProps> = ({ isEditMode = false }) => {
  // Fixed: Initialize with DEFAULT_CONTENT synchronously
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);

  useEffect(() => {
    // Fixed: Handle async content fetching
    const fetchContent = async () => {
      const data = await cmsService.getContent();
      setContent(data);
    };
    fetchContent();

    const updateCms = async () => {
      const data = await cmsService.getContent();
      setContent(data);
    };
    
    window.addEventListener('cms-update', updateCms);
    return () => window.removeEventListener('cms-update', updateCms);
  }, []);

  return (
    <section id="confidencial" className="py-32 px-4 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 space-y-8">
            <div className="flex items-center gap-4 text-red-500 animate-pulse">
              <FileWarning size={24} />
              <span className="font-tech text-xs tracking-[0.5em] uppercase">Restricted Access Level 5</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-gothic font-black text-white leading-none uppercase">
              <EditableText cmsKey="confidentialTitle" isEditMode={isEditMode} />
            </h2>
            <div className="text-gray-500 text-lg leading-relaxed font-mono-rp p-1">
              <EditableText cmsKey="confidentialText" isEditMode={isEditMode} multiline />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="p-4 border border-red-900/30 bg-red-900/5 group cursor-pointer hover:bg-red-900/20 transition-all">
                  <Lock size={16} className="text-red-500 mb-2" />
                  <div className="text-[10px] font-tech text-white mb-1 uppercase">Case #0012 - Midnight Bloom</div>
                  <div className="text-[9px] font-tech text-gray-600 uppercase">Status: Encrypted</div>
               </div>
               <div className="p-4 border border-white/5 bg-white/5 group cursor-pointer hover:bg-white/10 transition-all">
                  <Eye size={16} className="text-gray-400 mb-2" />
                  <div className="text-[10px] font-tech text-white mb-1 uppercase">D.I.P Surveillance Log</div>
                  <div className="text-[9px] font-tech text-gray-600 uppercase">Status: Leaked</div>
               </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-red-600/5 blur-[100px] rounded-full"></div>
            <div className="relative border border-white/10 p-8 md:p-12 bg-[#050505] transform rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="absolute top-4 right-4 text-[10px] font-mono-rp text-red-600 border border-red-600 px-2 py-1">TOP SECRET</div>
               <div className="space-y-6 font-mono-rp text-gray-400 text-sm">
                  <p>SUBJECT: EXAMEN SOUL-RETRIEVAL (ID: 0x892)</p>
                  <p>DATE: 12-OCT-1892</p>
                  <div className="h-[1px] w-full bg-white/5"></div>
                  <p className="bg-white/5 line-through">Incident occurred during the late night ritual near the library. Subject exhibited total biological transformation.</p>
                  <p>Witnesses reported <span className="bg-black text-black px-4">DELETED</span> emanating from the eyes. Staff intervention successful. Evidence incinerated.</p>
                  <p className="text-antique-gold italic">"Knowledge is a fire, but the source is eternal darkness."</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Confidential;
