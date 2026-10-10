import React from 'react';
import { Video } from '../types/video';
import { VideoCard } from './VideoCard';
import { SearchX, Film } from 'lucide-react';

interface VideoGridProps {
  videos: Video[];
  onSelectVideo: (videoId: number) => void;
  searchQuery: string;
  onClearSearch: () => void;
}

export const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  onSelectVideo,
  searchQuery,
  onClearSearch,
}) => {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-[#141824] border border-white/5 flex items-center justify-center text-slate-400 mb-4 shadow-xl">
          <SearchX className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No videos found.</h3>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          {searchQuery
            ? `We couldn't find any videos matching "${searchQuery}". Try different keywords or browse all videos.`
            : 'There are currently no videos available in the library.'}
        </p>
        {searchQuery && (
          <button
            onClick={onClearSearch}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold tracking-wide transition-all shadow-lg shadow-red-600/30"
          >
            Clear Search & Show All Videos
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {searchQuery && (
        <div className="mb-6 flex items-center justify-between text-xs text-slate-400">
          <p>
            Showing <span className="font-semibold text-white">{videos.length}</span> {videos.length === 1 ? 'result' : 'results'} for &ldquo;<span className="text-white font-medium">{searchQuery}</span>&rdquo;
          </p>
          <button
            onClick={onClearSearch}
            className="text-red-400 hover:text-red-300 font-medium hover:underline"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Responsive Grid: 1 col on mobile, 2 col on tablet (sm/md), 3-4 col on desktop (lg/xl) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onSelect={onSelectVideo}
          />
        ))}
      </div>
    </div>
  );
};
