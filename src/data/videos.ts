import { Video } from '../types/video';

/**
 * ============================================================================
 * VIDEOHUB CENTRAL VIDEO DATABASE
 * ============================================================================
 * 
 * HOW TO CUSTOMIZE OR REPLACE VIDEOS:
 * 1. Replace `videoUrl` with your own MP4 / WebM / HLS stream link.
 * 2. Replace `thumbnail` with your image URL (e.g., https://your-cdn.com/thumb.jpg)
 *    or a local path in /public.
 * 3. Update `title`, `description`, `duration`, `views`, and `uploadDate`.
 * 
 * SCALING TO 100+ VIDEOS:
 * - You can move this array into a `videos.json` file in /public or /src/data.
 * - Simply import videos from './videos.json' or fetch them via an API route:
 *   const response = await fetch('/api/videos');
 *   const videos = await response.json();
 * ============================================================================
 */

export const INITIAL_VIDEOS: Video[] = [
  {
    id: 1,
    title: "Amazing Nature Video",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description: "Experience the untamed majesty of Earth's most breathtaking landscapes, from misty mountain ridges to hidden emerald rainforest waterfalls and wildlife sanctuaries in high definition.",
    duration: "9:56",
    views: "1.4M views",
    uploadDate: "3 days ago",
    channel: {
      name: "Wild Earth Expeditions",
      subscribers: "840K",
      verified: true
    },
    likes: 48200
  },
  {
    id: 2,
    title: "Funny Moments",
    thumbnail: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    description: "The ultimate compilation of side-splitting bloopers, hilarious animal antics, and unexpected comedic timing captured on camera. Guaranteed to brighten your day.",
    duration: "1:00",
    views: "890K views",
    uploadDate: "1 week ago",
    channel: {
      name: "Chuckle Hub",
      subscribers: "1.2M",
      verified: true
    },
    likes: 72400
  },
  {
    id: 3,
    title: "Amazing Technology",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description: "A deep dive into next-generation quantum computing architectures, autonomous synthetic intelligence, and the revolutionary hardware changing our world forever.",
    duration: "10:53",
    views: "2.1M views",
    uploadDate: "2 weeks ago",
    channel: {
      name: "Future Tech Frontier",
      subscribers: "980K",
      verified: true
    },
    likes: 95300
  },
  {
    id: 4,
    title: "Football Highlights",
    thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description: "Thrilling championship showdown featuring incredible long-range free kicks, lightning counterattacks, fingertip goalkeeper saves, and stoppage-time drama.",
    duration: "0:15",
    views: "3.5M views",
    uploadDate: "5 days ago",
    channel: {
      name: "Pro Sports Arena",
      subscribers: "2.8M",
      verified: true
    },
    likes: 184000
  },
  {
    id: 5,
    title: "Travel Adventure",
    thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description: "Join us as we explore remote islands, dramatic sea arches, crystal lagoons, and vibrant coastal culture in this cinematic travel expedition across hidden gems of the Pacific.",
    duration: "0:15",
    views: "640K views",
    uploadDate: "3 weeks ago",
    channel: {
      name: "Nomad Odyssey",
      subscribers: "420K",
      verified: false
    },
    likes: 31200
  },
  {
    id: 6,
    title: "AI Generated Video",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    description: "An awe-inspiring short film completely synthesized using cutting-edge generative video models, physics simulations, and hyper-realistic neural rendering pipelines.",
    duration: "12:14",
    views: "1.8M views",
    uploadDate: "4 days ago",
    channel: {
      name: "Synthetic Studios",
      subscribers: "710K",
      verified: true
    },
    likes: 112000
  },
  {
    id: 7,
    title: "Amazing Cars",
    thumbnail: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    description: "Pure horsepower and aerodynamic perfection. Experience the world's rarest hypercars roaring down coastal raceways with thunderous twin-turbo exhaust notes.",
    duration: "0:15",
    views: "4.2M views",
    uploadDate: "1 month ago",
    channel: {
      name: "Apex Throttle",
      subscribers: "1.9M",
      verified: true
    },
    likes: 245000
  },
  {
    id: 8,
    title: "Mystery Story",
    thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    description: "A gripping atmospheric narrative exploring an unsolved enigma beneath a forgotten ancient citadel. Clues unravel as twilight falls over the misty valleys.",
    duration: "14:48",
    views: "980K views",
    uploadDate: "2 weeks ago",
    channel: {
      name: "Midnight Chronicles",
      subscribers: "650K",
      verified: true
    },
    likes: 67100
  }
];
