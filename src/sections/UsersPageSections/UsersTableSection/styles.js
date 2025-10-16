const styles = {
  root: {
    p: { xs: 2, sm: 3 },
  },

  headerTitle: {
    fontWeight: 700,
    color: '#1a1a1a',
    letterSpacing: '-0.3px',
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

  titleText: {
    fontWeight: 600,
    color: '#212121',
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
