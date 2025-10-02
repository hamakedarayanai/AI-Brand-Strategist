
import React from 'react';
import { ContentStrategy } from '../types';
import { CalendarIcon, LightbulbIcon } from './icons';

interface ContentStrategyDisplayProps {
  strategy: ContentStrategy | null;
  isLoading: boolean;
}

const ContentStrategyDisplay: React.FC<ContentStrategyDisplayProps> = ({ strategy, isLoading }) => {
    if (isLoading) {
        return (
            <div className="bg-slate-800/50 rounded-xl p-6 md:p-8 shadow-2xl animate-pulse relative card-gradient-border">
                <div className="h-6 w-1/3 bg-slate-700 rounded-md mb-4"></div>
                <div className="space-y-4">
                    <div className="h-20 bg-slate-700 rounded-md"></div>
                    <div className="h-20 bg-slate-700 rounded-md"></div>
                    <div className="h-20 bg-slate-700 rounded-md"></div>
                </div>
            </div>
        )
    }

    if (!strategy) return null;

    return (
        <div className="bg-slate-800/50 rounded-xl p-6 md:p-8 shadow-2xl animate-fade-in relative card-gradient-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
            <h3 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <LightbulbIcon className="w-6 h-6 text-slate-400" />
                Content Pillars
            </h3>
            <div className="space-y-4">
                {strategy.pillars.map((pillar, index) => (
                <div key={index} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h4 className="font-bold text-cyan-300">{pillar.title}</h4>
                    <p className="text-slate-400 text-sm mt-1">{pillar.description}</p>
                </div>
                ))}
            </div>
            </div>
            <div>
            <h3 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <CalendarIcon className="w-6 h-6 text-slate-400" />
                Sample Weekly Schedule
            </h3>
            <div className="space-y-2 text-sm">
                {Object.entries(strategy.schedule).map(([day, activity]) => (
                <div key={day} className="grid grid-cols-3 gap-2 p-2 rounded-md hover:bg-slate-700/50 transition">
                    <span className="font-semibold text-slate-300 col-span-1">{day}</span>
                    <span className="text-slate-400 col-span-2">{activity}</span>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
};

export default ContentStrategyDisplay;