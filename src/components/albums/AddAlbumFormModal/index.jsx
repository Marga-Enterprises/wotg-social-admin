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

// styles
import styles from './styles';

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
    onThumbnailUpload(file);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: styles.dialogPaper }}
    >
      {/* 🔹 Header */}
      <DialogTitle sx={styles.dialogTitle}>Add New Album</DialogTitle>

      {/* 🔹 Content */}
      <DialogContent dividers sx={styles.dialogContent}>
        <Stack spacing={3} mt={1}>
          {/* Album Title */}
          <TextField
            label="Album Title"
            name="title"
            value={formValues.title || ''}
            onChange={onInputChange}
            fullWidth
            required
            sx={styles.textField}
          />

          {/* Cover Image Upload */}
          <Box>
            <Typography variant="subtitle2" sx={styles.label}>
              Cover Image
            </Typography>

            <Box sx={styles.uploadBox}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={styles.fileInput}
              />
              {previewUrl ? (
                <Avatar
                  variant="rounded"
                  src={previewUrl}
                  alt="Album Cover Preview"
                  sx={styles.avatarPreview}
                />
              ) : (
                <Box sx={styles.placeholderBox}>
                  <Typography variant="body2" sx={{ color: '#888' }}>
                    No image selected
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Stack>
      </DialogContent>

      {/* 🔹 Actions */}
      <DialogActions sx={styles.dialogActions}>
        <Button onClick={onClose} sx={styles.cancelButton}>
          Cancel
        </Button>
        <Button onClick={onSubmit} variant="contained" sx={styles.saveButton}>
          Save Album
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(AddAlbumFormModal);
