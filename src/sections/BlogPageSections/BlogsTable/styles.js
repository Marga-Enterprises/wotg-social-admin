const styles = {
  // 🔶 Root Wrapper
  root: {
    p: { xs: 2, sm: 3, md: 4 },
    backgroundColor: '#fafafa',
    borderRadius: '16px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
    maxWidth: 1300,
    mx: 'auto',
    transition: 'all 0.3s ease',
  },

  // 🔶 Header Section
  header: {
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
  },
  addButton: {
    fontWeight: 700,
    textTransform: 'none',
    borderRadius: '10px',
    px: 2.5,
    py: 1.2,
    fontSize: { xs: '12px', sm: '13px', md: '14px' },
    background: 'linear-gradient(135deg, #d32f2f, #ef5350)',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(211,47,47,0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #b71c1c, #e53935)',
      boxShadow: '0 6px 18px rgba(211,47,47,0.4)',
      transform: 'translateY(-1px)',
    },
  },

  // 🔶 Table Container (scrollable on small screens)
  tableContainer: {
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
    border: '1px solid #e0e0e0',
    backgroundColor: '#fff',
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    },

    // 🧭 Responsive scroll for small screens
    '@media (max-width: 900px)': {
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '10px',
      '& table': {
        minWidth: '800px',
      },
    },
  },

  // 🔶 Table Header
  tableHeadCell: {
    fontWeight: 700,
    backgroundColor: '#f9fafb',
    color: '#333',
    borderBottom: '2px solid #e0e0e0',
    borderRight: '1px solid #eee',
    fontSize: { xs: '12px', sm: '13px', md: '14px' },
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    whiteSpace: 'nowrap',
    py: 1.5,
  },

  // 🔶 Table Body
  tableBodyCell: {
    fontSize: { xs: '12px', sm: '13px', md: '14px' },
    borderBottom: '1px solid #eee',
    borderRight: '1px solid #f0f0f0',
    color: '#444',
    py: 1.3,
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 245, 245, 0.3)',
    },
  },

  // 🔶 Row Hover
  tableRowHover: {
    '&:hover': {
      backgroundColor: '#fff5f5',
      transition: 'background-color 0.3s ease',
    },
  },

  // 🔶 Status Dots
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    display: 'inline-block',
    transition: 'all 0.3s ease',
  },
  statusDotActive: {
    backgroundColor: '#43a047', // success green
    boxShadow: '0 0 6px rgba(67,160,71,0.6)',
  },
  statusDotInactive: {
    backgroundColor: '#e53935', // red
    boxShadow: '0 0 6px rgba(229,57,53,0.5)',
  },

  // 🔶 Action Buttons
  actionButtonEdit: {
    background: 'linear-gradient(135deg, #1565c0, #42a5f5)',
    color: '#fff',
    fontWeight: 600,
    borderRadius: '8px',
    textTransform: 'none',
    '&:hover': {
      background: 'linear-gradient(135deg, #0d47a1, #2196f3)',
      transform: 'translateY(-1px)',
    },
  },
  actionButtonDelete: {
    borderColor: '#e53935',
    color: '#e53935',
    fontWeight: 600,
    textTransform: 'none',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#ffebee',
      borderColor: '#b71c1c',
      color: '#b71c1c',
    },
  },

  // 🔶 Pagination
  pagination: {
    mt: 4,
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
        '&:hover': {
          backgroundColor: '#b71c1c',
        },
      },
    },
  },
};

export default styles;
