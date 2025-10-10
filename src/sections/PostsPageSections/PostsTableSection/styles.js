const styles = {
  root: {
    p: { xs: 2, sm: 4 },
  },

  headerWrapper: {
    mb: 3,
  },

  headerTitle: {
    fontWeight: 700,
    color: '#b71c1c',
    letterSpacing: '-0.3px',
  },

  headerSubtitle: {
    color: '#555',
    fontSize: '0.9rem',
  },

  addButton: {
    textTransform: 'none',
    fontWeight: 700,
    borderRadius: '8px',
    px: 2.5,
    py: 1.2,
    background: 'linear-gradient(135deg, #b71c1c, #d32f2f)',
    boxShadow: '0 4px 14px rgba(211,47,47,0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #9c1c1c, #c62828)',
      boxShadow: '0 6px 20px rgba(211,47,47,0.35)',
    },
  },

  tableContainer: {
    borderRadius: 3,
    overflow: 'hidden',
    boxShadow: '0 6px 24px rgba(0,0,0,0.06)',
    border: '1px solid #f0f0f0',
    backgroundColor: '#fff',
  },

  tableHeadCell: {
    fontWeight: 700,
    backgroundColor: '#fafafa',
    borderBottom: '2px solid #e0e0e0',
    fontSize: { xs: '12px', sm: '13px', md: '14px' },
    color: '#444',
    whiteSpace: 'nowrap',
    px: 2,
    py: 1.5,
  },

  tableBodyCell: {
    borderBottom: '1px solid #f0f0f0',
    fontSize: { xs: '12px', sm: '13px', md: '14px' },
    color: '#333',
    verticalAlign: 'middle',
    px: 2,
    py: 1.5,
  },

  tableRow: {
    transition: 'background 0.2s ease, transform 0.15s ease',
    '&:hover': {
      backgroundColor: '#fff6f6',
      transform: 'scale(1.002)',
    },
  },

  mediaCell: {
    minWidth: 220,
    textAlign: 'center',
  },

  mediaPreview: {
    width: { xs: '100%', sm: 240, md: 300 },
    height: { xs: 160, sm: 180, md: 200 },
    borderRadius: '12px',
    objectFit: 'cover',
    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
    },
  },

  captionText: {
    lineHeight: 1.5,
    color: '#333',
  },

  dateText: {
    color: '#666',
    fontWeight: 500,
  },

  editButton: {
    textTransform: 'none',
    borderRadius: '6px',
    px: 1.8,
    py: 0.5,
    background: 'linear-gradient(135deg, #b71c1c, #d32f2f)',
    color: '#fff',
    '&:hover': {
      background: 'linear-gradient(135deg, #9c1c1c, #c62828)',
    },
  },

  deleteButton: {
    textTransform: 'none',
    borderRadius: '6px',
    px: 1.8,
    py: 0.5,
  },

  pagination: {
    mt: 4,
    display: 'flex',
    justifyContent: 'center',
    '& .MuiPaginationItem-root': {
      fontWeight: 600,
      color: '#b71c1c',
      '&.Mui-selected': {
        backgroundColor: '#b71c1c',
        color: '#fff',
      },
    },
  },
};

export default styles;
