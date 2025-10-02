
import React from 'react';
import { ImagePlusIcon, DownloadIcon } from './icons';

interface LogoDisplayProps {
  logos: string[];
  isLoading: boolean;
  brandName: string;
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({ logos, isLoading, brandName }) => {
  const handleDownload = (logoSrc: string, index: number) => {
    const link = document.createElement('a');
    link.href = logoSrc;
    const safeBrandName = brandName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `${safeBrandName}_logo_${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 md:p-8 shadow-2xl animate-fade-in relative card-gradient-border">
      <h3 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
        <ImagePlusIcon className="w-6 h-6 text-slate-400" />
        Logo Concepts
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {isLoading && logos.length === 0 && Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-square bg-slate-700 rounded-lg animate-pulse"></div>
        ))}
        {logos.map((logo, index) => (
          <div key={index} className="aspect-square bg-slate-700 rounded-lg overflow-hidden shadow-md group relative">
            <img src={logo} alt={`Logo concept ${index + 1}`} className="w-full h-full object-cover" />
            <button
              onClick={() => handleDownload(logo, index)}
              className="absolute bottom-2 right-2 p-2 bg-slate-900/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-500"
              aria-label={`Download logo ${index + 1}`}
            >
              <DownloadIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoDisplay;