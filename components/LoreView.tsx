
import React from 'react';
import EditableImage from './EditableImage';
import EditableText from './EditableText';
import { History, MapPin, Search } from 'lucide-react';

interface LoreViewProps {
  isEditMode?: boolean;
}

const LoreView: React.FC<LoreViewProps> = ({ isEditMode = false }) => {
  return (
    <div className="min-h-screen animate-in fade-in duration-700">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <EditableImage 
            cmsKey="lorePageHeaderImage"
            isEditMode={isEditMode}
            prompt="Old 1892 map of a gothic coastal city with supernatural sigils"
            className="w-full h-full opacity-40 grayscale contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-gothic text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">
            <EditableText cmsKey="lorePageHeaderTitle" isEditMode={isEditMode} />
          </h1>
          <p className="font-tech text-gray-400 text-xs tracking-[0.5em] uppercase">
            <EditableText cmsKey="lorePageHeaderSubtitle" isEditMode={isEditMode} />
          </p>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="p-4 bg-antique-gold/10 border border-antique-gold/20 rounded-sm">
                <History className="text-antique-gold" size={32} />
              </div>
              <div>
                <h3 className="font-gothic text-2xl text-white mb-4">
                  <EditableText cmsKey="lorePageTimeline1Title" isEditMode={isEditMode} />
                </h3>
                <p className="text-gray-400 leading-relaxed font-light">
                  <EditableText cmsKey="lorePageTimeline1Text" isEditMode={isEditMode} multiline />
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-sm">
                <MapPin className="text-red-500" size={32} />
              </div>
              <div>
                <h3 className="font-gothic text-2xl text-white mb-4">
                  <EditableText cmsKey="lorePageTimeline2Title" isEditMode={isEditMode} />
                </h3>
                <p className="text-gray-400 leading-relaxed font-light">
                  <EditableText cmsKey="lorePageTimeline2Text" isEditMode={isEditMode} multiline />
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <EditableImage 
              cmsKey="lorePageTimelineImage"
              isEditMode={isEditMode}
              prompt="Gothic architecture alleyway at night, thick purple fog"
              className="w-full aspect-[4/5] border border-white/10 rounded-sm p-2 bg-white/[0.02]"
            />
          </div>
        </div>
      </section>

      <section className="py-32 bg-white/[0.01] border-y border-white/5 relative">
        <div className="max-w-4xl mx-auto text-center px-6">
          <Search className="mx-auto text-antique-gold mb-8 animate-pulse" size={48} />
          <h2 className="font-gothic text-4xl text-white mb-6 uppercase">
            <EditableText cmsKey="lorePageSecretTitle" isEditMode={isEditMode} />
          </h2>
          <p className="text-gray-400 text-lg italic mb-12">
            <EditableText cmsKey="lorePageSecretText" isEditMode={isEditMode} multiline />
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-tech text-[10px] tracking-[0.3em] uppercase">
            <div className="p-6 border border-white/5 hover:border-antique-gold/30 transition-all cursor-crosshair">A Cripta de Thorne</div>
            <div className="p-6 border border-white/5 hover:border-antique-gold/30 transition-all cursor-crosshair">O Códice de Sangue</div>
            <div className="p-6 border border-white/5 hover:border-antique-gold/30 transition-all cursor-crosshair">O Eco de 1944</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoreView;
