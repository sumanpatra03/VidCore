"use client";

import React from "react";
import { notFound } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Divider,
  Chip,
} from "@mui/material";
import Link from "next/link";
import VideoPlayer from "../../../components/VideoPlayer";
import { getVideoById } from "../../../lib/storage";
import { useParams } from "next/navigation";
import {
  ArrowBack,
  ThumbUp,
  ThumbDown,
  Share,
  PlaylistAdd,
  MoreVert,
} from "@mui/icons-material";

const VideoPage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;

  const video = getVideoById(id);

  if (!video) return notFound();

  return (
    <Box sx={{ padding: 2 }}>
      {/* Back Button */}
      <IconButton component={Link} href="/" sx={{ mb: 2 }}>
        <ArrowBack />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Left Section - Video + Info */}
        <Box sx={{ flex: 2 }}>
          <Box sx={{ position: "relative", width: "100%", pt: "56.25%" }}>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <VideoPlayer video={video} />
            </Box>
          </Box>

          <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }}>
            {video.name}
          </Typography>

          <Typography variant="body2" sx={{ color: "gray", mt: 0.5 }}>
            {Math.floor(Math.random() * 10000).toLocaleString()} views •{" "}
            {video.uploadDate.toLocaleDateString()}
          </Typography>

          <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
            <Button startIcon={<ThumbUp />} variant="outlined">
              Like
            </Button>
            <Button startIcon={<ThumbDown />} variant="outlined">
              Dislike
            </Button>
            <Button startIcon={<Share />} variant="outlined">
              Share
            </Button>
            <Button startIcon={<PlaylistAdd />} variant="outlined">
              Save
            </Button>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "grey.300",
                  borderRadius: "50%",
                }}
              />
              <Box>
                <Typography fontWeight={500}>Souvik Panja</Typography>
                <Typography variant="body2" color="text.secondary">
                  1.2M subscribers
                </Typography>
              </Box>
            </Box>
            <Button variant="contained" color="error">
              Subscribe
            </Button>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              This is a sample video description. It may contain useful links,
              timestamps, and other info.
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <Chip label="Technology" size="small" />
              <Chip label="Tutorial" size="small" />
              <Chip label="2024" size="small" />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="h6">Comments</Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "grey.300",
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Add a comment...
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            Recommended Videos
          </Typography>
          {[1, 2, 3, 4].map((item) => (
            <Box key={item} sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Box
                component="img"
                src={`https://picsum.photos/seed/video${item}/160/90`}
                alt={`Recommended Video ${item}`}
                sx={{
                  width: 160,
                  height: 90,
                  borderRadius: 1,
                  objectFit: "cover",
                }}
              />
              <Box>
                <Typography variant="subtitle2" fontWeight={600}>
                  Recommended Video {item}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Suman Patra
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.floor(Math.random() * 100)}K views •{" "}
                  {Math.floor(Math.random() * 12)} months ago
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPage;
