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
} from '@mui/material';

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

  useEffect(() => {
    if (open) {
      if (formValues?.mediaUrl) {
        console.log('Media for preview:', formValues.mediaUrl);

        // Detect type based on extension
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setPreviewType(file.type.startsWith('video') ? 'video' : 'image');

    onMediaUpload(file); // send file to parent
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Post</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3} mt={1}>
          {/* Content */}
          <TextField
            label="Content"
            name="content"
            value={formValues.content || ''}
            onChange={onInputChange}
            fullWidth
            required
            multiline
            minRows={3}
          />

          {/* Release Date */}
          <TextField
            label="Release Date"
            type="date"
            name="release_date"
            value={formValues.release_date || ''}
            onChange={onInputChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          {/* Media Upload */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Upload Media (Image or Video)
            </Typography>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              style={{ marginBottom: '10px' }}
            />

            {previewUrl && (
              <>
                {previewType === 'video' ? (
                  <video
                    src={previewUrl}
                    controls
                    style={{
                      width: '100%',
                      maxWidth: '320px',
                      borderRadius: 8,
                    }}
                  />
                ) : (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      width: '100%',
                      maxWidth: '320px',
                      borderRadius: 8,
                      objectFit: 'cover',
                    }}
                  />
                )}
              </>
            )}
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(EditPostFormModal);
