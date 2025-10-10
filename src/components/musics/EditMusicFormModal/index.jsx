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
  MenuItem,
} from '@mui/material';

// styles
import styles from './styles';

const EditMusicFormModal = ({
  open,
  onClose,
  onAudioUpload,
  formValues,
  onInputChange,
  onSubmit,
  albums,
}) => {
  const [audioPreview, setAudioPreview] = useState(null);

  // Load existing track if available
  useEffect(() => {
    if (open) {
      if (formValues.audio_url) {
        setAudioPreview(
          `https://wotg.sgp1.cdn.digitaloceanspaces.com/audios/${formValues.audio_url}`
        );
      } else {
        setAudioPreview(null);
      }
    }
  }, [open, formValues.audio_url]);

  // Reset preview when closing
  useEffect(() => {
    if (!open) setAudioPreview(null);
  }, [open]);

  // Handle audio upload
  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const audioUrl = URL.createObjectURL(file);
    setAudioPreview(audioUrl);
    onAudioUpload(file);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: styles.dialogPaper }}
    >
      {/* 🎵 Header */}
      <DialogTitle sx={styles.dialogTitle}>Edit Music</DialogTitle>

      {/* 🧩 Content */}
      <DialogContent dividers sx={styles.dialogContent}>
        <Stack spacing={3} mt={1}>
          {/* Title */}
          <TextField
            label="Music Title"
            name="title"
            value={formValues.title || ''}
            onChange={onInputChange}
            fullWidth
            required
            sx={styles.textField}
          />

          {/* Genre */}
          <TextField
            label="Genre"
            name="genre"
            value={formValues.genre || ''}
            onChange={onInputChange}
            fullWidth
            sx={styles.textField}
          />

          {/* Album */}
          <TextField
            select
            label="Album"
            name="album_id"
            value={formValues.album_id || ''}
            onChange={onInputChange}
            fullWidth
            sx={styles.textField}
          >
            <MenuItem value="">None</MenuItem>
            {albums.map((album) => (
              <MenuItem key={album.id} value={album.id}>
                {album.title}
              </MenuItem>
            ))}
          </TextField>

          {/* Audio Upload */}
          <Box>
            <Typography variant="subtitle2" sx={styles.label}>
              Replace Audio File
            </Typography>

            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioChange}
              style={styles.fileInput}
            />

            {audioPreview ? (
              <Box sx={styles.audioPreviewBox}>
                <Typography variant="body2" sx={styles.currentTrackLabel}>
                  Preview Track
                </Typography>
                <audio controls src={audioPreview} style={styles.audioPlayer} />
              </Box>
            ) : (
              <Box sx={styles.audioPlaceholder}>
                <Typography variant="body2" color="text.secondary">
                  No audio selected
                </Typography>
              </Box>
            )}
          </Box>
        </Stack>
      </DialogContent>

      {/* ⚙️ Actions */}
      <DialogActions sx={styles.dialogActions}>
        <Button onClick={onClose} sx={styles.cancelButton}>
          Cancel
        </Button>
        <Button onClick={onSubmit} variant="contained" sx={styles.saveButton}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(EditMusicFormModal);
