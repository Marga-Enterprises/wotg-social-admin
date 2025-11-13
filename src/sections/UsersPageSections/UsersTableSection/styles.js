const styles = {
  root: {
    width: '100%',
    p: { xs: 2, sm: 3 },
    borderRadius: 3,
    background: 'linear-gradient(135deg, #ffffff, #fff8f8)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
    overflowX: 'hidden',
  },

  headerStack: {
    direction: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    alignItems: { xs: 'stretch', sm: 'center' },
    mb: 2,
  },

  headerTitle: {
    fontWeight: 700,
    color: '#7a0c0c',
    letterSpacing: '-0.3px',
  },

  tableContainer: {
    borderRadius: 2,
    overflow: 'hidden',
    maxHeight: '70vh',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },

  tableContainerMobile: {
    borderRadius: 2,
    overflowX: 'auto',
    maxHeight: 'none',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },

  table: {
    minWidth: 600,
    '@media (max-width: 600px)': {
      minWidth: '100%',
    },
  },

  tableHeadCell: {
    backgroundColor: '#f9e5e5',
    borderBottom: '2px solid #f3c1c1',
    fontWeight: 700,
    fontSize: '0.85rem',
    color: '#7a0c0c',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
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

  rowActive: {
    cursor: 'pointer',
    transition: '0.2s ease',
    '&:hover': { backgroundColor: '#fff3f3' },
  },

  rowAbandoned: {
    cursor: 'not-allowed',
    opacity: 0.6,
    transition: '0.2s ease',
    '&:hover': { backgroundColor: 'inherit' },
  },

  titleText: {
    fontWeight: 600,
    color: '#222',
  },

  dgroupSelect: {
    minWidth: 80,
    fontWeight: 700,
    color: '#7a0c0c',
    '& .MuiSelect-select': {
      py: 0.8,
    },
    '&.Mui-disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },

  noDataCell: {
    py: 4,
    backgroundColor: '#fffafa',
  },

  noDataText: (isMobile) => ({
    fontSize: isMobile ? '0.85rem' : '0.95rem',
  }),

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
