const styles = {
  // 🔹 Dialog Container
  dialogPaper: {
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #ffffff, #fff5f5)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
    backdropFilter: 'blur(12px)',
  },

  // 🔹 Title
  dialogTitle: {
    fontWeight: 700,
    fontSize: '1.5rem',
    color: '#b71c1c',
    letterSpacing: '-0.3px',
    pb: 1,
  },

  // 🔹 Content
  dialogContent: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderTop: '1px solid rgba(0,0,0,0.05)',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
  },

  // 🔹 Label
  label: {
    fontWeight: 600,
    fontSize: '0.95rem',
    color: '#333',
    mb: 1,
  },

  // 🔹 Input Fields
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      backgroundColor: '#fafafa',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e0e0e0',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#b71c1c',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#b71c1c',
    },
  },

  // 🔹 File Input
  fileInput: {
    marginBottom: '12px',
  },

  // 🔹 Audio Preview
  audioPreviewBox: {
    width: '100%',
    borderRadius: '12px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    p: 1.5,
  },

  audioPlayer: {
    width: '100%',
    borderRadius: '8px',
  },

  audioPlaceholder: {
    width: '100%',
    height: 80,
    borderRadius: '10px',
    backgroundColor: '#f5f5f5',
    border: '2px dashed #ddd',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 🔹 Actions
  dialogActions: {
    px: 3,
    py: 2,
    backgroundColor: '#fff',
  },

  cancelButton: {
    textTransform: 'none',
    color: '#555',
    fontWeight: 500,
  },

  saveButton: {
    textTransform: 'none',
    fontWeight: 700,
    borderRadius: '10px',
    px: 3,
    py: 1.2,
    background: 'linear-gradient(135deg, #b71c1c, #d32f2f)',
    boxShadow: '0 4px 12px rgba(211,47,47,0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #9c1c1c, #c62828)',
      boxShadow: '0 6px 18px rgba(211,47,47,0.4)',
    },
  },
};

export default styles;
