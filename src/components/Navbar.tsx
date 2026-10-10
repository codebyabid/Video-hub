import React, { useState } from 'react';
import { Play, Home, Menu, X, HelpCircle, Film } from 'lucide-react';
import { SearchBar } from './SearchBar';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigateHome: () => void;
  onOpenGuide: () => void;
  currentRoute: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  onNavigateHome,
  onOpenGuide,
  currentRoute,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = currentRoute === '/';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0d13]/90 backdrop-blur-md border-b border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1 font-['Plus_Jakarta_Sans']">
            Video<span className="text-red-500">Hub</span>
          </span>
        </button>

        {/* Zone 2: Search Bar on Desktop */}
        <div className="hidden sm:flex flex-1 max-w-md mx-auto">
          <SearchBar
            value={searchQuery}
            onChange={(val) => {
              onSearchChange(val);
              if (!isHome && val.trim().length > 0) {
                onNavigateHome();
              }
            }}
            placeholder="Search videos by title or description..."
          />
        </div>

        {/* Zone 3: Navigation Links & Actions */}
        <nav className="hidden sm:flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              isHome
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-[#151924] hover:bg-[#1d2232] border border-white/5 rounded-lg transition-colors"
            title="Learn how to add 100+ videos or replace sample URLs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-red-400" />
            <span className="whitespace-nowrap">Add Videos Guide</span>
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-white/5 bg-[#0e111a] px-4 pt-3 pb-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <SearchBar
            value={searchQuery}
            onChange={(val) => {
              onSearchChange(val);
              if (!isHome && val.trim().length > 0) {
                onNavigateHome();
              }
            }}
            placeholder="Search videos..."
            autoFocus={true}
          />

          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <button
              onClick={() => {
                onNavigateHome();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-white p-2"
            >
              <Home className="w-4 h-4 text-red-400" />
              <span>Home Feed</span>
            </button>

            <button
              onClick={() => {
                onOpenGuide();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white p-2"
            >
              <HelpCircle className="w-3.5 h-3.5 text-red-400" />
              <span>How to add 100+ videos</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
