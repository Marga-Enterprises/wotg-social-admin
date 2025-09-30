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
  MenuItem,
} from '@mui/material';

const AddMusicFormModal = ({
  open,
  onClose,
  onAudioUpload,
  formValues,
  onInputChange,
  onSubmit,
  albums,
}) => {
  const [audioPreview, setAudioPreview] = useState(null);

  // Handle audio upload
  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const audioUrl = URL.createObjectURL(file);
    setAudioPreview(audioUrl);

    onAudioUpload(file); // parent handles saving
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Music</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3} mt={1}>
          {/* Title */}
          <TextField
            label="Title"
            name="title"
            value={formValues.title || ''}
            onChange={onInputChange}
            fullWidth
            required
          />

          {/* Genre */}
          <TextField
            label="Genre"
            name="genre"
            value={formValues.genre || ''}
            onChange={onInputChange}
            fullWidth
          />

          {/* Album select */}
          <TextField
            select
            label="Album"
            name="album_id"
            value={formValues.album_id || ''}
            onChange={onInputChange}
            fullWidth
          >
            <MenuItem value="">None</MenuItem>
            {albums.map((album) => (
              <MenuItem key={album.id} value={album.id}>
                {album.title}
              </MenuItem>
            ))}
          </TextField>

          {/* Audio upload */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Audio File
            </Typography>
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioChange}
              style={{ marginBottom: '10px' }}
            />
            {audioPreview && (
              <audio controls src={audioPreview} style={{ width: '100%' }} />
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

export default React.memo(AddMusicFormModal);
