
import React from 'react';
import { ImagePlusIcon } from './icons';

interface LogoDisplayProps {
  logos: string[];
  isLoading: boolean;
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({ logos, isLoading }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 md:p-8 shadow-2xl animate-fade-in">
      <h3 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
        <ImagePlusIcon className="w-6 h-6 text-slate-400" />
        Logo Concepts
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading && logos.length === 0 && Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-square bg-slate-700 rounded-lg animate-pulse"></div>
        ))}
        {logos.map((logo, index) => (
          <div key={index} className="aspect-square bg-slate-700 rounded-lg overflow-hidden shadow-md">
            <img src={logo} alt={`Logo concept ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoDisplay;
