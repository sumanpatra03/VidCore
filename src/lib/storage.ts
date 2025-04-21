import { v4 as uuidv4 } from "uuid";

export interface Video {
  id: string;
  name: string;
  fileName: string;
  url: string;
  size: number;
  duration: number;
  uploadDate: Date;
  thumbnail?: string;
}

export type ViewMode = "grid" | "list";

const VIDEO_STORAGE_KEY = "uploadedVideos";

// Helper to rehydrate dates
const parseVideoDates = (
  video: Partial<Video> & { uploadDate: string }
): Video =>
  ({
    ...video,
    uploadDate: new Date(video.uploadDate),
  } as Video);

export const saveVideo = (video: Omit<Video, "id">): Video => {
  const videos = getVideos();
  const newVideo: Video = {
    ...video,
    id: uuidv4(),
    uploadDate: video.uploadDate || new Date(),
  };
  localStorage.setItem(
    VIDEO_STORAGE_KEY,
    JSON.stringify([...videos, newVideo])
  );
  return newVideo;
};

export const getVideos = (): Video[] => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(VIDEO_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw).map(parseVideoDates);
  } catch {
    return [];
  }
};

export const getVideoById = (id: string): Video | undefined =>
  getVideos().find((v) => v.id === id);

export const updateVideoName = (
  id: string,
  newName: string
): Video | undefined => {
  const videos = getVideos();
  const idx = videos.findIndex((v) => v.id === id);
  if (idx === -1) return;
  videos[idx] = { ...videos[idx], name: newName };
  localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(videos));
  return videos[idx];
};


export const deleteVideo = (id: string): void => {
  const remaining = getVideos().filter((v) => v.id !== id);
  localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(remaining));
};
