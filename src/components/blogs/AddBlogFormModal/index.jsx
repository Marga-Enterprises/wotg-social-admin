// react
import React from 'react';

// mui
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from '@mui/material';

const AddBlogFormModal = ({
  open,
  onClose,
  formValues,
  onInputChange,
  onSubmit,
}) => {
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

          {/* Release Date & Time */}
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
