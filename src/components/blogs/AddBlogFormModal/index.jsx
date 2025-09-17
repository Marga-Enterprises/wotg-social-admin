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
} from '@mui/material';

const AddBlogFormModal = ({
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

    console.log('Selected file:', file);

    if (!file) return;

    // Show preview
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    // Upload to S3 via parent
    onThumbnailUpload(file);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Blog</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3} mt={1}>
          {/* Blog Title */}
          <TextField
            label="Blog Title"
            name="blog_title"
            value={formValues.blog_title || ''}
            onChange={onInputChange}
            fullWidth
            required
          />

          {/* Blog Intro */}
          <TextField
            label="Blog Intro"
            name="blog_intro"
            value={formValues.blog_intro || ''}
            onChange={onInputChange}
            fullWidth
            required
            multiline
            rows={2}
          />

          {/* Blog Body */}
          <TextField
            label="Blog Body"
            name="blog_body"
            value={formValues.blog_body || ''}
            onChange={onInputChange}
            fullWidth
            required
            multiline
            rows={6}
          />

          {/* Release Date */}
          <TextField
            label="Release Date"
            name="blog_release_date_and_time"
            type="date"
            value={formValues.blog_release_date_and_time || ''}
            onChange={onInputChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />

          {/* Blog Thumbnail Upload */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Blog Thumbnail
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ marginBottom: '10px' }}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                style={{ width: '100%', borderRadius: 8, maxHeight: 200, objectFit: 'cover' }}
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
          Save Blog
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(AddBlogFormModal);
