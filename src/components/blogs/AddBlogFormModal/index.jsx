// react
import React, { useState } from 'react';

// tinymce
import { Editor } from '@tinymce/tinymce-react';

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
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    onThumbnailUpload(file);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Blog Intro
            </Typography>
            <Editor
              apiKey="etmgui2r438xkf0wrvprltzrgwj1mpjly6f7em9i21lrx44j" // ✅ free for self-hosted usage
              value={formValues.blog_intro || ''}
              init={{
                height: 200,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic underline | \
                   alignleft aligncenter alignright alignjustify | \
                   bullist numlist outdent indent | removeformat | help',
              }}
              onEditorChange={(content) =>
                onInputChange({
                  target: { name: 'blog_intro', value: content },
                })
              }
            />
          </Box>

          {/* Blog Body */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Blog Body
            </Typography>
            <Editor
              apiKey="etmgui2r438xkf0wrvprltzrgwj1mpjly6f7em9i21lrx44j"
              value={formValues.blog_body || ''}
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  'advlist autolink lists link image charmap preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic underline | \
                   alignleft aligncenter alignright alignjustify | \
                   bullist numlist outdent indent | removeformat | help',
              }}
              onEditorChange={(content) =>
                onInputChange({
                  target: { name: 'blog_body', value: content },
                })
              }
            />
          </Box>

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
                style={{
                  width: '100%',
                  borderRadius: 8,
                  maxHeight: 200,
                  objectFit: 'cover',
                }}
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
