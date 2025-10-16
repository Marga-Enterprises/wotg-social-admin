const styles = {
  root: {
    mb: 3,
    p: 2,
    borderRadius: 2,
    backgroundColor: '#fff8f8',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    border: '1px solid #f2dede',
  },

  searchField: {
    minWidth: 220,
  },

  selectField: {
    minWidth: 180,
  },

  dateField: {
    minWidth: 160,
  },

  resetButton: {
    textTransform: 'none',
    fontWeight: 600,
    borderColor: '#c62828',
    color: '#c62828',
    '&:hover': {
      backgroundColor: '#ffebee',
      borderColor: '#b71c1c',
    },
  },
};

export default styles;
