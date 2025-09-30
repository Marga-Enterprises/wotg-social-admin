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
  Avatar,
} from '@mui/material';

const AddAlbumFormModal = ({
  open,
  onClose,
  onThumbnailUpload,
  formValues,
  onInputChange,
  onSubmit,
}) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    onThumbnailUpload(file); // parent handles saving
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Album</DialogTitle>

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

          {/* Cover Image Upload */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Cover Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ marginBottom: '10px' }}
            />
            {previewUrl && (
              <Avatar
                variant="rounded"
                src={previewUrl}
                alt="Preview"
                sx={{ width: 120, height: 120 }}
              />
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

export default React.memo(AddAlbumFormModal);
