import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { saveVideo } from "../lib/storage";

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

interface VideoUploaderProps {
  onUploadSuccess: (video: Video) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onUploadSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);
      const videoFile = acceptedFiles[0];

      if (!videoFile) {
        setError("Please upload a valid video file.");
        return;
      }

      try {
        setIsUploading(true);

        const videoUrl = URL.createObjectURL(videoFile);

        const newVideo = saveVideo({
          name: videoFile.name.replace(/\.[^/.]+$/, ""),
          fileName: videoFile.name,
          url: videoUrl,
          size: videoFile.size,
          duration: 0,
          uploadDate: new Date(),
        });

        onUploadSuccess(newVideo);
      } catch (err) {
        setError("Failed to upload video. Please try again.");
        console.error(err);
      } finally {
        setIsUploading(false);
      }
    },
    [onUploadSuccess]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"],
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  return (
    <Box
      sx={{
        p: 4,
        border: "2px dashed #ccc",
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isUploading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Uploading video...
            </Typography>
          </Box>
        ) : (
          <Box sx={{ cursor: "pointer" }}>
            <CloudUploadIcon sx={{ fontSize: 60, color: "primary.main" }} />
            <Typography variant="h6">
              {isDragActive
                ? "Drop the video here"
                : "Drag & drop a video file here, or click to select"}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Supported formats: MP4, MOV, AVI, MKV, WEBM
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              Select Video
            </Button>
          </Box>
        )}
      </div>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default VideoUploader;
