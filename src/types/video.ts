/**
 * Video entity type definitions for VideoHub.
 */
export interface Video {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  duration: string;
  views: string;
  uploadDate: string;
  channel: {
    name: string;
    subscribers: string;
    verified: boolean;
  };
  likes: number;
  tags?: string[];
}
