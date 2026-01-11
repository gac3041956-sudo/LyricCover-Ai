
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <i className="fa-solid fa-compact-disc text-white text-xl animate-spin-slow"></i>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            LyricCover<span className="text-indigo-400">AI</span>
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Gallery</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">How it works</a>
          <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full border border-white/10 text-sm font-medium transition-all">
            Share
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
