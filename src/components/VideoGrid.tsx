import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Box,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { updateVideoName } from "../lib/storage";
import Link from "next/link";

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

interface VideoGridViewProps {
  videos: Video[];
  onVideoUpdate: () => void;
}

const VideoGridView: React.FC<VideoGridViewProps> = ({
  videos,
  onVideoUpdate,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const handleEditStart = (video: Video) => {
    setEditingId(video.id);
    setEditName(video.name);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditName("");
  };

  const handleEditSave = async (id: string) => {
    await updateVideoName(id, editName);
    setEditingId(null);
    onVideoUpdate();
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const pageCount = Math.ceil(videos.length / itemsPerPage);
  const displayedVideos = videos.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ p: 3, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      <Grid container spacing={3}>
        {displayedVideos.map((video) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={video.id}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                bgcolor: "#fff",
                height: "100%",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Link href={`/videos/${video.id}`} passHref>
                <CardMedia
                  component="img"
                  height="180"
                  image={video.thumbnail || "/video-placeholder.jpg"}
                  alt={video.name}
                  sx={{
                    objectFit: "cover",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    cursor: "pointer",
                  }}
                />
              </Link>
              <CardContent sx={{ p: 2 }}>
                {editingId === video.id ? (
                  <TextField
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    fullWidth
                    size="small"
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                ) : (
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 600 }}
                  >
                    <Link href={`/videos/${video.id}`} passHref>
                      <Box
                        sx={{
                          cursor: "pointer",
                          color: "#00796b",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {video.name}
                      </Box>
                    </Link>
                  </Typography>
                )}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  {(video.size / (1024 * 1024)).toFixed(2)} MB
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 400 }}
                >
                  {video.uploadDate.toLocaleDateString()}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {editingId === video.id ? (
                  <>
                    <IconButton
                      onClick={() => handleEditSave(video.id)}
                      sx={{ color: "#00796b" }}
                    >
                      <SaveIcon />
                    </IconButton>
                    <IconButton
                      onClick={handleEditCancel}
                      sx={{ color: "#d32f2f" }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    onClick={() => handleEditStart(video)}
                    sx={{ color: "#0d47a1" }}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{ "& .MuiPaginationItem-root": { borderRadius: "8px" } }}
          />
        </Box>
      )}
    </Box>
  );
};

export default VideoGridView;
