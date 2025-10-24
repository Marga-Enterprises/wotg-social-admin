const styles = {
  root: {
    width: '100%',
    p: { xs: 2, sm: 3 },
    borderRadius: 3,
    background: 'linear-gradient(135deg, #ffffff, #fff8f8)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
    overflowX: 'hidden',
  },

  headerTitle: {
    fontWeight: 700,
    color: '#7a0c0c',
    letterSpacing: '-0.3px',
  },

  tableContainer: {
    borderRadius: 2,
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    maxHeight: '70vh',
    '@media (max-width: 600px)': {
      maxHeight: 'none',
      overflowX: 'auto',
    },
  },

  table: {
    minWidth: 600,
    '@media (max-width: 600px)': {
      minWidth: '100%',
    },
  },

  tableHeadCell: {
    backgroundColor: '#f9e5e5',
    fontWeight: 700,
    fontSize: '0.85rem',
    color: '#7a0c0c',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '2px solid #f3c1c1',
    whiteSpace: 'nowrap',
  },

  tableBodyCell: {
    borderBottom: '1px solid #f0e0e0',
    fontSize: '0.9rem',
    color: '#333',
    '@media (max-width: 600px)': {
      fontSize: '0.8rem',
      py: 1,
    },
  },

  tableRow: {
    transition: 'background 0.2s ease',
    '&:hover': {
      backgroundColor: '#fff3f3',
    },
  },

  titleText: {
    fontWeight: 600,
    color: '#222',
  },

  createButton: {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 2,
    px: 2.5,
    py: 0.7,
    color: '#fff',
    background: 'linear-gradient(135deg, #b71c1c, #d32f2f)',
    boxShadow: '0 3px 8px rgba(211,47,47,0.3)',
    transition: 'all 0.25s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, #9c1c1c, #c62828)',
      boxShadow: '0 4px 10px rgba(211,47,47,0.35)',
      transform: 'translateY(-1px)',
    },
    '&:active': {
      transform: 'translateY(1px)',
    },
  },

  noDataCell: {
    py: 4,
    backgroundColor: '#fffafa',
  },

  pagination: {
    mt: 3,
    display: 'flex',
    justifyContent: 'center',
    '& .MuiPaginationItem-root': {
      borderRadius: '8px',
      color: '#b71c1c',
      fontWeight: 500,
      '&.Mui-selected': {
        backgroundColor: '#d32f2f',
        color: '#fff',
        boxShadow: '0 3px 10px rgba(211,47,47,0.3)',
        '&:hover': { backgroundColor: '#b71c1c' },
      },
    },
  },
};

export default styles;
