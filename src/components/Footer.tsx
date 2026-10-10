import React from 'react';
import { Play, Code, HelpCircle } from 'lucide-react';

interface FooterProps {
  onOpenGuide: () => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGuide, onNavigateHome }) => {
  return (
    <footer className="w-full bg-[#08090e] border-t border-white/5 py-10 mt-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Logo */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Video<span className="text-red-500">Hub</span>
            </span>
          </button>

          {/* Clean text links */}
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <button
              onClick={onNavigateHome}
              className="hover:text-white transition-colors"
            >
              Browse All Videos
            </button>
            <button
              onClick={onOpenGuide}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-red-400" />
              <span>How to Add 100+ Videos</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} VideoHub. Premium streaming platform.</p>
          <p className="text-[11px] text-slate-400">
            All sample video assets and advertisements are provided for demonstration purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};
