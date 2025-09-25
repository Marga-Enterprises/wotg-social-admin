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

  // If editing, show the existing thumbnail by default
  useEffect(() => {
    if (formValues.blog_thumbnail && !previewUrl) {
      setPreviewUrl(
        `https://wotg.sgp1.cdn.digitaloceanspaces.com/images/${formValues.blog_thumbnail}`
      );
    }
  }, [formValues.blog_thumbnail, previewUrl]);

  // Handle new file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    onThumbnailUpload(file);
  };


  return (
    <Box
      className={styles.formWrapper}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit} // ✅ added submit handler
    >
      <Stack spacing={4}>
        {/* Blog Title */}
        <TextField
          label="Blog Title"
          name="blog_title"
          value={formValues.blog_title || ''}
          onChange={onInputChange}
          fullWidth
          required
          className={styles.textField}
        />

        {/* Blog Intro */}
        <Box>
          <Typography variant="subtitle1" className={styles.label}>
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
          <Typography variant="subtitle1" className={styles.label}>
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
          value={formValues.blog_release_date_and_time || ''}
          onChange={onInputChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          className={styles.textField}
        />

        {/* Blog Thumbnail Upload */}
        <Box>
          <Typography variant="subtitle1" className={styles.label}>
            Blog Thumbnail
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />

          {/* ✅ Always show thumbnail (preview first, then saved one) */}
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Blog Thumbnail"
              className={styles.thumbnail}
            />
          )}
        </Box>

        {/* Save Button */}
        <Box textAlign="right">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            className={styles.submitBtn}
          >
            {loading ? 'Saving...' : 'Save Blog'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default React.memo(BlogsDetailsForm);
