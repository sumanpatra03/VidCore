import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Typography,
  TablePagination,
  Box,
  Tooltip,
  Snackbar,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateVideoName, deleteVideo } from "../lib/storage";
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

interface VideoListViewProps {
  videos: Video[];
  onVideoUpdate: () => void;
}

const VideoListView: React.FC<VideoListViewProps> = ({
  videos,
  onVideoUpdate,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  const handleDelete = async (id: string) => {
    await deleteVideo(id);
    setSnackbarOpen(true);
    onVideoUpdate();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "16px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          bgcolor: "#ffffff",
        }}
      >
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f1f3f5" }}>
                {[
                  "Thumbnail",
                  "Name",
                  "File Name",
                  "Size",
                  "Upload Date",
                  "Actions",
                ].map((heading) => (
                  <TableCell key={heading} sx={{ fontWeight: "bold" }}>
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {videos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((video) => (
                  <TableRow
                    key={video.id}
                    hover
                    sx={{
                      transition: "background 0.2s",
                      "&:hover": {
                        backgroundColor: "#fafafa",
                      },
                    }}
                  >
                    <TableCell>
                      <Avatar
                        variant="rounded"
                        src={video.thumbnail || "/video-placeholder.jpg"}
                        alt={video.name}
                        sx={{ width: 80, height: 45 }}
                      />
                      
                    </TableCell>

                    <TableCell>
                      {editingId === video.id ? (
                        <TextField
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          size="small"
                          fullWidth
                          variant="standard"
                        />
                      ) : (
                        <Link href={`/videos/${video.id}`} passHref>
                          <Typography
                            color="primary"
                            sx={{
                              cursor: "pointer",
                              fontWeight: 500,
                              "&:hover": { textDecoration: "underline" },
                            }}
                          >
                            {video.name}
                          </Typography>
                        </Link>
                      )}
                    </TableCell>

                    <TableCell sx={{ color: "#555" }}>
                      {video.fileName}
                    </TableCell>

                    <TableCell sx={{ color: "#555" }}>
                      {(video.size / (1024 * 1024)).toFixed(2)} MB
                    </TableCell>

                    <TableCell sx={{ color: "#555" }}>
                      {video.uploadDate.toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      {editingId === video.id ? (
                        <Box>
                          <Tooltip title="Save">
                            <IconButton
                              onClick={() => handleEditSave(video.id)}
                            >
                              <SaveIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Cancel">
                            <IconButton onClick={handleEditCancel}>
                              <CancelIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      ) : (
                        <Box>
                          <Tooltip title="Edit">
                            <IconButton onClick={() => handleEditStart(video)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleDelete(video.id)}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={videos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            px: 2,
            bgcolor: "#fafafa",
            borderTop: "1px solid #eee",
            "& .MuiTablePagination-toolbar": {
              justifyContent: "space-between",
            },
          }}
        />
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Video deleted successfully!"
      />
    </>
  );
};

export default VideoListView;
