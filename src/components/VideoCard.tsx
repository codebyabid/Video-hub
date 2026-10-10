import React from 'react';
import { Video } from '../types/video';
import { VideoThumbnail } from './VideoThumbnail';
import { CheckCircle2 } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  onSelect: (videoId: number) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onSelect }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelect(video.id);
  };

  return (
    <article
      onClick={handleClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(video.id);
        }
      }}
      className="group flex flex-col bg-[#121622]/80 hover:bg-[#181d2c] border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70"
    >
      {/* Thumbnail Container */}
      <div className="relative w-full">
        <VideoThumbnail
          src={video.thumbnail}
          alt={video.title}
          duration={video.duration}
          showPlayHover={true}
        />
      </div>

      {/* Video Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-slate-100 text-base line-clamp-1 group-hover:text-white transition-colors">
            {video.title}
          </h3>
        </div>

        {/* Short description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
          {video.description}
        </p>

        {/* Channel info & Metadata (Zero-pill discipline) */}
        <div className="mt-auto pt-2 border-t border-white/5 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
            <span className="truncate">{video.channel.name}</span>
            {video.channel.verified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 tabular-nums">
            <span>{video.views}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{video.uploadDate}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
