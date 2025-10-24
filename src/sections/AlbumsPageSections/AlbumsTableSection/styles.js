const styles = {
  root: {
    width: '100%',
    p: { xs: 2, sm: 3 },
    borderRadius: 3,
    background: 'linear-gradient(135deg, #ffffff, #fff8f8)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
    overflowX: 'hidden',
  },

  addButton: {
    textTransform: 'none',
    fontWeight: 600,
    px: 3,
    py: 1.2,
    borderRadius: 2,
    background: 'linear-gradient(135deg, #b71c1c, #d32f2f)',
    boxShadow: '0 3px 8px rgba(211,47,47,0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #9c1c1c, #c62828)',
      boxShadow: '0 4px 12px rgba(211,47,47,0.35)',
    },
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

  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    '@media (max-width: 600px)': {
      width: 40,
      height: 40,
    },
  },

  titleText: {
    fontWeight: 600,
    color: '#222',
  },

  editButton: {
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

  deleteButton: {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 2,
    px: 2.5,
    py: 0.7,
    color: '#b71c1c',
    borderColor: '#b71c1c',
    transition: 'all 0.25s ease',
    '&:hover': {
      backgroundColor: '#fff5f5',
      borderColor: '#9c1c1c',
      color: '#9c1c1c',
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
  },
};

export default styles;
