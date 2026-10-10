import React from 'react';
import { Video } from '../types/video';
import { VideoThumbnail } from './VideoThumbnail';
import { Play, CheckCircle2, Sparkles } from 'lucide-react';

interface RelatedVideosProps {
  currentVideoId: number;
  allVideos: Video[];
  onSelectVideo: (videoId: number) => void;
}

export const RelatedVideos: React.FC<RelatedVideosProps> = ({
  currentVideoId,
  allVideos,
  onSelectVideo,
}) => {
  // Filter out the current active video
  const relatedList = allVideos.filter((v) => v.id !== currentVideoId);

  return (
    <section className="w-full mt-12 pt-8 border-t border-white/5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Related Videos
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            More trending videos recommended for you
          </p>
        </div>
        <span className="text-xs text-slate-400 font-medium tabular-nums">
          {relatedList.length} videos
        </span>
      </div>

      {/* Grid of Related Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {relatedList.map((video) => (
          <div
            key={video.id}
            onClick={() => onSelectVideo(video.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectVideo(video.id);
              }
            }}
            className="group flex flex-col bg-[#121622]/70 hover:bg-[#181d2d] border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500/70"
          >
            {/* Thumbnail */}
            <div className="relative w-full">
              <VideoThumbnail
                src={video.thumbnail}
                alt={video.title}
                duration={video.duration}
                showPlayHover={true}
              />
            </div>

            {/* Video Details */}
            <div className="p-3.5 flex flex-col flex-1">
              <h4 className="font-semibold text-slate-100 text-sm line-clamp-1 group-hover:text-white transition-colors mb-1">
                {video.title}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                {video.description}
              </p>

              <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-slate-300 font-medium truncate max-w-[140px]">
                  {video.channel.name}
                </span>
                <span className="tabular-nums shrink-0">{video.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
