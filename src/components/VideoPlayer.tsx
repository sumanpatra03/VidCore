import React from 'react';
import ReactPlayer from 'react-player';
import { Box, Typography } from '@mui/material';
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
  
  export type ViewMode = 'grid' | 'list';


interface VideoPlayerProps {
  video: Video;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: '800px', mx: 'auto' }}>
      <ReactPlayer
        url={video.url}
        controls
        width="100%"
        height="auto"
        style={{ aspectRatio: '16/9' }}
      />
      <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
        {video.name}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Uploaded on {video.uploadDate.toLocaleDateString()}
      </Typography>
    </Box>
  );
};

export default VideoPlayer;