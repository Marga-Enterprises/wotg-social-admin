const styles = {
  // 🔶 Root Wrapper
  root: {
    p: { xs: 2, sm: 4 },
    borderRadius: 3,
    background: 'linear-gradient(180deg, #ffffff, #fff6f6)',
  },

  // 🔶 Header
  headerWrapper: {
    mb: 3,
  },

  headerTitle: {
    fontWeight: 800,
    color: '#cc0000',
    letterSpacing: '-0.3px',
  },

  headerSubtitle: {
    color: '#555',
    fontSize: '0.9rem',
  },

  addButton: {
    textTransform: 'none',
    fontWeight: 700,
    borderRadius: '999px',
    px: 3,
    py: 1.2,
    background: 'linear-gradient(135deg, #cc0000, #ff4d4d)',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(204,0,0,0.35)',
    '&:hover': {
      background: 'linear-gradient(135deg, #b71c1c, #ff3333)',
      boxShadow: '0 6px 18px rgba(204,0,0,0.4)',
    },
  },

  // 🔶 Table Container
  tableContainer: {
    borderRadius: 3,
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
    border: '1px solid #f0f0f0',
    backgroundColor: '#fff',
    '@media (max-width: 900px)': {
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      '& table': {
        minWidth: '850px',
      },
    },
  },

  // 🔶 Table Header
  tableHeadCell: {
    fontWeight: 700,
    backgroundColor: '#ffeaea',
    borderBottom: '2px solid #f5b5b5',
    fontSize: { xs: '12px', sm: '13px', md: '14px' },
    color: '#a00000',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    py: 1.5,
  },

  // 🔶 Table Body
  tableBodyCell: {
    borderBottom: '1px solid #f2f2f2',
    fontSize: { xs: '12px', sm: '13px', md: '14px' },
    color: '#222',
    verticalAlign: 'middle',
    py: 1.5,
  },

  // 🔶 Table Row Hover
  tableRow: {
    '&:nth-of-type(odd)': { backgroundColor: '#fffafa' },
    transition: 'background 0.25s ease, box-shadow 0.2s ease',
    '&:hover': {
      backgroundColor: '#fff3f3',
      boxShadow: 'inset 0 0 0 1px #ffd6d6',
    },
  },

  // 🔶 Media Preview
  mediaCell: {
    minWidth: 220,
    textAlign: 'center',
  },

  mediaWrapper: {
    position: 'relative',
    display: 'inline-block',
    borderRadius: '12px',
    overflow: 'hidden',
    '&:hover video': { filter: 'brightness(0.75)' },
    '&:hover img': { filter: 'brightness(0.85)' },
  },

  mediaPreview: {
    width: { xs: '100%', sm: 220, md: 260 },
    height: { xs: 140, sm: 160, md: 180 },
    borderRadius: '10px',
    objectFit: 'cover',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'scale(1.04)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    },
  },

  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 48,
    color: '#fff',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
    [`${'.MuiBox-root:hover &'}`]: {
      opacity: 1,
    },
  },

  // 🔶 Caption + Date
  captionText: {
    lineHeight: 1.5,
    color: '#333',
  },

  dateText: {
    color: '#666',
    fontWeight: 500,
  },

  // 🔶 Status Chip
  statusChip: {
    display: 'inline-block',
    px: 1.4,
    py: 0.3,
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: '#fff',
    backgroundColor: '#cc0000',
    boxShadow: '0 2px 6px rgba(204,0,0,0.3)',
  },

  // 🔶 Actions Cell
  actionsCell: {
    textAlign: 'center',
    minWidth: 180,
    '@media (max-width: 600px)': {
      minWidth: 240,
    },
  },

  // 🔶 Actions Wrapper (fix alignment)
  actionsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '6px',
      '& button': {
        width: '100%',
        maxWidth: 180,
      },
    },
  },

  // 🔶 Buttons
  editButton: {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: '999px',
    px: 2,
    py: 0.6,
    background: 'linear-gradient(135deg, #cc0000, #ff4d4d)',
    color: '#fff',
    boxShadow: '0 2px 6px rgba(204,0,0,0.25)',
    minWidth: 80,
    '&:hover': {
      background: 'linear-gradient(135deg, #b71c1c, #ff3333)',
      boxShadow: '0 3px 8px rgba(204,0,0,0.35)',
    },
  },

  deleteButton: {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: '999px',
    px: 2,
    py: 0.6,
    minWidth: 80,
    color: '#cc0000',
    borderColor: '#cc0000',
    '&:hover': {
      backgroundColor: '#fff5f5',
      borderColor: '#a00000',
      color: '#a00000',
    },
  },

  // 🔶 Pagination
  pagination: {
    mt: 4,
    display: 'flex',
    justifyContent: 'center',
    '& .MuiPaginationItem-root': {
      borderRadius: '8px',
      color: '#cc0000',
      fontWeight: 500,
      '&.Mui-selected': {
        backgroundColor: '#cc0000',
        color: '#fff',
        boxShadow: '0 3px 10px rgba(204,0,0,0.3)',
        '&:hover': {
          backgroundColor: '#b71c1c',
        },
      },
    },
  },
};

export default styles;
