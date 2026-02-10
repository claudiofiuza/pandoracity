
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, align = 'center' }) => {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className="text-4xl md:text-5xl font-gothic font-bold text-antique-gold mb-4 tracking-wider uppercase">
        {title}
      </h2>
      {subtitle && <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
      <div className={`h-1 w-24 bg-night-purple mt-4 ${align === 'center' ? 'mx-auto' : ''} rounded-full`}></div>
    </div>
  );
};

export default SectionTitle;
