const styles = {
  // 🔶 Root Container
  root: {
    p: { xs: 2, sm: 3 },
  },

  // 🔶 Header
  headerTitle: {
    fontWeight: 700,
    color: '#1a1a1a',
    letterSpacing: '-0.3px',
  },

  // 🔶 Table Container (now scrollable on small screens)
  tableContainer: {
    borderRadius: 3,
    overflow: 'hidden',
    boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
    border: '1px solid #e0e0e0',
    backgroundColor: '#fff',
    transition: 'box-shadow 0.3s ease',

    // ✅ Add horizontal scroll for mobile and tablet
    '@media (max-width: 900px)': {
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '8px',
      '& table': {
        minWidth: '700px', // prevents columns from collapsing
      },
    },
  },

  // 🔶 Table Head
  tableHeadCell: {
    fontWeight: 700,
    color: '#444',
    backgroundColor: '#fafafa',
    borderBottom: '2px solid #e0e0e0',
    fontSize: '13px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },

  // 🔶 Table Body
  tableBodyCell: {
    fontSize: '13px',
    borderBottom: '1px solid #eee',
    whiteSpace: 'nowrap',
  },

  // 🔶 Table Row Hover Effect
  tableRow: {
    transition: 'background 0.2s ease',
    '&:hover': {
      backgroundColor: '#fff7f7',
    },
  },

  // 🔶 Title Text
  titleText: {
    fontWeight: 600,
    color: '#212121',
  },

  // 🔶 No Data Row
  noDataCell: {
    py: 5,
    textAlign: 'center',
    color: '#888',
  },

  // 🔶 Pagination
  pagination: {
    mt: 3,
    display: 'flex',
    justifyContent: 'center',
    '& .MuiPaginationItem-root': {
      borderRadius: '8px',
      fontWeight: 500,
      color: '#b71c1c',
      '&.Mui-selected': {
        backgroundColor: '#b71c1c',
        color: '#fff',
        boxShadow: '0 3px 8px rgba(183,28,28,0.3)',
      },
    },
  },
};

export default styles;
