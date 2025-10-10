// react
import React, { useState, useEffect } from 'react';

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

const cdnUrl = 'https://wotg.sgp1.cdn.digitaloceanspaces.com/';

const EditPostFormModal = ({
  open,
  onClose,
  onMediaUpload,
  formValues,
  onInputChange,
  onSubmit,
}) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewType, setPreviewType] = useState(null);

  // load preview if media exists
  useEffect(() => {
    if (open) {
      if (formValues?.mediaUrl) {
        const isVideo = /\.(mp4|mov|avi|mkv|webm)$/i.test(formValues.mediaUrl);
        setPreviewType(isVideo ? 'video' : 'image');
        setPreviewUrl(
          isVideo
            ? `${cdnUrl}videos/${formValues.mediaUrl}`
            : `${cdnUrl}images/${formValues.mediaUrl}`
        );
      } else {
        setPreviewUrl(null);
        setPreviewType(null);
      }
    }
  }, [open, formValues?.mediaUrl]);

  // handle media upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setPreviewType(file.type.startsWith('video') ? 'video' : 'image');
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
      <DialogTitle sx={styles.dialogTitle}>Edit Post</DialogTitle>

      <DialogContent dividers sx={styles.dialogContent}>
        <Stack spacing={3}>
          {/* Caption */}
          <Box>
            <Typography variant="subtitle2" sx={styles.sectionTitle}>
              Caption
            </Typography>
            <TextField
              name="content"
              placeholder="Update your caption or make small tweaks..."
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
              Scheduled Release
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
              You can reschedule this post if needed
            </Typography>
          </Box>

          <Divider sx={styles.divider} />

          {/* Media Upload */}
          <Box>
            <Typography variant="subtitle2" sx={styles.sectionTitle}>
              Replace Media
            </Typography>
            <Typography variant="body2" sx={styles.helperText}>
              Supported formats: <b>JPG, PNG, MP4, WEBM</b> — max size 50MB.
            </Typography>

            <Button component="label" variant="outlined" sx={styles.uploadButton}>
              Replace File
              <input
                type="file"
                hidden
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
            </Button>

            {previewUrl && (
              <Box sx={styles.mediaPreviewContainer}>
                {previewType === 'video' ? (
                  <Box component="video" src={previewUrl} controls sx={styles.videoPreview} />
                ) : (
                  <Box component="img" src={previewUrl} alt="Preview" sx={styles.mediaPreview} />
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
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(EditPostFormModal);
