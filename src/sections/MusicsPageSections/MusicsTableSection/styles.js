const styles = {
  root: {
    p: { xs: 2, sm: 3 },
  },

  headerTitle: {
    fontWeight: 700,
    color: '#1a1a1a',
    letterSpacing: '-0.3px',
  },

  addButton: {
    fontWeight: 700,
    textTransform: 'none',
    borderRadius: 2,
    px: 2.5,
    py: 1,
    fontSize: '0.9rem',
    background: 'linear-gradient(135deg, #b71c1c, #d32f2f)',
    boxShadow: '0 4px 12px rgba(211,47,47,0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #9c1c1c, #c62828)',
      boxShadow: '0 6px 16px rgba(211,47,47,0.35)',
    },
  },

  tableContainer: {
    borderRadius: 3,
    overflow: 'hidden',
    boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
    border: '1px solid #e0e0e0',
  },

  tableHeadCell: {
    fontWeight: 700,
    color: '#444',
    backgroundColor: '#fafafa',
    borderBottom: '2px solid #e0e0e0',
    fontSize: '13px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },

  tableBodyCell: {
    fontSize: '13px',
    borderBottom: '1px solid #eee',
    whiteSpace: 'nowrap',
  },

  tableRow: {
    transition: 'background 0.2s ease',
    '&:hover': {
      backgroundColor: '#fff7f7',
    },
  },

  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },

  titleText: {
    fontWeight: 600,
    color: '#212121',
  },

  genreChip: {
    backgroundColor: '#ffe5e5',
    color: '#b71c1c',
    fontWeight: 600,
    borderRadius: '8px',
    px: 0.5,
  },

  playCount: {
    fontWeight: 600,
    color: '#555',
  },

  editButton: {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.8rem',
    background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
    '&:hover': {
      background: 'linear-gradient(135deg, #1565c0, #1e88e5)',
    },
  },

  deleteButton: {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.8rem',
    borderWidth: '1.5px',
    '&:hover': {
      borderWidth: '1.5px',
    },
  },

  noDataCell: {
    py: 5,
  },

  pagination: {
    mt: 3,
    display: 'flex',
    justifyContent: 'center',
  },
};

export default styles;
