import React, { useState } from 'react';
import { X, Copy, Check, FileJson, Database, ExternalLink, Sparkles } from 'lucide-react';

interface ScalabilityGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScalabilityGuideModal: React.FC<ScalabilityGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const sampleJsonCode = `[
  {
    "id": 9,
    "title": "Your Custom Video Title",
    "thumbnail": "https://your-domain.com/thumbnails/video-9.jpg",
    "videoUrl": "https://your-domain.com/videos/video-9.mp4",
    "description": "Full description of your video goes here...",
    "duration": "15:20",
    "views": "12.4K views",
    "uploadDate": "Just now",
    "channel": {
      "name": "My Channel Name",
      "subscribers": "100K",
      "verified": true
    },
    "likes": 1250
  }
]`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sampleJsonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#111420] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-200 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
            <FileJson className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              How to Add 100+ Videos to VideoHub
            </h3>
            <p className="text-xs text-slate-400">
              Simple scalability guide for beginners and developers
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-5 text-xs text-slate-300 leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
          {/* Step 1 */}
          <div className="bg-[#161a29] p-4 rounded-xl border border-white/5">
            <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">1</span>
              Edit or Replace Current Sample Videos
            </h4>
            <p className="text-slate-400 mb-2">
              All video data is centralized in <code className="text-red-400 font-mono bg-black/40 px-1 py-0.5 rounded">src/data/videos.ts</code>. You can replace each entry with your own:
            </p>
            <ul className="grid grid-cols-2 gap-2 text-slate-300 mt-2">
              <li className="flex items-center gap-1.5"><span className="text-red-400">▪</span> <code>videoUrl</code> (MP4/HLS link)</li>
              <li className="flex items-center gap-1.5"><span className="text-red-400">▪</span> <code>thumbnail</code> (Image URL)</li>
              <li className="flex items-center gap-1.5"><span className="text-red-400">▪</span> <code>title</code> (Video title)</li>
              <li className="flex items-center gap-1.5"><span className="text-red-400">▪</span> <code>description</code> (Video text)</li>
              <li className="flex items-center gap-1.5"><span className="text-red-400">▪</span> <code>duration</code> (e.g. &ldquo;12:45&rdquo;)</li>
              <li className="flex items-center gap-1.5"><span className="text-red-400">▪</span> <code>views</code> & <code>uploadDate</code></li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="bg-[#161a29] p-4 rounded-xl border border-white/5">
            <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">2</span>
              Scaling to 100+ Videos with a JSON File
            </h4>
            <p className="text-slate-400 mb-3">
              Instead of hardcoding a huge array in TypeScript, create a <code className="text-red-400 font-mono bg-black/40 px-1 py-0.5 rounded">public/videos.json</code> file. Here is the exact JSON structure for each video object:
            </p>

            <div className="relative bg-black/60 rounded-xl p-3 border border-white/5 font-mono text-[11px] text-slate-300">
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy Schema'}</span>
              </button>
              <pre className="overflow-x-auto whitespace-pre">{sampleJsonCode}</pre>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#161a29] p-4 rounded-xl border border-white/5">
            <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">3</span>
              Automated Loading in React
            </h4>
            <p className="text-slate-400 mb-2">
              In <code className="text-red-400 font-mono bg-black/40 px-1 py-0.5 rounded">App.tsx</code> or your data hook, fetch the JSON data dynamically on mount:
            </p>
            <div className="bg-black/60 rounded-xl p-3 border border-white/5 font-mono text-[11px] text-slate-300 overflow-x-auto">
              <code>{`useEffect(() => {
  fetch('/videos.json')
    .then(res => res.json())
    .then(data => setVideos(data));
}, []);`}</code>
            </div>
            <p className="text-slate-400 mt-2">
              The search system, grid, URL routing (<code className="text-red-400">/video/:id</code>), advertisement unlock modal, and related video algorithms will automatically adapt without modifying any other code!
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold tracking-wide transition-colors"
          >
            Got It, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
