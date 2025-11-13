const styles = {
  container: {
    p: { xs: 2, sm: 3 },
    mb: 3,
    borderRadius: 3,
    backdropFilter: 'blur(8px)',
    background: 'linear-gradient(135deg, #ffffff, #fff7f7)',
    border: '1px solid rgba(200,0,0,0.15)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
      transform: 'translateY(-1px)',
    },
  },

  textField: {
    m: 0,
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#fff',
      borderRadius: 1.5,
      '& fieldset': { borderColor: 'rgba(0,0,0,0.1)' },
      '&:hover fieldset': { borderColor: '#c62828' },
      '&.Mui-focused fieldset': {
        borderColor: '#b71c1c',
        boxShadow: '0 0 0 3px rgba(244, 67, 54, 0.15)',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#b71c1c' },
  },

  // Account Type width
  filterShort: {
    minWidth: 120,
  },

  // D-Group width
  filterMedium: {
    minWidth: 150,
  },

  searchButton: {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 2,
    px: 3,
    background: 'linear-gradient(145deg, #b71c1c, #d32f2f)',
    boxShadow: '0 3px 8px rgba(211,47,47,0.25)',
    '&:hover': {
      background: 'linear-gradient(145deg, #9c1c1c, #c62828)',
      boxShadow: '0 5px 12px rgba(211,47,47,0.35)',
    },
  },

  resetButton: {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 2,
    borderColor: '#b71c1c',
    color: '#b71c1c',
    '&:hover': {
      backgroundColor: '#fff5f5',
      borderColor: '#9c1c1c',
    },
  },
};

export default styles;
