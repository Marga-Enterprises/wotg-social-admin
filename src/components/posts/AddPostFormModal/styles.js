const styles = {
  // Dialog shell
  dialogPaper: {
    borderRadius: '16px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  dialogTitle: {
    fontWeight: 700,
    fontSize: '1.4rem',
    color: '#b71c1c',
    borderBottom: '1px solid #f0f0f0',
    pb: 2,
    px: 3,
  },
  dialogContent: {
    backgroundColor: '#fffdfd',
    py: 3,
    px: 3,
  },
  dialogActions: {
    borderTop: '1px solid #f0f0f0',
    py: 2,
    px: 3,
    backgroundColor: '#fff',
  },

  // Typography / labels
  sectionTitle: {
    mb: 1,
    color: '#444',
    fontWeight: 600,
    letterSpacing: '-0.2px',
  },
  helperText: {
    color: '#777',
    fontSize: '0.85rem',
    lineHeight: 1.4,
  },

  // Inputs
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      backgroundColor: '#fff',
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      transition: 'all 0.25s ease',
      '&:hover': {
        boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
      },
      '&.Mui-focused': {
        boxShadow: '0 0 0 2px rgba(183,28,28,0.15)',
        borderColor: '#b71c1c',
      },
    },
  },

  // Upload
  uploadButton: {
    mt: 1,
    borderRadius: '10px',
    textTransform: 'none',
    px: 3,
    py: 1.2,
    fontWeight: 600,
    borderColor: '#d32f2f',
    color: '#b71c1c',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#fff5f5',
      borderColor: '#b71c1c',
    },
  },

  // Media preview
  mediaPreviewContainer: {
    mt: 2.5,
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  mediaPreview: {
    width: '100%',
    borderRadius: '12px',
    objectFit: 'cover',
    maxHeight: 280,
  },
  videoPreview: {
    width: '100%',
    borderRadius: '12px',
    maxHeight: 280,
    backgroundColor: '#000',
  },

  // Buttons
  cancelButton: {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: '8px',
    px: 3,
    color: '#555',
    borderColor: '#ccc',
    '&:hover': {
      borderColor: '#aaa',
      backgroundColor: '#fafafa',
    },
  },
  saveButton: {
    textTransform: 'none',
    fontWeight: 700,
    borderRadius: '8px',
    px: 3,
    background: 'linear-gradient(135deg, #b71c1c, #d32f2f)',
    boxShadow: '0 4px 12px rgba(211,47,47,0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #9c1c1c, #c62828)',
      boxShadow: '0 6px 18px rgba(211,47,47,0.4)',
    },
  },

  // Divider
  divider: {
    my: 2,
    borderColor: '#f0f0f0',
  },
};

export default styles;
