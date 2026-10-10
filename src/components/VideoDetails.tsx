import React, { useState, useEffect } from 'react';
import { Video } from '../types/video';
import { VideoPlayer } from './VideoPlayer';
import { RelatedVideos } from './RelatedVideos';
import {
  ArrowLeft,
  Heart,
  Share2,
  CheckCircle2,
  Copy,
  Check,
  Eye,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface VideoDetailsProps {
  video: Video | undefined;
  allVideos: Video[];
  onBack: () => void;
  onSelectVideo: (videoId: number) => void;
}

export const VideoDetails: React.FC<VideoDetailsProps> = ({
  video,
  allVideos,
  onBack,
  onSelectVideo,
}) => {
  // Lock state per video page session
  const [videoLocked, setVideoLocked] = useState<boolean>(true);
  const [adPlaying, setAdPlaying] = useState<boolean>(false);

  // Social interactions
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(video ? video.likes : 0);
  const [showShareToast, setShowShareToast] = useState<boolean>(false);

  // Reset lock state and like count whenever the selected video changes
  useEffect(() => {
    setVideoLocked(true);
    setAdPlaying(false);
    setLiked(false);
    if (video) {
      setLikeCount(video.likes);
    }
    // Scroll to top of the video page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [video?.id]);

  if (!video) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Video Not Found</h2>
        <p className="text-slate-400 mb-6 text-sm">
          The requested video could not be located. It may have been removed or the ID is invalid.
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      </div>
    );
  }

  const handleWatchAdClick = () => {
    setVideoLocked(true);
    setAdPlaying(true);
  };

  const handleAdCompleted = () => {
    setAdPlaying(false);
    setVideoLocked(false);
  };

  const toggleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
      setLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setLiked(true);
    }
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 3000);
      }).catch(() => {
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 3000);
      });
    } else {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back Button */}
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141824] hover:bg-[#1a2030] text-slate-300 hover:text-white border border-white/5 text-xs font-semibold transition-all group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-red-400" />
          <span>Back to Videos</span>
        </button>

        {/* Lock indicator status badge */}
        <div className="text-[11px] font-medium text-slate-400">
          {videoLocked ? (
            <span className="text-amber-400/90 flex items-center gap-1.5 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
              🔒 Locked (Watch ad to unlock)
            </span>
          ) : (
            <span className="text-emerald-400 flex items-center gap-1.5 bg-emerald-400/10 px-2.5 py-1 rounded-md border border-emerald-400/20">
              ✓ Unlocked & Ready
            </span>
          )}
        </div>
      </div>

      {/* Main Large Video Player */}
      <div className="w-full mb-6">
        <VideoPlayer
          videoUrl={video.videoUrl}
          thumbnail={video.thumbnail}
          title={video.title}
          durationString={video.duration}
          isLocked={videoLocked}
          isAdPlaying={adPlaying}
          onWatchAdClick={handleWatchAdClick}
          onAdCompleted={handleAdCompleted}
        />
      </div>

      {/* Video Details Header & Actions */}
      <div className="bg-[#121622]/60 border border-white/5 rounded-2xl p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/5">
          {/* Title & Metadata (Zero-Pill Discipline) */}
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug mb-2">
              {video.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 tabular-nums">
              <span className="text-slate-300 font-semibold">{video.views}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Uploaded {video.uploadDate}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">{video.duration} runtime</span>
            </div>
          </div>

          {/* Action Buttons: Like & Share */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Like Button */}
            <button
              onClick={toggleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                liked
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 shadow-lg shadow-rose-950/40'
                  : 'bg-[#181d2c] hover:bg-[#1e2436] border-white/5 text-slate-200 hover:text-white'
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-transform ${
                  liked ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-400'
                }`}
              />
              <span className="tabular-nums">
                {likeCount.toLocaleString()}
              </span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#181d2c] hover:bg-[#1e2436] border border-white/5 text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-slate-400" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Creator Channel Bar & Description */}
        <div className="pt-5 flex flex-col md:flex-row gap-6">
          {/* Creator Profile */}
          <div className="md:w-64 shrink-0 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {video.channel.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                <span>{video.channel.name}</span>
                {video.channel.verified && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-400 tabular-nums">
                {video.channel.subscribers} subscribers
              </p>
            </div>
          </div>

          {/* Description Section */}
          <div className="flex-1 text-slate-300 text-sm leading-relaxed bg-[#0b0d13]/40 p-4 rounded-xl border border-white/5">
            <p className="whitespace-pre-line">{video.description}</p>
          </div>
        </div>
      </div>

      {/* Toast Notification when link copied */}
      {showShareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161b29] border border-emerald-500/40 text-white px-4 py-3 rounded-xl shadow-2xl shadow-black/80 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">Video link copied to clipboard!</span>
        </div>
      )}

      {/* Related Videos Section */}
      <RelatedVideos
        currentVideoId={video.id}
        allVideos={allVideos}
        onSelectVideo={onSelectVideo}
      />
    </div>
  );
};
