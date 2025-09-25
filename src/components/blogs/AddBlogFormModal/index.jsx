// react
import React, { useState } from 'react';

// draft-js
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

// utils
import {
  saveDraftContent,
  loadDraftContent,
  toggleInlineStyle,
  handleDraftKeyCommand,
} from '@utils/methods';

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

  // Draft.js editor state
  const [introState, setIntroState] = useState(() =>
    formValues.blog_intro ? loadDraftContent(formValues.blog_intro) : EditorState.createEmpty()
  );
  const [bodyState, setBodyState] = useState(() =>
    formValues.blog_body ? loadDraftContent(formValues.blog_body) : EditorState.createEmpty()
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

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

          {/* Blog Intro (Draft.js) */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Blog Intro
            </Typography>
            <Box mb={1}>
              <Button
                size="small"
                onClick={() =>
                  setIntroState(toggleInlineStyle(introState, 'BOLD'))
                }
              >
                Bold
              </Button>
              <Button
                size="small"
                onClick={() =>
                  setIntroState(toggleInlineStyle(introState, 'ITALIC'))
                }
              >
                Italic
              </Button>
              <Button
                size="small"
                onClick={() =>
                  setIntroState(toggleInlineStyle(introState, 'UNDERLINE'))
                }
              >
                Underline
              </Button>
            </Box>
            <Box sx={{ border: '1px solid #ccc', minHeight: 100, p: 1, borderRadius: 1 }}>
              <Editor
                editorState={introState}
                onChange={(newState) => {
                  setIntroState(newState);
                  onInputChange({
                    target: {
                      name: 'blog_intro',
                      value: saveDraftContent(newState),
                    },
                  });
                }}
                handleKeyCommand={(command) => {
                  const newState = handleDraftKeyCommand(introState, command);
                  if (newState) {
                    setIntroState(newState);
                    return 'handled';
                  }
                  return 'not-handled';
                }}
                placeholder="Write blog intro..."
              />
            </Box>
          </Box>

          {/* Blog Body (Draft.js) */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Blog Body
            </Typography>
            <Box mb={1}>
              <Button
                size="small"
                onClick={() =>
                  setBodyState(toggleInlineStyle(bodyState, 'BOLD'))
                }
              >
                Bold
              </Button>
              <Button
                size="small"
                onClick={() =>
                  setBodyState(toggleInlineStyle(bodyState, 'ITALIC'))
                }
              >
                Italic
              </Button>
              <Button
                size="small"
                onClick={() =>
                  setBodyState(toggleInlineStyle(bodyState, 'UNDERLINE'))
                }
              >
                Underline
              </Button>
            </Box>
            <Box sx={{ border: '1px solid #ccc', minHeight: 200, p: 1, borderRadius: 1 }}>
              <Editor
                editorState={bodyState}
                onChange={(newState) => {
                  setBodyState(newState);
                  onInputChange({
                    target: {
                      name: 'blog_body',
                      value: saveDraftContent(newState),
                    },
                  });
                }}
                handleKeyCommand={(command) => {
                  const newState = handleDraftKeyCommand(bodyState, command);
                  if (newState) {
                    setBodyState(newState);
                    return 'handled';
                  }
                  return 'not-handled';
                }}
                placeholder="Write blog body..."
              />
            </Box>
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
