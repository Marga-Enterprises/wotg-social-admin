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
  Divider,
} from '@mui/material';

// styles
import styles from './styles';

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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: styles.dialogPaper }}>
      <DialogTitle sx={styles.dialogTitle}>
        Add New Blog
      </DialogTitle>

      <Divider sx={styles.divider} />

      <DialogContent dividers sx={styles.dialogContent}>
        <Stack spacing={4}>
          {/* Blog Title */}
          <TextField
            label="Blog Title"
            name="blog_title"
            value={formValues.blog_title || ''}
            onChange={onInputChange}
            fullWidth
            required
            sx={styles.textField}
          />

          {/* Blog Intro */}
          <Box>
            <Typography variant="subtitle1" sx={styles.sectionLabel}>
              Blog Intro
            </Typography>
            <Editor
              apiKey="etmgui2r438xkf0wrvprltzrgwj1mpjly6f7em9i21lrx44j"
              value={formValues.blog_intro || ''}
              init={styles.editorIntro}
              onEditorChange={(content) =>
                onInputChange({
                  target: { name: 'blog_intro', value: content },
                })
              }
            />
          </Box>

          {/* Blog Body */}
          <Box>
            <Typography variant="subtitle1" sx={styles.sectionLabel}>
              Blog Body
            </Typography>
            <Editor
              apiKey="etmgui2r438xkf0wrvprltzrgwj1mpjly6f7em9i21lrx44j"
              value={formValues.blog_body || ''}
              init={styles.editorBody}
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
            sx={styles.textField}
          />

          {/* Blog Thumbnail Upload */}
          <Box>
            <Typography variant="subtitle1" sx={styles.sectionLabel}>
              Blog Thumbnail
            </Typography>
            <Box sx={styles.uploadBox}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="thumbnail-upload"
                style={{ display: 'none' }}
              />
              <label htmlFor="thumbnail-upload">
                <Button variant="outlined" component="span" sx={styles.uploadBtn}>
                  Upload Image
                </Button>
              </label>

              {previewUrl && (
                <img src={previewUrl} alt="Preview" style={styles.previewImage} />
              )}
            </Box>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={styles.dialogActions}>
        <Button onClick={onClose} sx={styles.cancelBtn}>
          Cancel
        </Button>
        <Button onClick={onSubmit} variant="contained" sx={styles.saveBtn}>
          Save Blog
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(AddBlogFormModal);
