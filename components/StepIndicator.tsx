
import React from 'react';
import { GenerationStep } from '../types';

interface StepIndicatorProps {
  currentStep: GenerationStep;
}

const steps = [
  { id: GenerationStep.BRAND_KIT, label: 'Brand Kit' },
  { id: GenerationStep.LOGOS_AND_STRATEGY, label: 'Logos & Strategy' },
  { id: GenerationStep.CONTENT, label: 'Content' },
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="w-full">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isActive = currentStep >= step.id;
          const isCurrent = currentStep === step.id;
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isActive ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {currentStep > step.id ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  ) : (
                    <span className={`font-bold ${isCurrent ? 'animate-pulse' : ''}`}>{index + 1}</span>
                  )}
                </div>
                <p className={`text-xs mt-2 text-center transition-colors ${isActive ? 'text-cyan-300' : 'text-slate-500'}`}>{step.label}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded-full transition-colors duration-500 ${currentStep > step.id ? 'bg-cyan-500' : 'bg-slate-700'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
