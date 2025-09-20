
import React from 'react';
import { BrandKit } from '../types';
import { PaletteIcon } from './icons';

interface BrandKitDisplayProps {
  brandKit: BrandKit;
}

const BrandKitDisplay: React.FC<BrandKitDisplayProps> = ({ brandKit }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 md:p-8 shadow-2xl animate-fade-in">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white">{brandKit.brandName}</h2>
        <p className="text-lg text-cyan-300 italic mt-1">"{brandKit.slogan}"</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <PaletteIcon className="w-6 h-6 text-slate-400" />
            Color Palette
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {brandKit.colorPalette.map((color, index) => (
            <div key={index} className="text-center">
              <div
                className="w-full h-24 rounded-lg shadow-md border-2 border-slate-700 mb-2"
                style={{ backgroundColor: color.hex }}
              ></div>
              <p className="font-semibold text-sm text-slate-300">{color.name}</p>
              <p className="text-xs text-slate-400 uppercase">{color.hex}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandKitDisplay;
