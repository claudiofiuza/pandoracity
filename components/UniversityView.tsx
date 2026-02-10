
import React from 'react';
import EditableImage from './EditableImage';
import EditableText from './EditableText';
import { BookOpen, GraduationCap, Microscope, Shield } from 'lucide-react';

interface UniversityViewProps {
  isEditMode?: boolean;
}

const UniversityView: React.FC<UniversityViewProps> = ({ isEditMode = false }) => {
  return (
    <div className="min-h-screen animate-in fade-in duration-700">
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="font-gothic text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase">
            <EditableText cmsKey="uniPageTitle" isEditMode={isEditMode} />
          </h1>
          <p className="max-w-3xl mx-auto text-gray-500 text-lg font-light leading-relaxed">
            <EditableText cmsKey="uniPageSubtitle" isEditMode={isEditMode} multiline />
          </p>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {/* Facility 1 */}
          <div className="p-12 lg:p-20 bg-black group overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-all duration-700">
              <EditableImage cmsKey="uniFacility1Image" isEditMode={isEditMode} prompt="Huge dark gothic library" className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <BookOpen className="text-antique-gold mb-8" size={48} />
              <h3 className="font-gothic text-4xl text-white mb-4">
                <EditableText cmsKey="uniFacility1Title" isEditMode={isEditMode} />
              </h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                <EditableText cmsKey="uniFacility1Text" isEditMode={isEditMode} multiline />
              </p>
              <div className="font-tech text-[10px] text-antique-gold tracking-widest uppercase border-l border-antique-gold pl-4">Restricted Access Required</div>
            </div>
          </div>

          {/* Facility 2 */}
          <div className="p-12 lg:p-20 bg-[#080808] group overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-all duration-700">
              <EditableImage cmsKey="uniFacility2Image" isEditMode={isEditMode} prompt="Futuristic bio-laboratory" className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <Microscope className="text-purple-500 mb-8" size={48} />
              <h3 className="font-gothic text-4xl text-white mb-4">
                <EditableText cmsKey="uniFacility2Title" isEditMode={isEditMode} />
              </h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                <EditableText cmsKey="uniFacility2Text" isEditMode={isEditMode} multiline />
              </p>
              <div className="font-tech text-[10px] text-purple-500 tracking-widest uppercase border-l border-purple-500 pl-4">Security Level 4 Clearances</div>
            </div>
          </div>
          
          {/* Facility 3 */}
          <div className="p-12 lg:p-20 bg-[#080808] group overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-all duration-700">
              <EditableImage cmsKey="uniFacility3Image" isEditMode={isEditMode} prompt="University dorm rooms gothic" className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <GraduationCap className="text-white/40 mb-8" size={48} />
              <h3 className="font-gothic text-4xl text-white mb-4">
                <EditableText cmsKey="uniFacility3Title" isEditMode={isEditMode} />
              </h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                <EditableText cmsKey="uniFacility3Text" isEditMode={isEditMode} multiline />
              </p>
              <div className="font-tech text-[10px] text-white/40 tracking-widest uppercase border-l border-white/20 pl-4">Invitation Only</div>
            </div>
          </div>

          {/* Facility 4 */}
          <div className="p-12 lg:p-20 bg-black group overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-all duration-700">
              <EditableImage cmsKey="uniFacility4Image" isEditMode={isEditMode} prompt="Underground police bunker" className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <Shield className="text-blue-500 mb-8" size={48} />
              <h3 className="font-gothic text-4xl text-white mb-4">
                <EditableText cmsKey="uniFacility4Title" isEditMode={isEditMode} />
              </h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                <EditableText cmsKey="uniFacility4Text" isEditMode={isEditMode} multiline />
              </p>
              <div className="font-tech text-[10px] text-blue-500 tracking-widest uppercase border-l border-blue-500 pl-4">Law Enforcement Zone</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-gothic text-6xl text-white mb-8">
              <EditableText cmsKey="uniUnderTitle" isEditMode={isEditMode} />
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
              <EditableText cmsKey="uniUnderText" isEditMode={isEditMode} multiline />
            </p>
            <div className="space-y-4">
              <div className="p-4 border border-white/5 bg-white/[0.02] flex justify-between items-center font-tech text-xs">
                <span className="text-antique-gold"><EditableText cmsKey="uniLevel1Label" isEditMode={isEditMode} /></span>
                <span className="text-gray-500"><EditableText cmsKey="uniLevel1Desc" isEditMode={isEditMode} /></span>
              </div>
              <div className="p-4 border border-white/5 bg-white/[0.02] flex justify-between items-center font-tech text-xs">
                <span className="text-antique-gold"><EditableText cmsKey="uniLevel2Label" isEditMode={isEditMode} /></span>
                <span className="text-gray-500"><EditableText cmsKey="uniLevel2Desc" isEditMode={isEditMode} /></span>
              </div>
              <div className="p-4 border border-white/5 bg-white/[0.02] flex justify-between items-center font-tech text-xs">
                <span className="text-antique-gold"><EditableText cmsKey="uniLevel3Label" isEditMode={isEditMode} /></span>
                <span className="text-gray-500"><EditableText cmsKey="uniLevel3Desc" isEditMode={isEditMode} /></span>
              </div>
              <div className="p-4 border border-red-900/20 bg-red-900/5 flex justify-between items-center font-tech text-xs">
                <span className="text-red-600 animate-pulse"><EditableText cmsKey="uniLevel4Label" isEditMode={isEditMode} /></span>
                <span className="text-red-900 uppercase font-black"><EditableText cmsKey="uniLevel4Desc" isEditMode={isEditMode} /></span>
              </div>
            </div>
          </div>
          <div className="relative group">
            <EditableImage 
              cmsKey="uniUnderImage" 
              isEditMode={isEditMode} 
              prompt="Blueprint of a massive underground university facility"
              className="w-full aspect-square border border-white/10 p-4 bg-black" 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default UniversityView;
