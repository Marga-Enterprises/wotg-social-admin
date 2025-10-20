const styles = {
  root: {
    mb: 3,
    p: 2.5,
    borderRadius: 2,
    backgroundColor: '#fff8f8',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    border: '1px solid #f2dede',
    transition: 'all 0.3s ease',

    '@media (max-width: 900px)': {
      p: 2,
    },
  },

  searchField: {
    flex: 1,
    minWidth: 220,
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },

  searchButton: {
    textTransform: 'none',
    fontWeight: 600,
    background: 'linear-gradient(135deg, #b71c1c, #d32f2f)',
    boxShadow: '0 3px 8px rgba(211,47,47,0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #9c1c1c, #c62828)',
      boxShadow: '0 4px 12px rgba(211,47,47,0.35)',
    },
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },

  selectField: {
    flex: '1 1 220px',
    minWidth: 180,
    '@media (max-width: 900px)': {
      flex: '1 1 45%',
    },
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },

  // 📅 Date Range Group (side-by-side)
  dateRangeGroup: {
    flex: '1 1 280px',
    minWidth: 260,
    '@media (max-width: 900px)': {
      flex: '1 1 100%',
    },
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },

  dateField: {
    flex: 1,
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },

  resetButton: {
    textTransform: 'none',
    fontWeight: 600,
    borderColor: '#c62828',
    color: '#c62828',
    px: 3,
    py: 1.1,
    '&:hover': {
      backgroundColor: '#ffebee',
      borderColor: '#b71c1c',
    },
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
};

export default styles;
