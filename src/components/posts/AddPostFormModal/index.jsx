// react
import React, { useState } from 'react';

// mui
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  Divider,
} from '@mui/material';

// styles
import styles from './styles';

const AddPostFormModal = ({
  open,
  onClose,
  onMediaUpload,
  formValues,
  onInputChange,
  onSubmit,
}) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isVideo, setIsVideo] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setIsVideo(file.type.startsWith('video/'));
    setPreviewUrl(localPreview);
    onMediaUpload(file);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: styles.dialogPaper }}
    >
      <DialogTitle sx={styles.dialogTitle}>Create New Post</DialogTitle>

      <DialogContent dividers sx={styles.dialogContent}>
        <Stack spacing={3}>
          {/* Caption */}
          <Box>
            <Typography variant="subtitle2" sx={styles.sectionTitle}>
              Caption
            </Typography>
            <TextField
              name="content"
              placeholder="Write something inspiring, encouraging, or engaging..."
              value={formValues.content || ''}
              onChange={onInputChange}
              fullWidth
              multiline
              minRows={4}
              sx={styles.textField}
            />
          </Box>

          {/* Release Date */}
          <Box>
            <Typography variant="subtitle2" sx={styles.sectionTitle}>
              Schedule Release
            </Typography>
            <TextField
              type="date"
              name="release_date"
              value={formValues.release_date || ''}
              onChange={onInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={styles.textField}
            />
            <Typography variant="caption" sx={styles.helperText}>
              Set a future date to schedule the post release.
            </Typography>
          </Box>

          <Divider sx={styles.divider} />

          {/* Media Upload */}
          <Box>
            <Typography variant="subtitle2" sx={styles.sectionTitle}>
              Upload Media
            </Typography>
            <Typography variant="body2" sx={styles.helperText}>
              Supported formats: <b>JPG, PNG, MP4, WEBM</b> — max size 50MB.
            </Typography>

            <Button component="label" variant="outlined" sx={styles.uploadButton}>
              Choose File
              <input
                type="file"
                hidden
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
            </Button>

            {previewUrl && (
              <Box sx={styles.mediaPreviewContainer}>
                {isVideo ? (
                  <Box
                    component="video"
                    src={previewUrl}
                    controls
                    sx={styles.videoPreview}
                  />
                ) : (
                  <Box
                    component="img"
                    src={previewUrl}
                    alt="Preview"
                    sx={styles.mediaPreview}
                  />
                )}
              </Box>
            )}
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={styles.dialogActions}>
        <Button onClick={onClose} variant="outlined" sx={styles.cancelButton}>
          Cancel
        </Button>
        <Button onClick={onSubmit} variant="contained" sx={styles.saveButton}>
          Save Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(AddPostFormModal);
