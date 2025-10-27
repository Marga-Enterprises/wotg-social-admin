// react
import React, { useState, useEffect } from 'react';

// tinymce
import { Editor } from '@tinymce/tinymce-react';

// mui
import {
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  Divider,
  Paper,
} from '@mui/material';

// styles
import styles from './styles';

const BlogsDetailsForm = ({
  formValues,
  loading,
  onSubmit,
  onInputChange,
  onThumbnailUpload,
}) => {
  const tinymceApiKey = 'etmgui2r438xkf0wrvprltzrgwj1mpjly6f7em9i21lrx44j';
  const [previewUrl, setPreviewUrl] = useState(null);

  // Handle existing thumbnail
  useEffect(() => {
    if (formValues.blog_thumbnail && !previewUrl) {
      setPreviewUrl(
        `https://wotg.sgp1.cdn.digitaloceanspaces.com/images/${formValues.blog_thumbnail}`
      );
    }
  }, [formValues.blog_thumbnail, previewUrl]);

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    onThumbnailUpload(file);
  };

  return (
    <Paper elevation={3} sx={styles.formWrapper}>
      <Typography variant="h5" sx={styles.headerTitle}>
        Edit Blog
      </Typography>
      <Typography variant="body2" sx={styles.headerSubtitle}>
        Fill out the details below and click <strong>Save Blog</strong> when ready.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <Stack spacing={5}>
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
            <Typography variant="subtitle1" sx={styles.label}>
              Blog Intro
            </Typography>
            <Editor
              apiKey={tinymceApiKey}
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
            <Typography variant="subtitle1" sx={styles.label}>
              Blog Body
            </Typography>
            <Editor
              apiKey={tinymceApiKey}
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
            value={
              formValues.blog_release_date_and_time
                ? new Date(formValues.blog_release_date_and_time)
                    .toISOString()
                    .split('T')[0]
                : ''
            }
            onChange={onInputChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={styles.textField}
          />

          {/* Thumbnail Upload */}
          <Box>
            <Typography variant="subtitle1" sx={styles.label}>
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
                <Button
                  variant="outlined"
                  component="span"
                  sx={styles.uploadBtn}
                >
                  Upload Image
                </Button>
              </label>

              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Blog Thumbnail"
                  style={styles.thumbnail}
                />
              )}
            </Box>
          </Box>

          {/* Save Button */}
          <Box textAlign="right">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={styles.submitBtn}
            >
              {loading ? 'Saving...' : 'Save Blog'}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default React.memo(BlogsDetailsForm);
