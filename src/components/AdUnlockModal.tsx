import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, ShieldAlert, Sparkles, ExternalLink } from 'lucide-react';

interface AdUnlockModalProps {
  onAdCompleted: () => void;
  videoTitle: string;
}

export const AdUnlockModal: React.FC<AdUnlockModalProps> = ({
  onAdCompleted,
  videoTitle,
}) => {
  const [countdown, setCountdown] = useState<number>(10);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsFinished(true);
    }
  }, [countdown]);

  const progressPercentage = ((10 - countdown) / 10) * 100;

  return (
    <div className="absolute inset-0 z-30 bg-[#090b10]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200">
      {/* Top Banner Bar */}
      <div className="w-full max-w-xl mx-auto flex items-center justify-between py-2 px-3 bg-white/5 border border-white/10 rounded-xl mb-4 text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-semibold tracking-wide uppercase text-[11px]">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
          <span>Sponsored Demo Advertisement</span>
        </div>
        <div className="text-slate-400 tabular-nums">
          {!isFinished ? (
            <span className="font-medium text-slate-200">
              Advertisement — {countdown}
            </span>
          ) : (
            <span className="font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Ad Completed
            </span>
          )}
        </div>
      </div>

      {/* Main Advertisement Creative Container */}
      <div className="w-full max-w-xl bg-gradient-to-br from-[#131726] to-[#0c0e17] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
        {/* Decorative ambient glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Ad Header & Brand Logo */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-lg shadow-md">
              Ω
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                QuantumStream Pro
                <span className="text-[10px] uppercase font-semibold text-indigo-300 bg-indigo-500/20 px-1.5 py-0.5 rounded">
                  Sponsor
                </span>
              </h4>
              <p className="text-[11px] text-slate-400">
                Next-Gen Edge Streaming & Cloud Video Delivery
              </p>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 border border-slate-700/50 px-2 py-0.5 rounded">
            Ad 1 of 1
          </div>
        </div>

        {/* Ad Body Content */}
        <div className="relative z-10 py-3 my-1 border-y border-white/5">
          <p className="text-sm text-slate-200 font-medium mb-1.5">
            Deliver 4K Ultra-HD video at lightning speed with zero buffering.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Built for creators, publishers, and developers. Experience 99.99% uptime, worldwide low latency edge points, and intelligent adaptive bitrate transcoding.
          </p>
        </div>

        {/* Progress Bar & Countdown Status */}
        <div className="relative z-10 mt-4">
          <div className="flex items-center justify-between text-xs mb-2">
            {!isFinished ? (
              <span className="text-slate-300 font-semibold tracking-wide flex items-center gap-1.5">
                <span className="animate-pulse text-amber-400">●</span>
                Advertisement — {countdown}
              </span>
            ) : (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ✓ Ad Completed
              </span>
            )}
            <span className="text-[11px] text-slate-400">
              {isFinished ? 'Ready to watch' : 'Reward unlocks in seconds'}
            </span>
          </div>

          {/* Progress bar line */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
            <div
              className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                isFinished ? 'bg-emerald-500' : 'bg-gradient-to-r from-red-500 to-amber-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Action Zone: Non-skippable during countdown OR Play Video button when completed */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            {!isFinished ? (
              <div className="w-full py-2.5 px-4 rounded-xl bg-slate-800/60 border border-white/5 text-slate-400 text-xs text-center font-medium flex items-center justify-center gap-2 cursor-not-allowed">
                <ShieldAlert className="w-4 h-4 text-slate-400" />
                <span>Video unlocks automatically when ad finishes ({countdown}s)</span>
              </div>
            ) : (
              <button
                onClick={onAdCompleted}
                className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>▶ Play Video</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Safe explanatory footer disclaimer */}
      <p className="text-[11px] text-slate-400 mt-4 max-w-sm text-center">
        This is a demo simulated advertisement for video unlock verification.
      </p>
    </div>
  );
};
