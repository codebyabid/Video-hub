import React, { useState } from 'react';
import { Play, Film } from 'lucide-react';

interface VideoThumbnailProps {
  src: string;
  alt: string;
  duration?: string;
  showPlayHover?: boolean;
  className?: string;
  categoryTheme?: string;
}

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  src,
  alt,
  duration,
  showPlayHover = true,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fallback gradient styles based on title hash for stable unique visuals
  const getGradientForTitle = (str: string) => {
    const gradients = [
      'from-emerald-950 via-slate-900 to-teal-950 text-emerald-400',
      'from-amber-950 via-slate-900 to-orange-950 text-amber-400',
      'from-cyan-950 via-slate-900 to-blue-950 text-cyan-400',
      'from-red-950 via-slate-900 to-rose-950 text-rose-400',
      'from-indigo-950 via-slate-900 to-sky-950 text-indigo-400',
      'from-purple-950 via-slate-900 to-violet-950 text-purple-400',
      'from-rose-950 via-slate-900 to-red-950 text-red-400',
      'from-slate-950 via-zinc-900 to-neutral-950 text-zinc-400',
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % gradients.length;
    return gradients[index];
  };

  const themeClasses = getGradientForTitle(alt);

  return (
    <div
      className={`relative w-full aspect-video overflow-hidden bg-slate-900 rounded-xl select-none group/thumb ${className}`}
    >
      {/* Background fallback gradient always present underneath */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${themeClasses} flex flex-col items-center justify-center p-4 text-center`}
      >
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-2 border border-white/10 shadow-lg">
          <Film className="w-6 h-6 opacity-80" />
        </div>
        <p className="text-xs font-medium text-slate-300 line-clamp-1 max-w-[80%]">
          {alt}
        </p>
      </div>

      {/* Main image */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover/thumb:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Dark vignette overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover/thumb:opacity-60 transition-opacity pointer-events-none" />

      {/* Play button hover overlay */}
      {showPlayHover && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-all duration-300 ease-out pointer-events-none">
          <div className="w-13 h-13 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl shadow-red-950/50 backdrop-blur-sm transform scale-90 group-hover/thumb:scale-100 transition-transform">
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>
        </div>
      )}

      {/* Duration badge */}
      {duration && (
        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/85 backdrop-blur-sm border border-white/10 text-[11px] font-semibold text-slate-200 tracking-wide tabular-nums">
          {duration}
        </div>
      )}
    </div>
  );
};
