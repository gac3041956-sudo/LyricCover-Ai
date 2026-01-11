
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import LyricsForm from './components/LyricsForm';
import CoverDisplay from './components/CoverDisplay';
import { analyzeLyrics, generateCoverImage } from './geminiService';
import { GeneratedCover, AnalysisResult } from './types';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cover, setCover] = useState<GeneratedCover | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleGenerate = async () => {
    if (!title || !lyrics) return;

    setLoading(true);
    setError(null);
    
    try {
      // Step 1: Analyze lyrics to get visual prompt
      const analysisResult = await analyzeLyrics(title, lyrics);
      setAnalysis(analysisResult);

      // Step 2: Generate the image based on analysis
      const imageUrl = await generateCoverImage(title, analysisResult);
      
      setCover({
        imageUrl,
        title,
        description: analysisResult.visualPrompt
      });
    } catch (err: any) {
      console.error("Generation failed:", err);
      setError("Something went wrong while creating your art. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = useCallback(() => {
    setCover(null);
    setAnalysis(null);
    setTitle('');
    setLyrics('');
    setError(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Context & Input */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Turn your <span className="text-indigo-500">Lyrics</span> into visual <span className="text-purple-500">Masterpieces</span>.
              </h2>
              <p className="text-gray-400 text-lg max-w-md">
                Our AI understands the deep meaning behind your words to create unique, professional album covers with just your title.
              </p>
            </div>

            {!cover && (
              <LyricsForm 
                title={title}
                setTitle={setTitle}
                lyrics={lyrics}
                setLyrics={setLyrics}
                onSubmit={handleGenerate}
                loading={loading}
              />
            )}

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400">
                <i className="fa-solid fa-triangle-exclamation"></i>
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Empty state visual or placeholder when form is hidden */}
            {cover && (
              <div className="hidden lg:block p-8 rounded-3xl border border-dashed border-white/20 bg-white/5 opacity-50">
                <p className="text-gray-400 text-center text-sm">
                  Generated from lyrics analysis: <br/>
                  <span className="italic">"{analysis?.visualPrompt}"</span>
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Display Result or Preview */}
          <div className="sticky top-24">
            {cover ? (
              <CoverDisplay 
                cover={cover} 
                analysis={analysis}
                onReset={handleReset} 
              />
            ) : (
              <div className="aspect-square rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-gray-500 p-12 text-center group">
                <div className="w-20 h-20 mb-6 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-image text-4xl opacity-20"></i>
                </div>
                <h3 className="text-xl font-medium text-gray-400 mb-2">Artistic Preview</h3>
                <p className="text-sm">Your generated album cover will appear here once you provide your lyrics.</p>
              </div>
            )}
          </div>

        </div>
      </main>

      <footer className="mt-auto border-t border-white/10 py-8 px-6 bg-[#0a0a0c]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© 2025 LyricCover AI. Crafted for musicians & poets.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">API</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
