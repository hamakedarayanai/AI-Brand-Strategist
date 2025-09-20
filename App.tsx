
import React, { useState, useCallback } from 'react';
import { BrandKit, ContentStrategy, UserInput, GenerationStep, SampleContent } from './types';
import * as geminiService from './services/geminiService';

import InputForm from './components/InputForm';
import StepIndicator from './components/StepIndicator';
import Loader from './components/Loader';
import BrandKitDisplay from './components/BrandKitDisplay';
import LogoDisplay from './components/LogoDisplay';
import ContentStrategyDisplay from './components/ContentStrategyDisplay';
import GeneratedContentDisplay from './components/GeneratedContentDisplay';
import { WandIcon } from './components/icons';

const App: React.FC = () => {
  const [step, setStep] = useState<GenerationStep>(GenerationStep.IDLE);
  const [error, setError] = useState<string | null>(null);
  
  const [userInput, setUserInput] = useState<UserInput | null>(null);
  const [brandKit, setBrandKit] = useState<BrandKit | null>(null);
  const [logos, setLogos] = useState<string[]>([]);
  const [contentStrategy, setContentStrategy] = useState<ContentStrategy | null>(null);
  const [sampleContent, setSampleContent] = useState<SampleContent | null>(null);
  
  const [isGeneratingLogos, setIsGeneratingLogos] = useState<boolean>(false);
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState<boolean>(false);
  const [isGeneratingSampleContent, setIsGeneratingSampleContent] = useState<boolean>(false);

  const resetState = () => {
    setStep(GenerationStep.IDLE);
    setError(null);
    setUserInput(null);
    setBrandKit(null);
    setLogos([]);
    setContentStrategy(null);
    setSampleContent(null);
    setIsGeneratingLogos(false);
    setIsGeneratingStrategy(false);
    setIsGeneratingSampleContent(false);
  };

  const handleGenerate = async (input: UserInput) => {
    resetState();
    setUserInput(input);
    setError(null);
    
    try {
      setStep(GenerationStep.BRAND_KIT);
      const generatedBrandKit = await geminiService.generateBrandKit(input);
      setBrandKit(generatedBrandKit);

      setStep(GenerationStep.LOGOS_AND_STRATEGY);
      setIsGeneratingLogos(true);
      setIsGeneratingStrategy(true);
      
      const logoPromise = geminiService.generateLogoConcepts(generatedBrandKit)
        .then(generatedLogos => {
          setLogos(generatedLogos);
        })
        .finally(() => setIsGeneratingLogos(false));
      
      const strategyPromise = geminiService.generateContentStrategy(input, generatedBrandKit.brandName)
        .then(strategy => {
          setContentStrategy(strategy);
        })
        .finally(() => setIsGeneratingStrategy(false));
        
      await Promise.all([logoPromise, strategyPromise]);

      setStep(GenerationStep.CONTENT);

    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
      setStep(GenerationStep.IDLE);
    }
  };

  const handleGenerateSampleContent = useCallback(async (pillarTitle: string) => {
    if (!userInput || !brandKit) return;
    setIsGeneratingSampleContent(true);
    setError(null);
    try {
      const content = await geminiService.generateSampleContent(pillarTitle, brandKit.brandName, userInput);
      setSampleContent({ pillar: pillarTitle, content });
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'Failed to generate sample content.');
    } finally {
      setIsGeneratingSampleContent(false);
    }
  }, [userInput, brandKit]);

  const isLoading = step > GenerationStep.IDLE && step < GenerationStep.CONTENT;
  
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-2">
            <WandIcon className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">AI Brand Strategist</h1>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Your end-to-end marketing agency in a box. Generate a complete brand identity and content strategy from a simple idea.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <InputForm onGenerate={handleGenerate} isGenerating={isLoading} />
          
          {step > GenerationStep.IDLE && (
            <div className="mt-12">
              <StepIndicator currentStep={step} />
            </div>
          )}

          {error && (
            <div className="mt-8 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              <p className="font-semibold">An Error Occurred</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {isLoading && step !== GenerationStep.IDLE && (
            <div className="mt-12 flex flex-col items-center justify-center text-center">
              <Loader />
              <p className="text-lg text-cyan-300 animate-pulse mt-4">{
                step === GenerationStep.BRAND_KIT ? "Brewing up your brand identity..." :
                step === GenerationStep.LOGOS_AND_STRATEGY ? "Designing logos & building your strategy..." :
                "Finalizing..."
              }</p>
            </div>
          )}

          <div className="space-y-12 mt-12">
            {brandKit && <BrandKitDisplay brandKit={brandKit} />}
            {(isGeneratingLogos || logos.length > 0) && <LogoDisplay logos={logos} isLoading={isGeneratingLogos} />}
            {(isGeneratingStrategy || contentStrategy) && <ContentStrategyDisplay strategy={contentStrategy} isLoading={isGeneratingStrategy} />}
            {contentStrategy && !isGeneratingStrategy && (
              <GeneratedContentDisplay
                content={sampleContent}
                pillars={contentStrategy.pillars}
                onGenerate={handleGenerateSampleContent}
                isLoading={isGeneratingSampleContent}
              />
            )}
          </div>
        </div>
      </main>
      <footer className="text-center py-6 border-t border-slate-800 mt-12">
        <p className="text-slate-500">Powered by Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
