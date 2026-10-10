import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_VIDEOS } from './data/videos';
import { Video } from './types/video';
import { Navbar } from './components/Navbar';
import { VideoGrid } from './components/VideoGrid';
import { VideoDetails } from './components/VideoDetails';
import { Footer } from './components/Footer';
import { ScalabilityGuideModal } from './components/ScalabilityGuideModal';
import { Play, Sparkles, Film, ArrowRight } from 'lucide-react';

export default function App() {
  const [videos] = useState<Video[]>(INITIAL_VIDEOS);
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Sync client-side routing with browser history (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Programmatic navigation helper
  const navigateTo = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
      setCurrentPath(path);
    }
  };

  // Parse current route: "/" vs "/video/:id"
  const videoRouteMatch = currentPath.match(/^\/video\/(\d+)$/);
  const selectedVideoId = videoRouteMatch ? parseInt(videoRouteMatch[1], 10) : null;

  // Selected video object based on ID
  const selectedVideo = useMemo(() => {
    if (selectedVideoId === null) return undefined;
    return videos.find((v) => v.id === selectedVideoId);
  }, [videos, selectedVideoId]);

  // Dynamic search filtering by title and description
  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos;
    const q = searchQuery.toLowerCase().trim();
    return videos.filter(
      (v) => v.title.toLowerCase().includes(q) || v.description.toLowerCase().includes(q)
    );
  }, [videos, searchQuery]);

  // Navigate to Video Details page: /video/:id
  const handleSelectVideo = (videoId: number) => {
    navigateTo(`/video/${videoId}`);
    // Reset search query for clean navigation
    setSearchQuery('');
  };

  // Navigate to Home page: /
  const handleNavigateHome = () => {
    navigateTo('/');
  };

  return (
    <div className="min-h-screen bg-[#0b0d13] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans']">
      {/* Responsive Top Navigation (NO category system) */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateHome={handleNavigateHome}
        onOpenGuide={() => setIsGuideOpen(true)}
        currentRoute={currentPath}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {selectedVideoId !== null ? (
          // Video Details Page (/video/:id)
          <VideoDetails
            video={selectedVideo}
            allVideos={videos}
            onBack={handleNavigateHome}
            onSelectVideo={handleSelectVideo}
          />
        ) : (
          // Home Page (/)
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            {/* Clean Hero Header */}
            {!searchQuery && (
              <div className="mb-10 sm:mb-12">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/5">
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
                      Explore Trending Streams
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
                      Discover high-definition community videos, highlights, and cinematic stories. Click any video to open the dedicated player.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="tabular-nums font-semibold text-white">{videos.length}</span>
                    <span>HD Videos Available</span>
                  </div>
                </div>
              </div>
            )}

            {/* Video Cards Grid */}
            <VideoGrid
              videos={filteredVideos}
              onSelectVideo={handleSelectVideo}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
          </div>
        )}
      </main>

      {/* Site Footer */}
      <Footer
        onOpenGuide={() => setIsGuideOpen(true)}
        onNavigateHome={handleNavigateHome}
      />

      {/* Scalability Guide Modal (Explaining JSON scalability & replacement) */}
      <ScalabilityGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
