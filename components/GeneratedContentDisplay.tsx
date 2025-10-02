
import React, { useState, useEffect } from 'react';
import type { SampleContent, ContentPillar } from '../types';
import { SparklesIcon, ClipboardIcon, CheckIcon } from './icons';
import Loader from './Loader';

interface GeneratedContentDisplayProps {
  content: SampleContent | null;
  pillars: ContentPillar[];
  onGenerate: (pillarTitle: string) => void;
  isLoading: boolean;
}

const GeneratedContentDisplay: React.FC<GeneratedContentDisplayProps> = ({ content, pillars, onGenerate, isLoading }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (content?.content) {
      navigator.clipboard.writeText(content.content);
      setIsCopied(true);
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  useEffect(() => {
    setIsCopied(false);
  }, [content]);

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 md:p-8 shadow-2xl animate-fade-in relative card-gradient-border">
        <h3 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <SparklesIcon className="w-6 h-6 text-slate-400" />
            Generate Sample Content
        </h3>
        <p className="text-slate-400 mb-4 text-sm">Select a content pillar to generate a sample Instagram caption.</p>

        <div className="flex flex-wrap gap-2 mb-6">
            {pillars.map(pillar => (
                <button 
                    key={pillar.title}
                    onClick={() => onGenerate(pillar.title)}
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium bg-slate-700 text-slate-300 rounded-full hover:bg-cyan-500 hover:text-white disabled:opacity-50 disabled:cursor-wait transition"
                >
                    {pillar.title}
                </button>
            ))}
        </div>

        {isLoading && (
            <div className="min-h-[150px] flex items-center justify-center bg-slate-900/50 rounded-lg p-4">
                <Loader />
            </div>
        )}

        {content && !isLoading && (
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 animate-fade-in relative">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-cyan-300 mb-2 pr-12">Sample Post for "{content.pillar}"</h4>
                  <button onClick={handleCopy} className="absolute top-3 right-3 flex items-center gap-1.5 text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded-md transition-colors">
                    {isCopied ? (
                      <>
                        <CheckIcon className="w-3 h-3 text-green-400" />
                        <span className="text-green-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <ClipboardIcon className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-slate-300 whitespace-pre-wrap">{content.content}</p>
            </div>
        )}
    </div>
  );
};

export default GeneratedContentDisplay;