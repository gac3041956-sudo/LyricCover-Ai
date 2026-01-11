
import React from 'react';
import { GeneratedCover, AnalysisResult } from '../types';

interface CoverDisplayProps {
  cover: GeneratedCover;
  analysis: AnalysisResult | null;
  onReset: () => void;
}

const CoverDisplay: React.FC<CoverDisplayProps> = ({ cover, analysis, onReset }) => {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = cover.imageUrl;
    link.download = `${cover.title.replace(/\s+/g, '-').toLowerCase()}-cover.png`;
    link.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative overflow-hidden rounded-2xl aspect-square bg-[#16161a] border border-white/10 shadow-2xl">
          <img 
            src={cover.imageUrl} 
            alt={cover.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl font-bold text-white mb-2">{cover.title}</h3>
        {analysis && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                Mood: {analysis.mood}
              </span>
              {analysis.colors.map((color, i) => (
                <span key={i} className="bg-white/5 text-gray-400 px-3 py-1 rounded-full text-xs border border-white/10">
                  {color}
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-sm italic leading-relaxed">
              &quot;{analysis.visualPrompt}&quot;
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onReset}
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl font-semibold transition-all"
        >
          Create New
        </button>
        <button
          onClick={downloadImage}
          className="bg-white text-black hover:bg-gray-200 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg"
        >
          <i className="fa-solid fa-download"></i>
          Save Image
        </button>
      </div>
    </div>
  );
};

export default CoverDisplay;
