
import React, { useState } from 'react';
import type { UserInput } from '../types';

interface InputFormProps {
  onGenerate: (input: UserInput) => void;
  isGenerating: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onGenerate, isGenerating }) => {
  const [productIdea, setProductIdea] = useState('An eco-friendly running shoe made from recycled ocean plastic.');
  const [targetAudience, setTargetAudience] = useState('Environmentally conscious millennials (ages 25-40) who are active and value sustainability.');
  const [brandPersonality, setBrandPersonality] = useState('Energetic, authentic, and inspiring.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productIdea && targetAudience && brandPersonality) {
      onGenerate({ productIdea, targetAudience, brandPersonality });
    }
  };
  
  const FormField: React.FC<{
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    rows?: number;
  }> = ({ id, label, value, onChange, placeholder, rows = 2 }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-slate-800 border border-slate-700 rounded-md shadow-sm px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
        required
      />
    </div>
  );

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 md:p-8 shadow-2xl relative card-gradient-border">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          id="productIdea"
          label="Product Idea"
          value={productIdea}
          onChange={(e) => setProductIdea(e.target.value)}
          placeholder="e.g., A smart coffee mug that keeps drinks at the perfect temperature."
        />
        <FormField
          id="targetAudience"
          label="Target Audience"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="e.g., Tech-savvy professionals who love coffee."
        />
        <FormField
          id="brandPersonality"
          label="Brand Personality"
          value={brandPersonality}
          onChange={(e) => setBrandPersonality(e.target.value)}
          placeholder="e.g., Innovative, sleek, and premium."
        />
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 disabled:scale-100"
        >
          {isGenerating ? 'Generating...' : 'Create My Brand'}
        </button>
      </form>
    </div>
  );
};

export default InputForm;