
import React from 'react';

interface LyricsFormProps {
  title: string;
  setTitle: (val: string) => void;
  lyrics: string;
  setLyrics: (val: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

const LyricsForm: React.FC<LyricsFormProps> = ({ title, setTitle, lyrics, setLyrics, onSubmit, loading }) => {
  return (
    <div className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl">
      <div>
        <label className="block text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
          Song Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Moonlight Sonata"
          className="w-full bg-[#16161a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-600"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
          Lyrics / Poem
        </label>
        <textarea
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder="Paste your lyrics here..."
          rows={8}
          className="w-full bg-[#16161a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none placeholder:text-gray-600"
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={loading || !title || !lyrics}
        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
          loading || !title || !lyrics
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:shadow-indigo-500/40 text-white active:scale-95'
        }`}
      >
        {loading ? (
          <>
            <i className="fa-solid fa-circle-notch animate-spin"></i>
            Generating Art...
          </>
        ) : (
          <>
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            Create Album Cover
          </>
        )}
      </button>
    </div>
  );
};

export default LyricsForm;
