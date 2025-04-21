"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, ButtonGroup, Typography, Divider, Paper } from "@mui/material";
import VideoUploader from "@/components/VideoUploader";
import VideoListView from "@/components/Videolist";
import VideoGridView from "@/components/VideoGrid";
import { getVideos } from "@/lib/storage";
import { CloudUpload, GridView, ViewList } from "@mui/icons-material";

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

const VideosPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setVideos(getVideos());
  }, [refreshKey]);

  const handleUploadSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleVideoUpdate = () => {
    setRefreshKey((prev) => prev + 1);
  };
  

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 },
      bgcolor: "background.default",
      minHeight: "100vh",
      color: "text.primary"
    }}>
      {/* Header Section */}
      <Paper elevation={0} sx={{ 
        p: 3,
        mb: 4,
        borderRadius: 3,
        bgcolor: "primary.main",
        color: "primary.contrastText",
        background: "linear-gradient(135deg, #1976d2 0%, #115293 100%)"
      }}>
        <Typography variant="h4" component="h1" sx={{ 
          mb: 1,
          fontWeight: 700,
          letterSpacing: -0.5
        }}>
          VidCore
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          Upload and manage your video collection
        </Typography>
      </Paper>

      {/* Upload Section */}
      <Paper elevation={0} sx={{ 
        p: 3,
        mb: 4,
        borderRadius: 3,
        bgcolor: "background.paper"
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CloudUpload color="primary" sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            Upload Videos
          </Typography>
        </Box>
        <VideoUploader onUploadSuccess={handleUploadSuccess} />
      </Paper>

      {/* Videos Section */}
      <Paper elevation={0} sx={{ 
        p: 3,
        borderRadius: 3,
        bgcolor: "background.paper"
      }}>
        {/* View Controls */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          mb: 3
        }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            Your Videos
            <Typography component="span" sx={{ 
              ml: 1,
              color: "text.secondary",
              fontSize: '0.9rem'
            }}>
              ({videos.length} {videos.length === 1 ? 'item' : 'items'})
            </Typography>
          </Typography>
          
          <ButtonGroup variant="text" color="inherit">
            <Button
              startIcon={<GridView />}
              onClick={() => setViewMode("grid")}
              sx={{
                fontWeight: viewMode === "grid" ? 600 : 400,
                color: viewMode === "grid" ? "primary.main" : "text.secondary",
                "&:hover": {
                  bgcolor: "action.hover"
                }
              }}
            >
              Grid
            </Button>
            <Button
              startIcon={<ViewList />}
              onClick={() => setViewMode("list")}
              sx={{
                fontWeight: viewMode === "list" ? 600 : 400,
                color: viewMode === "list" ? "primary.main" : "text.secondary",
                "&:hover": {
                  bgcolor: "action.hover"
                }
              }}
            >
              List
            </Button>
          </ButtonGroup>
        </Box>

        <Divider sx={{ my: 2, bgcolor: "divider" }} />

        {/* Content */}
        {videos.length === 0 ? (
          <Box sx={{ 
            textAlign: "center", 
            py: 8,
            bgcolor: "background.default",
            borderRadius: 2
          }}>
            <CloudUpload sx={{ 
              fontSize: 60, 
              color: "action.disabled",
              mb: 2
            }} />
            <Typography variant="h6" sx={{ 
              mb: 1,
              color: "text.secondary"
            }}>
              No videos yet
            </Typography>
            <Typography variant="body1" sx={{ 
              color: "text.secondary",
              maxWidth: 400,
              mx: 'auto'
            }}>
              Upload your first video to get started. Supported formats: MP4, MOV, AVI, MKV, WEBM
            </Typography>
          </Box>
        ) : viewMode === "grid" ? (
          <VideoGridView videos={videos} onVideoUpdate={handleVideoUpdate} />
        ) : (
          <VideoListView videos={videos} onVideoUpdate={handleVideoUpdate} />
        )}
      </Paper>
    </Box>
  );
};

export default VideosPage;