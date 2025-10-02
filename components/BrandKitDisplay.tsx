
import React, { useState } from 'react';
import { BrandKit } from '../types';
import { PaletteIcon, ClipboardIcon, CheckIcon } from './icons';

interface BrandKitDisplayProps {
  brandKit: BrandKit;
}

const BrandKitDisplay: React.FC<BrandKitDisplayProps> = ({ brandKit }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => {
      setCopiedColor(null);
    }, 2000);
  };

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 md:p-8 shadow-2xl animate-fade-in relative card-gradient-border">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white">{brandKit.brandName}</h2>
        <p className="text-lg text-cyan-300 italic mt-1">"{brandKit.slogan}"</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <PaletteIcon className="w-6 h-6 text-slate-400" />
            Color Palette
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {brandKit.colorPalette.map((color, index) => (
            <div key={index} className="text-center group">
              <div
                className="w-full h-24 rounded-lg shadow-md border-2 border-slate-700 mb-2 transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: color.hex }}
              ></div>
              <p className="font-semibold text-sm text-slate-300">{color.name}</p>
              <button
                onClick={() => handleCopy(color.hex)}
                className="text-xs text-slate-400 uppercase flex items-center justify-center gap-1 mx-auto px-2 py-1 rounded-md hover:bg-slate-700 transition-colors w-full"
                aria-label={`Copy hex code ${color.hex}`}
              >
                {copiedColor === color.hex ? (
                  <>
                    <CheckIcon className="w-3 h-3 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <ClipboardIcon className="w-3 h-3" />
                    <span>{color.hex}</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandKitDisplay;