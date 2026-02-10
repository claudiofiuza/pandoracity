
import React, { useState, useEffect } from 'react';
import { generateNanoImage } from '../services/geminiService';
import { Loader2 } from 'lucide-react';

interface NanoImageProps {
  prompt: string;
  fallbackUrl: string;
  className?: string;
  overlay?: boolean;
}

const NanoImage: React.FC<NanoImageProps> = ({ prompt, fallbackUrl, className = "", overlay = false }) => {
  const [imgSrc, setImgSrc] = useState<string>(fallbackUrl);
  const [loading, setLoading] = useState<boolean>(false);

  // In a real app, we might trigger generation on a button click to save tokens,
  // but here we can try to load the fallback and provide a "Regenerate with AI" logic if desired.
  // For now, we use the fallback but provide the structure for generation.

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img 
        src={imgSrc} 
        alt={prompt} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        onError={() => setImgSrc('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000')}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      )}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Loader2 className="animate-spin text-antique-gold" size={32} />
        </div>
      )}
    </div>
  );
};

export default NanoImage;
